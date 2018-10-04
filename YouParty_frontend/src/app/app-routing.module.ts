import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { SongListComponent } from './song-list/song-list.component';

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'lobby/:id', component: SongListComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }