import { SelectorComponent } from './selector/selector.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongListComponent } from './song-list/song-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/select', pathMatch: 'full' },
  { path: 'select', component: SelectorComponent },
  { path: 'lobby/:id', component: SongListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
