import { ConfigValue } from './../../../_helpers/config-value';
import { Topic } from './../../../_models/Topic';
import { DataTopic } from './../../../_helpers/mocktest/DataTopic';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { DataCourse } from '../../../_helpers/mocktest/DataCourse';

@Component({
  templateUrl: 'danh-sach-khoa-hoc.component.html'
})
export class DanhSachKhoaHocComponent implements OnInit, OnDestroy {
  private sub: any;
  public topicItem: any = {};
  public listCourse: any = [];
  page = 1;
  size = 4;
  totalPage = 10;
  numberOfPage = 0;
  listPageV: any = [];
  idTopic: string;
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private http: HttpClient,
    private config: ConfigValue
  ) {
    this.title.setTitle('3TPL | Chi tiết khóa học');
  }

  public listPage(): any[] {
    const rs: any = [];
    for (let i = 1; i <= this.numberOfPage; i++) {
      rs[i - 1] = i;
    }
    return rs;
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idTopic = params['id'];
      this.reloadPageWhenIDChange(this.idTopic);
    });
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
  public reloadPageWhenIDChange(idTopic: string): void {
    // tslint:disable-next-line:no-unused-expression
    new DataCourse();

    this.http
      .get(this.config.url_port + `/users/topic/${idTopic}`)
      .subscribe(data => {
        this.topicItem = data;
      });
    this.loadCource();
  }
  public loadCource() {
    this.http
      .get(
        this.config.url_port +
          `/users/topic/${this.idTopic}/course?page=${this.page}&size=${
            this.size
          }`
      )
      .subscribe((data: any) => {
        this.numberOfPage = data.numberOfPage;
        this.listCourse = data.listOfResult;
        console.log(data);
        this.listPageV = this.listPage();
      });
  }
}
