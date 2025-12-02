/**
 * Performance monitoring utilities for Core Web Vitals
 * Tracks LCP (Largest Contentful Paint), FID (First Input Delay), and CLS (Cumulative Layout Shift)
 */

import { logger } from './logger';

// Report Web Vitals to console (can be extended to send to analytics)
export function reportWebVitals(metric) {
  const { name, value, rating } = metric;
  
  // Format value based on metric type
  const formattedValue = name === 'CLS' 
    ? value.toFixed(3)  // CLS is unitless, show 3 decimal places
    : `${Math.round(value)}ms`;  // Time-based metrics in milliseconds
  
  logger.info(`[Performance] ${name}:`, {
    value: formattedValue,
    rating,
    threshold: getThreshold(name),
  });

  // Check if metric exceeds threshold
  if (rating === 'poor') {
    logger.warn(`⚠️ ${name} is poor (${formattedValue}). Consider optimization.`);
  }
}

// Get performance thresholds
function getThreshold(metric) {
  const thresholds = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
  };
  return thresholds[metric] || null;
}

// Measure LCP (Largest Contentful Paint)
export function measureLCP() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      const value = lastEntry.renderTime || lastEntry.loadTime;
      const rating = value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      
      reportWebVitals({ name: 'LCP', value, rating });
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    logger.error('Error measuring LCP:', error);
  }
}

// Measure FID (First Input Delay)
export function measureFID() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const value = entry.processingStart - entry.startTime;
        const rating = value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
        
        reportWebVitals({ name: 'FID', value, rating });
      });
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    logger.error('Error measuring FID:', error);
  }
}

// Measure CLS (Cumulative Layout Shift)
export function measureCLS() {
  if (!('PerformanceObserver' in window)) return;

  let clsValue = 0;
  let clsEntries = [];

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      });

      const rating = clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor';
      
      reportWebVitals({ name: 'CLS', value: clsValue, rating });
    });

    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (error) {
    logger.error('Error measuring CLS:', error);
  }
}

// Measure FCP (First Contentful Paint)
export function measureFCP() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          const value = entry.startTime;
          const rating = value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
          
          reportWebVitals({ name: 'FCP', value, rating });
        }
      });
    });

    observer.observe({ type: 'paint', buffered: true });
  } catch (error) {
    logger.error('Error measuring FCP:', error);
  }
}

// Initialize all performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Only monitor when explicitly enabled (opt-in)
  if (localStorage.getItem('enablePerformanceMonitoring') === 'true') {
    logger.info('🚀 Performance monitoring enabled');
    
    measureLCP();
    measureFID();
    measureCLS();
    measureFCP();

    // Monitor bundle size
    if (performance && performance.getEntriesByType) {
      const resources = performance.getEntriesByType('resource');
      const jsResources = resources.filter(r => r.name.endsWith('.js'));
      const cssResources = resources.filter(r => r.name.endsWith('.css'));
      
      const totalJsSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const totalCssSize = cssResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
      
      logger.info('[Performance] Bundle sizes:', {
        js: `${(totalJsSize / 1024).toFixed(2)} KB`,
        css: `${(totalCssSize / 1024).toFixed(2)} KB`,
        total: `${((totalJsSize + totalCssSize) / 1024).toFixed(2)} KB`,
      });
    }
  }
}

// Hook for React components
export function usePerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Initialize on mount (only if enabled)
  initPerformanceMonitoring();
}
