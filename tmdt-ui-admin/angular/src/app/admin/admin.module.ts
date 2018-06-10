import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { SharedModule } from './../showcase/shared.module';
import { AuthenticationService } from './_services/AuthenticationService';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { NgModule } from '@angular/core';
import { MenuModule } from 'app/components/menu/menu';


@NgModule({
    imports: [
        AdminRoutingModule,
        MenuModule,
        TranslateModule
        ,
        SharedModule,
    ],
    exports: [TranslateModule],
    declarations: [AdminMainComponent] ,
    providers: [
    ],
})
export class AdminModule {
     constructor(  private translate: TranslateService) {
        translate.onLangChange.subscribe( r => {
            // console.log(r);
            translate.setDefaultLang(r.lang);
                } );
     }
 }
