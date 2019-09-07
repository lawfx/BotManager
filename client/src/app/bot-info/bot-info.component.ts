import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BotService } from '../bot.service';
import { BotInfo } from '../interfaces';

@Component({
  selector: 'app-bot-info',
  templateUrl: './bot-info.component.html',
  styleUrls: ['./bot-info.component.css']
})
export class BotInfoComponent implements OnInit, OnDestroy {
  @Input() botName: string;
  botInfo = {} as BotInfo;
  infoInterval: NodeJS.Timer;

  constructor(private botService: BotService) {}

  ngOnInit() {
    this.infoInterval = setInterval(() => {
      this.getInfo(this.botName);
    }, 1000);
    this.getInfo(this.botName);
  }

  ngOnDestroy(): void {
    clearInterval(this.infoInterval);
    this.infoInterval = null;
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
  getInfo(botName: string) {
    this.botService.getInfo(botName).subscribe(
      (res: BotInfo) => {
        this.botInfo = res;
        this.botInfo.statusText =
          res.status === 0
            ? 'Connected'
            : res.status === 1
            ? 'Connecting'
            : res.status === 2
            ? 'Reconnecting'
            : res.status === 3
            ? 'Idle'
            : res.status === 4
            ? 'Nearly'
            : 'Disconnected';
      },
      err => console.error(err)
    );
  }
}

enum Status {
  Connected = 'Connected',
  Connecting = 'Connecting',
  Reconnecting = 'Reconnecting',
  Idle = 'Idle',
  Nearly = 'Nearly',
  Disconnected = 'Disconnected'
}
