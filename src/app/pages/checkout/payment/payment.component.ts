import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface PaymentForm {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  billingZip: string;
  saveCard: boolean;
}

interface BillingAddress {
  sameAsDelivery: boolean;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  paymentInfo: PaymentForm = {
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingZip: '',
    saveCard: false
  };

  billingAddress: BillingAddress = {
    sameAsDelivery: true,
    street: '',
    city: '',
    state: '',
    zipCode: ''
  };

  formErrors: { [key: string]: string } = {};
  customerName: string = '';
  deliveryFee: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if previous steps are completed
    const customerInfo = localStorage.getItem('customerInfo');
    const deliveryInfo = localStorage.getItem('deliveryInfo');
    
    if (!customerInfo || !deliveryInfo) {
      this.router.navigate(['/checkout/customer-info']);
      return;
    }

    // Load customer name
    const customer = JSON.parse(customerInfo);
    this.customerName = `${customer.firstName} ${customer.lastName}`;

    // Load delivery fee
    const delivery = JSON.parse(deliveryInfo);
    const deliveryOptions = [
      { id: 'standard', price: 150000 },
      { id: 'express', price: 300000 },
      { id: 'premium', price: 450000 }
    ];
    const selectedOption = deliveryOptions.find(opt => opt.id === delivery.option);
    this.deliveryFee = selectedOption?.price || 0;
  }

  formatCardNumber(): void {
    // Remove all non-digits
    let value = this.paymentInfo.cardNumber.replace(/\D/g, '');
    // Add space every 4 digits
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    // Limit to 19 characters (16 digits + 3 spaces)
    this.paymentInfo.cardNumber = value.substring(0, 19);
  }

  formatExpiryDate(): void {
    // Remove all non-digits
    let value = this.paymentInfo.expiryDate.replace(/\D/g, '');
    // Add slash after 2 digits
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.paymentInfo.expiryDate = value;
  }

  formatCVV(): void {
    // Remove all non-digits and limit to 4
    this.paymentInfo.cvv = this.paymentInfo.cvv.replace(/\D/g, '').substring(0, 4);
  }

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    // Card number validation (16 digits)
    const cardDigits = this.paymentInfo.cardNumber.replace(/\D/g, '');
    if (!cardDigits) {
      this.formErrors['cardNumber'] = 'Card number is required';
      isValid = false;
    } else if (cardDigits.length !== 16) {
      this.formErrors['cardNumber'] = 'Card number must be 16 digits';
      isValid = false;
    }

    // Cardholder name validation
    if (!this.paymentInfo.cardName.trim()) {
      this.formErrors['cardName'] = 'Cardholder name is required';
      isValid = false;
    }

    // Expiry date validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!this.paymentInfo.expiryDate) {
      this.formErrors['expiryDate'] = 'Expiry date is required';
      isValid = false;
    } else if (!expiryRegex.test(this.paymentInfo.expiryDate)) {
      this.formErrors['expiryDate'] = 'Invalid format (MM/YY)';
      isValid = false;
    }

    // CVV validation
    if (!this.paymentInfo.cvv) {
      this.formErrors['cvv'] = 'CVV is required';
      isValid = false;
    } else if (this.paymentInfo.cvv.length < 3) {
      this.formErrors['cvv'] = 'CVV must be 3-4 digits';
      isValid = false;
    }

    // Billing ZIP validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!this.paymentInfo.billingZip) {
      this.formErrors['billingZip'] = 'Billing ZIP code is required';
      isValid = false;
    } else if (!zipRegex.test(this.paymentInfo.billingZip)) {
      this.formErrors['billingZip'] = 'Invalid ZIP code format';
      isValid = false;
    }

    // Billing address validation if not same as delivery
    if (!this.billingAddress.sameAsDelivery) {
      if (!this.billingAddress.street.trim()) {
        this.formErrors['billingStreet'] = 'Street address is required';
        isValid = false;
      }
      if (!this.billingAddress.city.trim()) {
        this.formErrors['billingCity'] = 'City is required';
        isValid = false;
      }
      if (!this.billingAddress.state.trim()) {
        this.formErrors['billingState'] = 'State is required';
        isValid = false;
      }
    }

    return isValid;
  }

  onSubmit(): void {
    if (this.validateForm()) {
      // Save payment info (in real app, this would be tokenized and sent to payment processor)
      const paymentData = {
        lastFourDigits: this.paymentInfo.cardNumber.slice(-4),
        cardName: this.paymentInfo.cardName,
        billingZip: this.paymentInfo.billingZip,
        billingAddress: this.billingAddress.sameAsDelivery ? null : this.billingAddress
      };
      localStorage.setItem('paymentInfo', JSON.stringify(paymentData));
      
      // Navigate to review
      this.router.navigate(['/checkout/review']);
    }
  }

  hasError(field: string): boolean {
    return !!this.formErrors[field];
  }

  getError(field: string): string {
    return this.formErrors[field] || '';
  }
}
