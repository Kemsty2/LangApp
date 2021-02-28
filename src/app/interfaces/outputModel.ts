import { PagingHeader } from './pagingHeader';

export interface OutPutModel<T> {
  paging: PagingHeader;
  data: Array<T>;
}
