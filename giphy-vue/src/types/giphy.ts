// src/types/giphy.ts
export interface GiphyGif {
  id: string;
  title: string;
  images: {
    original: {
      url: string;
      width: string;
      height: string;
    };
    fixed_height: {
      url: string;
      width: string;
      height: string;
    };
    fixed_width: {
      url: string;
      width: string;
      height: string;
    };
  };
  rating: string;
  username: string;
  user?: {
    avatar_url: string;
    banner_url: string;
    display_name: string;
    username: string;
  };
  import_datetime: string;
  trending_datetime: string;
}

export interface GiphyResponse {
  data: GiphyGif[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

export interface GiphySingleResponse {
  data: GiphyGif;
}