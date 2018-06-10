import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'app/components/common/api';
import { Message } from './../../../../components/common/message';
import { ConfigValue } from './../../../_helpers/config-value';
import { CarService } from './../../../../showcase/service/carservice';
import { Car } from './../../../../showcase/domain/car';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
    templateUrl: 'danh-sach-chu-de.component.html'
})
export class DanhSachChuDeComponent implements OnInit {
        stacked = false ;
        loading = false;
        msgs: Message[] = [];
        totalRow = 0 ; // tổng số row trong database
        page = 0 ; // vi tri trang đang đứng
        size  = 10 ; // số row muốn hiển thị
        displayDialogTopic: boolean;  // show pop thêm topic

      public  listTopic: any = [] ; // danh sách topic
        toppic: any  = {};  // topic thêm vào
        newTopic: boolean;  // trang thái có thêm topic mới hay không
        constructor(private carService: CarService, private http: HttpClient  ,
        private config: ConfigValue,
        private router: Router , private route: ActivatedRoute ) {
            if ( this.route.snapshot.queryParams['add']) {
                alert(this.route.snapshot.queryParams['add']);
                this.displayDialogTopic = true;
            }
        }
            ngOnInit() {
             this.loadingTopic();
            }
            paginate(event) { // sư kiện phân trang
                console.log(event);
                this.page = event.page; // thay đổi vị trí trang đang đứng
                this.size = event.rows;
                this.loadingTopic();
            }
            // hàm loading dư liệu
            public loadingTopic() {
                this.loading = true;
                this.http.get(this.config.url_port + `/users/topic?page=${ this.page + 1 }&size=${this.size}` ).subscribe( (data: any)  => {
                    this.totalRow = data.numberOfRecord;
                    this.listTopic = data.listOfResult ;
                    this.loading = false;
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
                this.loading = true;
                if ( this.toppic.topicName && this.toppic.topicDescription
                 && this.toppic.topicStatus  ) {
                    const listTopic = [...this.listTopic];
                    if ( this.newTopic ) {
                        this.http.post(this.config.url_port + '/admin/topic', this.toppic).subscribe( (data: any) => {
                            listTopic.push(data);
                            this.msgs = [];
                            this.msgs.push({severity: 'success', summary: 'Success Message', detail: ' Thêm thành công '});
                            this.loading = false;
                            this.listTopic = listTopic;
                        }, (err: HttpErrorResponse ) => {
                            if ( err.status === 401 ) {
                                this.msgs = [];
                                this.msgs.push({severity: 'success', summary: 'Success Message', detail: ' token hết hạng '});
                                    this.router.navigate(['/pages/dang-nhap']);
                                }
                            this.msgs = [];
                            this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Thêm thất bại'});
                        });
                    } else {
                        console.log(this.toppic);
                        this.http.patch(this.config.url_port + '/admin/topic' , this.toppic).subscribe(
                            data => {
                                this.msgs = [];
                                this.msgs.push({severity: 'success', summary: 'Success Message', detail: ' Thêm thành công '});
                                this.loading = false;
                                this.listTopic = listTopic;
                            }, (err: HttpErrorResponse) => {
                                console.log(err.status);
                                if ( err.status === 401 ) {
                                this.msgs = [];
                                this.msgs.push({severity: 'success', summary: 'Success Message', detail: ' token hết hạng '});
                                    this.router.navigate(['/pages/dang-nhap']);
                                }
                            }
                        );
                        listTopic[this.findSelectedTopicIndex()] = this.toppic;
                     }
                        this.toppic = null;
                        this.displayDialogTopic = false;
                } else {
                    console.log('không được để trống');
                    this.msgs = [];
                    this.msgs.push({severity: 'warn', summary: 'Cảnh báo', detail: 'Không được để trống'});
                }
            }
            public deleteTopic() {
                for ( let i = 0 ; i < this.listTopic.length ; i++ ) {
                    if ( this.listTopic[i].topicID === this.toppic.topicID ) {
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
                for ( let i = 0 ; i < this.listTopic.length ; i++ ) {
                    if ( this.listTopic[i].topicID === this.toppic.topicID ) {
                        index = i;
                    }
                }
                return index ;
            }
            // sao chép một chủ đề
            public saoChepMotChuDe( topic: any ) {
                const topicResult: any = {};
                topicResult.topicID = topic.topicID;
                topicResult.topicName = topic.topicName;
                topicResult.topicDescription = topic.topicDescription ;
                topicResult.topicStatus = topic.topicStatus;
                return topicResult;
            }
}
