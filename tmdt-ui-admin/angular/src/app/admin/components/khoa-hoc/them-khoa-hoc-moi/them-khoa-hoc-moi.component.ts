import { SelectItem, Message } from 'app/components/common/api';
import { Router } from '@angular/router';
import { ConfigValue } from 'app/admin/_helpers/config-value';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: 'them-khoa-hoc-moi.component.html'
})

export class ThemKhoaHocMoiComponent implements OnInit {
    userform: FormGroup;
    courseTypeID: SelectItem[];
    topicID: SelectItem[];
    msgs: Message[];
    submitted: boolean;
    uploadImgProress = false; // hiển thị đang upload
    courseAvatar_temp: string; // hinh anh khoa hoc
    url_upload: string;
    constructor(   private http: HttpClient,
        private config: ConfigValue,
        private router: Router,
        private fb: FormBuilder) { }
   ngOnInit() {
    this.url_upload = this.config.url_port;
       this.initForm();
   }
   onBasicUploadAuto($event) {
    const response = JSON.parse($event.xhr.response);
    const obj = response;
    const auth = JSON.parse(obj[0].fileProperties);
    const url = `https://drive.google.com/uc?id=${auth.id}`;
    this.courseAvatar_temp = url;
    const userform = this.userform;
    userform.value.courseAvatar = url;
    this.userform = userform;
    this.uploadImgProress = false;
}
progressUp($event) {
    this.uploadImgProress = true;
    console.log($event);
}
erroUpload($event) {
    alert('thử lại');
    if ($event.xhr.status === 401) {
        console.log(' token hết hạng ');
    }
}
   onSubmit(value: string) {
    this.submitted = true;
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
    // data
    // "courseAvatar": "",
    // "courseDescription": "",
    // "courseDetail": "",
    // "courseTitle": "",
    // "courseTypeID": "",
    // "price": 0,
    // "topicID": ""
    const dataSend: any = {};
    dataSend.courseAvatar = this.courseAvatar_temp;
    dataSend.courseDescription = this.userform.value.courseDescription;
    dataSend.courseDetail = this.userform.value.courseDetail;
    dataSend.courseTitle = this.userform.value.courseTitle;
    dataSend.courseTypeID = this.userform.value.courseTypeID;
    dataSend.price = (this.userform.value.courseTypeID === 'CO') ? this.userform.value.price : 0;
    dataSend.topicID = this.userform.value.topicID;
    console.log(dataSend);
    this.http.post(`${this.config.url_port}/users/course`, dataSend).subscribe(
        (data: any) => {
            console.log(data);
            this.router.navigate(['/admin/khoa-hoc/khoa-hoc-cua-toi'], { queryParams: { id: data.courseID , url: this.router.url } });
            this.submitted = false;
        }, (err: HttpErrorResponse) => {
            if (err.status === 401) {
                alert('token hết hạng ');
            }
            if (err.status === 405) {
                alert(' sai logic ');
            }
            console.log('erro');
        }
    );
}

   public initForm() {
    // tslint:disable-next-line:max-line-length
    this.courseAvatar_temp =  'https://www.caperlan.co.uk/sites/caperlan/files/styles/460x460/public/default_images/no-picture.png';
    this.userform = this.fb.group({
        courseTitle: new FormControl('', Validators.required),
        courseDescription: new FormControl('', Validators.required),
        price: new FormControl(0, [Validators.required, Validators.maxLength(7)]),
        courseTypeID: new FormControl('', Validators.required),
        topicID: new FormControl('', Validators.required),
        courseAvatar: new FormControl(this.courseAvatar_temp),
        courseDetail: new FormControl(''),
        status: new FormControl(0)
    });
    this.courseTypeID = [];
    this.courseTypeID.push({ label: 'Chọn loại khóa học', value: '' });
    this.courseTypeID.push({ label: 'Miễn phí', value: 'NCO' });
    this.courseTypeID.push({ label: 'Có phí', value: 'CO' });
    // loading lên nha nha thắng
    this.topicID = [];
    this.topicID.push({ label : 'Chọn loại chủ đề' , value: '' });
    this.http.get(`${this.config.url_port}/users/topic?page=1&size=99999`).subscribe(
        (data: any) => {
            // console.log(data);
            const dsChuDe = data.listOfResult;
            for (const temp of dsChuDe) {
                this.topicID.push({ label: temp.topicName, value: temp.topicID });
            }
        }, (err: HttpErrorResponse) => {
            alert('erro Không load được danh sách chủ đề');
        }
    );
}
}
