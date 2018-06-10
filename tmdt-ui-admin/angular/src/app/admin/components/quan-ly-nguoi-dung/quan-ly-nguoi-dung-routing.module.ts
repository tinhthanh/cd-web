import { DanhSachNguoiDungComponent } from './danh-sach-nguoi-dung/danh-sach-nguoi-dung.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemNguoiDungComponent } from 'app/admin/components/quan-ly-nguoi-dung/them-nguoi-dung/them-nguoi-dung.component';

const routes: Routes = [
  { path: 'danh-sach-nguoi-dung', component: DanhSachNguoiDungComponent },
  {
    path: 'them-nguoi-dung', component: ThemNguoiDungComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuanLyNguoiDungRoutingModule { }
