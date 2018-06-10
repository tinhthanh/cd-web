import { User } from './../../../_models/User';
import { AuthenticationService } from './../../../_services/AuthenticationService';
import { ConfigValue } from './../../../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: 'lich-su-giao-dich.component.html'
})
export class LichSuGiaoDichComponent implements OnInit {
  listTransaction: any = [];
  page = 1;
  size = 10;
  total = 0;
  numberOfPage = 0;
  dataPage: any = [];
  loginUser: User;
  hinhThucGiaoDich: any= [];
   transactionID: string = '0';
  constructor(
    private title: Title,
    private http: HttpClient,
    private config: ConfigValue,
    private auth: AuthenticationService
  ) {
    this.title.setTitle('3TPL | Lịch sử giao dịch');
  }

  ngOnInit() {
    this.auth.refreshToken().subscribe(
      // kiểm tra người dùng đã đăng nhập chưa
      (data: any) => {
        this.auth.getInformation().subscribe((user: User) => {
          console.log(user);
          this.loginUser = user;
        });
      }
    );
    this.http.get(this.config.url_port + `/users/list-transaction-form`).subscribe((data: any) => {
      this.hinhThucGiaoDich = data;
      console.log(data);
    });
    this.loadData();
  }

  onChange($event) {
    console.log($event);
    this.size = $event;

    this.loadData();
  }
  public lui() {
    if (this.page !== 1) {
      this.page--;
      this.loadData();
    }
  }
  public next(index) {
    if (index >= 1 && index <= this.numberOfPage) {
      this.page = index;
      this.loadData();
    }
  }
  public toi() {
    if (this.numberOfPage !== this.page) {
      this.page++;
      this.loadData();
    }
  }

  public intnitPage(): any[] {
    const dataPage = [];
    console.log(this.page);
    for (let i = 1; i <= this.numberOfPage; i++) {
      dataPage[i - 1] = i;
    }
    return dataPage;
  }

  public loadData() {
    // tslint:disable-next-line:max-line-length
     if (this.transactionID !== '0') {
        this.abc(this.transactionID);
     } else {
    this.http
      .get(
        `${this.config.url_port}/user/transaction_history?page=${
          this.page
        }&size=${this.size}`
      )
      .subscribe((data: any) => {
        console.log(data);
        this.listTransaction = data.listOfResult;
        this.total = data.numberOfRecord;
        this.numberOfPage = data.numberOfPage;
        this.dataPage = this.intnitPage();
      });
    }
  }
   public hinhThucChange(event: any) {
      this.transactionID = event.target.value;
       this.abc(this.transactionID);

   }
    private  abc(transactionID: string) {
      this.http
      .get(
        `${this.config.url_port}/user/transaction_history/${transactionID}?page=${
          this.page
        }&size=${this.size}`
      )
      .subscribe((data: any) => {
        console.log(data);
        this.listTransaction = data.listOfResult;
        this.total = data.numberOfRecord;
        this.numberOfPage = data.numberOfPage;
        this.dataPage = this.intnitPage();
      });
    }
}
