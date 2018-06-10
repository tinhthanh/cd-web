import { DialogModule } from './../../../components/dialog/dialog';
import { PaginatorModule } from './../../../components/paginator/paginator';
import { DataTableModule } from './../../../components/datatable/datatable';
import { CodeHighlighterModule } from './../../../components/codehighlighter/codehighlighter';
import { FileUploadModule } from './../../../components/fileupload/fileupload';
import { EditorModule } from './../../../components/editor/editor';
import { TabViewModule } from './../../../components/tabview/tabview';
import { ButtonModule } from './../../../components/button/button';
import { InputTextareaModule } from './../../../components/inputtextarea/inputtextarea';
import { InputTextModule } from './../../../components/inputtext/inputtext';
import { DropdownModule } from './../../../components/dropdown/dropdown';
import { PanelModule } from './../../../components/panel/panel';
import { GrowlModule } from './../../../components/growl/growl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MauDemoRoutingModule } from '../mau-demo/mau-demo-routing.module';
import { MauDemoComponent } from '../mau-demo/mau-demo.component';
import { MauDemoTopicComponent } from 'app/admin/components/mau-demo/mau-demo-topic/mau-demo-topic.component';

@NgModule({
    imports: [
        MauDemoRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
        DialogModule
    ],
    exports: [],
    declarations: [
        MauDemoComponent,
        MauDemoTopicComponent
    ],
    providers: [],
})
export class MauDemoModule { }
