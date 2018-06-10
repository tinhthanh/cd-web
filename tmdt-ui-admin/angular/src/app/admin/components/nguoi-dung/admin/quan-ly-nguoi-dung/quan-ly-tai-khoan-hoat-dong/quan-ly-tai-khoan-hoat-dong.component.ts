import { filter } from 'rxjs/operator/filter';
import { Role } from './../../../../../_models/Role';
import { Message } from './../../../../../../components/common/message';
import { ConfirmationService } from './../../../../../../components/common/confirmationservice';
import { UserInfo } from './../../../../../_models/json/UserInfo';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigValue } from 'app/admin/_helpers/config-value';
import { Router } from '@angular/router';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
    templateUrl: 'quan-ly-tai-khoan-hoat-dong.component.html'
})

export class QuanLyTaiKhoanHoatDongComponent implements OnInit {
    page = 0 ;
    size = 2;
    total = 0 ;
    listUser: UserInfo[];
    msgs: Message[] = [];
    userform: FormGroup;
    selectUser: any = {};
    displayEditUser = false;
    submitted = false;
    url_upload: string;
    url_img_upload: string;
    uploadImgProress = false;
    isNapTien = false;
    isThemQuyen = false;
    soTien = 0 ;
    roles: Role[];
    selectRoles: Role[] = [];
    constructor(
        private config: ConfigValue ,
        private http: HttpClient,
        private router: Router,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder
    ) { }
    ngOnInit() {
        this.url_upload = this.config.url_port;
        this.url_img_upload = 'http://www.freeiconspng.com/uploads/face-avatar-png-14.png';
        this.loadingListUser();
        // role
        this.roles = [];
        const role_admin = new Role();
        role_admin.roleID  = 1 ;
        role_admin.roleName =  'ROLE_USER' ;
        const role_user = new Role();
        role_user.roleID = 2;
        role_user.roleName = 'ROLE_ADMIN' ;
        this.roles.push(role_admin);
        this.roles.push(role_user);
        // end role
    }
    public inintFormUser( user: UserInfo ): void {
        this.url_img_upload = user.avatar;
       console.log(user);
        const userfrom = this.fb.group({
            userName: new FormControl(user.userName ? user.userName : '', Validators.required),
            phoneNumber: new FormControl(user.phoneNumber ? user.phoneNumber : '' , Validators.required),
            address: new FormControl(user.address ? user.address : '' , Validators.required),
        });
        this.userform  = userfrom;
    }
    progressUp($event) {
        this.uploadImgProress = true;
        console.log($event);
    }
    erroUpload($event) {
        alert('thử lại');
        if ($event.xhr.status === 401) {
            console.log(' token hết hạng ');
        }
    }
    onBasicUploadAuto($event) {
        const response = JSON.parse($event.xhr.response);
        const obj = response;
        const auth = JSON.parse(obj[0].fileProperties);
        const url = `https://drive.google.com/uc?id=${auth.id}`;
        this.url_img_upload = url;
        this.uploadImgProress = false;
    }
    showDialog() {
        this.displayEditUser = true;
    }
    thaoTacChinhSua($event) {

        this.selectUser = $event;
        this.inintFormUser(this.selectUser);
        this.displayEditUser = true;
    }
    public clickNapTien($event) {
        this.selectUser = $event ;
        this.soTien = this.selectUser.score ;
        this.isNapTien = true ;
    }
    public napTien() {
        // nạp tiền
 const listUser = [...this.listUser];
 console.log(listUser);
 for ( let i = 0 ; i < listUser.length ; i++) {
     if ( listUser[i].userID === this.selectUser.userID ) {
         listUser[i].score  = this.soTien ;
     }
 }
 this.listUser = listUser ;
this.soTien = 0 ;
this.isNapTien = false;
    }
    public clickThemQuen($event) {
        const selectRoles: Role[] = [];
        this.selectUser = $event;
        for ( let i = 0 ; i < this.roles.length  ; i++) {
            const temp  = $event.permission.filter( role =>  {
                return this.roles[i].roleID === role.roleID ;
            });
            if ( !temp.length) {
                 selectRoles.push(this.roles[i]);
            }
        }
        this.selectRoles = selectRoles;
        this.isThemQuyen = true;
    }
    public themQuyen($event): void {
        const roleDeleteting: any = {};
        roleDeleteting.userID = this.selectUser.userID;
    this.http.post(this.config.url_port + '/admin/access_role' , roleDeleteting  ).subscribe( (data: any ) => {
        console.log('xoa thanh cong');
        const listUser = [...this.listUser];
        for ( let i = 0 ; i < listUser.length ; i++) {
           if ( listUser[i].userID === this.selectUser.userID ) {
               listUser[i].permission.push($event);

           }
       }
       this.listUser = listUser ;
        this.isThemQuyen = false;
        this.msgs = [{severity: 'info', summary: 'success', detail: 'Thêm thành công'}];
    });
    }
    public xoaQuyen( $role , $user ) {
        if ($role.roleID   === 1 ) {
            this.msgs = [{severity: 'error', summary: 'success', detail: ' Không thể xóa quyền User'}];
        } else {
            const selectUser = $user;
            for ( let i = 0 ; i < selectUser.permission.length ; i++) {
                if ( $role.roleID  === selectUser.permission[i].roleID ) {
                     this.http.delete(this.config.url_port + '/admin/access_role?userID=' + selectUser.userID ).subscribe( (data: any ) => {
            console.log('xoa thanh cong');
            selectUser.permission.splice(i, 1);
           this.msgs = [{severity: 'info', summary: 'success', detail: ' Xóa thành công'}];
        });
                }
            }
            this.selectUser = selectUser ;
           //  console.log($user.permission);
           const listUser = [...this.listUser];
            for ( let i = 0 ; i < listUser.length ; i++) {
               if ( listUser[i].userID === $user.userID ) {
                   listUser[i] = this.selectUser;
               }
           }
           this.listUser = listUser ;

        }
    }
    public loadingListUser(): void {
        this.http.get( `${this.config.url_port}/admin/user_info?page=${this.page + 1}&size=${this.size}`).subscribe( (data: any) => {
            this.total = data.numberOfRecord;
            this.listUser = data.listOfResult ;
            console.log(this.listUser);
        });
    }
    onSubmit() {
        this.submitted = true;
        // console.log(this.userform.value);
        const editUser: any = {} ;
        editUser.address = this.userform.value.address ;
        editUser.avatar = this.url_img_upload ;
        editUser.phoneNumber = this.userform.value.phoneNumber ;
        editUser.userID = this.selectUser.userID ;
        editUser.userName = this.userform.value.userName ;
        this.http.patch(`${this.config.url_port}/admin/user_info`, editUser).subscribe(
            (data: any) => {
                const listUser = [...this.listUser] ;
                for ( let i = 0  ; i < listUser.length ; i++) {
                    // console.log(listUser[i].userID);
                    // console.log(data.userID);
                    if ( listUser[i].userID === data.userID ) {
                        listUser[i] = data;
                    }
                }
                this.listUser = listUser ;
                // console.log(data);
                this.submitted = false ;
                this.displayEditUser = false;
                this.msgs = [{severity: 'info', summary: 'success', detail: 'Thành công'}];
            }, ( err: HttpErrorResponse) => {
                this.displayEditUser = false;
                this.submitted = false;
                this.msgs = [{severity: 'error', summary: 'erro', detail: 'Thất bại'}];
            }
        );
    }
  public  thaoTacMoKhoa($event) {
        this.confirmationService.confirm({
            message: 'Bạn có muốn khóa tài khoản này',
            header: 'Xác nhận khóa',
            icon: 'fa fa-lock',
            accept: () => {
                this.http.delete(this.config.url_port + '/users/follow/' + $event.courseID ).subscribe( ( data: any ) => {
                    // console.log(data);
                    const listUser   = [...this.listUser];
                    for ( let i = 0  ; i < listUser.length ; i++  ) {
                        if ( listUser[i].userID === $event.userID) {
                            listUser.splice(i, 1);
                        }
                    }
                    this.listUser = listUser ;
                }, ( err: HttpErrorResponse) => {
                    console.log(' mỡ khóa không thành công');
                });
            },
            reject: () => {
                this.msgs = [{severity: 'info', summary: 'success', detail: 'Thành công'}];
            }
        });
        }
        // {
        //     "address": "",
        //     "avatar": "",
        //     "phoneNumber": "",
        //     "userID": "",
        //     "userName": ""
        //   }

    paginate(event) { // sư kiện phân trang
        console.log(event);
        this.page = event.page; // thay đổi vị trí trang đang đứng
        this.size = event.rows;
        this.loadingListUser();
    }
}
