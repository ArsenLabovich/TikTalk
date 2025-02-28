import {inject, Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {TokenResponse} from "./TokenResponse";
import {catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  baseUrl: string = 'https://icherniakov.ru/yt-course/auth/';
  router = inject(Router);

  token: string | null = null;
  refreshToken: string | null = null;

  cookiesService: CookieService = inject(CookieService);

  get isAuthenticated() {
    if (!this.token) {
      this.token = this.cookiesService.get('token')
      this.refreshToken = this.cookiesService.get('refresh_token')
    }
    return !!this.token;
  }

  login(payload: { username: string, password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);
    return this.http.post<TokenResponse>(`${this.baseUrl}token`, fd)
      .pipe(
        tap(value => {
            this.saveToken(value);
        })
      );
  }

  constructor() {
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `${this.baseUrl}refresh`,
      {
        refresh_token: this.refreshToken,
      }
    ).pipe(
      tap(res => {
        this.saveToken(res);
      }),
    catchError(err => {
      this.logout();
      return throwError(err);
    })
  )
  }

  logout() {
    this.cookiesService.deleteAll();
    this.refreshToken = null;
    this.token = null;
    this.router.navigate(['/login']).then(r => {
    });
  }

  saveToken(val: TokenResponse) {
    this.token = val.access_token;
    this.refreshToken = val.refresh_token;
    this.cookiesService.set('token', val.access_token);
    this.cookiesService.set('refresh_token', val.refresh_token);
  }
}
