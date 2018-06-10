import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "home.component.html"
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    //  this.router.navigate(['/home/main']);
  }
}
