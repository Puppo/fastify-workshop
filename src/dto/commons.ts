export type Pagination = {
  limit: number;
  offset: number;
}

export type PaginatedResult<T> = {
  count: number;
  data: T[];
}