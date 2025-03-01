import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Profile} from "../interfaces/profile.interface";
import {Pageable} from "../interfaces/pageable.interface";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);

  baseUrl: string = 'https://icherniakov.ru/yt-course/';

  constructor() {
  }

  getSubscribersShortList(page: number = 1, size: number = 50) {
    return this.http.get<Pageable<Profile>>(`${this.baseUrl}account/subscribers/?page=${page}&size=${size}`).pipe(
      map(res => res.items.slice(0,3)),
    );
  }


  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/me`);
  }
}
