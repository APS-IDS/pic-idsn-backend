export interface IMetadata {
  pagination: IPagination;
  date: number;
}

export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
