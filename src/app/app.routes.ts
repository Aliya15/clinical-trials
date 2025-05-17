import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'trial-studies',
    loadChildren: () =>
      import('./modules/trials-list/trials-page.routes').then(
        m => m.trialPageRoutes
      ),
  },
  {
    path: '',
    redirectTo: 'trial-studies',
    pathMatch: 'full',
  },
];
