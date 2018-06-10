import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: 'dieu-khoan-su-dung.component.html'
})

export class DieuKhoanSuDungComponent implements OnInit {
    constructor(private title: Title) {
        this.title.setTitle('3TPL | Điều khoản sử dụng');
    }

    ngOnInit() { }
}