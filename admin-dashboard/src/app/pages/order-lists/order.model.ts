export type OrderStatus = "Completed" | "Processing" | "Rejected" | "On Hold" | "In Transit";

export type OrderRow = {
  id: string;        // 00001 gibi
  name: string;
  address: string;
  date: string;      // "04 Sep 2019"
  type: string;      // üründen: category
  status: OrderStatus;
};
