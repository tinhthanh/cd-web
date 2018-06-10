import { SelectItem } from './../../../../components/common/selectitem';
import { filter } from 'rxjs/operator/filter';
import { Message } from './../../../../components/common/message';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigValue } from 'app/admin/_helpers/config-value';

@Component({
  templateUrl: 'danh-sach-nguoi-dung.component.html'
})
export class DanhSachNguoiDungComponent implements OnInit {
  display = false;
  rows = 10;
  pages = 1;
  toltalRow = 100;
  listNguoiDung: any = [];
  public selectedNguoiDung: any;
  msgs: Message[] = [];

  cars: SelectItem[];

  selectedCars1: string[] = [];

  constructor(private http: HttpClient, private config: ConfigValue) { }

  ngOnInit() {
    this.loadTopic();

    // this.cars = [{ label: "Admin", value: "1" }, { label: "User", value: '2' }];
  }
  paginate(event) {
    // event.first = Index of the first record
    this.rows = event.rows;
    this.pages = event.page + 1;
    this.loadTopic();
    // event.pageCount = Total number of pages
  }
  public loadTopic(): void {
    this.http
      .get(
      this.config.url_port +
      `/user/danh-sach-nguoi-dung?page=${this.pages}&size=${this.rows}`
      )
      .subscribe((data: any) => {
        this.toltalRow = data.numberOfRecord;
        console.log(data);
        this.listNguoiDung = data.listOfResult;
      });
  }
  suKienChon($event) {
    this.selectedNguoiDung = $event.data;
    this.display = true;
  }
  public capNhat() {
    console.log(this.selectedNguoiDung);

    const role2 = [
      {
        roleID: 2,
        roleName: 'ROLE_ADMIN'
      },
      {
        roleID: 1,
        roleName: 'ROLE_USER'
      }
    ];

    const user: any = {};
    user.address = this.selectedNguoiDung.address;
    user.avatar = this.selectedNguoiDung.avatar;
    user.permission = role2;
    user.phoneNumber = this.selectedNguoiDung.phoneNumber;
    user.score = this.selectedNguoiDung.score;
    user.status = this.selectedNguoiDung.status;
    user.userID = this.selectedNguoiDung.userID;
    user.userName = this.selectedNguoiDung.userName;
    console.log(user);
    this.display = false;
    this.http
      .patch(
      this.config.url_port + '/user/cap-nhat-nguoi-dung',
      user
      )
      .subscribe(
      (data: any) => {
        console.log(data);
        this.msgs.push({
          severity: 'info',
          summary: 'Info Message',
          detail: 'Thêm thành công'
        });
      },
      (err: HttpErrorResponse) => {
        this.msgs.push({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Thêm thất bại'
        });
      }
      );
  }
}
