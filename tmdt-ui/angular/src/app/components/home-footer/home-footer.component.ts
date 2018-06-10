import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home-footer',
  templateUrl: 'home-footer.component.html'
})

export class HomeFooterComponent implements OnInit {
  public navIsFixed = false;
  constructor() { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 1100) {
      this.navIsFixed = true;
    } else {
      this.navIsFixed = false;
    }
    //  console.log(this.navIsFixed +  ' -'  + number)
  }
  ngOnInit() { }

  public scrollTop() {
    window.scrollTo(0, 0);
  }
}
