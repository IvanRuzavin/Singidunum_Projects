import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-new-order',
  standalone: false,
  templateUrl: './new-order.html',
  styleUrl: './new-order.css'
})
export class NewOrder {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  selectedCategory: string | null = null;
  categories: string[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.categories = [...new Set(this.products.map(p => p.category))];
    this.filteredProducts = this.products;
  }

  onCategoryChange() {
    this.filteredProducts = this.products.filter(p => p.category === this.selectedCategory);
    this.selectedProduct = null; // reset selection
  }

  onRequestOrder(): void {
    if (this.selectedProduct) {
      this.productService.addOrder(this.selectedProduct);
      alert(`Ordered: ${this.selectedProduct.name}`);
      this.products = this.productService.getProducts()
    }
  }
}
