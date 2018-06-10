import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Message, SelectItem} from '../../../../components/common/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'edit-custommer.component.html'
})

export class CustomerEditComponent implements OnInit {
    msgs: Message[] = [];
    userform: FormGroup;
    submitted: boolean;
    genders: SelectItem[];
    description: string;
    key  ;
constructor(private http: HttpClient, private fb: FormBuilder,
                private router: ActivatedRoute ,
            private route: Router) {}

    ngOnInit() {
        this.key  =  this.router.snapshot.queryParams['key'];
        console.log(this.key);

        this.userform = this.fb.group({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            email: new FormControl('', [ Validators.required,
            // tslint:disable-next-line:max-line-length
            Validators.pattern (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                    ]        ),
            description: new FormControl(''),
            gender: new FormControl('', Validators.required)
        });

        this.genders = [];
        this.genders.push({label: 'Giới Tính', value: ''});
        this.genders.push({label: 'Nam', value: '1'});
        this.genders.push({label: 'Nữ', value: '2'});
     }
       onSubmit(value: string) {
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
        const edit: any = {} ;
        edit.lastname = this.userform.value.lastname ;
        edit.firstname = this.userform.value.firstname;
        edit.email = this.userform.value.email;
        edit.id_gender = this.userform.value.gender;
        this.http.post('http://localhost:8087/customer/' + this.key  , edit).subscribe(data => {
            console.log(data);
        });
        // this.route.navigate(['/admin/prestashop/main']);
        this.route.navigateByUrl('/admin/prestashop/main');
    }
    get diagnostic() { return JSON.stringify(this.userform.value); }
}
