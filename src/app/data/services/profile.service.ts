import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Profile} from "../interfaces/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);

  baseUrl: string = 'https://icherniakov.ru/yt-course/';

  constructor() {
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/me`);
  }
}
