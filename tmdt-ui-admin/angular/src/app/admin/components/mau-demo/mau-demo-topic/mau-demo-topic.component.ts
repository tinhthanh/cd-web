import { ConfigValue } from './../../../_helpers/config-value';
import { CarService } from './../../../../showcase/service/carservice';
import { Car } from './../../../../showcase/domain/car';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'mau-demo-topic.component.html'
})
export class MauDemoTopicComponent implements OnInit {
  totalRow = 0; // tổng số row trong database
  page = 0; // vi tri trang đang đứng
  size = 10; // số row muốn hiển thị
  displayDialogTopic: boolean; // show pop thêm topic
  public listTopic: any = []; // danh sách topic
  toppic: any = {}; // topic thêm vào
  newTopic: boolean; // trang thái có thêm topic mới hay không
  constructor(
    private carService: CarService,
    private http: HttpClient,
    private config: ConfigValue
  ) {}
  ngOnInit() {
    this.loadingTopic();
  }
  paginate(event) {
    // sư kiện phân trang
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    this.page = event.page; // thay đổi vị trí trang đang đứng
    this.loadingTopic();
  }
  // hàm loading dư liệu
  public loadingTopic() {
    this.http
      .get(
        this.config.url_port +
          `/users/topic?page=${this.page + 1}&size=${this.size}`
      )
      .subscribe((data: any) => {
        this.totalRow = data.numberOfRecord;
        this.listTopic = data.listOfResult;
      });
  }
  showDialogToAddToppic() {
    this.newTopic = true;
    this.toppic = {};
    this.displayDialogTopic = true;
  }
  // sự kiện chọn
  public suKienChon(event) {
    this.newTopic = false;
    this.toppic = this.saoChepMotChuDe(event.data);
    this.displayDialogTopic = true;
  }
  // sự kiện thêm một topic mới
  public saveTopic() {
    const listTopic = [...this.listTopic];
    if (this.newTopic) {
      listTopic.push(this.toppic);
    } else {
      listTopic[this.findSelectedTopicIndex()] = this.toppic;
    }
    this.listTopic = listTopic;
    this.toppic = null;
    this.displayDialogTopic = false;
  }
  public deleteTopic() {
    for (let i = 0; i < this.listTopic.length; i++) {
      if (this.listTopic[i].topicID === this.toppic.topicID) {
        this.listTopic = this.listTopic.filter((val, j) => j !== i);
        break;
      }
    }
    this.toppic = null;
    this.displayDialogTopic = false;
  }
  // tìm kiếm một topic trả về vị trí index của topic
  findSelectedTopicIndex(): number {
    let index = -1;
    for (let i = 0; i < this.listTopic.length; i++) {
      if (this.listTopic[i].topicID === this.toppic.topicID) {
        index = i;
      }
    }
    return index;
  }
  // sao chép một chủ đề
  public saoChepMotChuDe(topic: any) {
    const topicResult: any = {};
    topicResult.topicID = topic.topicID;
    topicResult.topicName = topic.topicName;
    topicResult.topicDescription = topic.topicDescription;
    topicResult.topicStatus = topic.topicStatus;
    return topicResult;
  }
}
