import {inject, Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import {TokenResponse} from "./TokenResponse";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  baseUrl: string = 'https://icherniakov.ru/yt-course/auth/';

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuthenticated() {
    return !!this.token;
  }

  login(payload: { username: string, password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);
    return this.http.post<TokenResponse>(`${this.baseUrl}token`, fd)
      .pipe(
        tap(value => {
          this.token = value.access_token;
          this.refreshToken = value.refresh_token;
        })
      );
  }

  constructor() {
  }
}
