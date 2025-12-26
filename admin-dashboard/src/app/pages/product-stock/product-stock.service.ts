import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { ProductStockItem } from "./product-stock.model";

@Injectable({ providedIn: "root" })
export class ProductStockService {
  private readonly products: ProductStockItem[] = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
      name: "Apple Watch Series 4",
      category: "Digital Product",
      price: 690,
      piece: 63,
      colors: ["#111827", "#9CA3AF", "#F87171"],
    },
    {
      id: "2",
      imageUrl:
       "https://raw.githubusercontent.com/mdn/learning-area/main/html/multimedia-and-embedding/images-in-html/dinosaur_small.jpg",
      name: "Headphone",
      category: "Digital Product",
      price: 190,
      piece: 13,
      colors: ["#111827", "#F87171", "#60A5FA", "#FBBF24"],
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&q=80",
      name: "Women's Dress",
      category: "Fashion",
      price: 640,
      piece: 635,
      colors: ["#7C3AED", "#60A5FA", "#111827", "#2563EB"],
    },
    {
      id: "4",
      imageUrl:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
      name: "Samsung A50",
      category: "Mobile",
      price: 400,
      piece: 67,
      colors: ["#1E3A8A", "#111827", "#BE123C"],
    },
    {
      id: "5",
      imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
      name: "Galaxy",
      category: "Mobile",
      price: 420,
      piece: 52,
      colors: ["#1E3A8A", "#111827", "#BE123C"],
    },
    {
      id: "6",
      imageUrl:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
      name: "Jewelry",
      category: "Accessory",
      price: 250,
      piece: 40,
      colors: ["#FBBF24", "#111827", "#9CA3AF"],
    },
    {
      id: "7",
      imageUrl:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
      name: "Laptop",
      category: "Computer",
      price: 1250,
      piece: 28,
      colors: ["#111827", "#6B7280", "#2563EB"],
    },
  ];

  getProducts(): Observable<ProductStockItem[]> {
    return of(this.products).pipe(delay(400));
  }
}
