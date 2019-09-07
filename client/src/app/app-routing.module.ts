import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedalertComponent } from './redalert/redalert.component';
import { JanuszComponent } from './janusz/janusz.component';

const routes: Routes = [
  { path: 'redalert', component: RedalertComponent },
  { path: 'janusz', component: JanuszComponent },
  { path: '**', redirectTo: '/redalert' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
