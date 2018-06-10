import swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http/';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigValue } from '../../../_helpers/config-value';

@Component({
  templateUrl: 'nap-the.component.html'
})
export class NapTheComponent implements OnInit {
  paymentId: any;
  token: any;
  payerID: any;
  money: number = 0 ;
  userInfo: any;
  score = 0;
  moneyUSD: number= 0;
  oneAtATime: boolean = true;
  submitted: boolean = false;
  VND_USD_val:  number = 0;
  constructor(
    private title: Title,
    private activeRouter: ActivatedRoute,
    private http: HttpClient,
    private config: ConfigValue,
    private router: Router
  ) {
    this.title.setTitle('3TPL | Nạp tiền');
  }

  ngOnInit() {
    this.updateDoiDiem();
    // lấy thông tin người dùng đang đăng nhập
    this.http.get(this.config.url_port + `/user/info`).subscribe(
      (data: any) => {
        this.userInfo = data;
      },
      (err: HttpErrorResponse) => {
        this.router.navigate(['/pages/dang-nhap'], {
          queryParams: { returnUrl: this.router.routerState.snapshot.url }
        });
      }
    );
    this.paymentId =
      this.activeRouter.snapshot.queryParams['paymentId'] || null;
    this.token = this.activeRouter.snapshot.queryParams['token'] || null;
    this.payerID = this.activeRouter.snapshot.queryParams['PayerID'] || null;
    if (this.payerID && this.token && this.paymentId) {
      // alert(this.payerID + '\n' + this.token + '\n' + this.payerID);
      // tslint:disable-next-line:max-line-length
      this.http
        .get(
          this.config.url_port +
            `/pay/success?paymentId=${this.paymentId}&token=${
              this.token
            }&PayerID=${this.payerID}`
        )
        .subscribe((data: any) => {
          console.log(data);
          // alert(`Bạn đã nạp thành công ${data.total} vào tài khoản!`);
          swal({
            text: `Bạn đã nạp ${data.score} điểm thành công vào tài khoản!`,
            type: 'success',
            showConfirmButton: true
          });
        }, (err: HttpErrorResponse) => {
          // alert(`Bạn cần nhập số tiền cần nạp!`);
          swal({
            title: 'Bạn cần nhập số tiền cần nạp!',
            type: 'warning',
            showConfirmButton: true
          });
        });
    } else if (this.token && !this.payerID && !this.payerID) {
      this.http
        .get(this.config.url_port + `/pay/success?token=${this.token}`)
        .subscribe((data: any) => {
          console.log(data);
          alert('Nạp tiền thất bại!');
        });
    }
  }
  public  napTien() {

    if (!this.money  ||  this.money < 20000) {
      swal({
        title: 'Số tiền tối thiểu là 20.000đ cho một lần nạp!',
        type: 'warning',
        showConfirmButton: true
      });
    } else {
      this.http.get(this.config.url_port + `/users/currencyconverterapi/VND/USD`).subscribe((data: any) => {
        this.moneyUSD = data.val  *  this.money;
        this.VND_USD_val =  data.val *  10000;
        this.score = Math.floor(this.money / 1000);
        // nap tien
        this.submitted = true;
      let  tmpMoney: any = {
        payDecription: 'Nạp tiền',
        total: this.money
      };
       console.log(tmpMoney);
      this.http
        .post(this.config.url_port + `/pay`, tmpMoney)
        .subscribe((data: any) => {
          window.location.href = data.message;
        });
      });


    }
  }
  public  updateDoiDiem(): void {
      this.http.get(this.config.url_port + `/users/currencyconverterapi/VND/USD`).subscribe((data: any) => {
        this.moneyUSD = data.val  *  this.money;
        this.VND_USD_val =  data.val *  10000;
        this.score = Math.floor(this.money / 1000);
      });
  }
}
