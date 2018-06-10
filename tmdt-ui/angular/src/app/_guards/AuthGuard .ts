import { ConfigValue } from './../_helpers/config-value';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private config: ConfigValue) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem(this.config.token)) {
            return true;
        }
        this.router.navigate(['/pages/dang-nhap'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
