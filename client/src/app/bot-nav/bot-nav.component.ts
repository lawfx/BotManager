import { Component, OnInit } from '@angular/core';
import { BotService } from '../bot.service';
import { BotInfo } from '../interfaces';

@Component({
  selector: 'app-bot-nav',
  templateUrl: './bot-nav.component.html',
  styleUrls: ['./bot-nav.component.css']
})
export class BotNavComponent implements OnInit {
  redAlert = {} as BotInfo;
  janusz = {} as BotInfo;

  constructor(private botService: BotService) {}

  ngOnInit() {
    this.getBotsInfo();
  }

  private getBotsInfo() {
    this.botService.getInfo('redalert').subscribe({
      next: (botInfo: BotInfo) => (this.redAlert = botInfo),
      error: () => {
        if (Object.keys(this.janusz).length === 0) {
          this.getBotsInfo();
        }
      }
    });
    this.botService.getInfo('janusz').subscribe({
      next: (botInfo: BotInfo) => (this.janusz = botInfo),
      error: () => {
        if (Object.keys(this.redAlert).length === 0) {
          this.getBotsInfo();
        }
      }
    });
  }
}
