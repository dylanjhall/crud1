import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GetUsersService } from './services/get-users.service';
import { Subscription } from 'rxjs';
import { GenericHttpService } from './services/generic-http.service';
import { Users } from './models/user-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  title = 'crud1';
  subscription = new Subscription();
  userService = inject(GetUsersService);
  genericHttpService = inject(GenericHttpService);

  getUsers(){
   this.subscription = this.userService.getAllUsers().subscribe(
    resp => console.debug(resp)
   );
  }

  genericGetUsers(){
    const path = 'https://jsonplaceholder.typicode.com/users';
    this.genericHttpService.getAll<Users>(path).subscribe(
      resp => console.debug(resp)
    )
  }

  genericGetUserById(){
    const path = 'https://jsonplaceholder.typicode.com/users';
    const id = '1';
    this.genericHttpService.getById<Users>(path,id).subscribe(
      resp => console.debug(resp)
    )
  }
  genericGetUserByIdThrow(){
    const path = 'https://jsonplaceholder.typicode.com/users';
    const id = '9999';
    this.genericHttpService.getById<Users>(path,id).subscribe(
      resp => console.debug(resp)
    )
  }
}
