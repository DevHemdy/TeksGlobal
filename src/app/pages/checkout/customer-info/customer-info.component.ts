import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface CustomerForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
}

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss'
})
export class CustomerInfoComponent {
  customerInfo: CustomerForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: ''
  };

  formErrors: { [key: string]: string } = {};

  constructor(private router: Router) {}

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    // First Name validation
    if (!this.customerInfo.firstName.trim()) {
      this.formErrors['firstName'] = 'First name is required';
      isValid = false;
    }

    // Last Name validation
    if (!this.customerInfo.lastName.trim()) {
      this.formErrors['lastName'] = 'Last name is required';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.customerInfo.email.trim()) {
      this.formErrors['email'] = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(this.customerInfo.email)) {
      this.formErrors['email'] = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!this.customerInfo.phone.trim()) {
      this.formErrors['phone'] = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(this.customerInfo.phone)) {
      this.formErrors['phone'] = 'Please enter a valid phone number';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(): void {
    if (this.validateForm()) {
      // Save to localStorage for next step
      localStorage.setItem('customerInfo', JSON.stringify(this.customerInfo));
      // Navigate to delivery options
      this.router.navigate(['/checkout/delivery-options']);
    }
  }

  hasError(field: string): boolean {
    return !!this.formErrors[field];
  }

  getError(field: string): string {
    return this.formErrors[field] || '';
  }
}
