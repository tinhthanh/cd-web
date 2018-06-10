import { ConfigValue } from './../../../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thong-ke-diem-nguoi-dung',
  templateUrl: './thong-ke-diem-nguoi-dung.component.html',
  styleUrls: ['./thong-ke-diem-nguoi-dung.component.css']
})
export class ThongKeDiemNguoiDungComponent implements OnInit {
  data: any;
  totalView: number ;
  ngOnInit(): void {
    this.loadingData(2);
  }
  loadingData(top: number) {
    this.http.get(`${this.config.url_port}/admin/report/statistics-by-guest/${top}`).subscribe( (rep: any ) => {
      const temp   = rep.listOfResult;
      this.totalView = rep.totalCourse ;
    let count = 0 ;
      temp.forEach(element => {
         count +=  element.value ;
      });
      // temp.push( {name: 'Còn lại ' , value: rep.totalCourse - count });
      // console.log(temp);
      const listTopics:  any  = [];
     const  listTopicsValue: any  = [] ;
      for ( let i = 0 ; i < temp.length ; i++ ) {
        // listTopics[i] = temp[i].name;
        if ( temp[i].value === 0  ) {
         // listTopicsValue[i] = -1;
        } else {
          listTopics[i] = temp[i].name;
          listTopicsValue[i]   = temp[i].value;
        }
      }
      const  data = {
        labels: listTopics ,
        datasets: [
            {
                label: 'Thống kê điểm khách hàng',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: listTopicsValue
            }
        ]
    };
    this.data = data ;
      });
  }
  thongke( $event ) {
console.log($event.target.value);
if ( $event.target.value !== '-1') {
  this.loadingData($event.target.value);
}

  }
  constructor(private http: HttpClient , private config: ConfigValue ) {
}
}


