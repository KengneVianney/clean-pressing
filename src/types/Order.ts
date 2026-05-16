export type OrderStatus = "pending" | "processing" | "completed" | "delivered" | "cancelled";

export interface Order {
  id?: number;
  orderId: string;
  client: string;
  phone: string;
  email: string;
  article: string;
  quantity: number;
  service: string;
  total: number;
  status: OrderStatus;
  notes: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}
