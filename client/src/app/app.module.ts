import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BotInfoComponent } from './bot-info/bot-info.component';
import { RedalertComponent } from './redalert/redalert.component';
import { JanuszComponent } from './janusz/janusz.component';
import { BotNavComponent } from './bot-nav/bot-nav.component';
import { ShutdownConfirmationDialogComponent } from './shutdown-confirmation-dialog/shutdown-confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BotInfoComponent,
    RedalertComponent,
    JanuszComponent,
    BotNavComponent,
    ShutdownConfirmationDialogComponent
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ShutdownConfirmationDialogComponent]
})
export class AppModule {}
