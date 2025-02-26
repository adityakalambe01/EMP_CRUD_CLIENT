import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/User.interface';
import { Employee } from '../../model/Employee.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private HOST_URL: String = 'http://localhost:5050';
  constructor(@Inject(HttpClient) private httpClient: HttpClient) {}

  get(url: string, params?: HttpParams): Observable<any> {
    return this.httpClient.get<any>(`${this.HOST_URL}/${url}`, {
      params,
      withCredentials: true,
    });
  }

  securePost(
    url: string,
    object: User | Employee | { refreshToken: string } | {}
  ): Observable<any> {
    return this.httpClient.post<any>(`${this.HOST_URL}/${url}`, object, {
      withCredentials: true,
    });
  }

  post(url: string, object: any): Observable<any> {
    return this.httpClient.post<any>(`${this.HOST_URL}/${url}`, object, {
      withCredentials: true,
    });
  }

  put(url: string, object: User | Employee): Observable<any> {
    return this.httpClient.put<any>(`${this.HOST_URL}/${url}`, object, {
      withCredentials: true,
    });
  }

  delete(url: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.HOST_URL}/${url}`, {
      withCredentials: true,
    });
  }
}
