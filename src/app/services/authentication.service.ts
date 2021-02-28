import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_API_URL } from 'src/app/helpers/constants';
import {
  AuthenticateRequest,
  RegisterRequest,
} from './contracts/authentication.service.contracts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(payload: AuthenticateRequest): Observable<any> {
    console.log("payload", payload);

    const formData = new FormData();
    formData.append('Email', payload.email);
    formData.append('Password', payload.password);

    return this.http.post(
      `${BASE_API_URL}/accounts/authenticate`,
      formData      
    );
  }

  register(payload: RegisterRequest): Observable<any> {
    const formData = new FormData();

    formData.append('firstName', payload.firstName);
    formData.append('lastName', payload.lastName);
    formData.append('userName', payload.userName);
    formData.append('email', payload.email);
    formData.append('password', payload.password);
    formData.append('confirmPassword', payload.confirmPassword);

    return this.http.post(
      `${BASE_API_URL}/accounts/register`,
      formData      
    );
  }
}
