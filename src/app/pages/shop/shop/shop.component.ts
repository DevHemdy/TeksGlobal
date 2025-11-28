import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  selectedCategory: string = 'all';
  products: Product[] = [];
  
  categories = [
    { id: 'all', name: 'All Cabins' },
    { id: 'office', name: 'Office' },
    { id: 'living', name: 'Living' },
    { id: 'studio', name: 'Studio' },
    { id: 'eco-friendly', name: 'Eco-Friendly' }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }
  
  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'all') {
      return this.products;
    }
    return this.products.filter(p => p.category.toLowerCase() === this.selectedCategory.toLowerCase());
  }
  
  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
  }
}
