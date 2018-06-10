import { TranslateModule } from '@ngx-translate/core';
import { KhoaHocDaDangComponent } from './khoa-hoc-da-dang/khoa-hoc-da-dang.component';
import { LichSuGiaoDichCuaToiComponent } from './lich-su-giao-dich-cua-toi/lich-su-giao-dich-cua-toi.component';
import { DanhSachLichSuGiaoDichComponent } from './danh-sach-lich-su-giao-dich/danh-sach-lich-su-giao-dich.component';
import { BinhLuanComponent } from './binh-luan/binh-luan.component';
import { SafePipe } from './../../_Pipe/SafePipe';
import { InputTextModule } from 'app/components/inputtext/inputtext';
import { FormUploadComponent } from 'app/admin/components/khoa-hoc/form-upload/form-upload.component';
import { FileUploadModule } from './../../../components/fileupload/fileupload';
import { SidebarModule } from './../../../components/sidebar/sidebar';
import { TreeModule } from './../../../components/tree/tree';
import { KhoaHocDaMuaComponent } from './khoa-hoc-da-mua/khoa-hoc-da-mua.component';
import { FieldsetModule } from './../../../components/fieldset/fieldset';
import { ConfirmationService } from './../../../components/common/confirmationservice';
import { ConfirmDialogModule } from './../../../components/confirmdialog/confirmdialog';
import { ProgressBarModule } from './../../../components/progressbar/progressbar';
import { ButtonModule } from 'app/components/button/button';
import { EditorModule } from 'app/components/editor/editor';
import { MultiSelectModule } from './../../../components/multiselect/multiselect';
import { DialogModule } from './../../../components/dialog/dialog';
import { DataTableModule } from './../../../components/datatable/datatable';
import { PaginatorModule } from './../../../components/paginator/paginator';
import { NgModule } from '@angular/core';
import { NguoiDungComponent } from 'app/admin/components/nguoi-dung/nguoi-dung.component';
import { DanhSachNguoiDungComponent } from 'app/admin/components/nguoi-dung/danh-dach-nguoi-dung/danh-sach-nguoi-dung.component';
import { CommonModule } from '@angular/common';
import { NguoiDungRoutingModule } from 'app/admin/components/nguoi-dung/nguoi-dung-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrowlModule } from 'app/components/growl/growl';
import { DangKyXemSauComponent } from 'app/admin/components/nguoi-dung/dang-ky-xem-sau/dang-ky-xem-sau.component';
import { InplaceModule } from 'app/components/inplace/inplace';
import { KhoaHocDaMuaChiTietComponent } from '../nguoi-dung/khoa-hoc-da-mua/khoa-hoc-da-mua-chi-tiet/khoa-hoc-da-mua-chi-tiet.component';
import { ProgressSpinnerModule } from 'app/components/progressspinner/progressspinner';
import { PanelModule } from 'app/components/panel/panel';
import { RadioButtonModule } from 'app/components/radiobutton/radiobutton';
import { LichSuGiaoDichComponent } from 'app/admin/components/nguoi-dung/lich-su-giao-dich/lich-su-giao-dich.component';
import { QuanLyNguoiDungComponent } from './admin/quan-ly-nguoi-dung/quan-ly-nguoi-dung.component';
import { QuanLyTaiKhoanBiKhoaComponent } from './admin/quan-ly-nguoi-dung/quan-ly-tai-khoan-bi-khoa/quan-ly-tai-khoan-bi-khoa.component';
import {
  QuanLyTaiKhoanHoatDongComponent } from './admin/quan-ly-nguoi-dung/quan-ly-tai-khoan-hoat-dong/quan-ly-tai-khoan-hoat-dong.component';

@NgModule({
  imports: [
    PaginatorModule,
    DataTableModule,
    DialogModule,
    NguoiDungRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    , MultiSelectModule,
    EditorModule,
    ButtonModule,
    GrowlModule,
    InputTextModule,
    ProgressBarModule,
    ConfirmDialogModule,
    InplaceModule,
    FieldsetModule,
    ProgressSpinnerModule,
    TreeModule,
    SidebarModule,
    FileUploadModule,
    PanelModule,
    RadioButtonModule,
    TranslateModule
  ],
  exports: [],
  declarations: [DanhSachNguoiDungComponent, NguoiDungComponent,
  DangKyXemSauComponent,
  KhoaHocDaMuaComponent,
  KhoaHocDaMuaChiTietComponent,
  SafePipe,
  LichSuGiaoDichComponent,
  DanhSachLichSuGiaoDichComponent,
  BinhLuanComponent,
  LichSuGiaoDichCuaToiComponent,
  QuanLyNguoiDungComponent,
  QuanLyTaiKhoanBiKhoaComponent,
  QuanLyTaiKhoanHoatDongComponent,
  KhoaHocDaDangComponent
  ],
  providers: [
    ConfirmationService,
  ],
})
export class NguoiDungModule { }
