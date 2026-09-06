import { Routes } from '@angular/router';
import { Playlist } from './playlist/playlist';
import { Navegador } from './navegador/navegador';

export const routes: Routes = [

  {
    path: 'playlist',
    component: Playlist
  },

  {
    path: 'navegador',
    component: Navegador
  },

  {
    path: '',
    redirectTo: 'playlist',
    pathMatch: 'full'
  }

];