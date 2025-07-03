import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment, hrms } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setToken(token: string): boolean {
    if (this.isBrowser()) {

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('token', token);
        return true;
      }
    }
    return false;
  }
  setUser(userData: any) {
    if (this.isBrowser()) {

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userData));
      }

    }
  }
  getUser() {
    if (this.isBrowser()) {

      if (typeof localStorage !== 'undefined') {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
      }

    } else {
      return null;
    }
  }
  login(body: any) {
    return this.http.post(environment.baseUrl + hrms.login, body)
  }
  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem('token');
    }
    return false;

  }

}
