import { Component, OnInit } from "@angular/core";
import { CommonModule, AsyncPipe } from "@angular/common";
import { Observable } from "rxjs";

import { ProductStockService } from "../product-stock/product-stock.service";
import { ProductStockItem } from "../product-stock/product-stock.model";

@Component({
  selector: "app-products-page",
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: "./products.page.html",
  styleUrl: "./products.page.css",
})
export class ProductsPage implements OnInit {
  products$!: Observable<ProductStockItem[]>;

  constructor(private productStockService: ProductStockService) {}

  ngOnInit(): void {
    this.products$ = this.productStockService.getProducts();
  }

  trackById(_: number, item: ProductStockItem) {
    return item.id;
  }
}
