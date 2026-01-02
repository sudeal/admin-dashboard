export type SalesDetail = {
  orderId: string;
  customerName: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  date: string;
  status: "Completed" | "Processing" | "Rejected" | "On Hold" | "In Transit";
  payment: "Paid" | "Pending" | "Failed";
};

