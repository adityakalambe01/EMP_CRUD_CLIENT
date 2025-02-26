import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$ = new BehaviorSubject(null);
  constructor(private cookieService:CookieService) {
    if (decodeURIComponent(this.cookieService.get('user')))
      this.setUser();
  }

  setUser(): void {
    this.user$.next(
      JSON.parse(decodeURIComponent(this.cookieService.get('user')))
    );
  }

  getUser(): Observable<any> {
    return this.user$.asObservable();
  }

  clearUser(): void {
    this.user$.next(null);
  }
}
