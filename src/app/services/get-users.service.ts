import { Injectable, inject } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  http = inject(HttpClient);
  path = 'https://jsonplaceholder.typicode.com/users';
  constructor() { }

  getAllUsers(){
    return this.http.get<any>(this.path).pipe(
      shareReplay(1)
    );
  }
}
