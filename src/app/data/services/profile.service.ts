import {inject, Injectable, signal} from '@angular/core';
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

  me = signal<Profile | null>(null);

  constructor() {
  }

  getSubscribersShortList(subs_amount: number = 3, page: number = 1, size: number = 50) {
    return this.http.get<Pageable<Profile>>(`${this.baseUrl}account/subscribers/?page=${page}&size=${size}`).pipe(
      map(res => res.items.slice(0, subs_amount)),
    );
  }


  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseUrl}account/me`).pipe(tap(res => this.me.set(res)));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseUrl}account/${id}`);
  }
  patchProfile(data: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseUrl}account/me`, data);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<Profile>(`${this.baseUrl}account/upload_image`, fd);
  }
}

