import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.html'
})

export class ProductComponent {

}

export interface Product {
    category: string,
    name: string,
    quantity: number,
    price: number,
    eta: Date;
    status?: 'delivered' | 'canceled' | 'ordered';
}