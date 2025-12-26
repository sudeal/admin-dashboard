export type StockColor = string;

export type ProductStockItem = {
  id: string;
  imageUrl: string;
  name: string;
  category: string;
  price: number;
  piece: number;
  colors: StockColor[]; // hex list
};
