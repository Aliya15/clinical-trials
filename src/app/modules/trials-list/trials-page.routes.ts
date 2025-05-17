import { Routes } from '@angular/router';
import { TrialsService } from './services/trials.service';

export const trialPageRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./trials-page.component').then(mod => mod.TrialsPageComponent),
    title: 'Trial Studies',
    providers: [TrialsService],
    children: [
      {
        path: 'all',
        loadComponent: () =>
          import('./components/all-trial-list/all-trial-list.component').then(
            mod => mod.AllTrialListComponent
          ),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./components/favorite-trials/favorite-trials.component').then(
            mod => mod.FavoriteTrialsComponent
          ),
      },
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full',
      },
    ],
  },
];
