import { ConfigValue } from 'app/admin/_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'danh-sach-nguoi-dung.component.html'
})

export class DanhSachNguoiDungComponent implements OnInit {
    page = 1 ;
    size = 5 ;
    totalRow = 0;
    listNguoiDung: any = [];
    nguoidung: any = {};
    display = false;
        showDialog() {
            this.display = true;
        }
    constructor( private http: HttpClient ,
     private config: ConfigValue ) { }

    ngOnInit() {
        this.loadingTopic();
    }
    paginate(event) {
        // event.first = Index of the first record
        // event.rows = Number of rows to display in new page
        // event.page = Index of the new page
        // event.pageCount = Total number of pages
        this.size =  event.rows ;
        this.page =  event.page + 1 ;
       this.loadingTopic();
    }
    public loadingTopic(): void  {
 this.http.get(this.config.url_port + `/admin/user_info?page=${this.page}&size=${this.size}`).subscribe(
     ( data: any  ) => {
         this.totalRow = data.numberOfRecord;
         this.listNguoiDung = data.listOfResult ;
     }
 );
    }
    public edit(event) {
         this.display = true;
        console.log(event);
        this.nguoidung =  this.coppyNguoiDung(event);
    }
    public coppyNguoiDung(nguoidung: any) {
        const temp: any  = {} ;
        temp.topicID  = nguoidung.topicID;
        temp.topicName =  nguoidung.topicName ;
        temp.topicDescription = nguoidung.topicDescription ;
        temp.topicStatus = nguoidung.topicStatus ;
        return temp;
    }
    save() {
        const listNguoiDung = [...this.listNguoiDung] ;
        for ( let i = 0 ; i < listNguoiDung.length ; i++) {
            if ( listNguoiDung[i].topicID === this.nguoidung.topicID) {
                listNguoiDung[i] = this.nguoidung;
                console.log('ngon');
            }
        }
        this.listNguoiDung = listNguoiDung;
        this.display = false;
    }
    public xoa(event) {
        console.log(event);
        const listNguoiDung = [...this.listNguoiDung] ;
        for ( let i = 0 ; i < listNguoiDung.length ; i++) {
            if ( listNguoiDung[i].topicID === event.topicID) {
                listNguoiDung.splice(i, 1);
        console.log(event.topicID);
            }
        }
        this.listNguoiDung = listNguoiDung;
    }
}
