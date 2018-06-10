import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message } from 'app/components/common/api';

@Component({
    templateUrl: 'doi-mat-khau.component.html'
})

export class DoiMatKhauComponent implements OnInit {
    msgs: Message[] = [];
    userform: FormGroup;
    submitted: boolean;
    oldPassword: string;
    newPassword: string;
    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.userform = this.fb.group({
        'oldPassword': new FormControl('', Validators.required),
        'newPassword': new FormControl('', Validators.required)
        });
    }

    onSubmit(value: string) {
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
    }
    get diagnostic() { return JSON.stringify(this.userform.value); }
}