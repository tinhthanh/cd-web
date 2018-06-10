import { User } from './../../../_models/User';
import { AuthenticationService } from './../../../_services/AuthenticationService';
import { HttpErrorResponse } from '@angular/common/http';
import { ShoppingCartService } from './../../../_services/shopping-cart/shopping-cart.service';
import { Item } from './../../../_models/shopping-cart/item';
import { Topic } from './../../../_models/Topic';
import { OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigValue } from './../../../_helpers/config-value';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  Title,
  SafeResourceUrl,
  DomSanitizer
} from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'khoa-hoc-chi-tiet.component.html'
})
export class KhoaHocChiTietComponent implements OnInit, OnDestroy {
  item = new Item();
  private sub: any;
  public courseItem: any = {};
  public author: any = {};
  public topic: any = {};
  public listCourseRelationship: any = [];
  public listChapter: any = [];
  firstLessonInCourse: any;
  isRegisted = false;
  numberUserInCourse = 0;
  private reloadPageWhenIDChange(idCourse: string): void {
     this.http.get(`${this.config.url_port}/users/count-number-user-in-course/${idCourse}`).subscribe((data:  any) => {
           this.numberUserInCourse =  data.number_user ;
     });
    // kiểm tra đã đăng ký khóa học hay chưa
    this.http
      .get(`${this.config.url_port}/user/is-registed/${idCourse}`)
      .subscribe(
        (data: any) => {
          this.isRegisted = data.success === 1;
        },
        (err: HttpErrorResponse) => {
          this.isRegisted = false;
        }
      );

    // tslint:disable-next-line:no-var-keyword
    this.http.get(this.config.url_port + `/users/course/${idCourse}`).subscribe(
      data => {
        this.courseItem = data;
        const authorID = this.courseItem.author.userID;
        this.topic = this.courseItem.topic;
        // lấy thông tin author

        // xu lý giỏ hàng
        this.item.id = this.courseItem.courseID;
        if (this.courseItem.courseTitle.length < 25) {
          this.item.name = this.courseItem.courseTitle;
        } else {
          this.item.name =
            this.courseItem.courseTitle.substring(0, 25) + ' ...';
        }
        this.item.count = 1;
        this.item.image = this.courseItem.courseAvatar;
        this.item.price = this.courseItem.price;
        console.log(this.item);
        // xư lý giỏ hàng

        this.http
          .get(this.config.url_port + `/users/course/author/${authorID}`)
          .subscribe(dataAuthor => {
            this.author = dataAuthor;
            // console.log(this.author);
          });
        // lây thông tin khóa học liên quan
        this.http
          .get(
            this.config.url_port +
              `/users/course/${
                this.courseItem.courseID
              }/relationship?page=1&size=100`
          )
          .subscribe((dataCourseRelationship: any) => {
            this.listCourseRelationship = dataCourseRelationship.listOfResult;
          });
      },
      (err: HttpErrorResponse) => {
        this.router.navigate(['/pages/error-404']);
      }
    );

    this.http
      .get(this.config.url_port + `/users/course/${idCourse}/chapter`)
      .subscribe((data: any) => {
        this.listChapter = data;
      });
    // lấy thông tin bài học đầu tiên của khóa học
    this.http
      .get(
        this.config.url_port + `/users/lesson/first-lesson-course/${idCourse}`
      )
      .subscribe(
        (data: any) => {
          this.firstLessonInCourse = data;
          this.firstLessonInCourse.lessonContent = this.safeUrl(
            this.firstLessonInCourse.lessonContent
          );
          console.log(this.firstLessonInCourse);
        },
        (err: HttpErrorResponse) => {
          this.firstLessonInCourse = null;
          console.log('loi khong co bai hoc!');
        }
      );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private http: HttpClient,
    private config: ConfigValue,
    private cartService: ShoppingCartService,
    private router: Router,
    public sanitizer: DomSanitizer
  ) {
    this.title.setTitle('3TPL | Chi tiết khóa học');
  }

  public ghiDanh() {
    this.cartService.addItem(this.item);
    console.log(this.cartService.getCartCurrent());
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.reloadPageWhenIDChange(params['id']);
      // console.log(params["id"]);
      window.scrollTo(0, 0);
    });
  }
  safeUrl(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://drive.google.com/file/d/${url}/preview`
    );
  }
}
