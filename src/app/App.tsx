import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/storeContext';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { LoginModal } from './components/auth/loginModal';
import { ProductList } from './components/customer/prdctList';
import { ProductDetail } from './components/customer/prdctDetail';
import { ShoppingCart } from './components/customer/shoppingCart';
import { Checkout } from './components/customer/chkout';
import { OrderTracking } from './components/customer/orderTracking';
import { Dashboard } from './components/admin/dashboard';
import { ProductManagement } from './components/admin/prdctMgmt';
import { OrderManagement } from './components/admin/orderMgmt';
import { UserManagement } from './components/admin/UserMgmt';
import type { Product } from './types/types';
import {
  Store,
  ShoppingCart as CartIcon,
  Package,
  LayoutDashboard,
  ShoppingBag,
  Users,
  ClipboardList,
  LogOut,
  LogIn,
} from 'lucide-react';
import { toast } from 'sonner';

type View = 
  | 'products' 
  | 'product-detail'
  | 'cart' 
  | 'checkout' 
  | 'orders'
  | 'seller-dashboard'
  | 'seller-products'
  | 'seller-orders'
  | 'seller-users';

const AppContent: React.FC = () => {
  const { cart, currentUser, login, register, logout } = useStore();
  const [currentView, setCurrentView] = useState<View>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [_completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  const isSeller = currentUser?.role === 'seller';
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutComplete = (orderId: string) => {
    setCompletedOrderId(orderId);
    setCurrentView('orders');
  };

  const handleLogin = (email: string, password: string) => {
    const success = login(email, password);
    if (success) {
      toast.success('Login successful!');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const handleRegister = (name: string, email: string, password: string) => {
    const success = register(name, email, password);
    if (success) {
      toast.success('Account created successfully!');
    } else {
      toast.error('Email already exists');
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentView('products');
    toast.success('Logged out successfully');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setCurrentView('products');
  };

  const handleCartClick = () => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      toast.error('Please login to view your cart');
      return;
    }
    setCurrentView('cart');
  };

  const handleOrdersClick = () => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      toast.error('Please login to view your orders');
      return;
    }
    setCurrentView('orders');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="h-6 w-6" />
              <h1 className="text-xl">QUANTUM</h1>
            </div>

            <nav className="hidden md:flex items-center gap-4">
              {currentUser && isSeller ? (
                <>
                  <Button
                    variant={currentView === 'seller-dashboard' ? 'default' : 'ghost'}
                    onClick={() => setCurrentView('seller-dashboard')}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant={currentView === 'seller-products' ? 'default' : 'ghost'}
                    onClick={() => setCurrentView('seller-products')}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Products
                  </Button>
                  <Button
                    variant={currentView === 'seller-orders' ? 'default' : 'ghost'}
                    onClick={() => setCurrentView('seller-orders')}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button
                    variant={currentView === 'seller-users' ? 'default' : 'ghost'}
                    onClick={() => setCurrentView('seller-users')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Users
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={currentView === 'products' ? 'default' : 'ghost'}
                    onClick={() => setCurrentView('products')}
                  >
                    <Store className="mr-2 h-4 w-4" />
                    Products
                  </Button>
                  <Button
                    variant={currentView === 'cart' ? 'default' : 'ghost'}
                    onClick={handleCartClick}
                    className="relative"
                  >
                    <CartIcon className="mr-2 h-4 w-4" />
                    Cart
                    {cartItemCount > 0 && (
                      <Badge className="ml-2 px-1.5 py-0.5 text-xs">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={currentView === 'orders' ? 'default' : 'ghost'}
                    onClick={handleOrdersClick}
                  >
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                </>
              )}
            </nav>

            <div className="flex items-center gap-4">
              {currentUser ? (
                <>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm">{currentUser?.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser?.role}</p>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsLoginModalOpen(true)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              )}
            </div>
          </div>

          <nav className="flex md:hidden items-center gap-2 mt-4 overflow-x-auto">
            {currentUser && isSeller ? (
              <>
                <Button
                  variant={currentView === 'seller-dashboard' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('seller-dashboard')}
                  size="sm"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant={currentView === 'seller-products' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('seller-products')}
                  size="sm"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Products
                </Button>
                <Button
                  variant={currentView === 'seller-orders' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('seller-orders')}
                  size="sm"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Orders
                </Button>
                <Button
                  variant={currentView === 'seller-users' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('seller-users')}
                  size="sm"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={currentView === 'products' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('products')}
                  size="sm"
                >
                  Products
                </Button>
                <Button
                  variant={currentView === 'cart' ? 'default' : 'ghost'}
                  onClick={handleCartClick}
                  size="sm"
                  className="relative"
                >
                  Cart
                  {cartItemCount > 0 && (
                    <Badge className="ml-1 px-1.5 py-0.5 text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant={currentView === 'orders' ? 'default' : 'ghost'}
                  onClick={handleOrdersClick}
                  size="sm"
                >
                  Orders
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentView === 'products' && <ProductList onProductClick={handleProductClick} />}
        {currentView === 'product-detail' && selectedProduct && <ProductDetail product={selectedProduct} onBack={handleBackToProducts} />}
        {currentView === 'cart' && (
          <ShoppingCart onCheckout={() => setCurrentView('checkout')} />
        )}
        {currentView === 'checkout' && (
          <Checkout
            onComplete={handleCheckoutComplete} 
            onCancel={() => setCurrentView('cart')}
          />
        )}
        {currentView === 'orders' && <OrderTracking />}
        {currentView === 'seller-dashboard' && <Dashboard />}
        {currentView === 'seller-products' && <ProductManagement />}
        {currentView === 'seller-orders' && <OrderManagement />}
        {currentView === 'seller-users' && <UserManagement />}
      </main>

      <Toaster />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}