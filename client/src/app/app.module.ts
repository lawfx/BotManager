import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BotInfoComponent } from './bot-info/bot-info.component';
import { RedalertComponent } from './redalert/redalert.component';
import { JanuszComponent } from './janusz/janusz.component';
import { BotNavComponent } from './bot-nav/bot-nav.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { JanuszNotificationsComponent } from './janusz-notifications/janusz-notifications.component';
import { JanuszNotificationDialogComponent } from './janusz-notification-dialog/janusz-notification-dialog.component';
import { JanuszMessageDialogComponent } from './janusz-message-dialog/janusz-message-dialog.component';
import { JanuszHolidaysComponent } from './janusz-holidays/janusz-holidays.component';

@NgModule({
  declarations: [
    AppComponent,
    BotInfoComponent,
    RedalertComponent,
    JanuszComponent,
    BotNavComponent,
    ConfirmationDialogComponent,
    JanuszNotificationsComponent,
    JanuszNotificationDialogComponent,
    JanuszMessageDialogComponent,
    JanuszHolidaysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ToastrModule.forRoot({
      timeOut: 3000
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent,
    JanuszNotificationDialogComponent,
    JanuszMessageDialogComponent
  ]
})
export class AppModule {}
