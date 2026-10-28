export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  instructions?: string;
  category: string;
}

export type OrderStatus = "new" | "preparing" | "out_for_delivery" | "completed" | "cancelled";

export interface RestaurantOrder {
  id: string;
  orderNumber: string;
  createdAt: string; // ISO string
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  locationUrl?: string;
  orderType: "delivery" | "takeaway" | "dine_in";
  tableNumber?: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  grandTotal: number;
  status: OrderStatus;
  notes?: string;
}

// Initial realistic demo orders for the restaurant owner dashboard (using stable ISO timestamps)
export const INITIAL_ORDERS: RestaurantOrder[] = [
  {
    id: "ord-101",
    orderNumber: "THF-2041",
    createdAt: "2026-10-28T06:45:00.000Z",
    customerName: "Amanpreet Singh",
    customerPhone: "9876543210",
    deliveryAddress: "House 42, Model Town, Phase 2, Near Gurudwara",
    orderType: "delivery",
    paymentMethod: "UPI on Delivery / QR",
    items: [
      { id: "b6", name: "Maharaja Burger", price: 109, quantity: 2, instructions: "Extra spicy, no onions", category: "burgers" },
      { id: "f2", name: "French Fries (Full)", price: 50, quantity: 1, category: "fries" },
      { id: "n2", name: "Hakka Noodles", price: 110, quantity: 1, instructions: "Extra chilli sauce", category: "noodles" },
    ],
    subtotal: 378,
    discount: 38,
    couponCode: "HUNGER10",
    deliveryFee: 0,
    grandTotal: 340,
    status: "new",
  },
  {
    id: "ord-102",
    orderNumber: "THF-2040",
    createdAt: "2026-10-28T06:25:00.000Z",
    customerName: "Simran Kaur",
    customerPhone: "9812345678",
    deliveryAddress: "Flat 304, Green Avenue Apartments",
    orderType: "delivery",
    paymentMethod: "UPI on Delivery / QR",
    items: [
      { id: "c2", name: "Kurkure Chaap", price: 150, quantity: 1, instructions: "Crispy fried", category: "chaap" },
      { id: "s3", name: "Paneer Sandwich", price: 90, quantity: 1, category: "sandwiches" },
      { id: "cp2", name: "Chilli Potato (Full)", price: 110, quantity: 1, category: "chinese" },
    ],
    subtotal: 350,
    discount: 35,
    couponCode: "HUNGER10",
    deliveryFee: 0,
    grandTotal: 315,
    status: "preparing",
  },
  {
    id: "ord-103",
    orderNumber: "THF-2039",
    createdAt: "2026-10-28T05:55:00.000Z",
    customerName: "Rahul Verma",
    customerPhone: "9855512345",
    deliveryAddress: "Shop 12, Main Market Road",
    orderType: "takeaway",
    paymentMethod: "Cash on Pickup",
    items: [
      { id: "b2", name: "Double Tikki Burger", price: 40, quantity: 3, category: "burgers" },
      { id: "f3", name: "Tandoori Fries", price: 70, quantity: 1, category: "fries" },
    ],
    subtotal: 190,
    discount: 19,
    couponCode: "HUNGER10",
    deliveryFee: 0,
    grandTotal: 171,
    status: "out_for_delivery",
  },
  {
    id: "ord-104",
    orderNumber: "THF-2038",
    createdAt: "2026-10-28T05:15:00.000Z",
    customerName: "Harpreet Dhillon",
    customerPhone: "9780011223",
    deliveryAddress: "Dine-in Table #4",
    orderType: "dine_in",
    tableNumber: "4",
    paymentMethod: "Counter QR Pay",
    items: [
      { id: "m2", name: "Manchurian (Full)", price: 100, quantity: 1, category: "chinese" },
      { id: "n4", name: "Special Noodles", price: 140, quantity: 1, category: "noodles" },
      { id: "b4", name: "Cheese Burger", price: 50, quantity: 2, category: "burgers" },
    ],
    subtotal: 340,
    discount: 34,
    couponCode: "HUNGER10",
    deliveryFee: 0,
    grandTotal: 306,
    status: "completed",
  },
  {
    id: "ord-105",
    orderNumber: "THF-2037",
    createdAt: "2026-10-28T04:20:00.000Z",
    customerName: "Kavita Sharma",
    customerPhone: "9914488220",
    deliveryAddress: "House 18B, Urban Estate",
    orderType: "delivery",
    paymentMethod: "UPI on Delivery / QR",
    items: [
      { id: "c3", name: "Special Chaap", price: 180, quantity: 1, category: "chaap" },
      { id: "s2", name: "Cheese Sandwich", price: 80, quantity: 2, category: "sandwiches" },
    ],
    subtotal: 340,
    discount: 0,
    deliveryFee: 0,
    grandTotal: 340,
    status: "completed",
  },
];
