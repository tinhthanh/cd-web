import { HttpClient } from '@angular/common/http';
import { ConfigValue } from './../../../_helpers/config-value';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'khoa-hoc-cua-toi.component.html'
})
export class KhoaHocCuaToiComponent implements OnInit {
  page = 1;
  size = 4;
  totalPage = 10;
  numberOfPage = 0;
  listPageV: any = [];
  public listCourse: any = [];
  constructor(private config: ConfigValue, private http: HttpClient) {}

  ngOnInit() {
    this.loadCource();
  }
  public loadCource(): void {
    this.http
      .get(this.config.url_port + `/user/cousrses-registed?page=${this.page}&size=${this.size}`)
      .subscribe((data: any) => {
        this.numberOfPage = data.numberOfPage;
        this.listCourse = data.listOfResult;
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
}
