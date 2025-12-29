import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ProductStockService } from "../product-stock/product-stock.service";
import { OrderRow, OrderStatus, PaymentStatus } from "./order.model";

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
    ];

    const dates = [
      "04 Sep 2019",
      "28 May 2019",
      "23 Nov 2019",
      "05 Feb 2019",
      "29 Jul 2019",
      "15 Aug 2019",
      "21 Dec 2019",
      "30 Apr 2019",
      "09 Jan 2019",
    ];

    const statuses: OrderStatus[] = ["Completed", "Processing", "Rejected", "On Hold", "In Transit"];
    const payments: PaymentStatus[] = ["Paid", "Pending", "Failed"];

    return this.productStock.getProducts().pipe(
      map((products) => {
        const count = 9;

        return Array.from({ length: count }).map((_, i): OrderRow => {
          const id = String(i + 1).padStart(5, "0");
          const name = names[i % names.length];
          const address = `${String(80 + i)} ${streets[i % streets.length]}`;
          const date = dates[i % dates.length];
          const status = statuses[i % statuses.length];
          const payment = payments[i % payments.length];

          // ✅ ürünlerden items üret
          const p1 = products[i % products.length];
          const p2 = products[(i + 2) % products.length];

          const items = [
            { productId: p1.id, qty: (i % 3) + 1 },
            { productId: p2.id, qty: ((i + 1) % 2) + 1 },
          ];

          const email = `${name.toLowerCase().replace(" ", ".")}@mail.com`;
          const phone = `+90 5${(30 + i) % 10}${(40 + i) % 10} ${(100 + i).toString()} ${(200 + i)
            .toString()
            .padStart(3, "0")} ${(300 + i).toString().padStart(3, "0")}`;

          // type: ilk ürünün category'si (dinamik)
          const type = p1.category;

          return { id, name, address, date, type, status, payment, email, phone, items };
        });
      })
    );
  }

  // ✅ Details sayfası bunu kullanacak
  getOrderById(id: string): Observable<OrderRow | undefined> {
    return this.getOrders().pipe(map((orders) => orders.find((o) => o.id === id)));
  }
}
