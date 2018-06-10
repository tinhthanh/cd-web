import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ShoppingCartService } from '../../../_services/shopping-cart/shopping-cart.service';
import { Item } from '../../../_models/shopping-cart/item';
import { HttpClient } from '@angular/common/http/';
import { ConfigValue } from '../../../_helpers/config-value';
import { forEach } from '@angular/router/src/utils/collection';
import { AuthenticationService } from '../../../_services/AuthenticationService';
import { User } from '../../../_models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router/';

@Component({
    templateUrl: 'thanh-toan.component.html'
})

export class ThanhToanComponent implements OnInit {
    cart: Item[];
    userCurrent: any;

    constructor(private title: Title, public cartService: ShoppingCartService
        , private http: HttpClient, private config: ConfigValue , private auth: AuthenticationService, private  router: Router) {
        this.title.setTitle('3TPL | Thanh toán');
    }

    ngOnInit() {
        this.auth.refreshToken().subscribe(
            // kiểm tra người dùng đã đăng nhập chưa
            ( data: any) => {
              this.auth.getInformation().subscribe(
                (user: User) => {
                }
              );
            },
            (err: HttpErrorResponse) => {
              if (err.status === 403) {
                console.log('Chưa đăng nhập!');
                 this.router.navigate(['/pages/dang-nhap'], {
                  queryParams: { returnUrl: this.router.routerState.snapshot.url }
                });
              }
            }
          );
        if (this.cartService.getCartCurrent().length === 0) {
           this.router.navigate(['/home/main']);
        }
        this.http.get(this.config.url_port + `/user/info`).subscribe((data: {}) => {
            this.userCurrent = data;
            const tmpCost: Number = this.userCurrent.score;
            this.userCurrent.score = tmpCost;
        });
    }
    public thanhToan() {
        if (this.cartService.getCartCurrent().length !== 0) {
            const bodyRequest: any = [];
            this.cartService.getCartCurrent().forEach(element => {
                bodyRequest.push({
                    courseID: element.id
                });
            });
            this.http.post(this.config.url_port + `/payment/course/register`, bodyRequest).subscribe((data: any) => {
                console.log(data);
                alert('Thanh toán thành công! Hãy truy cập để học ngay!');
                 this.cartService.clearCart();
                  this.router.navigate(['/home/main']);
            });
        }
    }
}
