import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { EmployeeComponent } from '../employee/employee.component';
import { AuthService } from '../services/auth.service';
declare var bootstrap: any;
@Component({
  selector: 'app-sidenav',
  imports: [
    RouterLinkActive,
    RouterLink,
    CommonModule,
    RouterOutlet,
    EmployeeComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  isButton = false;
  isDrop = false;
  isModal = false;
  isDropdownOpen: boolean = false;
  isAddNewOpen: boolean = false;
  router = inject(Router);
  constructor(private auth: AuthService,) { }
  exampleModalInstance: any = null;
  user: any
  @ViewChild(EmployeeComponent) employeeComponent!: EmployeeComponent;
  ngOnInit() {
    this.user = this.auth.getUser();
  }

  toggleAddNew() {
    this.isAddNewOpen = !this.isAddNewOpen;
  }

  toggleMenu() {
    this.isButton = !this.isButton;
  }
  mobileDrop() {
    this.isDrop = !this.isDrop;
  }

  openModal() {
    this.isModal = true;

    setTimeout(() => {
      const modalEl = document.getElementById('exampleModal');
      if (modalEl) {
        this.exampleModalInstance = new bootstrap.Modal(modalEl, {
          backdrop: 'static',
          keyboard: false
        });
        this.exampleModalInstance.show();
      }
    }, 0);
  }

  onEmployeeAdded() {
    if (this.exampleModalInstance) {
      this.exampleModalInstance.hide();
    }
  }


  openDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}

