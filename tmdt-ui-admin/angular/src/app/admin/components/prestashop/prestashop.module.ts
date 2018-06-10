import { DataScrollerModule } from './../../../components/datascroller/datascroller';
import { FieldsetModule } from './../../../components/fieldset/fieldset';
import { CarouselModule } from './../../../components/carousel/carousel';
import { CodeHighlighterModule } from './../../../components/codehighlighter/codehighlighter';
import { TabViewModule } from './../../../components/tabview/tabview';
import { ButtonModule } from './../../../components/button/button';
import { InputTextareaModule } from './../../../components/inputtextarea/inputtextarea';
import { InputTextModule } from './../../../components/inputtext/inputtext';
import { DropdownModule } from './../../../components/dropdown/dropdown';
import { PanelModule } from './../../../components/panel/panel';
import { GrowlModule } from './../../../components/growl/growl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerEditComponent } from './edit-customer/edit-customer.component';

import { PrestashopComponent } from './prestashop.component';
import { MainCustomerComponent } from './main-customer/main-customer.component';
import { PrestashopRoutingModule } from './prestashop-routing.module';
import { NgModule } from '@angular/core';

// edit-component.ts
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
        PrestashopRoutingModule,
        EDIT_CUSTOMER,
        MAIN_CUSTOMER
    ],
    exports: [],
    declarations: [
        MainCustomerComponent,
        PrestashopComponent,
        CustomerEditComponent
    ],
    providers: [],
})
export class PrestashopModule { }
