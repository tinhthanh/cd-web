import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: 'gioi-thieu.component.html'
})

export class GioiThieuComponent implements OnInit {

    constructor(private title: Title) {
        this.title.setTitle('3TPL | Giới thiệu');
     }

    ngOnInit() { }
}
