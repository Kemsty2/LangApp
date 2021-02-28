import { LangEnum, LangLevel } from '../enums';

export interface PaginationQuery {
  language?: LangEnum;
  writeLevel?: LangLevel;
  speakLevel?: LangLevel;
  comprehensionLevel?: LangLevel;
  pageNumber?: number;
  pageSize?: number;
  isPaged: boolean;
  openDate?: Date;
  closeDate?: Date;
  search?:string;
}
