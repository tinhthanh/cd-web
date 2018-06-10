import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem, Message } from 'app/components/common/api';

@Component({
    templateUrl: 'trang-thai-khoa-hoc.component.html'
})

export class TrangThaiKhoaHocComponent implements OnInit {
    userform: FormGroup;
    courseID: SelectItem[];
    msgs: Message[] = [];
    submitted: boolean;
    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.userform = this.fb.group({
            'courseID': new FormControl('', Validators.required),
            'newStatus': new FormControl('', Validators.required)
        });

        // loading lên nha nha thắng
        this.courseID = [];
        this.courseID.push({ label: 'Chọn mã khóa học', value: '' });
        this.courseID.push({ label: 'Angular ', value: 'CD1' });
        this.courseID.push({ label: 'React js', value: 'CD2' });
    }
    onSubmit(value: string) {
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
    }
    get diagnostic() { return JSON.stringify(this.userform.value); }
}