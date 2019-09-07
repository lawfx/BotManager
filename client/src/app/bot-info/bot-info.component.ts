import { Component, OnInit, Input } from '@angular/core';
import { BotService } from '../bot.service';
import { BotInfo } from '../interfaces';

@Component({
  selector: 'app-bot-info',
  templateUrl: './bot-info.component.html',
  styleUrls: ['./bot-info.component.css']
})
export class BotInfoComponent implements OnInit {
  @Input() botName: string;
  botInfo = {} as BotInfo;
  constructor(private botService: BotService) {}

  ngOnInit() {
    this.getInfo(this.botName);
  }

  shutdownBot() {
    this.botService
      .shutdown(this.botName)
      .subscribe(res => {}, err => console.error(err));
  }

  restartBot() {
    this.botService
      .restart(this.botName)
      .subscribe(res => {}, err => console.error(err));
  }

  getInfo(botName) {
    this.botService
      .getInfo(botName)
      .subscribe(
        (res: BotInfo) => (this.botInfo = res),
        err => console.error(err)
      );
  }
}
