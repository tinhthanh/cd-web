import { Item } from './../../_models/shopping-cart/item';
import { ShoppingCartService } from './../../_services/shopping-cart/shopping-cart.service';
import { ConfigValue } from './../../_helpers/config-value';
import { User } from './../../_models/User';
import { Component, OnInit, HostListener } from '@angular/core';
import { RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/AuthenticationService';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-header',
  templateUrl: 'home-header.component.html',
  // styleUrls: ['home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  isloading = true; // hiệu ứng loading .. pages
  isLogin = false; // kiểm tra người dùng đăng nhập chưa
  // isShow = false;
  effectNavbar = false; // khi lăng chuột xuống menu nhỏ lai
  public megamenu = true; // hien thi menu khi thu nhỏ
  public user: User;
  public listTopic: any = [];
  keySearch: string ;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 500) {
      this.megamenu = false;
    } else {
      this.megamenu = true;
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number > 200) {
      this.effectNavbar = true;
    } else {
      this.effectNavbar = false;
    }
  }
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private http: HttpClient,
    private config: ConfigValue,
    public cartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.refrershToken();
    if (window.innerWidth < 990) {
      this.megamenu = false;
    } else {
      this.megamenu = true;
    }
    this.http
      .get(this.config.url_port + '/users/topic?page=1&size=100')
      .subscribe(
        data => {
          const tmp_data: any = data;
          this.listTopic = tmp_data.listOfResult;
          // console.log(this.listTopic);
          // console.log(
          //   this.listTopic.slice(
          //     this.listTopic.length / 2,
          //     this.listTopic.length
          //   )
          // );
          // console.log(this.listTopic.slice(0, this.listTopic.length / 2));
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.status === 403) {
            console.log('Loi 403');
          }
        }
      );
  }
  public login(): void {
    this.router.navigate(['/pages/dang-nhap'], {
      queryParams: { returnUrl: this.router.routerState.snapshot.url }
    });
  }
  public logout(): void {
    this.auth.logout();
    this.refrershToken();
    this.isloading = true;
    setTimeout(() => {
      this.isloading = false;
    }, 1500);
  }
  public refrershToken(): void {
    this.isloading = true;
    this.auth.refreshToken().subscribe(
      // kiểm tra người dùng đã đăng nhập chưa
      ( data: any) => {
        this.auth.getInformation().subscribe(
          (user: User) => {
            this.user = user;
          }
        );
        this.isLogin = true;
        // this.isloading = false;
        setTimeout(() => {
          this.isloading = false;
        }, 1500);
      },
      (err: HttpErrorResponse) => {
        if (err.status === 403) {
          console.log('Chưa đăng nhập!');
        }
        this.isLogin = false;
        this.isloading = false;
      }
    );
  }
  // xu lý gio hàng
  public deleteItem(id: any) {
    this.cartService.deleteItem(id);
  }
  // tìm kiếm
   public timKiem(event): void {
     if (event.keyCode === 13) {
       this.router.navigate([ '/home/tim-kiem', this.keySearch]);
     }
   }
}
