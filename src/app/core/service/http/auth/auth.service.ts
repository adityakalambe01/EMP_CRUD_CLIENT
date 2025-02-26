import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { User } from '../../../model/User.interface';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(HttpService) private httpService: HttpService,
    @Inject(CookieService) private cookieService: CookieService
  ) {}

  login(user: User): Observable<any> {
    return this.httpService.securePost('auth/login', user);
  }

  register(user: User): Observable<any> {
    return this.httpService.securePost('auth/register', user);
  }

  refreshAccessToken(): Observable<any> {
    return this.httpService.securePost('auth/refresh-token', {});
  }

  logout(): Observable<any> {
    return this.httpService.securePost('auth/logout', {});
  }

  getAccessToken() {
    return this.cookieService.get('accessToken');
  }

  setAccessToken(token: string, options: any) {
    this.cookieService.set('accessToken', token, options);
  }

  getRefreshToken() {
    return this.cookieService.get('refreshToken');
  }

  clearCookies() {
    this.cookieService.deleteAll();
  }

  updateUser(updatedUser:any){
    return this.httpService.put('auth/update/profile', updatedUser);
  }
}
