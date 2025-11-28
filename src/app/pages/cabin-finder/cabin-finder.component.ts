import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { ComparisonService } from '../../services/comparison.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cabin-finder',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cabin-finder.component.html',
  styleUrl: './cabin-finder.component.scss'
})
export class CabinFinderComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  comparisonItems: Product[] = [];
  
  // Filter options
  selectedSize: string = 'all';
  selectedStyle: string = 'all';
  ecoFriendlyOnly: boolean = false;
  selectedPriceRange: string = 'all';
  selectedFeatures: string[] = [];
  
  // Available options
  sizeOptions = [
    { value: 'all', label: 'All Sizes' },
    { value: 'small', label: 'Small (< 250 sq ft)', min: 0, max: 250 },
    { value: 'medium', label: 'Medium (250-400 sq ft)', min: 250, max: 400 },
    { value: 'large', label: 'Large (> 400 sq ft)', min: 400, max: 10000 }
  ];
  
  styleOptions = [
    { value: 'all', label: 'All Styles' },
    { value: 'office', label: 'Office' },
    { value: 'living', label: 'Living' },
    { value: 'studio', label: 'Studio' },
    { value: 'eco-friendly', label: 'Eco-Friendly' }
  ];
  
  priceOptions = [
    { value: 'all', label: 'All Prices' },
    { value: 'budget', label: 'Budget (< ₦2M)', min: 0, max: 2000000 },
    { value: 'mid', label: 'Mid-Range (₦2M-₦3M)', min: 2000000, max: 3000000 },
    { value: 'premium', label: 'Premium (> ₦3M)', min: 3000000, max: 100000000 }
  ];
  
  availableFeatures = [
    'Solar panels',
    'Rainwater collection',
    'Climate control',
    'Premium insulation',
    'Double-glazed windows',
    'Built-in furniture'
  ];
  
  // View mode
  viewMode: 'grid' | 'list' = 'grid';
  
  // Sort option
  sortBy: string = 'name';

  constructor(
    private productService: ProductService,
    public comparisonService: ComparisonService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.allProducts = this.productService.getAllProducts();
    this.applyFilters();
    
    // Subscribe to comparison changes
    this.comparisonService.comparison$.subscribe(items => {
      this.comparisonItems = items;
    });
  }

  applyFilters(): void {
    let filtered = [...this.allProducts];
    
    // Size filter
    if (this.selectedSize !== 'all') {
      const sizeOption = this.sizeOptions.find(s => s.value === this.selectedSize);
      if (sizeOption && 'min' in sizeOption && 'max' in sizeOption && sizeOption.min !== undefined && sizeOption.max !== undefined) {
        filtered = filtered.filter(p => {
          const sqFt = this.extractSquareFeet(p.size);
          return sqFt >= sizeOption.min! && sqFt <= sizeOption.max!;
        });
      }
    }
    
    // Style filter
    if (this.selectedStyle !== 'all') {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === this.selectedStyle.toLowerCase()
      );
    }
    
    // Eco-friendly filter
    if (this.ecoFriendlyOnly) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase().includes('eco') ||
        p.features.some(f => 
          f.toLowerCase().includes('solar') ||
          f.toLowerCase().includes('eco') ||
          f.toLowerCase().includes('rainwater') ||
          f.toLowerCase().includes('recycled')
        )
      );
    }
    
    // Price filter
    if (this.selectedPriceRange !== 'all') {
      const priceOption = this.priceOptions.find(p => p.value === this.selectedPriceRange);
      if (priceOption && 'min' in priceOption && 'max' in priceOption && priceOption.min !== undefined && priceOption.max !== undefined) {
        filtered = filtered.filter(p => 
          p.price >= priceOption.min! && p.price <= priceOption.max!
        );
      }
    }
    
    // Features filter
    if (this.selectedFeatures.length > 0) {
      filtered = filtered.filter(p => 
        this.selectedFeatures.every(feature =>
          p.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))
        )
      );
    }
    
    // Sort
    this.sortProducts(filtered);
    
    this.filteredProducts = filtered;
  }

  sortProducts(products: Product[]): void {
    switch (this.sortBy) {
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'size':
        products.sort((a, b) => this.extractSquareFeet(a.size) - this.extractSquareFeet(b.size));
        break;
    }
  }

  extractSquareFeet(sizeString: string): number {
    const match = sizeString.match(/(\d+)\s*sq\s*ft/i);
    return match ? parseInt(match[1]) : 0;
  }

  toggleFeature(feature: string): void {
    const index = this.selectedFeatures.indexOf(feature);
    if (index > -1) {
      this.selectedFeatures.splice(index, 1);
    } else {
      this.selectedFeatures.push(feature);
    }
    this.applyFilters();
  }

  isFeatureSelected(feature: string): boolean {
    return this.selectedFeatures.includes(feature);
  }

  clearFilters(): void {
    this.selectedSize = 'all';
    this.selectedStyle = 'all';
    this.ecoFriendlyOnly = false;
    this.selectedPriceRange = 'all';
    this.selectedFeatures = [];
    this.applyFilters();
  }

  addToComparison(product: Product): void {
    const added = this.comparisonService.addToComparison(product);
    if (!added) {
      alert(`You can only compare up to ${this.comparisonService.getMaxItems()} cabins at a time.`);
    }
  }

  removeFromComparison(productId: number): void {
    this.comparisonService.removeFromComparison(productId);
  }

  isInComparison(productId: number): boolean {
    return this.comparisonService.isInComparison(productId);
  }

  canAddToComparison(): boolean {
    return this.comparisonService.canAddMore();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    alert(`Added ${product.name} to cart!`);
  }

  clearComparison(): void {
    if (confirm('Are you sure you want to clear the comparison?')) {
      this.comparisonService.clearComparison();
    }
  }

  get comparisonCount(): number {
    return this.comparisonItems.length;
  }

  get activeFiltersCount(): number {
    let count = 0;
    if (this.selectedSize !== 'all') count++;
    if (this.selectedStyle !== 'all') count++;
    if (this.ecoFriendlyOnly) count++;
    if (this.selectedPriceRange !== 'all') count++;
    count += this.selectedFeatures.length;
    return count;
  }
}
