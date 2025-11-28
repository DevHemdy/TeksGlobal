import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComparisonService } from '../../services/comparison.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.scss'
})
export class ComparisonComponent implements OnInit {
  comparisonItems: Product[] = [];

  constructor(
    private comparisonService: ComparisonService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadComparison();
    this.comparisonService.comparison$.subscribe(() => {
      this.loadComparison();
    });
  }

  loadComparison(): void {
    this.comparisonItems = this.comparisonService.getComparisonItems();
  }

  removeItem(productId: number): void {
    this.comparisonService.removeFromComparison(productId);
  }

  clearAll(): void {
    if (confirm('Are you sure you want to clear the comparison?')) {
      this.comparisonService.clearComparison();
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    alert(`Added ${product.name} to cart!`);
  }

  extractSquareFeet(sizeString: string): number {
    const match = sizeString.match(/(\d+)\s*sq\s*ft/i);
    return match ? parseInt(match[1]) : 0;
  }

  getFeatureValue(product: Product, feature: string): string {
    const hasFeature = product.features.some(f => 
      f.toLowerCase().includes(feature.toLowerCase())
    );
    return hasFeature ? '✓' : '—';
  }

  getFeatureName(feature: string): string {
    // Extract just the main feature name for cleaner display
    return feature.split(/[:-]/)[0].trim();
  }
}
