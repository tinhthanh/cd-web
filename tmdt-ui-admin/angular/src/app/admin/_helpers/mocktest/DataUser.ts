import { User } from './../../_models/User';
import { UserCustomCreate } from '../../_models/index';
import { filter } from 'rxjs/operator/filter';
export class DataUser {
    public users: User[]  = [];
    constructor() {
        const user1 = new UserCustomCreate();
         user1.email = 'lang.tt16@gmail.com';
         user1.password = '12345678';
         user1.userName = 'Trương tam lang';
        this.createUser(user1);

        const user2 = new UserCustomCreate();
        user2.email = 'k40cntt@gmail.com';
        user2.password = '12345678';
        user2.userName = 'Huỳnh tính thành';
       this.createUser(user2);

       const user3 = new UserCustomCreate();
       user3.email = 'vanthang1996@gmail.com';
       user3.password = 'Thang123';
       user3.userName = 'Trần văn thắng';
      this.createUser(user3);
    }
    public createUser(user: UserCustomCreate ) {
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
          temp.avatar = 'https://drive.google.com/uc?id=0B27mfRY62YKZRDNxWWZHdl9aUjA';
          temp.score = 0 ;
          temp.status = 1;
          temp.address = 'Đồng Tháp';
          temp.phoneNumber = '01642222992';
          temp.permission  =  [
              {
                  roleID: 2,
                  roleName: 'ROLE_ADMIN'
                },
                {
                  roleID: 1,
                  roleName: 'ROLE_USER'
            }
          ];
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
    public checkToke(email): boolean {
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
