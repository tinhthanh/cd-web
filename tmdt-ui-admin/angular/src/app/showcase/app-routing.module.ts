import { AdminDirectComponent } from './../admin/components/admin-direct/admin-direct.component';
import { AuthGuard } from './../admin/_guards/AuthGuard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from '../admin/admin.component';
const routes: Routes = [
    {
       path: 'pages',
       loadChildren: '../admin//components/pages/pages.module#PagesModule'
     },
    {
        path: '', component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: 'admin-direct',
                pathMatch: 'full'
            },
            {
                path: 'admin-direct',
                component: AdminDirectComponent
            },
            {path: 'admin', loadChildren: '../admin/admin.module#AdminModule'},

        ],
        canActivate: [ AuthGuard ]
    },
] ;
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
