import { Component, OnInit, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';


@Component({
    selector: 'app-phan-trang',
    templateUrl: 'phan-trang.component.html'
})
export class PhanTrangComponent implements OnInit {
    @Input() page: number ;
    @Input() size: number ;
    numberOfPageValue: number ;
    dataPage: any = [] ;
    @Output() change: EventEmitter<any> = new  EventEmitter();
     constructor() { }

    ngOnInit() {
       this.dataPage = this.intnitPage();
       console.log(this.dataPage);
       console.log(this.page);
       console.log(this.numberOfPage);
       console.log(this.size);
     }
     @Input()
     get numberOfPage() {
       return this.numberOfPageValue;
     }
    public intnitPage(): any[] {
        const dataPage = [] ;
        console.log( this.page );
        for ( let i = 1 ; i <= this.numberOfPage   ; i++ ) {
            dataPage[i - 1 ] = i;
        }
         return dataPage ;
    }
    public lui() {
        if ( this.page !== 1) {
 this.page--;
        }
    }
    public next(index) {
        if ( index >= 1  && index <=  this.numberOfPage ) {
            this.page = index ;
        }
    }
    public toi() {
        if ( this.numberOfPage !== this.page ) {
 this.page++;
        }
    }
    onChange($event) {
        console.log($event);
        this.size = $event ;
    }
}
