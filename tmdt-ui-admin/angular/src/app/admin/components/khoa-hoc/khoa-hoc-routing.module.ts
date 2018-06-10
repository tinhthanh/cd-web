import { QuanLyKhoaHocKhoaHocComponent } from 'app/admin/components/khoa-hoc/quan-ly-khoa-hoc/quan-ly-khoa-hoc.component';
import { DanhSachKhoaHocComponent } from 'app/admin/components/khoa-hoc/danh-sach-khoa-hoc/danh-sach-khoa-hoc.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemKhoaHocComponent } from 'app/admin/components/khoa-hoc/them-khoa-hoc/them-khoa-hoc.component';
import { KhoaHocComponent } from 'app/admin/components/khoa-hoc/khoa-hoc.component';
import { TrangThaiKhoaHocComponent } from 'app/admin/components/khoa-hoc/trang-thai-khoa-hoc/trang-thai-khoa-hoc.component';
import { CapNhatKhoaHocComponent } from 'app/admin/components/khoa-hoc/cap-nhat-khoa-hoc/cap-nhat-khoa-hoc.component';
import { DoiMatKhauComponent } from 'app/admin/components/khoa-hoc/doi-mat-khau/doi-mat-khau.component';
import { AuthorCourseComponent } from 'app/admin/components/khoa-hoc/author-course/author-course.component';
import { ThemKhoaHocMoiComponent } from 'app/admin/components/khoa-hoc/them-khoa-hoc-moi/them-khoa-hoc-moi.component';
import { DuyeKhoaHocComponent } from 'app/admin/components/khoa-hoc/duyet-khoa-hoc/duyet-khoa-hoc.component';
const routes: Routes = [
  {
      path: '' ,
      component:  KhoaHocComponent,
      children: [
        {
          path: 'them-khoa-hoc',
          component: ThemKhoaHocComponent
        }, {
          path: 'trang-thai-khoa-hoc',
          component: TrangThaiKhoaHocComponent
        }, {
          path: 'cap-nhat-khoa-hoc',
          component: CapNhatKhoaHocComponent
        }, {
          path: 'doi-mat-khau',
          component: DoiMatKhauComponent
        },
        {
          path: 'danh-sach-khoa-hoc',
          component: DanhSachKhoaHocComponent
        }, {
          path : 'khoa-hoc-cua-toi',
           component: AuthorCourseComponent
        }, {
          path: 'them-khoa-hoc-moi',
          component: ThemKhoaHocMoiComponent
        } , {
          path : 'quan-ly-khoa-hoc',
          component : QuanLyKhoaHocKhoaHocComponent
        },
        {
          path: 'duyet-khoa-hoc',
          component: DuyeKhoaHocComponent
        }
      ]
    }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhoaHocRoutingModule { }
