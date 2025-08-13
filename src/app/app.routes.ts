import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './pages/home/home';
import { InchoneFlight } from './pages/inchone-flight/inchone-flight';
import { CivilDefenseShelter } from './pages/civil-defense-shelter/civil-defense-shelter';
import { BusTraffic } from './pages/bus-traffic/bus-traffic'
import { NetflixFavorite } from './pages/netflix-favorite/netflix-favorite'

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
        { path: '', component: Home },
        { path: 'pages/flight', component: InchoneFlight },
        { path: 'pages/civil', component: CivilDefenseShelter },
        { path: 'pages/bus', component: BusTraffic },
        { path: 'pages/netflix', component: NetflixFavorite },
        // { path: 'pages/', component: }
    ]
  }
];
