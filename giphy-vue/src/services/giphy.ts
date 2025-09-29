// src/services/giphy.ts
import axios from 'axios';
import type { GiphyResponse, GiphySingleResponse } from '@/types/giphy';

const API_KEY = 'yxIif8kqz9KmZyPStnXOeBgTJqPl79li';
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export const giphyService = {
  async getTrending(limit: number = 25): Promise<GiphyResponse> {
    const response = await axios.get<GiphyResponse>(`${BASE_URL}/trending`, {
      params: {
        api_key: API_KEY,
        limit,
        rating: 'g'
      }
    });
    return response.data;
  },

  async getGifById(id: string): Promise<GiphySingleResponse> {
    const response = await axios.get<GiphySingleResponse>(`${BASE_URL}/${id}`, {
      params: {
        api_key: API_KEY
      }
    });
    return response.data;
  },

  async searchGifs(query: string, limit: number = 25): Promise<GiphyResponse> {
    const response = await axios.get<GiphyResponse>(`${BASE_URL}/search`, {
      params: {
        api_key: API_KEY,
        q: query,
        limit,
        rating: 'g'
      }
    });
    return response.data;
  }
};