import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongListComponent } from './song-list/song-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/lobby/-1', pathMatch: 'full' },
  { path: 'lobby/:id', component: SongListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
