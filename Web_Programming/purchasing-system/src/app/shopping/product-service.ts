import { Injectable } from '@angular/core';
import { Product } from "./product"
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ProductService {
    private products: Product [] = [
        { category: 'Clothing', name: 'Jeans', quantity: 84, price: 314.59, eta: new Date('2025-07-03'), status: 'ordered' },
        { category: 'Home Appliances', name: 'Refrigerator', quantity: 47, price: 31.31, eta: new Date('2025-07-12'), status: 'ordered' },
        { category: 'Books', name: 'Science Book', quantity: 7, price: 132.05, eta: new Date('2025-07-10'), status: 'ordered' },
        { category: 'Clothing', name: 'T-shirt', quantity: 46, price: 354.16, eta: new Date('2025-07-07'), status: 'ordered' },
        { category: 'Books', name: 'Novel', quantity: 78, price: 381.52, eta: new Date('2025-06-30'), status: 'canceled' },
        { category: 'Books', name: 'Science Book', quantity: 96, price: 166.22, eta: new Date('2025-07-06'), status: 'ordered' },
        { category: 'Fitness Equipment', name: 'Kettlebell', quantity: 91, price: 457.19, eta: new Date('2025-07-03'), status: 'delivered' },
        { category: 'Books', name: 'Science Book', quantity: 70, price: 82.88, eta: new Date('2025-07-06'), status: 'delivered' },
        { category: 'Books', name: 'Comics', quantity: 13, price: 425.30, eta: new Date('2025-07-01'), status: 'ordered' },
        { category: 'Fitness Equipment', name: 'Treadmill', quantity: 68, price: 138.23, eta: new Date('2025-07-04'), status: 'ordered' },
        { category: 'Home Appliances', name: 'Refrigerator', quantity: 17, price: 441.91, eta: new Date('2025-06-30'), status: 'ordered' },
        { category: 'Home Appliances', name: 'Washer', quantity: 57, price: 278.67, eta: new Date('2025-07-08'), status: 'canceled' },
        { category: 'Fitness Equipment', name: 'Dumbbells', quantity: 90, price: 287.63, eta: new Date('2025-07-01'), status: 'delivered' },
        { category: 'Books', name: 'Biography', quantity: 19, price: 208.90, eta: new Date('2025-07-09'), status: 'ordered' },
        { category: 'Toys & Games', name: 'Lego Set', quantity: 22, price: 129.32, eta: new Date('2025-07-13'), status: 'canceled' },
        { category: 'Electronics', name: 'Monitor', quantity: 49, price: 224.76, eta: new Date('2025-07-13'), status: 'canceled' },
        { category: 'Books', name: 'Comics', quantity: 45, price: 330.94, eta: new Date('2025-07-09'), status: 'ordered' },
        { category: 'Home Appliances', name: 'Vacuum', quantity: 17, price: 157.23, eta: new Date('2025-07-05'), status: 'delivered' },
        { category: 'Fitness Equipment', name: 'Exercise Bike', quantity: 6, price: 264.44, eta: new Date('2025-07-13'), status: 'ordered' },
        { category: 'Clothing', name: 'Jacket', quantity: 100, price: 499.54, eta: new Date('2025-07-06'), status: 'delivered' },
        { category: 'Clothing', name: 'T-shirt', quantity: 24, price: 267.07, eta: new Date('2025-07-06'), status: 'ordered' },
        { category: 'Toys & Games', name: 'Board Game', quantity: 46, price: 444.31, eta: new Date('2025-07-12'), status: 'canceled' },
        { category: 'Fitness Equipment', name: 'Kettlebell', quantity: 51, price: 285.69, eta: new Date('2025-07-10'), status: 'delivered' },
        { category: 'Home Appliances', name: 'Vacuum', quantity: 60, price: 153.87, eta: new Date('2025-07-13'), status: 'ordered' },
        { category: 'Fitness Equipment', name: 'Dumbbells', quantity: 67, price: 362.66, eta: new Date('2025-07-03'), status: 'ordered' },
        { category: 'Books', name: 'Biography', quantity: 73, price: 407.98, eta: new Date('2025-07-02'), status: 'ordered' },
        { category: 'Books', name: 'Novel', quantity: 63, price: 121.50, eta: new Date('2025-07-01'), status: 'canceled' },
        { category: 'Electronics', name: 'Tablet', quantity: 28, price: 288.18, eta: new Date('2025-07-10'), status: 'canceled' },
        { category: 'Books', name: 'Science Book', quantity: 77, price: 261.32, eta: new Date('2025-07-06'), status: 'ordered' },
        { category: 'Fitness Equipment', name: 'Dumbbells', quantity: 81, price: 479.07, eta: new Date('2025-07-07'), status: 'delivered' },
        { category: 'Books', name: 'Science Book', quantity: 24, price: 100.37, eta: new Date('2025-07-05'), status: 'ordered' },
        { category: 'Fitness Equipment', name: 'Kettlebell', quantity: 80, price: 492.37, eta: new Date('2025-07-05'), status: 'canceled' },
        { category: 'Fitness Equipment', name: 'Treadmill', quantity: 57, price: 162.88, eta: new Date('2025-07-09'), status: 'delivered' },
        { category: 'Electronics', name: 'Camera', quantity: 13, price: 69.27, eta: new Date('2025-07-10'), status: 'delivered' },
        { category: 'Fitness Equipment', name: 'Yoga Mat', quantity: 37, price: 251.68, eta: new Date('2025-07-06'), status: 'ordered' },
        { category: 'Books', name: 'Biography', quantity: 3, price: 115.34, eta: new Date('2025-07-02'), status: 'ordered' },
        { category: 'Books', name: 'Biography', quantity: 36, price: 223.86, eta: new Date('2025-07-07'), status: 'ordered' },
        { category: 'Fitness Equipment', name: 'Dumbbells', quantity: 76, price: 327.87, eta: new Date('2025-07-06'), status: 'canceled' },
        { category: 'Home Appliances', name: 'Washer', quantity: 73, price: 390.13, eta: new Date('2025-06-30'), status: 'delivered' },
        { category: 'Clothing', name: 'T-shirt', quantity: 24, price: 379.68, eta: new Date('2025-07-08'), status: 'delivered' },
        { category: 'Books', name: 'Cookbook', quantity: 67, price: 321.22, eta: new Date('2025-07-12'), status: 'delivered' },
        { category: 'Toys & Games', name: 'Board Game', quantity: 28, price: 117.05, eta: new Date('2025-07-08'), status: 'ordered' },
        { category: 'Toys & Games', name: 'Lego Set', quantity: 37, price: 351.62, eta: new Date('2025-07-12'), status: 'ordered' },
        { category: 'Electronics', name: 'Smartphone', quantity: 67, price: 419.77, eta: new Date('2025-07-09'), status: 'ordered' },
        { category: 'Toys & Games', name: 'Board Game', quantity: 32, price: 138.56, eta: new Date('2025-07-04'), status: 'delivered' },
        { category: 'Electronics', name: 'Laptop', quantity: 70, price: 10.88, eta: new Date('2025-07-10'), status: 'ordered' },
        { category: 'Fitness Equipment', name: 'Yoga Mat', quantity: 10, price: 305.75, eta: new Date('2025-07-01'), status: 'delivered' },
        { category: 'Clothing', name: 'Jeans', quantity: 65, price: 219.04, eta: new Date('2025-07-06'), status: 'delivered' },
        { category: 'Electronics', name: 'Laptop', quantity: 49, price: 445.70, eta: new Date('2025-07-13'), status: 'ordered' },
        { category: 'Books', name: 'Science Book', quantity: 53, price: 422.55, eta: new Date('2025-07-01'), status: 'canceled' },
        { category: 'Toys & Games', name: 'Action Figure', quantity: 95, price: 158.65, eta: new Date('2025-07-12'), status: 'ordered' },
        { category: 'Books', name: 'Biography', quantity: 22, price: 445.96, eta: new Date('2025-07-10'), status: 'ordered' },
        { category: 'Clothing', name: 'Sneakers', quantity: 15, price: 322.11, eta: new Date('2025-07-02'), status: 'ordered' },
        { category: 'Books', name: 'Biography', quantity: 50, price: 33.71, eta: new Date('2025-07-01'), status: 'ordered' },
        { category: 'Books', name: 'Novel', quantity: 33, price: 328.32, eta: new Date('2025-07-08'), status: 'canceled' },
        { category: 'Clothing', name: 'Sneakers', quantity: 40, price: 175.59, eta: new Date('2025-07-05'), status: 'ordered' },
        { category: 'Home Appliances', name: 'Refrigerator', quantity: 84, price: 251.03, eta: new Date('2025-07-11'), status: 'canceled' },
        { category: 'Clothing', name: 'Jeans', quantity: 17, price: 292.95, eta: new Date('2025-07-10'), status: 'delivered' },
        { category: 'Home Appliances', name: 'Toaster', quantity: 10, price: 133.51, eta: new Date('2025-06-30'), status: 'delivered' },
        { category: 'Toys & Games', name: 'Lego Set', quantity: 44, price: 479.67, eta: new Date('2025-07-08'), status: 'ordered' },
        { category: 'Home Appliances', name: 'Refrigerator', quantity: 82, price: 322.01, eta: new Date('2025-07-13'), status: 'canceled' },
        { category: 'Clothing', name: 'T-shirt', quantity: 12, price: 349.04, eta: new Date('2025-07-09'), status: 'delivered' },
        { category: 'Fitness Equipment', name: 'Kettlebell', quantity: 50, price: 268.75, eta: new Date('2025-07-11'), status: 'canceled' },
        { category: 'Home Appliances', name: 'Refrigerator', quantity: 8, price: 374.68, eta: new Date('2025-06-30'), status: 'ordered' },
        { category: 'Home Appliances', name: 'Vacuum', quantity: 2, price: 208.36, eta: new Date('2025-07-06') }
    ];
    private productsSubject = new BehaviorSubject<Product[]>(this.products);

    products$ = this.productsSubject.asObservable();

    getProducts() {
        return this.products;
    }

    addOrder(product: Product) {
        this.products.push(product);
        this.productsSubject.next(this.products);
    }
}
