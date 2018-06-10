import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: 'error-404.component.html'
})

export class Error404Component implements OnInit {
    constructor(private title: Title) {
        this.title.setTitle('3TPL | Không tìm thấy trang');
     }

    ngOnInit() { }
}