import { Message } from './../../../../components/common/message';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'main-customer.component.html',
    styles: [`
    .ui-grid-row {
        text-align: center;
    }
    .ui-grid {
        margin: 10px 0px;
    }
    .ui-grid-row > div {
        padding: 4px 10px;
    }
`]
})

export class MainCustomerComponent implements OnInit {
    ds_kh_show  = false;
        carts: any = [];
        msgs: Message[];
      public  sl_don_hang = 0 ;
      public  sl_khach_hang = 0 ;
      public  sl_san_pham = 0 ;
      public ds_khach_hang: any = [];
      public  ds_san_pham: any  = [];
    constructor(private http: HttpClient) { }
    ngOnInit() {
        this.msgs = [];
        this.http.get('http://localhost:8087/api/danh-sach-don-hang').subscribe(
            data => {
                let obj: any = {} ;
                obj = data;
                this.carts = obj.orders ;
                this.sl_don_hang = this.carts.length;
                console.log(this.carts);
            }
        );
        this.http.get('http://localhost:8087/api/danh-sach-san-pham').subscribe(
            data => {
                let obj: any = {} ;
                obj = data;
                this.ds_san_pham = obj.products ;
                this.sl_san_pham = this.ds_san_pham.length;
                console.log(data);
            }
        );
        this.http.get('http://localhost:8087/api/danh-sach-khach-hang').subscribe(
            data => {
                let obj: any = {} ;
                obj = data;
               // this.carts = obj.orders ;
               this.ds_khach_hang = obj.customers;
               this.sl_khach_hang = this.ds_khach_hang.length;
               console.log(this.ds_khach_hang.length);
                console.log(this.ds_khach_hang);
            }
        );
    }
    selectCar(carts: any) {
        this.msgs = [];
        let body = ' ';
        let details: any = [] ;
        details = carts.associations.order_rows;
         for ( let  i = 0; i < details.length ; i++ ) {
             body +=  + '<tr>'
             + ' <td> ' + details[i].product_name + '</td>'
              + '<td> ' + details[i].product_price + '</td>'
             +  '<td> ' + details[i].product_quantity + '</td>'
            + '</tr>';
         }
         const table = '<table style="width:100%">'
         + '<tr>'
          + ' <th>Tên sản phẩm  </th>'
           + '<th> Giá  </th> '
          + '<th> Số lương </th>'
         + '</tr>'
         + body
       + '</table>';
        this.msgs.push({severity: 'info', summary: 'Thông tin đơn hàng ', detail: table });
    }
}
