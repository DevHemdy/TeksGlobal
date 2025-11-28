import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent implements OnInit {
  orderData: any = null;
  estimatedDeliveryDate: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Load order data
    const lastOrder = localStorage.getItem('lastOrder');
    
    if (!lastOrder) {
      // No order found, redirect to home
      this.router.navigate(['/']);
      return;
    }

    this.orderData = JSON.parse(lastOrder);
    this.calculateEstimatedDelivery();
  }

  calculateEstimatedDelivery(): void {
    const today = new Date();
    let daysToAdd = 21; // Default standard delivery

    if (this.orderData.delivery.option === 'express') {
      daysToAdd = 10;
    } else if (this.orderData.delivery.option === 'premium') {
      daysToAdd = 7;
    }

    const deliveryDate = new Date(today);
    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);

    this.estimatedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  printOrder(): void {
    window.print();
  }

  getDeliveryOptionName(): string {
    const deliveryOptions = [
      { id: 'standard', name: 'Standard Delivery' },
      { id: 'express', name: 'Express Delivery' },
      { id: 'premium', name: 'Premium White Glove' }
    ];
    const option = deliveryOptions.find(opt => opt.id === this.orderData.delivery.option);
    return option?.name || '';
  }
}
