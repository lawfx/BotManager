import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BotInfoService {
  constructor(private httpClient: HttpClient) {}

  getInfo(botName: string) {
    return this.httpClient.get(`/${botName}/avatarurl`);
  }
}
