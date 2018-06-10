import { ThongKeDiemNguoiDungComponent } from './thong-ke-diem-nguoi-dung/thong-ke-diem-nguoi-dung.component';
import { ThongKeDoanhThuTheoTuanComponent } from './thong-ke-doanh-thu-theo-tuan/thong-ke-doanh-thu-theo-tuan.component';
import { ThongKeLuocMuaKhoaHocComponent } from './thong-ke-luoc-mua-khoa-hoc/thong-ke-luoc-mua-khoa-hoc.component';
import { ThongKeChuDeTheoLuocXemComponent
} from 'app/admin/components/thong-ke/thong-ke-chu-de-theo-luoc-xem/thong-ke-chu-de-theo-luoc-xem.component';
import { ThongKeTheoChuDeComponent } from './thong-ke-theo-chu-de/thong-ke-theo-chu-de.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThongKeDanhThuComponent } from 'app/admin/components/thong-ke/thong-ke-danh-thu/thong-ke-danh-thu.component';
import { ThongKeLuocXemKhoaHocComponent
 } from 'app/admin/components/thong-ke/thong-ke-luoc-xem-khoa-hoc/thong-ke-luoc-xem-khoa-hoc.component';
const routes: Routes = [
  {
    path: 'thong-ke-theo-chu-de',
    component:  ThongKeTheoChuDeComponent
  }, {
    path: 'thong-ke-chu-de-theo-luoc-xem',
    component: ThongKeChuDeTheoLuocXemComponent
  }, {
    path: 'thong-ke-theo-danh-thu',
    component: ThongKeDanhThuComponent
  }, {
    path: 'thong-ke-luoc-mua-khoa-hoc',
    component: ThongKeLuocMuaKhoaHocComponent
  },
  {
    path: 'thong-ke-luoc-xem-khoa-hoc',
    component: ThongKeLuocXemKhoaHocComponent
  }, {
    path: 'thong-ke-doanh-thu-theo-tuan',
    component: ThongKeDoanhThuTheoTuanComponent
  }, {
    path: 'thong-ke-diem-nguoi-dung',
    component: ThongKeDiemNguoiDungComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongKeRoutingModule { }
