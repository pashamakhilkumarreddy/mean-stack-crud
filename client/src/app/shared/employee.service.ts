import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public selectedEmployee: Employee;
  public employees: Array<Employee>;
  readonly baseURL = 'http://localhost:3000/employees';
  constructor(private http: HttpClient) { 
    this.selectedEmployee = new Employee();
  }

  getEmployees() {
    return this.http.get<Array<Employee>>(this.baseURL);
  }

  addEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp);
  }

  updateEmployee(emp: Employee) {
    return this.http.put(`${this.baseURL}/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(`${this.baseURL}/${_id}`);
  }
}
