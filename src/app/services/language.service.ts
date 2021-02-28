import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Response } from '../interfaces/response';
import { BASE_API_URL } from '../helpers/constants';
import { OutPutModel } from '../interfaces/outputModel';
import { PaginationQuery } from '../interfaces/paginationQuery';
import { Language } from '../models/language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private http: HttpClient) {}

  getLanguages(query: PaginationQuery): Observable<OutPutModel<Language>> {
    const params = new HttpParams();

    params.set('culture', 'en');

    if (query.language) params.set('language', query.language.toString());
    if (query.writeLevel) params.set('writeLevel', query.writeLevel.toString());
    if (query.speakLevel) params.set('speakLevel', query.speakLevel.toString());
    if (query.comprehensionLevel)
      params.set('comprehensionLevel', query.comprehensionLevel.toString());
    if (query.pageNumber) params.set('pageNumber', query.pageNumber.toString());
    if (query.pageSize) params.set('pageSize', query.pageSize.toString());
    if (query.isPaged) params.set('isPaged', query.isPaged.toString());
    if (query.openDate) params.set('openDate', query.openDate.toString());
    if (query.closeDate) params.set('closeDate', query.closeDate.toString());
    if (query.search) params.set('search', query.search.toString());

    return this.http.get<OutPutModel<Language>>(`${BASE_API_URL}/langusers`, {
      params,
    });
  }

  getLanguageById(id: string): Observable<Response<Language>> {
    const params = new HttpParams();
    params.set('culture', 'fr');

    return this.http.get<Response<Language>>(
      `${BASE_API_URL}/langusers/${id}`,
      { params }
    );
  }

  postLanguage(payload: any): Observable<Response<Language>> {
    const params = new HttpParams();
    params.set('culture', 'fr');

    const formData = new FormData();

    formData.append('language', payload.language);
    formData.append('writeLevel', payload.writeLevel);
    formData.append('speakLevel', payload.speakLevel);
    formData.append('comprehensionLevel', payload.comprehensionLevel);

    return this.http.post<Response<Language>>(
      `${BASE_API_URL}/langusers`,
      formData,
      { params }
    );
  }

  updateLanguage(id: string, payload: any): Observable<Response<Language>> {
    const params = new HttpParams();
    params.set('culture', 'fr');

    const formData = new FormData();

    formData.append('language', payload.language);
    formData.append('writeLevel', payload.writeLevel);
    formData.append('speakLevel', payload.speakLevel);
    formData.append('comprehensionLevel', payload.comprehensionLevel);

    return this.http.put<Response<Language>>(
      `${BASE_API_URL}/langusers/${id}`,
      formData,
      { params }
    );
  }

  deleteLanguage(id: string): Observable<Response<string>> {
    const params = new HttpParams();
    params.set('culture', 'fr');

    return this.http.delete<Response<string>>(
      `${BASE_API_URL}/langusers/${id}`,
      { params }
    );
  }
}
