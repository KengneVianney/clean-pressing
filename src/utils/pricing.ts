export const services = [
  { name: "Nettoyage à sec", price: 4000 },
  { name: "Repassage", price: 2000 },
  { name: "Nettoyage + Repassage", price: 5000 },
  { name: "Nettoyage spécial", price: 8000 },
];

export function calculatePrice(serviceName: string, quantity: number): number {
  const service = services.find((s) => s.name === serviceName);
  return (service?.price ?? 0) * quantity;
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString() + " FCFA";
}
