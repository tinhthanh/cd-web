import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thong-ke-doanh-thu-theo-tuan',
  templateUrl: './thong-ke-doanh-thu-theo-tuan.component.html',
  styleUrls: ['./thong-ke-doanh-thu-theo-tuan.component.css']
})
export class ThongKeDoanhThuTheoTuanComponent implements OnInit {
data: any;
  constructor() {
    this.data = {
      labels: [ 'Tháng 1',
      'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 8' , 'Tháng 9' , 'Tháng 10' , 'Tháng 11' , 'Tháng 12' ],
      datasets: [
          {
            label: 'Doanh thu dự toán 5% khi rút',
              data: [165, 159, 180, 181, 156, 155, 140 , 139, 126, 135 , 176 , 145],
              fill: false,
              borderColor: '#4bc0c0'
          },
          {
             label: 'Lãi xuất ngân hàng',
              data: [28, 48, 40, 19, 86, 27, 90 , 12, 21, 43, 24 , 14],
              fill: false,
              borderColor: '#565656'
          }
      ]
  };
   }
  ngOnInit() {
  }
}
