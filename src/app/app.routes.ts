import { type Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./knowledge/knowledge').then((m) => m.KnowledgeHud),
  },
  {
    path: 'example',
    loadComponent: () => import('./example/example').then((m) => m.Example),
  },
  { path: '**', redirectTo: '' },
];
