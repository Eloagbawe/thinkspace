import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SignUpCredentials, LoginCredentials } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient)
  private API_URL = environment.API_URL;

  constructor() { }

  signUp = (credentials: SignUpCredentials) => {
    return this.httpClient.post(`${this.API_URL}/users/signup`, credentials, {
      headers: {
        "Content-Type": "application/json"
      },
    })
  }

  login = (credentials: LoginCredentials) => {
    return this.httpClient.post(`${this.API_URL}/users/login`, credentials, {
      headers: {
        "Content-Type": "application/json"
      },
    })
  }

  logout = () => {
    return this.httpClient.post(`${this.API_URL}/users/logout`, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
  }

}
