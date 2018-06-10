import { ConfigValue } from './../../../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: 'main-home.component.html'
})
export class MainHomeComponent implements OnInit {
  listCourse: any;
  size = 4;
  total = 0;
  constructor(
    private title: Title,
    private http: HttpClient,
    private config: ConfigValue
  ) {
    this.title.setTitle('3TPL | Trang chủ');
  }

  ngOnInit() {
    // lấy thông tin các khóa học nổi bật
    this.loadCourseFeatured();
  }
  public xemThem(): void {
    this.size += 4;
    this.loadCourseFeatured();
  }
  public loadCourseFeatured(): void {
    this.http
      .get(
        this.config.url_port +
          `/users/courses-featured?page=1&size=${this.size}`
      )
      .subscribe((data: any) => {
        this.listCourse = data.listOfResult;
        this.total = data.numberOfRecord;
      });
  }

}
