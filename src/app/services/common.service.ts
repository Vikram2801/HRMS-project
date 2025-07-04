import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, hrms } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  getEmployees(id: string, query: any = {}) {
    const params = new HttpParams({ fromObject: query });
    return this.http.get(environment.baseUrl + hrms.getEmployees + '/' + id, { params });
  }
  getEmployeeById(id: string, empId: string = '') {
    return this.http.get(environment.baseUrl + hrms.getEmployeeById + '/' + id + '/' + empId);
  }
  addEmployee(formData: FormData) {
    return this.http.post(environment.baseUrl + hrms.addEmployee, formData)

  }

}
