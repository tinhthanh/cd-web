import { ConfigValue } from 'app/admin/_helpers/config-value';
import { Component } from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
      trigger('overlayState', [
          state('hidden', style({
              opacity: 0
          })),
          state('visible', style({
              opacity: 1
          })),
          transition('visible => hidden', animate('400ms ease-in')),
          transition('hidden => visible', animate('400ms ease-out'))
      ])
  ],
})
export class AppComponent {
    development = false; // bat tac menu trai
    menuActive: boolean;
    activeMenuId: string;
    constructor(private configValue: ConfigValue) {
        if (!localStorage.getItem('url')) {
          localStorage.setItem('url' , this.configValue.url_port); 
        }
        this.configValue.url_port = localStorage.getItem('url') ;
    }
    changeTheme(event: Event, theme: string) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        themeLink.href = 'assets/components/themes/' + theme + '/theme.css';
        event.preventDefault();
    }
}
