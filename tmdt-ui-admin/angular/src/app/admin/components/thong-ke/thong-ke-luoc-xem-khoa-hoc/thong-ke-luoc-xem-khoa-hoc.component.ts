import { ConfigValue } from './../../../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thong-ke-luoc-xem-khoa-hoc',
  templateUrl: './thong-ke-luoc-xem-khoa-hoc.component.html',
  styleUrls: ['./thong-ke-luoc-xem-khoa-hoc.component.css']
})
export class ThongKeLuocXemKhoaHocComponent implements OnInit {
  data: any;
  totalView: number;
  ngOnInit(): void {
    this.loadingData(2);
    }
    loadingData(top: number) {
      this.http.get(`${this.config.url_port}/admin/report/statistics-by-cource/${top}`).subscribe( (rep: any ) => {
        const temp   = rep.listOfResult;
        this.totalView = rep.totalCourse ;
      let count = 0 ;
        temp.forEach(element => {
           count +=  element.value ;
        });
        // temp.push( {name: 'Còn lại ' , value: rep.totalCourse  });
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
          labels: listTopics,
          datasets: [
              {
                  label: 'lược xem',
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
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
      constructor( private http: HttpClient , private config: ConfigValue) {
    // const mockdata: any[] = [];
    // const size = Math.floor(Math.random() * 30) + 20  ;
    // for ( let  i = size - 1 ;  i >= 0 ; i-- ) {
    //   let temp = 0 ;
    //   if ( i === size - 1 ) {
    //     temp = Math.floor(Math.random() * 10) + 1 ;
    //   } else  {
    //     temp = Math.floor(Math.random() * (100)) + mockdata[i + 1].value ;
    //   }
    //   console.log(temp);
    //   const data: any = {name: this.makeid() , value: temp  };
    //   mockdata[i] = data;
    // }
    // console.log(mockdata);
    // const lable  = [];
    // const value = [];
    // for ( let i = 0 ; i < mockdata.length ; i++ ) {
    //   lable[i] = mockdata[i].name;
    //   value[i] = mockdata[i].value;
    // }
    // this.data = {
    //     labels: lable,
    //     datasets: [
    //         {
    //             label: 'lược xem',
    //             backgroundColor: '#42A5F5',
    //             borderColor: '#1E88E5',
    //             data: value
    //         }
    //     ]
    // };
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
