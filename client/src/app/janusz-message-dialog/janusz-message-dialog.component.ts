import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JanuszMessageDialogData, Message } from '../interfaces';
import { JanuszService } from '../janusz.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-janusz-message-dialog',
  templateUrl: './janusz-message-dialog.component.html',
  styleUrls: ['./janusz-message-dialog.component.css']
})
export class JanuszMessageDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('author', { static: false }) author: ElementRef;
  @ViewChild('message', { static: false }) message: ElementRef;
  @ViewChild('addButton', { static: false }) addButton: MatButton;
  @ViewChild('editButton', { static: false }) editButton: MatButton;

  constructor(
    private januszService: JanuszService,
    private dialogRef: MatDialogRef<JanuszMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JanuszMessageDialogData
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.data.isAdding) {
        this.author.nativeElement.value = this.data.message.author;
        this.message.nativeElement.value = this.data.message.message;
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onAdd() {
    this.addButton.disabled = true;
    const message: Message = {
      author: this.author.nativeElement.value,
      message: this.message.nativeElement.value,
      notificationId: this.data.notificationId
    };

    this.januszService.addMessage(message).subscribe(res => {
      this.dialogRef.close(true);
    });
  }

  onEdit() {
    this.editButton.disabled = true;
    const message: Message = {
      id: this.data.message.id,
      author: this.author.nativeElement.value,
      message: this.message.nativeElement.value
    };

    this.januszService.editMessage(message).subscribe(res => {
      this.dialogRef.close(true);
    });
  }
}
