import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from './../../../components/progressbar/progressbar';
import { DialogModule } from './../../../components/dialog/dialog';
import { DanhSachChuDeComponent } from './danh-sach-chu-de/danh-sach-chu-de.component';
import { ChuDeComponent } from './chu-de.component';
import { ChuDeRoutingModule } from './chu-de-rouing.module';
import { PaginatorModule } from './../../../components/paginator/paginator';
import { DataTableModule } from './../../../components/datatable/datatable';
import { NgModule } from '@angular/core';


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
import { RadioButtonModule } from 'app/components/radiobutton/radiobutton';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChuDeRoutingModule,
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
        DialogModule,
        ProgressBarModule,
        RadioButtonModule,
        TranslateModule
    ],
    exports: [],
    declarations: [ ChuDeComponent , DanhSachChuDeComponent ],
    providers: [],
})
export class ChuDeModule { }
