import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-order-history',
  standalone: false,
  templateUrl: './order-history.html',
  styleUrl: './order-history.css'
})
export class OrderHistory implements OnInit, AfterViewInit {
  displayedColumns = ["category", "name", "quantity", "price", "eta", "status"];
  
  productSource = new MatTableDataSource<Product>();

  @ViewChild (MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.products$.subscribe(products => {
      this.productSource.data = products;
    });
  }

  ngAfterViewInit(): void {
    this.productSource.sort = this.sort;
    this.productSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.productSource.filter = filterValue.trim().toLowerCase();
  }
}
