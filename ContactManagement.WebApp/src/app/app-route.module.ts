import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppPreloadStrategy } from './app-preload-strategy';

const lazyPath = {
    contact: './contact/contact.module#ContactModule'
};
export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'contact' },
    {
        path: 'contact',
        loadChildren: lazyPath.contact,
        data: { preload: true }
    },
    { path: '**', pathMatch: 'full', redirectTo: 'contact' }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: AppPreloadStrategy
        })
    ],
    exports: [RouterModule],
    providers: [AppPreloadStrategy]
})
export class AppRouteModule { }
