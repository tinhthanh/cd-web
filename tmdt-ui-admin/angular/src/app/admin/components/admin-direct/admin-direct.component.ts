import { AuthenticationService } from './../../_services/AuthenticationService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-direct',
  templateUrl: './admin-direct.component.html',
  styleUrls: ['./admin-direct.component.css']
})
export class AdminDirectComponent implements OnInit {
  isAdmin = false;
  isUser = false;
  constructor( private auth: AuthenticationService  ) {
  }

  ngOnInit() {
    this.auth.getInformation().subscribe(data => {
      console.log(data);
      const permission =  data.permission;
      for ( let i = 0 ; i < permission.length ; i++ ) {
          if ( permission[i].roleName  === 'ROLE_ADMIN') {
              this.isAdmin = true ;
              // alert('admin');
          }
          if ( permission[i].roleName  === 'ROLE_USER') {
              this.isUser = true ;
            //  alert('user');
          }
      }
      });
  }

}
