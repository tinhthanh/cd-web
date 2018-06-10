import { User } from "./../../../_models/User";
import { AuthenticationService } from "./../../../_services/AuthenticationService";
import { OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { ConfigValue } from "./../../../_helpers/config-value";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from "@angular/forms";
@Component({
  templateUrl: "thong-tin-ca-nhan.component.html"
})
export class ThongTinCaNhanComponent implements OnInit, OnDestroy {
  public isShowProfile = false;
  public authorItem: any;
  loginUser: User;
  private sub: any;
  public featuredCourse: any;
  public listCourseItem: any;
  public url_avatar: string;
  submitted = false;
  userform: FormGroup;
  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private http: HttpClient,
    private config: ConfigValue,
    private auth: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.title.setTitle("3TPL | Thông tin cá nhân");
  }
  log(event: boolean) {
    console.log(`Accordion has been ${event ? "opened" : "closed"}`);
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.reloadPageWhenIDChange(params["id"]);
    });
  }
  onUploadAvartar($event) {
    if ($event.res) {
      console.log($event);
      const response = $event.res.body;
      const data = JSON.parse(response);
      const auth = JSON.parse(data[0].fileProperties);
      console.log(auth.webContentLink);
      this.url_avatar  = auth.webContentLink ;
      this.submitted = false;
    }
    if ($event.submitted) {
      console.log($event);
      this.submitted =  !$event.submitted.value;
    }
  }
  public inintFormUser(): void {
    this.url_avatar = this.loginUser.avatar;
  //  console.log(user);
    this.userform = this.fb.group({
        userName: new FormControl(this.loginUser.userName ? this.loginUser.userName : '', Validators.required),
        phoneNumber: new FormControl(this.loginUser.phoneNumber ? this.loginUser.phoneNumber : '' , Validators.required),
        address: new FormControl(this.loginUser.address ? this.loginUser.address : '' , Validators.required),
    });
}

onSubmit() {
  this.submitted = true;
  // console.log(this.userform.value);
  const editUser: any = {} ;
  editUser.address = this.userform.value.address ;
  editUser.avatar = this.url_avatar ;
  editUser.phoneNumber = this.userform.value.phoneNumber ;
  editUser.userName = this.userform.value.userName ;
  editUser.userID = this.loginUser.userID ;
  console.log(editUser);
  this.submitted = true ;
  this.http.patch(`${this.config.url_port}/admin/user_info`, editUser).subscribe(
      (data: any) => {
        console.log(data);
        this.authorItem = data;
        this.submitted = false;
      }, ( err: HttpErrorResponse) => {
          this.submitted = false;
      }
  );
}
  private reloadPageWhenIDChange(idAuthor: string): void {
    // lấy thông tin đăng nhập
    this.auth.refreshToken().subscribe(
      // kiểm tra người dùng đã đăng nhập chưa
      (data: any) => {
        this.auth.getInformation().subscribe((user: User) => {
          console.log(user);
          this.loginUser = user;
          this.inintFormUser();
        });
      }
    );

    this.http
      .get(this.config.url_port + `/users/course/author/${idAuthor}`)
      .subscribe((data: User) => {
        this.authorItem = data;
        this.loginUser  = data ;
        console.log(data);
      });
    this.http
      .get(
        this.config.url_port +
          `/users/course/${idAuthor}?sortType=desc&limitRecord=4`
      )
      .subscribe((data: any) => {
        this.featuredCourse = data;
      });
    this.http
      .get(
        this.config.url_port +
          `/users/course/${idAuthor}?sortPropertie=price&page=1&size=100`
      )
      .subscribe((data: any) => {
        this.listCourseItem = data.listOfResult;
        console.log(this.listCourseItem);
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
