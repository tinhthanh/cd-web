import { MenuItem } from './../components/common/menuitem';
import { MenuModule } from 'app/components/menu/menu';

import { User } from './_models/User';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/admin/_services/AuthenticationService';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css']
})

export class AdminComponent implements OnInit {
    public user: User;
    activeMenuId = '';
    menuActive: boolean;
    development = false;
    isAdmin = false ;
    isUser = false;
    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private translate: TranslateService ) {
            translate.setDefaultLang('en');
        
         }
         switchLanguage(language: string) {
            this.translate.use(language);
          }
    ngOnInit() {
 this.auth.getInformation().subscribe(data => {
    console.log(data);
    const permission =  data.permission;
    for ( let i = 0 ; i < permission.length ; i++ ) {
        if ( permission[i].roleName  === 'ROLE_ADMIN') {
            this.isAdmin = true ;
            // alert('admin');
        }
        if ( permission[i].roleName  === 'ROLE_USER') {
            this.isUser = true ;
          //  alert('user');
        }
    }
     this.user =  data;
    }, (err: HttpErrorResponse) => {
        if ( err.status  === 403 ) {
            console.log('tài khoãn không chính xác');
        }
        if ( err.status === 401 ) {
             console.log(' token hết hạng');
        }
        this.router.navigate(['/pages/dang-nhap']);
    });
    }
    public logout(): void {
        this.auth.logout();
        this.router.navigate(['/pages/dang-nhap']);
    }
    onMenuButtonClick(event: Event) {
        this.menuActive = !this.menuActive;
        event.preventDefault();
    }
}
