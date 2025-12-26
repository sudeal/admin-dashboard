import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { ProductStockItem } from "./product-stock.model";
import { ProductStockService } from "./product-stock.service";

@Component({
  selector: "app-product-stock-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-stock.page.html",
  styleUrl: "./product-stock.page.css",
})
export class ProductStockPage implements OnInit {
  products$!: Observable<ProductStockItem[]>;
  query = "";

  constructor(private productStockService: ProductStockService) {}

  ngOnInit(): void {
    this.products$ = this.productStockService.getProducts();
  }

  onSearch(value: string) {
    this.query = value.toLowerCase().trim();
  }

  trackById(_: number, item: ProductStockItem) {
    return item.id;
  }
}
