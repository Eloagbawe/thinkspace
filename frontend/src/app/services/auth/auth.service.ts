import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment'
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
    const { username, email, password } = credentials;

    return this.httpClient.post(`${this.API_URL}/users/signup`, {
      headers: {
        "Content-Type": "application/json"
      },
      content: {
        username,
        email,
        password
      },
      withCredentials: true,
    })
  }

  login = (credentials: LoginCredentials) => {
    const { email, password } = credentials;

    return this.httpClient.post(`${this.API_URL}/users/login`, {
      headers: {
        "Content-Type": "application/json"
      },
      content: {
        email,
        password
      },
      withCredentials: true,
    })
  }

}
