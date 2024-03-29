import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  constructor(private httpClient: HttpClient) {}

  getInfo(botName: string) {
    return this.httpClient.get(`/${botName}/info`);
  }

  shutdown(botName: string) {
    return this.httpClient.put(`/${botName}/shutdown`, null);
  }

  reboot(botName: string) {
    return this.httpClient.put(`/${botName}/reboot`, null);
  }
}
