import { HttpErrorResponse } from '@angular/common/http/';
import { ConfigValue } from './../../../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  templateUrl: 'tim-kiem.component.html'
})
export class TimKiemComponent implements OnInit {
  private sub: any;
  public topicItem: any = {};
  public listCourse: any = [];
  page = 1;
  size = 4;
  totalPage = 10;
  numberOfPage = 0;
  listPageV: any = [];
  keySearch: string;
  constructor(
    private title: Title,
    private active: ActivatedRoute,
    private http: HttpClient,
    private config: ConfigValue
  ) {
    this.title.setTitle('3TPL | Tìm kiếm');
  }

  ngOnInit() {
    this.sub = this.active.params.subscribe((params: any) => {
      this.keySearch = params['key-search'];
      this.reloadPageWhenIDChange(this.keySearch);
    });
  }
  private reloadPageWhenIDChange(keySearch: string): void {
    if (!this.keySearch) {
this.listCourse = [];
    }else {
      this.loadCource();
    }

  }
  lui() {
    console.log(this.page);
    if (this.page >= 2) {
      this.page--;
      this.loadCource();
    }
  }
  toi() {
    if (this.page < this.numberOfPage) {
      this.page++;
      this.loadCource();
    }
  }
  bitxe($event) {
    if (this.page >= 1 && this.page <= this.numberOfPage) {
      this.page = $event;
      this.loadCource();
    }
  }
  public loadCource() {
    this.http
      .get(
        this.config.url_port +
          `/users/course/searching/${encodeURIComponent(this.keySearch)}?page=${this.page}&size=${
            this.size
          }`
      )
      .subscribe((data: any) => {
        this.numberOfPage = data.numberOfPage;
        this.listCourse =  data.listOfResult;
        console.log(data);
        this.listPageV = this.listPage();
      });
  }
  public listPage(): any[] {
    const rs: any = [];
    for (let i = 1; i <= this.numberOfPage; i++) {
      rs[i - 1] = i;
    }
    return rs;
  }

}
