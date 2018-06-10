import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages/pages.component';


const routes: Routes = [
  { path: '', component: PagesComponent
, children: [
    {
        path: 'dang-nhap',
        component: DangNhapComponent
    }
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
