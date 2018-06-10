import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from './../../../components/dialog/dialog';
import { DataTableModule } from './../../../components/datatable/datatable';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from './../../../components/paginator/paginator';
import { DanhSachNguoiDungComponent } from './danh-sach-nguoi-dung/danh-sach-nguoi-dung.component';
import { NgModule } from '@angular/core';
import { QuanLyNguoiDungRoutingModule } from 'app/admin/components/quan-ly-nguoi-dung/quan-ly-nguoi-dung-routing.module';
import { ThemNguoiDungComponent } from 'app/admin/components/quan-ly-nguoi-dung/them-nguoi-dung/them-nguoi-dung.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        QuanLyNguoiDungRoutingModule,
        PaginatorModule,
        DataTableModule,
        DialogModule,
    ],
    exports: [],
    declarations: [
        DanhSachNguoiDungComponent,
        ThemNguoiDungComponent
    ],
    providers: [
    ],
})
export class DanhSachNguoiDungModule { }
