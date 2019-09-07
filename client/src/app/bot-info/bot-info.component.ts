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
  statusText: string;
  uptimeReadable: string;
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
        this.statusToText(res.status);
        this.uptimeToReadable(res.uptime, res.status);
      },
      err => console.error(err)
    );
  }

  statusToText(status: number) {
    this.statusText =
      status === 0
        ? 'Connected'
        : status === 1
        ? 'Connecting'
        : status === 2
        ? 'Reconnecting'
        : status === 3
        ? 'Idle'
        : status === 4
        ? 'Nearly'
        : 'Disconnected';
  }

  uptimeToReadable(uptime: number, status: number) {
    if (status !== 0) {
      this.uptimeReadable = 'N/A';
      return;
    }
    const seconds = Math.floor((uptime / 1000) % 60);
    const minutes = Math.floor((uptime / (1000 * 60)) % 60);
    const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
    const days = Math.floor((uptime / (1000 * 60 * 60 * 24)) % 30);

    this.uptimeReadable = `${days > 0 ? days + 'd ' : ''}${(hours < 10
      ? '0'
      : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10
      ? '0'
      : '') + seconds}`;
  }
}
