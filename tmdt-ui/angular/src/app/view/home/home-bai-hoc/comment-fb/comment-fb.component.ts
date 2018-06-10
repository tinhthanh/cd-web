import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-fb',
  templateUrl: './comment-fb.component.html',
  styleUrls: ['./comment-fb.component.css']
})
export class CommentFbComponent implements OnInit {
  fbUrl: string;
  constructor(private router: ActivatedRoute ) {
    this.fbUrl = window.location.href ;
   this.fbUrl =  this.router.snapshot.queryParams['url'];
   console.log(this.fbUrl);

    this.fbLoadJs();
  }

  ngOnInit() {
  }

  public  fbLoadJs(): void {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.11&appId=756485194513202';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    }
}
