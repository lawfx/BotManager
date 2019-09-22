import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BotService } from '../bot.service';
import { BotInfo, ConfirmationDialogData } from '../interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

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
  infoTimeout: NodeJS.Timer = null;
  infoTimeoutTime = 1000;
  infoInterval: NodeJS.Timer = null;

  constructor(
    private botService: BotService,
    private confirmDialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getInfo();
  }

  ngOnDestroy(): void {
    this.stopInfoWithInterval();
    this.stopInfoWithTimeout();
  }

  shutdownBot() {
    const data: ConfirmationDialogData = {
      title: `Bot shutdown`,
      message: `Are you sure you want to shutdown ${this.botInfo.username}?`,
      // tslint:disable-next-line: quotemark
      confirmButton: "Yes, I'm sure",
      cancelButton: 'Not really'
    };
    const dialogRef = this.confirmDialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe({
      next: res => {
        if (res) {
          this.botService.shutdown(this.botName).subscribe({
            next: () => this.toastr.success('Shutting down'),
            error: err => {
              console.error(err);
              this.toastr.error('Shutdown failed');
            }
          });
        }
      }
    });
  }

  rebootBot() {
    this.botService.reboot(this.botName).subscribe({
      next: () => this.toastr.success('Rebooting'),
      error: err => {
        console.error(err);
        this.toastr.error('Reboot failed');
      }
    });
  }

  getInfo() {
    this.botService.getInfo(this.botName).subscribe({
      next: (res: BotInfo) => {
        this.botInfo = res;
        this.statusToText(res.status);
        this.uptimeToReadable(res.uptime, res.status);
        this.stopInfoWithTimeout();
        this.getInfoWithInterval();
      },
      error: err => {
        console.error(err);
        this.toastr.error('Info fetch failed');
        // . Click me try again immediately', null, {
        //   timeOut: this.infoTimeoutTime,
        //   progressBar: true
        // })
        // .onTap.subscribe({
        //   next: () => this.getInfo()
        // });
        this.stopInfoWithInterval();
        this.getInfoWithTimeout();
      }
    });
  }

  getInfoWithInterval() {
    if (this.infoInterval === null) {
      this.infoInterval = setInterval(() => this.getInfo(), 1000);
    }
  }

  stopInfoWithInterval() {
    if (this.infoInterval !== null) {
      clearInterval(this.infoInterval);
      this.infoInterval = null;
    }
  }

  getInfoWithTimeout() {
    console.log(this.infoTimeoutTime);
    this.infoTimeout = setTimeout(() => this.getInfo(), this.infoTimeoutTime);
    this.infoTimeoutTime *= 2;
  }

  stopInfoWithTimeout() {
    if (this.infoTimeout !== null) {
      clearTimeout(this.infoTimeout);
      this.infoTimeout = null;
      this.infoTimeoutTime = 1000;
    }
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
