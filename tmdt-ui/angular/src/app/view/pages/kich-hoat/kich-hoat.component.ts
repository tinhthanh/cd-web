import { HomePagesService } from './../../../_services/HomePagesService';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl , Validators } from '@angular/forms';
@Component({
    templateUrl: 'kich-hoat.component.html'
})
export class KichHoatComponent implements OnInit {
    public quen_mk = false ;
    private obj: any = {} ;
    forgetPass: FormGroup;
    ms: string;
    private key: any = {};
    isloading = false;
    constructor( private router: ActivatedRoute ,
        private routes: Router,
      private serviceHome: HomePagesService
    ) {

        this.forgetPass = new FormGroup({
            passwordnew: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ]),
            passwordconform: new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ])
        },
        this.conformPass
    );

            }
            public conformPass(g: FormGroup) {
                return g.get('passwordnew').value ===  g.get('passwordconform').value
                ? null : {'mismatch': true }
               }
               public forgetPassSubmit() {
                   this.isloading = true;
                   if ( this.forgetPass.valid ) {
                       console.log('ngon');
                       this.obj.newPassword = this.forgetPass.value.passwordnew;
            this.serviceHome.forgetPass(this.obj).subscribe(
            data => {
             console.log(data);
             this.isloading = false;
              this.routes.navigate(['/pages/dang-nhap']);
            },
        (err: HttpErrorResponse ) => {
             if ( err.error instanceof Error ) {
                 this.ms = 'Erro fornt end ';
             } else {
                 if ( err.status === 0 ) {
                     this.ms = 'Bạn chưa kết nối internet';
                 }
                 if ( err.status === 403 ) {
                     this.ms = 'Liên kết này đã hết hạng';
                 }
             }
        }
   );
                   } else {
                       console.log('bit xe')
                   }
               }
    ngOnInit(): void {
        const key  = this.router.snapshot.params['key'];
        console.log(key);
 if ( this.router.snapshot.queryParams['key']) {
      this.key.key  =  this.router.snapshot.queryParams['key'] ;
    this.serviceHome.homeActiveLink( this.key ).subscribe(
        data => {
              this.routes.navigate(['/pages/dang-nhap']);
            console.log(data);
        },
        (err: HttpErrorResponse ) => {
             console.log(err);
        }
   );

   }
   if ( this.router.snapshot.queryParams['key-change']) {
       this.quen_mk = true;
       this.obj.key = this.router.snapshot.queryParams['key-change'] ;
    }
}
}
