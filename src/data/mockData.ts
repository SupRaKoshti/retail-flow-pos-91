export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Sale {
  id: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  items: number;
  total: number;
  paymentMethod: string;
  status: 'completed' | 'refunded';
}

export const categories: Category[] = [
  { id: '1', name: 'Electronics', icon: 'Laptop', count: 45 },
  { id: '2', name: 'Clothing', icon: 'Shirt', count: 120 },
  { id: '3', name: 'Food & Beverages', icon: 'Coffee', count: 80 },
  { id: '4', name: 'Books', icon: 'Book', count: 65 },
  { id: '5', name: 'Sports', icon: 'Dumbbell', count: 35 },
  { id: '6', name: 'Home & Garden', icon: 'Home', count: 50 },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Mouse',
    sku: 'ELEC-001',
    price: 1299,
    stock: 45,
    category: 'Electronics',
    description: 'Ergonomic wireless mouse with USB receiver'
  },
  {
    id: '2',
    name: 'USB-C Cable',
    sku: 'ELEC-002',
    price: 299,
    stock: 120,
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Bluetooth Headphones',
    sku: 'ELEC-003',
    price: 2499,
    stock: 28,
    category: 'Electronics',
  },
  {
    id: '4',
    name: 'Cotton T-Shirt',
    sku: 'CLO-001',
    price: 499,
    stock: 85,
    category: 'Clothing',
  },
  {
    id: '5',
    name: 'Denim Jeans',
    sku: 'CLO-002',
    price: 1899,
    stock: 42,
    category: 'Clothing',
  },
  {
    id: '6',
    name: 'Sports Shoes',
    sku: 'CLO-003',
    price: 3499,
    stock: 18,
    category: 'Clothing',
  },
  {
    id: '7',
    name: 'Coffee Beans 250g',
    sku: 'FOOD-001',
    price: 399,
    stock: 95,
    category: 'Food & Beverages',
  },
  {
    id: '8',
    name: 'Green Tea Box',
    sku: 'FOOD-002',
    price: 249,
    stock: 65,
    category: 'Food & Beverages',
  },
  {
    id: '9',
    name: 'Chocolate Bar',
    sku: 'FOOD-003',
    price: 99,
    stock: 200,
    category: 'Food & Beverages',
  },
  {
    id: '10',
    name: 'The Great Gatsby',
    sku: 'BOOK-001',
    price: 399,
    stock: 25,
    category: 'Books',
  },
  {
    id: '11',
    name: '1984 by George Orwell',
    sku: 'BOOK-002',
    price: 449,
    stock: 18,
    category: 'Books',
  },
  {
    id: '12',
    name: 'Yoga Mat',
    sku: 'SPORT-001',
    price: 799,
    stock: 30,
    category: 'Sports',
  },
  {
    id: '13',
    name: 'Water Bottle 1L',
    sku: 'SPORT-002',
    price: 299,
    stock: 55,
    category: 'Sports',
  },
  {
    id: '14',
    name: 'Indoor Plant - Snake Plant',
    sku: 'HOME-001',
    price: 599,
    stock: 22,
    category: 'Home & Garden',
  },
  {
    id: '15',
    name: 'LED Desk Lamp',
    sku: 'HOME-002',
    price: 1299,
    stock: 15,
    category: 'Home & Garden',
  },
];

export const sales: Sale[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    date: '2024-11-01T10:30:00',
    customerName: 'John Doe',
    items: 3,
    total: 4597,
    paymentMethod: 'Card',
    status: 'completed',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    date: '2024-11-01T11:15:00',
    customerName: 'Jane Smith',
    items: 2,
    total: 1798,
    paymentMethod: 'Cash',
    status: 'completed',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    date: '2024-11-01T12:00:00',
    customerName: 'Robert Johnson',
    items: 5,
    total: 6295,
    paymentMethod: 'UPI',
    status: 'completed',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    date: '2024-11-01T14:20:00',
    customerName: 'Emily Davis',
    items: 1,
    total: 2499,
    paymentMethod: 'Card',
    status: 'completed',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2024-005',
    date: '2024-11-01T15:45:00',
    customerName: 'Michael Brown',
    items: 4,
    total: 3896,
    paymentMethod: 'Cash',
    status: 'refunded',
  },
];

export const dashboardMetrics = {
  todaySales: 18795,
  monthlyRevenue: 485320,
  profitMargin: 28.5,
  lowStockAlerts: 8,
  todayTransactions: 42,
  avgOrderValue: 447.5,
};

export const salesChartData = [
  { date: 'Mon', sales: 12400, profit: 3500 },
  { date: 'Tue', sales: 15600, profit: 4200 },
  { date: 'Wed', sales: 18900, profit: 5300 },
  { date: 'Thu', sales: 14200, profit: 3900 },
  { date: 'Fri', sales: 21500, profit: 6100 },
  { date: 'Sat', sales: 28300, profit: 8200 },
  { date: 'Sun', sales: 19800, profit: 5600 },
];
