import { describe, it, expect, vi, beforeEach } from 'vitest';
import { reportWebVitals, initPerformanceMonitoring } from './performanceMonitor';

describe('Performance Monitor', () => {
  beforeEach(() => {
    // Clear console mocks
    vi.clearAllMocks();
  });

  it('should report web vitals with correct format', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    const metric = {
      name: 'LCP',
      value: 2000,
      rating: 'good',
    };

    reportWebVitals(metric);

    expect(consoleSpy).toHaveBeenCalledWith(
      '[Performance] LCP:',
      expect.objectContaining({
        value: 2000,
        rating: 'good',
      })
    );

    consoleSpy.mockRestore();
  });

  it('should warn when metric rating is poor', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    const metric = {
      name: 'FID',
      value: 350,
      rating: 'poor',
    };

    reportWebVitals(metric);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('FID is poor')
    );

    consoleSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('should initialize performance monitoring in dev mode', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock PerformanceObserver
    global.PerformanceObserver = class PerformanceObserver {
      constructor() {}
      observe() {}
      disconnect() {}
    };
    
    global.performance = {
      getEntriesByType: vi.fn(() => []),
    };

    initPerformanceMonitoring();

    // Should log that monitoring is enabled in dev
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Performance monitoring enabled')
    );

    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
