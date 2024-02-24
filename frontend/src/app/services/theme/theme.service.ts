import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  addDarkTheme = () => {
    document.body.classList.add('dark_theme');
    localStorage.setItem('theme', 'dark');
  }

  addLightTheme = () => {
    document.body.classList.remove('dark_theme');
    localStorage.setItem('theme', 'light');
  }

  getTheme = () => {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  }

}
