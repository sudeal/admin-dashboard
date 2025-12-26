import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ProductStockService } from "../product-stock/product-stock.service";
import { OrderRow, OrderStatus } from "./order.model";

@Injectable({ providedIn: "root" })
export class OrderListsService {
  constructor(private productStock: ProductStockService) {}

  getOrders(): Observable<OrderRow[]> {
    const names = [
      "Christine Brooks",
      "Rosie Pearson",
      "Darrell Caldwell",
      "Gilbert Johnston",
      "Alan Cain",
      "Alfred Murray",
      "Maggie Sullivan",
      "Rosie Todd",
      "Dollie Hines",
      "Moni Roy",
    ];

    const streets = [
      "Kutch Green Apt. 448",
      "Immanuel Ferry Suite 526",
      "Frida Ports",
      "Destiny Lake Suite 600",
      "Mylene Throughway",
      "Weimann Mountain",
      "New Scottieberg",
      "New Jon",
      "Lyla Forge Suite 975",
      "Sunset Road No:12",
    ];

    const statuses: OrderStatus[] = ["Completed", "Processing", "Rejected", "On Hold", "In Transit"];

    return this.productStock.getProducts().pipe(
      map((products) => {
        
        const count = 9;

        const orders: OrderRow[] = Array.from({ length: count }).map((_, i) => {
          const p = products[i % products.length]; 

          const id = String(i + 1).padStart(5, "0");
          const name = names[i % names.length];
          const address = `${String(80 + i)} ${streets[i % streets.length]}`;

          
          const dates = ["04 Sep 2019", "28 May 2019", "23 Nov 2019", "05 Feb 2019", "29 Jul 2019", "15 Aug 2019", "21 Dec 2019", "30 Apr 2019", "09 Jan 2019"];
          const date = dates[i % dates.length];

          const type = p.category; 
          const status = statuses[i % statuses.length];

          return { id, name, address, date, type, status };
        });

        return orders;
      })
    );
  }
}
