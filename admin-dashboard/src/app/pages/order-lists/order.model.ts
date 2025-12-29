export type OrderStatus = "Completed" | "Processing" | "Rejected" | "On Hold" | "In Transit";
export type PaymentStatus = "Paid" | "Pending" | "Failed";

export type OrderRow = {
  id: string;        // 00001
  name: string;
  address: string;
  date: string;      // "04 Sep 2019"
  type: string;      // category
  status: OrderStatus;

  // ✅ details için ek alanlar
  payment: PaymentStatus;
  email: string;
  phone: string;
  items: Array<{ productId: string; qty: number }>;
};
