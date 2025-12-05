import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../../services/cart.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit {
  cartItems: CartItem[] = [];
  customerInfo: any = null;
  deliveryInfo: any = null;
  paymentInfo: any = null;
  
  deliveryOptions = [
    { id: 'standard', name: 'Standard Delivery', price: 150000 },
    { id: 'express', name: 'Express Delivery', price: 300000 },
    { id: 'premium', name: 'Premium White Glove', price: 450000 }
  ];

  isProcessing: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if all previous steps are completed
    const customerData = localStorage.getItem('customerInfo');
    const deliveryData = localStorage.getItem('deliveryInfo');
    const paymentData = localStorage.getItem('paymentInfo');
    
    if (!customerData || !deliveryData || !paymentData) {
      this.router.navigate(['/checkout/customer-info']);
      return;
    }

    // Load all checkout data
    this.customerInfo = JSON.parse(customerData);
    this.deliveryInfo = JSON.parse(deliveryData);
    this.paymentInfo = JSON.parse(paymentData);

    // Load cart items
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getDeliveryFee(): number {
    const option = this.deliveryOptions.find(opt => opt.id === this.deliveryInfo.option);
    return option?.price || 0;
  }

  getTax(): number {
    const subtotal = this.getSubtotal();
    return subtotal * 0.08; // 8% tax rate
  }

  getTotal(): number {
    return this.getSubtotal() + this.getDeliveryFee() + this.getTax();
  }

  getDeliveryOptionName(): string {
    const option = this.deliveryOptions.find(opt => opt.id === this.deliveryInfo.option);
    return option?.name || '';
  }

  placeOrder(): void {
    this.isProcessing = true;

    // Simulate order processing
    setTimeout(() => {
      // Create order data
      const orderData = {
        orderId: 'CB-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        orderDate: new Date().toISOString(),
        customer: this.customerInfo,
        delivery: this.deliveryInfo,
        payment: this.paymentInfo,
        items: this.cartItems,
        pricing: {
          subtotal: this.getSubtotal(),
          deliveryFee: this.getDeliveryFee(),
          tax: this.getTax(),
          total: this.getTotal()
        }
      };

      // Save order
      localStorage.setItem('lastOrder', JSON.stringify(orderData));

      // Clear checkout data
      localStorage.removeItem('customerInfo');
      localStorage.removeItem('deliveryInfo');
      localStorage.removeItem('paymentInfo');

      // Clear cart
      this.cartService.clearCart();

      // Navigate to confirmation
      this.router.navigate(['/checkout/confirmation']);
    }, 2000);
  }
}
