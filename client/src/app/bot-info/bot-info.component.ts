import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bot-info',
  templateUrl: './bot-info.component.html',
  styleUrls: ['./bot-info.component.css']
})
export class BotInfoComponent implements OnInit {

  @Input() bot: string;
  constructor() { }

  ngOnInit() {
    // console.log(this.bot);

  }



}
