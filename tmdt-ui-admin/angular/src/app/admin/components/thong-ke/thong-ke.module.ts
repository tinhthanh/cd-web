import { ChartModule } from './../../../components/chart/chart';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThongKeRoutingModule } from './thong-ke-routing.module';
import { ThongKeTheoChuDeComponent } from './thong-ke-theo-chu-de/thong-ke-theo-chu-de.component';
import { ThongKeChuDeTheoLuocXemComponent
 } from 'app/admin/components/thong-ke/thong-ke-chu-de-theo-luoc-xem/thong-ke-chu-de-theo-luoc-xem.component';
import { ThongKeDanhThuComponent } from './thong-ke-danh-thu/thong-ke-danh-thu.component';
import { ThongKeLuocMuaKhoaHocComponent } from './thong-ke-luoc-mua-khoa-hoc/thong-ke-luoc-mua-khoa-hoc.component';
import { ThongKeLuocXemKhoaHocComponent } from './thong-ke-luoc-xem-khoa-hoc/thong-ke-luoc-xem-khoa-hoc.component';
import { ThongKeDoanhThuTheoTuanComponent } from './thong-ke-doanh-thu-theo-tuan/thong-ke-doanh-thu-theo-tuan.component';
import { ThongKeDiemNguoiDungComponent } from './thong-ke-diem-nguoi-dung/thong-ke-diem-nguoi-dung.component';


@NgModule({
  imports: [
    CommonModule,
    ThongKeRoutingModule,
    ChartModule
  ],
  declarations: [ThongKeTheoChuDeComponent,
    ThongKeTheoChuDeComponent,
    ThongKeChuDeTheoLuocXemComponent,
    ThongKeDanhThuComponent,
    ThongKeLuocMuaKhoaHocComponent,
    ThongKeLuocXemKhoaHocComponent,
    ThongKeDoanhThuTheoTuanComponent,
    ThongKeDiemNguoiDungComponent
  ]
})
export class ThongKeModule { }
