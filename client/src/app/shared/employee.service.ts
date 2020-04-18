import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly baseURL: 'http://localhost:3000/employees';
  constructor(private http: HttpClient) { 
  }

  getEmployees() {
    return this.http.get(this.baseURL);
  }

  postEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp);
  }

  updateEmployee(emp: Employee) {
    return this.http.put(`${this.baseURL}/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(`${this.baseURL}/${_id}`);
  }
}
