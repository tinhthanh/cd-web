import { Component, OnInit } from '@angular/core';
import { Message, SelectItem } from 'app/components/common/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    templateUrl: 'cap-nhat-khoa-hoc.component.html'
})

export class CapNhatKhoaHocComponent implements OnInit {
    msgs: Message[] = [];
    userform: FormGroup;
    submitted: boolean;
    courseTypeID: SelectItem[];
    topicID: SelectItem[];
    description: string;
    sourceDetail = '';

    avts: Message[] = [];
    uploadedAvt: any[] = [];
    constructor(private fb: FormBuilder) { }

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


    // upload avatar
    onUpload(event) {
        // tslint:disable-next-line:prefer-const
        for (let file of event.files) {
            this.uploadedAvt.push(file);
        }
        this.avts = [];
        this.avts.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    onSubmit(value: string) {
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
    }
    get diagnostic() { return JSON.stringify(this.userform.value); }
}