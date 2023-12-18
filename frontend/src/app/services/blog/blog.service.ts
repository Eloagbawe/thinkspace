import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private httpClient = inject(HttpClient)
  private API_URL = environment.API_URL;

  constructor() { }

  getBlogs = () => {
    return this.httpClient.get(`${this.API_URL}/blogs`, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
    })
  }
}
