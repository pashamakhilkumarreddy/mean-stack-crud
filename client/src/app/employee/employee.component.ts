import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeesList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = {
        _id: '',
        name: '',
        position: '',
        office: '',
        salary: null
      }
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id === '') {
      this.employeeService.postEmployee(form.value).subscribe(res => {
        this.refreshEmployeesList();
        this.resetForm(form);
        M.toast({
          html: 'Saved employee details successfully',
          classes: 'rounded'
        });
      });
    } else {
      this.employeeService.updateEmployee(form.value).subscribe(res => {
        this.refreshEmployeesList();
        this.resetForm(form);
        M.toast({
          html: 'Updated employee details successfully',
          classes: 'rounded'
        });
      });
    }
   
  }

  refreshEmployeesList() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employeeService.employees = res as Employee[];
    })
  }

  editEmployee(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  deleteEmployee(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete the employee?') === true) {
      this.employeeService.deleteEmployee(_id).subscribe(res => {
        this.refreshEmployeesList();
        this.resetForm(form);
        M.toast({
          html: 'Deleted employee details successfully',
          classes: 'rounded'
        });
      });
    }
  }
}
