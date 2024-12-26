import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'app',
        loadComponent: () => import('./shared/layout/layout.component'),
        children: [
            {
                path: '',
                loadComponent: () => import('./shared/content/content.component'),
            },
            {
                path: 'search',
                loadComponent: () => import('./components/search-list/search-list.component'),
            },
            {
                path: 'details/:id',
                loadComponent: () => import('./shared/details/details.component'),
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'app'
            }
        ]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'app'
    },
    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found.component'),
    },
];
