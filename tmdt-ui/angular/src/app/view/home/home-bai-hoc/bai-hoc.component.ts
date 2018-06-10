import { HttpErrorResponse } from '@angular/common/http/';
import { filter } from 'rxjs/operator/filter';
import { ConfigValue } from './../../../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {
  Title,
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';
import { Location } from '@angular/common';
import $ from 'jquery';

@Component({
  templateUrl: 'bai-hoc.component.html'
})
export class BaiHocComponent implements OnInit {
  isShow = false;
  isCollapsed = true;
  private sub: any;
  public lessonItem: any;
  public listLesson: any = [];
  public url;
  isShowButtonDonate = false;
  private idLesson;
  showFbUrl;
  hostName;
  fbUrl;
  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private http: HttpClient,
    private config: ConfigValue,
    public sanitizer: DomSanitizer,
    public location: Location,
    public router: Router
  ) {
    this.title.setTitle('3TPL | Bài học');
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      //  if (this.isShow) {
      //         window.location.href =  window.location.href;
      //  }
      this.fbUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'http://localhost:4200/comment-fb?url=' + window.location.href);
      this.showFbUrl = false;
      this.reloadPageWhenIDChange(params['id']);
      console.log(params['id']);

      window.scrollTo(0, 0);

        this.showFbUrl = true;
    });
    if (this.lessonItem) {
      this.router.navigate(['/home']);
    }
  }
  private reloadPageWhenIDChange(idLesson: string): void {


    this.isShow = false;
// tslint:disable-next-line:max-line-length
// $('.fb-comment').html(` <div class="fb-comments"  data-numposts="20" data-width="100%" css="http://www.yourwebsite.com/css/comments.css?1234"></div>`);

    this.idLesson = idLesson;
    // is show button donate
    this.http
      .get(`${this.config.url_port}/user/lesson-is-non-commercial/${idLesson}`)
      .subscribe(
        (data: any) => {
          this.isShowButtonDonate = data.success === 1;
        },
        (err: HttpErrorResponse) => {
          this.isShowButtonDonate = false;
        }
      );
    this.http.get(this.config.url_port + `/lesson/${idLesson}`).subscribe(
      (dataLesson: any) => {
        this.lessonItem = dataLesson;
        this.getSafeUrl(this.lessonItem.lessonContent);
        console.log(this.lessonItem);
      },
      (err: HttpErrorResponse) => {
        this.lessonItem = null;
        console.log(' Không có khóa học nào hết!');
      }
    );
    this.http
      .get(this.config.url_port + `/lesson/relate/${idLesson}`)
      .subscribe((data: any) => {
        const tmp = data;
        this.listLesson = data;
        this.listLesson.forEach(element => {
          element.lessonContent2 =  element.lessonContent;
          element.lessonContent = this.safeUrl(element.lessonContent);
        });
      });
       this.isShow = true;
       this.fbLoadJs();
  }
  safeUrl(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://drive.google.com/thumbnail?authuser=0&sz=w320&id=' + url
    );
  }
  getSafeUrl(url) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://drive.google.com/file/d/${url}/preview`
    );
  }
  goBack(): void {
    window.history.back();
  }
 public  fbLoadJs(): void {
  (function(d, s, id) {
    let js;
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
     }
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.11&appId=353949518311315';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  }

  public donate() {
    const body = {
      amount: 5,
      lessonID: this.idLesson
    };
    this.http.post(`${this.config.url_port}/payment/donate`, body).subscribe(
      (data: any) => {
        // alert('Bạn đã donate thành công 5 điểm cho bài học này!');

        swal({
          title: 'Bạn đã donate thành công 5 điểm cho bài học này!',
          type: 'success',
          showConfirmButton: false,
          position: 'top-end',
          timer: 1000
        });
      },
      (err: HttpErrorResponse) => {
       console.log(err);
      }
    );
  }
}
