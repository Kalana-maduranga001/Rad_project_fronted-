import api from "./api"

interface OrderPayload {
  items: {
    productId: string
    quantity: number
  }[]
}

export const createOrder = async (orderPayload: OrderPayload) => {
  return api.post("/orders/create", orderPayload)
}

export const getAllOrders = async (
  status: string,
  page: number
) => {
  return api.get("/orders", {
    params: {
      status,
      page,
      limit: 5
    }
  })
}

export const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  return api.put(`/orders/${orderId}/status`, { status })
}

export const getOrder = async (
  orderId: string
) => {
  return api.get(`/orders/${orderId}`)
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "CANCELLED"

export interface OrderItem {
  _id: string
  title: string
  price: number
  quantity: number
}

export interface OrderUser {
  _id: string
  email: string
}

export interface Order {
  _id: string
  user: OrderUser
  products: OrderItem[]
  totalAmount: number
  status: OrderStatus
  createdAt: string
}

export interface DashboardStats {
  totalOrders: number
  pendingOrders: number
  revenue: number
  customers: number

  orderStatusCounts: Record<OrderStatus, number>
  recentOrders: Order[]

  /* NEW */
  alerts: string[]
  activityFeed: string[]
  topProducts: {
    name: string
    sold: number
  }[]
  snapshots: {
    ordersToday: number
    revenueToday: number
    ordersThisWeek: number
    revenueThisWeek: number
  }
}

export const getDashboardStats = () => {
  return api.get<DashboardStats>("/orders/dashboard")
}

export const getReport = () => {
  return api.get("/orders/report", { responseType: "blob" })
}