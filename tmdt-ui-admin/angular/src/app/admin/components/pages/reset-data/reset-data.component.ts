import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-data',
  templateUrl: './reset-data.component.html',
  styleUrls: ['./reset-data.component.css']
})
export class ResetDataComponent implements OnInit {

  constructor(private http: HttpClient ) { }

  ngOnInit() {
    this.http.get('assets/tmdt/chu-de.json').subscribe((data: any ) => {
      console.log(data);
    });
  }

}
