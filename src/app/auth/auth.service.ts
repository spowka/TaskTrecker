import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { SigninModel } from './models/signin.model';
import { AuthModel } from './models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly url = 'auth';

  constructor (
    private httpClient: HttpClient
  ) {}

  signin (data: SigninModel) {
    return this.httpClient.post<AuthModel>(`${environment.serviceUrl}/${AuthService.url}/signin`, data)
      .pipe(
        tap(
          data => console.log(data),
          response => console.log(response.error)
        ),
        catchError((response: HttpErrorResponse) => {
          return [response.error]
        })
      );
  }
}
