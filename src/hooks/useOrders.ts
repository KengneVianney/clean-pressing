import { useState, useEffect } from "react";
import type { Order } from "../types/Order";
import { getAllOrders, addOrder, updateOrder, deleteOrder as dbDelete, clearAllOrders } from "../database/db";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getAllOrders().then((data) => {
      if (cancelled) return;
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(data);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  const create = async (order: Order) => {
    await addOrder(order);
    const data = await getAllOrders();
    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setOrders(data);
  };

  const update = async (id: number, changes: Partial<Order>) => {
    const data = await getAllOrders();
    const order = data.find((o) => o.id === id);
    if (!order) return;
    const updated = { ...order, ...changes, updatedAt: new Date().toISOString() };
    await updateOrder(updated);
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
  };

  const remove = async (id: number) => {
    await dbDelete(id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const clearAll = async () => {
    await clearAllOrders();
    setOrders([]);
  };

  return { orders, loading, create, update, remove, clearAll };
}
