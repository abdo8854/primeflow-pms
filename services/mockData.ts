import { User, UserRole, Product, ProductStatus, Category, Supplier, Order, OrderStatus } from '../types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@primeflow.com', role: UserRole.ADMIN, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: '2', name: 'Manager Dave', email: 'manager@primeflow.com', role: UserRole.MANAGER, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: '3', name: 'Staff Sarah', email: 'staff@primeflow.com', role: UserRole.STAFF, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Electronics' },
  { id: 'cat2', name: 'Computers', parentId: 'cat1' },
  { id: 'cat3', name: 'Smartphones', parentId: 'cat1' },
  { id: 'cat4', name: 'Audio', parentId: 'cat1' },
  { id: 'cat5', name: 'Wearables', parentId: 'cat1' },
  { id: 'cat6', name: 'Accessories' },
];

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: 'sup1', name: 'TechGlobal Inc', contactName: 'John Doe', email: 'sales@techglobal.com', phone: '555-0123' },
  { id: 'sup2', name: 'FastComponents', contactName: 'Jane Smith', email: 'jane@fastcomp.com', phone: '555-0987' },
  { id: 'sup3', name: 'SoundWaves Ltd', contactName: 'Mike Ross', email: 'mike@soundwaves.com', phone: '555-4567' },
];

export const MOCK_PRODUCTS: Product[] = [
  // Laptops
  { id: 'p1', name: 'MacBook Pro M3', code: 'MBP-M3-14', price: 1999.00, cost: 1400.00, description: '14-inch MacBook Pro with M3 chip, 16GB RAM, 512GB SSD.', status: ProductStatus.ACTIVE, stockQuantity: 25, lowStockThreshold: 5, categoryId: 'cat2', supplierId: 'sup1', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=500&q=60' },
  { id: 'p2', name: 'Dell XPS 15', code: 'XPS-15-9530', price: 1899.99, cost: 1350.00, description: '15.6" OLED, Intel i9, 32GB RAM, 1TB SSD.', status: ProductStatus.ACTIVE, stockQuantity: 12, lowStockThreshold: 3, categoryId: 'cat2', supplierId: 'sup1', imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&w=500&q=60' },
  { id: 'p3', name: 'ThinkPad X1 Carbon', code: 'TP-X1C-G11', price: 1649.50, cost: 1100.00, description: 'Business ultrabook with legendary keyboard and durability.', status: ProductStatus.ACTIVE, stockQuantity: 8, lowStockThreshold: 5, categoryId: 'cat2', supplierId: 'sup1', imageUrl: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&w=500&q=60' },
  
  // Smartphones
  { id: 'p4', name: 'iPhone 15 Pro', code: 'IP15P-256', price: 1099.00, cost: 850.00, description: 'Titanium design, A17 Pro chip, 48MP camera system.', status: ProductStatus.ACTIVE, stockQuantity: 45, lowStockThreshold: 10, categoryId: 'cat3', supplierId: 'sup1', imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=500&q=60' },
  { id: 'p5', name: 'Samsung Galaxy S24 Ultra', code: 'SGS24U-512', price: 1299.99, cost: 900.00, description: 'AI features, S Pen included, 200MP camera.', status: ProductStatus.ACTIVE, stockQuantity: 30, lowStockThreshold: 8, categoryId: 'cat3', supplierId: 'sup1', imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=500&q=60' },
  { id: 'p6', name: 'Google Pixel 8 Pro', code: 'GP8P-128', price: 999.00, cost: 700.00, description: 'Advanced AI photography and clean Android experience.', status: ProductStatus.ACTIVE, stockQuantity: 15, lowStockThreshold: 5, categoryId: 'cat3', supplierId: 'sup1', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff23?auto=format&fit=crop&w=500&q=60' },
  
  // Audio
  { id: 'p7', name: 'Sony WH-1000XM5', code: 'SNY-XM5', price: 398.00, cost: 250.00, description: 'Industry-leading noise canceling headphones.', status: ProductStatus.ACTIVE, stockQuantity: 60, lowStockThreshold: 10, categoryId: 'cat4', supplierId: 'sup3', imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=60' },
  { id: 'p8', name: 'AirPods Pro 2', code: 'APP-2', price: 249.00, cost: 180.00, description: 'Active Noise Cancellation and Transparency mode.', status: ProductStatus.ACTIVE, stockQuantity: 100, lowStockThreshold: 20, categoryId: 'cat4', supplierId: 'sup1', imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500&q=60' },
  { id: 'p9', name: 'Bose QuietComfort Ultra', code: 'BSE-QCU', price: 429.00, cost: 300.00, description: 'Spatial audio and world-class noise cancellation.', status: ProductStatus.ACTIVE, stockQuantity: 25, lowStockThreshold: 5, categoryId: 'cat4', supplierId: 'sup3', imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=60' },
  
  // Wearables
  { id: 'p10', name: 'Apple Watch Series 9', code: 'AWS9-45', price: 429.00, cost: 320.00, description: 'Advanced health sensors and apps.', status: ProductStatus.ACTIVE, stockQuantity: 40, lowStockThreshold: 8, categoryId: 'cat5', supplierId: 'sup1', imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=60' },
  { id: 'p11', name: 'Garmin Fenix 7', code: 'GRM-F7', price: 699.99, cost: 500.00, description: 'Rugged multisport GPS watch.', status: ProductStatus.ACTIVE, stockQuantity: 10, lowStockThreshold: 3, categoryId: 'cat5', supplierId: 'sup2', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60' },
  
  // Accessories
  { id: 'p12', name: 'Logitech MX Master 3S', code: 'LOG-MX3S', price: 99.99, cost: 60.00, description: 'Performance wireless mouse.', status: ProductStatus.ACTIVE, stockQuantity: 85, lowStockThreshold: 15, categoryId: 'cat6', supplierId: 'sup2', imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=60' },
  { id: 'p13', name: 'Keychron Q1 Pro', code: 'KCH-Q1P', price: 199.00, cost: 140.00, description: 'Custom wireless mechanical keyboard.', status: ProductStatus.ACTIVE, stockQuantity: 20, lowStockThreshold: 5, categoryId: 'cat6', supplierId: 'sup2', imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60' },
  { id: 'p14', name: 'Anker 737 Power Bank', code: 'ANK-737', price: 149.99, cost: 90.00, description: '24,000mAh 3-port portable charger.', status: ProductStatus.ACTIVE, stockQuantity: 50, lowStockThreshold: 10, categoryId: 'cat6', supplierId: 'sup2', imageUrl: 'https://images.unsplash.com/photo-1609592425064-1e0e560f4728?auto=format&fit=crop&w=500&q=60' },
  
  // Cameras (Misc)
  { id: 'p15', name: 'Sony Alpha a7 IV', code: 'SNY-A7IV', price: 2498.00, cost: 2000.00, description: 'Full-frame mirrorless camera body.', status: ProductStatus.DRAFT, stockQuantity: 2, lowStockThreshold: 2, categoryId: 'cat1', supplierId: 'sup3', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=60' },
  { id: 'p16', name: 'GoPro HERO12 Black', code: 'GPR-H12', price: 399.99, cost: 300.00, description: 'Waterproof action camera with 5.3K video.', status: ProductStatus.ACTIVE, stockQuantity: 30, lowStockThreshold: 8, categoryId: 'cat1', supplierId: 'sup3', imageUrl: 'https://images.unsplash.com/photo-1564466021189-a97287d31067?auto=format&fit=crop&w=500&q=60' },

  // Monitors
  { id: 'p17', name: 'LG UltraGear 27"', code: 'LG-27GP850', price: 349.99, cost: 250.00, description: 'Nano IPS 1ms gaming monitor.', status: ProductStatus.ACTIVE, stockQuantity: 18, lowStockThreshold: 5, categoryId: 'cat2', supplierId: 'sup1', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=60' },
  { id: 'p18', name: 'Samsung Odyssey G9', code: 'SAM-G9', price: 1199.99, cost: 900.00, description: '49-inch curved gaming monitor.', status: ProductStatus.ACTIVE, stockQuantity: 4, lowStockThreshold: 2, categoryId: 'cat2', supplierId: 'sup1', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=500&q=60' },
  
  // Networking
  { id: 'p19', name: 'Ubiquiti Dream Machine', code: 'UBI-UDM', price: 299.00, cost: 220.00, description: 'All-in-one WiFi 6 router and security gateway.', status: ProductStatus.ACTIVE, stockQuantity: 14, lowStockThreshold: 3, categoryId: 'cat1', supplierId: 'sup1', imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=500&q=60' },
  { id: 'p20', name: 'Starlink Kit', code: 'SL-STD', price: 599.00, cost: 500.00, description: 'High-speed low-latency internet dish.', status: ProductStatus.ARCHIVED, stockQuantity: 0, lowStockThreshold: 0, categoryId: 'cat1', supplierId: 'sup1', imageUrl: 'https://images.unsplash.com/photo-1629814421684-486e9268f7e2?auto=format&fit=crop&w=500&q=60' }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord1',
    customerName: 'Alice Johnson',
    customerEmail: 'alice@example.com',
    items: [{ productId: 'p1', quantity: 1, priceAtSale: 1999.00, productName: 'MacBook Pro M3' }],
    totalAmount: 1999.00,
    status: OrderStatus.DELIVERED,
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'ord2',
    customerName: 'Bob Miller',
    customerEmail: 'bob@example.com',
    items: [{ productId: 'p7', quantity: 2, priceAtSale: 398.00, productName: 'Sony WH-1000XM5' }],
    totalAmount: 796.00,
    status: OrderStatus.PENDING,
    date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: 'ord3',
    customerName: 'Charlie Day',
    customerEmail: 'charlie@example.com',
    items: [
      { productId: 'p12', quantity: 1, priceAtSale: 99.99, productName: 'Logitech MX Master 3S' },
      { productId: 'p13', quantity: 1, priceAtSale: 199.00, productName: 'Keychron Q1 Pro' }
    ],
    totalAmount: 298.99,
    status: OrderStatus.DELIVERED,
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
  }
];