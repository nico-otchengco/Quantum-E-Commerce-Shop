import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem, User, Order, DashboardStats } from '../types/types';

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Orders
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Users
  users: User[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  deleteUser: (id: string) => void;
  
  // Auth
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  
  // Dashboard
  getDashboardStats: () => DashboardStats;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Mock data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Razer Kraken X Lite Essential Wired Gaming Headset',
    description: 'Wired gaming headset with custom-tuned 40 mm drivers, 7.1 surround sound capability (on Windows 10 64-bit), and a lightweight build',
    price: 1995.00,
    image: 'https://images.unsplash.com/photo-1592375601764-5dd6be536f99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Audio',
    stock: 11,
    keyFeatures: [
      'Connection: Wired, 3.5mm jack',
      'Headphone Drivers: 40 mm, with Neodymium magnets',
      'Headphone Frequency: Response	12 Hz – 28 kHz',
      'Weight:	Approximately 230 g',
      'Microphone:	Bendable cardioid (unidirectional) ECM boom mic'
    ],
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Apple Watch SE 3',
    description: ' S10 chip, 18-hour battery (up to 32h in low power mode), heart rate/sleep tracking, 50m water resistance, GPS, and a bright Retina display',
    price: 1599.00,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Wearables',
    stock: 0,
    keyFeatures: [
      'Display: Always-On LTPO OLED Retina display (up to 1,000 nits).',
      'Health & Safety: Temperature sensing, cycle tracking with ovulation estimates, Vitals app, Fall Detection, and Crash Detection',
      'Connectivity: GPS or GPS + 5G Cellular options, Wi-Fi 4, and Bluetooth 5.3.',
      'Battery & Charging: Up to 18-hour battery life (32 hours in Low Power Mode) with faster charging (0–80% in about 45 minutes).',
    ],
    createdAt: '2026-01-20T10:00:00Z',
  },
  {
    id: '3',
    name: 'ASUS ZenBook Duo 14',
    description: 'ASUS ZenBook Duo 14 UX482 lets you get things done in style: calmly, efficiently, and with zero fuss. The secondary touchscreen works seamlessly with the main 14 inch Full HD touchscreen, giving you endless ways to optimize and personalize your workflow.',
    price: 116550.00,
    image: 'https://images.unsplash.com/photo-1630794180018-433d915c34ac?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Computers',
    stock: 18,
    keyFeatures: [
      'Processor:	Intel Core i7',
      'Proc. speed	2.9 GHz (up to 4.7 GHz with Turbo Boost)',
      'OS:	Windows 11 Pro',
      'Ram memory:	16 GB',
      'Screen size:	14 in (35.6 cm)',
      'Weight:	3.57 lb (1.62 kg)'
    ],
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: '4',
    name: 'Iphone 17 Pro Max',
    description: 'Latest flagship smartphone with 5G and triple camera system',
    price: 86990.00,
    image: 'https://images.unsplash.com/photo-1759588071781-2c3ba9128497?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Mobile',
    stock: 56,
    keyFeatures: [
      '5G connectivity',
      'Triple camera system (48MP main)',
      '6.7" AMOLED display',
      '128GB storage',
      'All-day battery life'
    ],
    createdAt: '2026-01-25T10:00:00Z',
  },
  {
    id: '5',
    name: 'Canon Eos R5',
    description: 'High-performance 45MP full-frame mirrorless camera released in 2020 with advanced autofocus and 8K video capabilities',
    price: 157000.00,
    image: 'https://images.unsplash.com/photo-1648781329670-5f00c1b37404?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Cameras',
    stock: 12,
    keyFeatures: [
      'Sensor: 45MP Full-Frame CMOS Sensor',
      'Image Processor: DIGIC X',
      'Video Recording: 8K up to 30fps, 4K up to 120fps',
      'Autofocus: Dual Pixel CMOS AF II with eye/animal detection',
      'ISO Range: 100-51,200 (expandable to 102,400)'
    ],
    createdAt: '2026-01-05T10:00:00Z',
  },
  {
    id: '6',
    name: 'Razer Viper Ultimate Cyberpunk 2077 Edition',
    description: 'The Razer Viper Ultimate Cyberpunk 2077 Edition is a specialized, yellow-themed wireless gaming mouse featuring a 20,000 DPI Focus+ optical sensor, Razer HyperSpeed wireless technology, and a 74g lightweight ambidextrous design, often bundled with a charging dock.',
    price: 12880.00,
    image: 'https://images.unsplash.com/photo-1632160871990-be30194885aa?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Mouse',
    stock: 0,
    keyFeatures: [
      'Sensor: Focus+ 20K DPI Optical Sensor (99.6% resolution accuracy).',
      'Connectivity: Razer HyperSpeed Wireless (low latency, 2.4GHz).',
      'Weight: 74g (lightweight).',
      'Battery Life: Up to 70 hours.',
      'Switches: Optical Mouse Switches (rated for 70M clicks).'
    ],
    createdAt: '2026-01-30T10:00:00Z',
  },
];

const initialUsers: User[] = [
  {
    id: 'user-1',
    email: 'seller@store.com',
    password: 'seller123',
    name: 'Store Seller',
    role: 'seller',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    email: 'john.doe@example.com',
    password: 'customer123',
    name: 'John Doe',
    role: 'customer',
    createdAt: '2026-01-15T08:30:00Z',
  },
  {
    id: 'user-3',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'customer',
    createdAt: '2026-01-20T14:20:00Z',
  },
];

const initialOrders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-2',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    items: [
      { product: initialProducts[0], quantity: 1 },
      { product: initialProducts[1], quantity: 2 },
    ],
    total: 1099.97,
    status: 'delivered',
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-05T15:30:00Z',
  },
  {
    id: 'order-2',
    userId: 'user-3',
    userName: 'Jane Smith',
    userEmail: 'jane.smith@example.com',
    items: [
      { product: initialProducts[2], quantity: 1 },
    ],
    total: 1299.99,
    status: 'shipped',
    createdAt: '2026-02-03T14:20:00Z',
    updatedAt: '2026-02-04T09:00:00Z',
  },
  {
    id: 'order-3',
    userId: 'user-2',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    items: [
      { product: initialProducts[3], quantity: 1 },
      { product: initialProducts[5], quantity: 1 },
    ],
    total: 1549.98,
    status: 'processing',
    createdAt: '2026-02-05T11:45:00Z',
    updatedAt: '2026-02-05T11:45:00Z',
  },
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Start logged out

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: Order = {
      ...order,
      id: `order-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const addUser = (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const existingUser = users.find(u => u.email === email && u.password === password);
    if (existingUser) {
      return false;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const getDashboardStats = (): DashboardStats => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    return {
      totalRevenue,
      totalOrders: orders.length,
      totalProducts: products.length,
      totalUsers: users.filter(u => u.role === 'customer').length,
    };
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        orders,
        createOrder,
        updateOrderStatus,
        users,
        currentUser,
        setCurrentUser,
        addUser,
        deleteUser,
        login,
        register,
        logout,
        getDashboardStats,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};