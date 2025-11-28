import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface FilterOptions {
  sizeRange: {
    min: number;
    max: number;
  };
  styles: string[];
  ecoFriendly: boolean;
  priceRange: {
    min: number;
    max: number;
  };
  features: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
  private comparisonItems: Product[] = [];
  private comparisonSubject = new BehaviorSubject<Product[]>([]);
  public comparison$ = this.comparisonSubject.asObservable();
  
  private maxComparisonItems = 3;

  constructor() {
    this.loadComparisonFromStorage();
  }

  private loadComparisonFromStorage(): void {
    const saved = localStorage.getItem('comparison');
    if (saved) {
      this.comparisonItems = JSON.parse(saved);
      this.comparisonSubject.next(this.comparisonItems);
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('comparison', JSON.stringify(this.comparisonItems));
    this.comparisonSubject.next(this.comparisonItems);
  }

  addToComparison(product: Product): boolean {
    if (this.comparisonItems.length >= this.maxComparisonItems) {
      return false;
    }
    
    if (!this.isInComparison(product.id)) {
      this.comparisonItems.push(product);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  removeFromComparison(productId: number): void {
    this.comparisonItems = this.comparisonItems.filter(p => p.id !== productId);
    this.saveToStorage();
  }

  clearComparison(): void {
    this.comparisonItems = [];
    this.saveToStorage();
  }

  getComparisonItems(): Product[] {
    return this.comparisonItems;
  }

  getComparisonCount(): number {
    return this.comparisonItems.length;
  }

  isInComparison(productId: number): boolean {
    return this.comparisonItems.some(p => p.id === productId);
  }

  canAddMore(): boolean {
    return this.comparisonItems.length < this.maxComparisonItems;
  }

  getMaxItems(): number {
    return this.maxComparisonItems;
  }
}
