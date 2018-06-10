import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thong-ke-luoc-mua-khoa-hoc',
  templateUrl: './thong-ke-luoc-mua-khoa-hoc.component.html',
  styleUrls: ['./thong-ke-luoc-mua-khoa-hoc.component.css']
})
export class ThongKeLuocMuaKhoaHocComponent implements OnInit {
  data: any;
  ngOnInit(): void {
  }
  constructor() {
    const mockdata: any[] = [];
    const size = Math.floor(Math.random() * 30) + 20  ;
    for ( let  i = size - 1 ;  i >= 0 ; i-- ) {
      let temp = 0 ;
      if ( i === size - 1 ) {
        temp = Math.floor(Math.random() * 10) + 1 ;
      } else  {
        temp = Math.floor(Math.random() * (100)) + mockdata[i + 1].value ;
      }
      console.log(temp);
      const data: any = {name: this.makeid() , value: temp  };
      mockdata[i] = data;
    }
    console.log(mockdata);
    const lable  = [];
    const value = [];
    for ( let i = 0 ; i < mockdata.length ; i++ ) {
      lable[i] = mockdata[i].name;
      value[i] = mockdata[i].value;
    }
    this.data = {
        labels: lable,
        datasets: [
            {
                label: 'lược mua',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: value
            }
        ]
    };
}
 makeid() {
  let text = '' ;
  const size = Math.floor(Math.random() * 30) + 20  ;
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < size; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
}
