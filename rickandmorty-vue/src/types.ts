export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface SimpleRef {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: SimpleRef;
  location: SimpleRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: ApiInfo;
  results: Character[];
}
