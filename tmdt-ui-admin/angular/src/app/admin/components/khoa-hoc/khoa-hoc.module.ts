import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from './../../../components/common/shared';
import { DuyeKhoaHocComponent } from './duyet-khoa-hoc/duyet-khoa-hoc.component';
import { InplaceModule } from './../../../components/inplace/inplace';
import { ConfirmationService } from './../../../components/common/confirmationservice';
import { ConfirmDialogModule } from './../../../components/confirmdialog/confirmdialog';
import { UploadFileService } from './../../_services/upload/UploadFileService';
import { LightboxModule } from './../../../components/lightbox/lightbox';
import { DataListModule } from './../../../components/datalist/datalist';
import { AccordionModule } from './../../../components/accordion/accordion';
import { FieldsetModule } from './../../../components/fieldset/fieldset';
import { ProgressSpinnerModule } from './../../../components/progressspinner/progressspinner';
import { SidebarModule } from './../../../components/sidebar/sidebar';
import { PaginatorModule } from './../../../components/paginator/paginator';
import { DataTableModule } from './../../../components/datatable/datatable';
import { NgModule } from '@angular/core';

import { KhoaHocComponent } from './khoa-hoc.component';
import { ThemKhoaHocComponent } from 'app/admin/components/khoa-hoc/them-khoa-hoc/them-khoa-hoc.component';
import { KhoaHocRoutingModule } from 'app/admin/components/khoa-hoc/khoa-hoc-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrowlModule } from 'app/components/growl/growl';
import { PanelModule } from 'app/components/panel/panel';
import { DropdownModule } from 'app/components/dropdown/dropdown';
import { InputTextModule } from 'app/components/inputtext/inputtext';
import { InputTextareaModule } from 'app/components/inputtextarea/inputtextarea';
import { ButtonModule } from 'app/components/button/button';
import { TabViewModule } from 'app/components/tabview/tabview';
import { CodeHighlighterModule } from 'app/components/codehighlighter/codehighlighter';
import { EditorModule } from 'app/components/editor/editor';
import { FileUploadModule } from 'app/components/fileupload/fileupload';
import { TrangThaiKhoaHocComponent } from 'app/admin/components/khoa-hoc/trang-thai-khoa-hoc/trang-thai-khoa-hoc.component';
import { CapNhatKhoaHocComponent } from 'app/admin/components/khoa-hoc/cap-nhat-khoa-hoc/cap-nhat-khoa-hoc.component';
import { DoiMatKhauComponent } from 'app/admin/components/khoa-hoc/doi-mat-khau/doi-mat-khau.component';
import { DanhSachKhoaHocComponent } from 'app/admin/components/khoa-hoc/danh-sach-khoa-hoc/danh-sach-khoa-hoc.component';
import { AuthorCourseComponent } from '../../components/khoa-hoc/author-course/author-course.component';
import { TreeModule } from 'app/components/tree/tree';
import { ContextMenuModule } from 'app/components/contextmenu/contextmenu';
import { RadioButtonModule } from 'app/components/radiobutton/radiobutton';
import { FormUploadComponent } from 'app/admin/components/khoa-hoc/form-upload/form-upload.component';
import { ThemKhoaHocMoiComponent } from './them-khoa-hoc-moi/them-khoa-hoc-moi.component';
import { QuanLyKhoaHocKhoaHocComponent } from 'app/admin/components/khoa-hoc/quan-ly-khoa-hoc/quan-ly-khoa-hoc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        KhoaHocRoutingModule,
        GrowlModule,
        PanelModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        TabViewModule,
        EditorModule,
        FileUploadModule,
        CodeHighlighterModule,
        DataTableModule,
        PaginatorModule,
        TreeModule,
        ContextMenuModule,
        SidebarModule,
        ProgressSpinnerModule,
        RadioButtonModule,
        FieldsetModule,
        AccordionModule,
        DataListModule,
        LightboxModule,
        ConfirmDialogModule,
        InplaceModule,
        TranslateModule
    ],
    exports: [],
    declarations: [KhoaHocComponent, ThemKhoaHocComponent, TrangThaiKhoaHocComponent, CapNhatKhoaHocComponent, DoiMatKhauComponent
       , DanhSachKhoaHocComponent ,
       AuthorCourseComponent,
       FormUploadComponent,
       ThemKhoaHocMoiComponent,
       QuanLyKhoaHocKhoaHocComponent,
       DuyeKhoaHocComponent
     ],
    providers: [
        ConfirmationService,
        UploadFileService
    ],
})
export class KhoaHocModule {

}
