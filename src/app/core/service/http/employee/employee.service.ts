import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { Employee } from '../../../model/Employee.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(@Inject(HttpService) private httpService: HttpService) {}

  getEmployees(queryParams?: any): Observable<any> {
    let httpParams: HttpParams = new HttpParams().set(
      'filter',
      encodeURIComponent(JSON.stringify(queryParams || {}))
    );

    return this.httpService.get(`employee`, httpParams);
  }

  getEmployeeDetails(_id: string): Observable<any> {
    return this.httpService.get(`employee/${_id}`);
  }

  addEmployee(newEmployee: Employee): Observable<any> {
    return this.httpService.post(`employee`, newEmployee);
  }

  deleteEmployee(_id: string): Observable<any> {
    return this.httpService.delete(`employee/${_id}`);
  }

  updateEmployee(_id: string, updatedEmployee: Employee): Observable<any> {
    return this.httpService.put(`employee/${_id}`, updatedEmployee);
  }
}
