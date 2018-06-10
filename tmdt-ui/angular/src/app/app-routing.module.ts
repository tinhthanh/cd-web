import { CommentFbComponent } from './view/home/home-bai-hoc/comment-fb/comment-fb.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {
    SimpleLayoutComponent,
    HomeLayoutComponent
  } from './containers';
import { LoginTestComponent } from './login-test/login-test.component';
import { Error404Component } from './error-404/error-404.component';

const routes: Routes = [
  {
    path: '' , redirectTo: 'home/main',
    pathMatch: 'full',
  },
  { path: '', component: HomeLayoutComponent,
   loadChildren: './view/home/home.module#HomeModule'
},
  {
      path: 'pages',
      component: SimpleLayoutComponent,
      loadChildren: './view/pages/pages.module#PagesModule'
  }, {
    path: 'comment-fb',
    component: CommentFbComponent
  },
  {
    path: 'login',
    component: LoginTestComponent
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

