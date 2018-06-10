import { DanhSachChuDeComponent } from './danh-sach-chu-de/danh-sach-chu-de.component';
import { ChuDeComponent } from './chu-de.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '' ,
      component:  ChuDeComponent,
      children: [
        {
          path: 'danh-sach-chu-de',
          component: DanhSachChuDeComponent
        }
      ]
    }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChuDeRoutingModule { }