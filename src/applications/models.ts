export interface PaginatedResult<T> {
  count: number;
  data: T[];
}

export interface Speaker {
  id: number;
  name: string;
  email: string;
  bio: string;
}

export interface Workshop {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

export interface Pagination {
  limit: number;
  offset: number;
}