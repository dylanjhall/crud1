import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, shareReplay, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
  http = inject(HttpClient);

  getAll<TModel>(url : string){
    return this.httpCall<TModel>(url)
  }
  getById<TModel>(baseUrl:string, id : string ){
    const url = baseUrl + '/' + id;
  return this.httpCall<TModel>(url)
  }

  private httpCall<TModel>(resource: string){
    return this.http.get<TModel>(resource).pipe(
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  private handleError(err:HttpErrorResponse){
    console.log('error caught in service')
    console.error(err);
    return throwError(() => new Error(err.message));
  }
}
