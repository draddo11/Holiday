import axios from 'axios';
import { logger } from '../utils/logger';

// Use relative URLs in production, localhost in development
const API_BASE_URL = import.meta.env.PROD 
  ? '' // Empty string for relative URLs in production
  : 'http://127.0.0.1:5001'; // Localhost for development

export const getFlightPrices = async (destination, origin = 'New York') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-flight-prices`, {
      params: { destination, origin }
    });
    return response.data;
  } catch (error) {
    logger.error('Error fetching flight prices:', error);
    throw error;
  }
};

export const getLiveEvents = async (destination) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-live-events`, {
      params: { destination }
    });
    return response.data;
  } catch (error) {
    logger.error('Error fetching live events:', error);
    throw error;
  }
};

export const generateTravelPhoto = async (userImage, landmarkId, backgroundImageUrl, useAI = true) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-travel-photo`, {
      userImage,
      landmarkId,
      backgroundImageUrl,
      useAI
    });
    return response.data;
  } catch (error) {
    logger.error('Error generating travel photo:', error);
    throw error;
  }
};

export const getWeather = async (destination) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-weather`, {
      params: { destination }
    });
    return response.data;
  } catch (error) {
    logger.error('Error fetching weather:', error);
    throw error;
  }
};

export const getHotelPrices = async (destination) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-hotel-prices`, {
      params: { destination }
    });
    return response.data;
  } catch (error) {
    logger.error('Error fetching hotel prices:', error);
    throw error;
  }
};

export const generateAIItinerary = async (destination, origin, budget, days, interests) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-ai-itinerary`, {
      destination,
      origin,
      budget,
      days,
      interests
    });
    return response.data;
  } catch (error) {
    logger.error('Error generating AI itinerary:', error);
    throw error;
  }
};


export const generateWeatherScene = async (destination, temperature, weatherCondition, season = null) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-weather-scene`, {
      destination,
      temperature,
      weather_condition: weatherCondition,
      season: season  // Optional: 'halloween', 'christmas', 'summer', 'spring', or null for auto-detect
    });
    return response.data;
  } catch (error) {
    logger.error('Error generating weather scene:', error);
    throw error;
  }
};

export const generateItineraryPDF = async (itinerary) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-itinerary-pdf`, {
      itinerary
    }, {
      responseType: 'blob'  // Important for PDF download
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${itinerary.destination.replace(/\s+/g, '_')}_Itinerary.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    return { success: true };
  } catch (error) {
    logger.error('Error generating PDF:', error);
    throw error;
  }
};
