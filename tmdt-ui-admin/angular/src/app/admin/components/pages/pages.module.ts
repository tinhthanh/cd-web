import { PagesRoutingModule } from './pages-routing.module';
import { DataScrollerModule } from './../../../components/datascroller/datascroller';
import { FieldsetModule } from './../../../components/fieldset/fieldset';
import { CarouselModule } from './../../../components/carousel/carousel';
import { CodeHighlighterModule } from './../../../components/codehighlighter/codehighlighter';
import { TabViewModule } from './../../../components/tabview/tabview';
import { ButtonModule } from './../../../components/button/button';
import { InputTextareaModule } from './../../../components/inputtextarea/inputtextarea';
import { InputTextModule } from './../../../components/inputtext/inputtext';
import { DropdownModule } from './../../../components/dropdown/dropdown';
import { GrowlModule } from './../../../components/growl/growl';
import { PanelModule } from './../../../components/panel/panel';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './../../_services/AuthenticationService';
import { UserService } from './../../_services/user.service';
import { NgModule } from '@angular/core';
import { DangNhapComponent } from '../pages/dang-nhap/dang-nhap.component';
import { PagesComponent } from '../pages/pages.component';
import { ResetDataComponent } from './reset-data/reset-data.component';
const EDIT_CUSTOMER = [
    GrowlModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TabViewModule,
    CodeHighlighterModule
];
const MAIN_CUSTOMER = [
    CarouselModule,
    FieldsetModule,
    DataScrollerModule
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
       PagesRoutingModule,
        EDIT_CUSTOMER,
        MAIN_CUSTOMER
    ],
    declarations: [
        DangNhapComponent,
        PagesComponent,
        ResetDataComponent
    ],
    exports: [],
    providers: [
        UserService,
        AuthenticationService
    ],
})
export class PagesModule { }
