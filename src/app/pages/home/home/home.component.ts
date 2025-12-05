import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  heroImages = [
    // '/assets/img/XCaliber_Container_Custom_Shipping_Container_Gallery_13.webp',
    // '/assets/img/2.jpg',
    // '/assets/img/container-offices.jpg',
    'assets/img/bg-1.jpg',
    'assets/img/2.jpg',
    'assets/img/container-offices.jpg',
  ];

  products: Product[] = [];

  currentImageIndex = 0;
  private slideInterval: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.startAutoSlide();

    this.products = this.productService.getAllProducts();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); // Auto-slide every 4 seconds
  }

  stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide(): void {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.heroImages.length;
  }

  prevSlide(): void {
    this.currentImageIndex =
      this.currentImageIndex === 0
        ? this.heroImages.length - 1
        : this.currentImageIndex - 1;
  }

  goToSlide(index: number): void {
    this.currentImageIndex = index;
    // Reset auto-slide timer when manually navigating
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
