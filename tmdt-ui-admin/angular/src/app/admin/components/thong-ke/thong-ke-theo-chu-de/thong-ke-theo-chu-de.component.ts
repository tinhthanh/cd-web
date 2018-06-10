import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigValue } from 'app/admin/_helpers/config-value';
@Component({
  selector: 'app-thong-ke-theo-chu-de',
  templateUrl: './thong-ke-theo-chu-de.component.html',
  styleUrls: ['./thong-ke-theo-chu-de.component.css']
})
export class ThongKeTheoChuDeComponent implements OnInit {
  data: any;
  listColor:  any =  [
    '#FF6384',
    '#4BC0C0',
    '#FFCE56',
    '#E7E9ED',
    '#d520a5',
    '#00aecd',
    '#3c763d',
    '#337ab7',
    '#8a6d3b',
    '#333'
];
// listTopics:  any =  [
//     '#FF6384 ----------',
//     '#4BC0C0 ----------',
//     '#FFCE56 ----------',
//     '#E7E9ED ----------',
//     '#d520a5 ----------',
//     '#00aecd ----------',
//     '#3c763d',
//     '#337ab7',
//     '#8a6d3b',
//     '#333'
// ];
  ngOnInit(): void {
    this.loadingData(2);
    }
    loadingData(top: number) {
      this.http.get(`${this.config.url_port}/admin/report/get-data-report-toppic/${top}`).subscribe( (rep: any ) => {
        const temp   = rep.listOfResult;
      let count = 0 ;
        temp.forEach(element => {
           count +=  element.value ;
        });
        temp.push( {name: 'Còn lại ' , value: rep.totalCourse - count });
        console.log(temp);
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
        const data: any = {
          datasets: [{
              data: listTopicsValue,
              backgroundColor: this.listColor,
              label: 'Thông kê khóa học theo danh mục'
          }],
          labels: listTopics
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
      constructor( private http: HttpClient , private config: ConfigValue) {
      }
  }
