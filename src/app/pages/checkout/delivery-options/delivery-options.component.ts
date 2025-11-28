import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  estimatedDays: string;
  price: number;
  icon: string;
}

interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  specialInstructions?: string;
}

@Component({
  selector: 'app-delivery-options',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './delivery-options.component.html',
  styleUrl: './delivery-options.component.scss'
})
export class DeliveryOptionsComponent implements OnInit {
  deliveryOptions: DeliveryOption[] = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: 'Ground shipping with professional installation team',
      estimatedDays: '14-21 business days',
      price: 499,
      icon: 'truck'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: 'Priority shipping with expedited installation',
      estimatedDays: '7-10 business days',
      price: 999,
      icon: 'fast-truck'
    },
    {
      id: 'premium',
      name: 'Premium White Glove',
      description: 'Dedicated delivery team with full setup and site preparation',
      estimatedDays: '5-7 business days',
      price: 1499,
      icon: 'star'
    }
  ];

  selectedDeliveryOption: string = 'standard';

  deliveryAddress: DeliveryAddress = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    specialInstructions: ''
  };

  formErrors: { [key: string]: string } = {};
  customerName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Load customer info from previous step
    const customerInfo = localStorage.getItem('customerInfo');
    if (customerInfo) {
      const data = JSON.parse(customerInfo);
      this.customerName = `${data.firstName} ${data.lastName}`;
    } else {
      // Redirect back if customer info not found
      this.router.navigate(['/checkout/customer-info']);
    }
  }

  selectDeliveryOption(optionId: string): void {
    this.selectedDeliveryOption = optionId;
  }

  getSelectedOption(): DeliveryOption | undefined {
    return this.deliveryOptions.find(opt => opt.id === this.selectedDeliveryOption);
  }

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    // Street validation
    if (!this.deliveryAddress.street.trim()) {
      this.formErrors['street'] = 'Street address is required';
      isValid = false;
    }

    // City validation
    if (!this.deliveryAddress.city.trim()) {
      this.formErrors['city'] = 'City is required';
      isValid = false;
    }

    // State validation
    if (!this.deliveryAddress.state.trim()) {
      this.formErrors['state'] = 'State is required';
      isValid = false;
    }

    // Zip code validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!this.deliveryAddress.zipCode.trim()) {
      this.formErrors['zipCode'] = 'ZIP code is required';
      isValid = false;
    } else if (!zipRegex.test(this.deliveryAddress.zipCode)) {
      this.formErrors['zipCode'] = 'Please enter a valid ZIP code';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(): void {
    if (this.validateForm()) {
      // Save to localStorage
      const deliveryData = {
        option: this.selectedDeliveryOption,
        address: this.deliveryAddress
      };
      localStorage.setItem('deliveryInfo', JSON.stringify(deliveryData));
      
      // Navigate to payment step (to be created)
      console.log('Delivery info saved:', deliveryData);
      alert('Delivery options saved! Payment step coming soon.');
      // this.router.navigate(['/checkout/payment']);
    }
  }

  hasError(field: string): boolean {
    return !!this.formErrors[field];
  }

  getError(field: string): string {
    return this.formErrors[field] || '';
  }
}
