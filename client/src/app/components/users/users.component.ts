import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  template:   `
    <h1>{{welcome}}</h1>
            <table class="table">
            <tr>
              <th>#</th>
          <th>id</th>
          <th>first_name</th>
          <th>last_name</th>
          </tr>
          <tr *ngFor="let user of users; let i = index">
            <td>{{i + 1}}</td>
          <td>{{user.id}}</td>
          <td>{{user.first_name}}</td>
          <td>{{user.last_name}}</td>
          </tr>
      </table>
  `,
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : [{
    id: string,
    first_name : string,
    last_name : string
  }];
  constructor() { }

  ngOnInit() {
  }

}
