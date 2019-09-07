import { Component, OnInit, Input } from '@angular/core';
import { BotInfoService } from '../bot-info.service';
import { BotInfo } from '../interfaces';

@Component({
  selector: 'app-bot-info',
  templateUrl: './bot-info.component.html',
  styleUrls: ['./bot-info.component.css']
})
export class BotInfoComponent implements OnInit {
  @Input() botName: string;
  avatarURL = '';
  constructor(private botinfoService: BotInfoService) {}

  ngOnInit() {
    this.getInfo(this.botName);
  }

  getInfo(botName) {
    this.botinfoService
      .getInfo(botName)
      .subscribe((res: BotInfo) => (this.avatarURL = res.avatarURL));
  }
}
