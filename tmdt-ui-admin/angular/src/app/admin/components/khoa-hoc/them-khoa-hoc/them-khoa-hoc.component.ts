import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ConfigValue } from './../../../_helpers/config-value';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message, SelectItem } from 'app/components/common/api';
import { EditorModule } from 'app/components/editor/editor';
import { FileUploadModule } from 'app/components/fileupload/fileupload';

@Component({
    templateUrl: 'them-khoa-hoc.component.html'
})
export class ThemKhoaHocComponent implements OnInit {
    msgs: Message[] = [];
    userform: FormGroup;
    submitted: boolean;
    courseTypeID: SelectItem[];
    topicID: SelectItem[];
    description: string;
    sourceDetail = '';

    avts: Message[] = [];
    uploadedAvt: any[] = [];

    uploadedFiles: any[] = [];

    constructor( private translate: TranslateService , private fb: FormBuilder, private http: HttpClient, private config: ConfigValue
    , private router: Router ) {
        translate.onLangChange.subscribe( r => {
            console.log(r);
            translate.setDefaultLang(r.lang);
                } );
     }

    ngOnInit() {
        this.userform = this.fb.group({
            'courseTitle': new FormControl('', Validators.required),
            'courseDescription': new FormControl('', Validators.required),
            'price': new FormControl('', [Validators.required, Validators.maxLength(7)]),
            'courseTypeID': new FormControl(''),
            'topicID': new FormControl('', Validators.required),
            'courseAvatar': new FormControl(''),
            'ScourseDetail': new FormControl('')
        });

        this.courseTypeID = [];
        this.courseTypeID.push({ label: 'Chọn loại khóa học', value: '' });
        this.courseTypeID.push({ label: 'Miễn phí', value: 'NCO' });
        this.courseTypeID.push({ label: 'Có phí', value: 'CO' });
        // loading lên nha nha thắng
        this.topicID = [];
        this.topicID.push({ label: 'Chọn loại chủ đề ', value: '' });
        this.topicID.push({ label: 'Angular ', value: 'CD1' });
        this.topicID.push({ label: 'React js', value: 'CD2' });
    }



    onUpload(event) {
        console.log(event);
        for (  const file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    onSubmit() {
        console.log(this.userform.value);
        this.http.post(this.config.url_port + '/users/course', this.userform.value).subscribe((data: any) => {
            console.log(data);
            this.router.navigate(['/admin/khoa-hoc/khoa-hoc-cua-toi'], { queryParams: { id: data.courseID } });
        } , ( err: HttpErrorResponse) => {
            alert('Không thêm được ');
        });
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
    }
    get diagnostic() { return JSON.stringify(this.userform.value); }
}
