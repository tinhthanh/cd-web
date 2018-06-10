import { ActivatedRoute } from '@angular/router';
import { ConfigValue } from 'app/admin/_helpers/config-value';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Message } from './../../../../components/common/message';
import { Component, OnInit } from '@angular/core';

@Component ({
    templateUrl: 'lich-su-giao-dich.component.html'
})

export class LichSuGiaoDichComponent implements OnInit {
    loading = false;
    msgs: Message[] = [];
    totalRow = 0 ; // tổng số row trong database
    page = 0 ; // vi tri trang đang đứng
    size  = 10 ; // số row muốn hiển thị
    public danhSachGiaoDich: any  = [];
    public user: any;

    constructor(
        private httpClient: HttpClient,
        private config: ConfigValue,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.getUserInfo(params['userID']);
            if (this.user === null) {
                this.loading = false;
                console.log('Người dùng không tồn tại');
            } else {
                this.getAllTransactionHistory(params['userID']);
                console.log('userID: ' + params['userID']);
            }
        });
     }

    paginate(event, userID: String) { // sư kiện phân trang
        console.log(event);
        this.page = event.page; // thay đổi vị trí trang đang đứng
        this.size = event.rows;
        this.getAllTransactionHistory(userID);
    }

    getAllTransactionHistory(userID: String): void {
        // tslint:disable-next-line:max-line-length
        this.loading = true;
        this.httpClient.get(this.config.url_port + `/admin/transaction_history/${userID}/?page=${this.page + 1}&size=${this.size}`).subscribe( (data: any)  => {
        this.totalRow = data.numberOfRecord;
        this.danhSachGiaoDich = data.listOfResult ;
        console.log(this.danhSachGiaoDich);
        });
        this.loading = false;
    }

    getUserInfo(userID: String) {
        this.httpClient.get(this.config.url_port + `/user/info/${userID}`).subscribe(
            (data: any) => {
                this.user = data;
                return this.user;
            }
        );
    }
}
