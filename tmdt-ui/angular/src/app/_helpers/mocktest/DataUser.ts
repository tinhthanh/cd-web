import { User } from './../../_models/User';
import { UserCustomCreate, Role } from '../../_models/index';
import { filter } from 'rxjs/operator/filter';
import { Injectable } from '@angular/core';
@Injectable()
export class DataUser {
    public users: User[]  = [];
    constructor() {
        const user1 = new UserCustomCreate();
         user1.email = 'lang.tt16@gmail.com';
         user1.password = '12345678';
         user1.userName = 'Trương tam lang';
        const role1: Role[] = [new Role(1, 'ROLE_ADMIN') , new Role(2, 'ROLE_USER')];
        this.createUser(user1, 'https://www.w3schools.com/howto/img_avatar2.png', role1 );

        const user2 = new UserCustomCreate();
        user2.email = 'k40cntt@gmail.com';
        user2.password = '12345678';
        user2.userName = 'Huỳnh tính thành';
        const role2: Role[] = [new Role(1, 'ROLE_ADMIN') , new Role(2, 'ROLE_USER')];
       this.createUser(user2 , 'https://drive.google.com/uc?id=0B27mfRY62YKZRDNxWWZHdl9aUjA', role2 );

       const user3 = new UserCustomCreate();
       user3.email = 'vanthang20437@gmail.com';
       user3.password = 'Thang123';
       user3.userName = 'Trần văn thắng';
       const role3: Role[] = [new Role(1, 'ROLE_ADMIN') , new Role(2, 'ROLE_USER')];
      this.createUser(user3 , 'https://www.w3schools.com/howto/img_avatar.png' , role3);


      const user4 = new UserCustomCreate();
      user4.email = 'nhanvien1@gmail.com';
      user4.password = '12345678';
      user4.userName = 'Nhân viên 1';
      const role4: Role[] = [ new Role(2, 'ROLE_USER')];
     // tslint:disable-next-line:max-line-length
     this.createUser(user4 , 'https://img00.deviantart.net/643d/i/2012/160/c/8/takayuki_kun__chibi_avatar_for_exgrs_remake__by_rozhenhire-d52uj8v.png' , role4);

    }
    public createUser(user: UserCustomCreate , avatar?: string , role?: Role[]) {
        const temp = new User();
        temp.email = user.email;
        temp.password = user.password;
        temp.userName = user.userName;
        temp.userID =  'ND' + this.users.length ;
          temp.registrationDate =  {
            dayOfYear: 328,
            month: 'NOVEMBER',
             year: 2017,
             dayOfMonth: 24,
            dayOfWeek: 'FRIDAY',
            hour: 23,
            minute : 53,
            nano: 0,
            second: 35,
            monthValue: 11,
            chronology: {
              id: 'ISO',
              calendarType: 'iso8601'
            }
          };
          temp.avatar =  avatar;
          temp.score = 0 ;
          temp.status = 1;
          temp.address = 'Đồng Tháp';
          temp.phoneNumber = '01642222992';
          temp.permission  =  role;



          temp.lastPasswordResetDate =  {
              dayOfYear: 328,
              month: 'NOVEMBER',
               year: 2017,
               dayOfMonth: 24,
              dayOfWeek: 'FRIDAY',
              hour: 23,
              minute : 53,
              nano: 0,
              second: 35,
              monthValue: 11,
              chronology: {
                id: 'ISO',
                calendarType: 'iso8601'
              }
            };
            this.users.push(temp);
    }
    public save(): void {
      localStorage.setItem('DATAUSER', JSON.stringify(this.users));
    }
    public load(): void  {
      const localdata = JSON.parse(localStorage.getItem('DATAUSER'));
       if ( !localdata ) {
         this.save();
       } else {
         this.users = localdata ;
       }
    }
    public checkToken(email): boolean {
      const filteredUsers = this.users.filter((user: User) => {
        return user.email === email;
    });
    if ( filteredUsers.length ) {
      return true;
    } else {
      return false;
    }
    }
}
