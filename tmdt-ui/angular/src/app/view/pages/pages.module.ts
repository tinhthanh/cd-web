import { HomePagesService } from './../../_services/HomePagesService';
import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { DangKyComponent } from './dang-ky/dang-ky.component';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
import { QuenMatKhauComponent } from './quen-mat-khau/quen-mat-khau.component';
import { DoiMatKhauComponent } from './doi-mat-khau/doi-mat-khau.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KichHoatComponent } from './kich-hoat/kich-hoat.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        PagesRoutingModule
    ],
    exports: [],
    declarations: [
        KichHoatComponent,
        DangKyComponent,
        DangNhapComponent,
        QuenMatKhauComponent,
        DoiMatKhauComponent
    ],
    providers: [
        HomePagesService
    ],
})
export class PagesModule { }
