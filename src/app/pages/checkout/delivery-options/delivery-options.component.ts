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

interface Country {
  name: string;
  code: string;
  states: State[];
}

interface State {
  name: string;
  cities: string[];
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
      price: 150000,
      icon: 'truck'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: 'Priority shipping with expedited installation',
      estimatedDays: '7-10 business days',
      price: 300000,
      icon: 'fast-truck'
    },
    {
      id: 'premium',
      name: 'Premium White Glove',
      description: 'Dedicated delivery team with full setup and site preparation',
      estimatedDays: '5-7 business days',
      price: 450000,
      icon: 'star'
    }
  ];

  countries: Country[] = [
    {
      name: 'Nigeria',
      code: 'NG',
      states: [
        { name: 'Lagos', cities: ['Ikeja', 'Victoria Island', 'Lekki', 'Surulere', 'Yaba', 'Apapa'] },
        { name: 'Abuja (FCT)', cities: ['Garki', 'Wuse', 'Maitama', 'Asokoro', 'Gwagwalada'] },
        { name: 'Rivers', cities: ['Port Harcourt', 'Obio-Akpor', 'Eleme', 'Ikwerre', 'Okrika'] },
        { name: 'Kano', cities: ['Kano Municipal', 'Nassarawa', 'Fagge', 'Dala', 'Gwale'] },
        { name: 'Oyo', cities: ['Ibadan', 'Ogbomosho', 'Oyo', 'Iseyin', 'Saki'] },
        { name: 'Delta', cities: ['Warri', 'Asaba', 'Sapele', 'Ughelli', 'Agbor'] },
        { name: 'Kaduna', cities: ['Kaduna', 'Zaria', 'Kafanchan', 'Kagoro', 'Kachia'] },
        { name: 'Enugu', cities: ['Enugu', 'Nsukka', 'Agbani', 'Udi', 'Awgu'] },
        { name: 'Anambra', cities: ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia', 'Agulu'] },
        { name: 'Edo', cities: ['Benin City', 'Auchi', 'Ekpoma', 'Uromi', 'Ubiaja'] }
      ]
    },
    {
      name: 'United States',
      code: 'US',
      states: [
        { name: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'] },
        { name: 'Texas', cities: ['Houston', 'Dallas', 'Austin', 'San Antonio'] },
        { name: 'New York', cities: ['New York City', 'Buffalo', 'Rochester', 'Albany'] }
      ]
    }
  ];

  selectedDeliveryOption: string = 'standard';

  deliveryAddress: DeliveryAddress = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria',
    specialInstructions: ''
  };

  availableStates: State[] = [];
  availableCities: string[] = [];

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

    // Initialize states for default country (Nigeria)
    this.onCountryChange();
  }

  onCountryChange(): void {
    const selectedCountry = this.countries.find(c => c.name === this.deliveryAddress.country);
    this.availableStates = selectedCountry?.states || [];
    this.availableCities = [];
    this.deliveryAddress.state = '';
    this.deliveryAddress.city = '';
  }

  onStateChange(): void {
    const selectedState = this.availableStates.find(s => s.name === this.deliveryAddress.state);
    this.availableCities = selectedState?.cities || [];
    this.deliveryAddress.city = '';
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

    // Zip code validation (more flexible for international)
    if (!this.deliveryAddress.zipCode.trim()) {
      this.formErrors['zipCode'] = 'Postal code is required';
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
      
      // Navigate to payment step
      this.router.navigate(['/checkout/payment']);
    }
  }

  hasError(field: string): boolean {
    return !!this.formErrors[field];
  }

  getError(field: string): string {
    return this.formErrors[field] || '';
  }
}
