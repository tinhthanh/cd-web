import { ConfigValue } from 'app/admin/_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Message } from 'app/components/common/api';
import { Component, OnInit } from '@angular/core';

@Component ({
    templateUrl: 'lich-su-giao-dich-cua-toi.component.html'
})

export class LichSuGiaoDichCuaToiComponent implements OnInit {
    loading = false;
    msgs: Message[] = [];
    totalRow = 0 ; // tổng số row trong database
    page = 0 ; // vi tri trang đang đứng
    size  = 10 ; // số row muốn hiển thị
    public danhSachGiaoDich: any  = [];

    constructor(
        private httpClient: HttpClient,
        private config: ConfigValue,
    ) { }

    ngOnInit() {
        this.getAllTransactionHistory();
     }

    paginate(event) { // sư kiện phân trang
        console.log(event);
        this.page = event.page; // thay đổi vị trí trang đang đứng
        this.size = event.rows;
        this.getAllTransactionHistory();
    }

    getAllTransactionHistory(): void {
        this.loading = true;
        // tslint:disable-next-line:max-line-length
        this.httpClient.get(this.config.url_port + `/user/transaction_history/?page=${this.page + 1}&size=${this.size}`).subscribe( (data: any)  => {
        this.totalRow = data.numberOfRecord;
        this.danhSachGiaoDich = data.listOfResult ;
        this.loading = false;
        console.log(this.danhSachGiaoDich);
        });
    }
}
