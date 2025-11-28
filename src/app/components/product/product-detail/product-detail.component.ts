import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  selectedImage: string = '';
  quantity: number = 1;
  activeTab: string = 'description';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(parseInt(id));
    }
  }

  loadProduct(id: number): void {
    const foundProduct = this.productService.getProductById(id);
    if (foundProduct) {
      this.product = foundProduct;
      this.selectedImage = this.product.images[0];
    }
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      
      // Show success message
      const message = `✓ Added ${this.quantity} ${this.product.name} to your cart!`;
      
      // Use a custom confirmation that allows navigation
      const viewCart = confirm(`${message}\n\nWould you like to view your cart?`);
      
      if (viewCart) {
        this.router.navigate(['/cart']);
      } else {
        // Reset quantity after adding
        this.quantity = 1;
      }
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
