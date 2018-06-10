import { Message } from './../../../../components/common/message';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thong-ke-danh-thu',
  templateUrl: './thong-ke-danh-thu.component.html',
  styleUrls: ['./thong-ke-danh-thu.component.css']
})
export class ThongKeDanhThuComponent implements OnInit {
  data: any;
  ngOnInit(): void {
  }

  constructor() {
    this.data = {
        labels: [ 'Tháng 1',
         'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 8' , 'Tháng 9' , 'Tháng 10' , 'Tháng 11' , 'Tháng 12' ],
        datasets: [
            {
                label: 'Doanh thu dự toán 5% khi rút',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: [165, 159, 180, 181, 156, 155, 140 , 139, 126, 135 , 176 , 145]
            },
            {
                label: 'Lãi xuất ngân hàng',
                backgroundColor: '#9CCC65',
                borderColor: '#7CB342',
                data: [28, 48, 40, 19, 86, 27, 90 , 12, 21, 43, 24 , 14]
            }
        ]
    };
}
}
