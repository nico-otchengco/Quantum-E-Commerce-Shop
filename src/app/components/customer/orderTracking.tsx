import React from 'react';
import { useStore } from '../../context/storeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CheckCircle2, Circle, Package, Truck, Home, XCircle } from 'lucide-react';

export const OrderTracking: React.FC = () => {
  const { orders, currentUser } = useStore();

  const userOrders = currentUser?.role === 'seller' 
    ? orders 
    : orders.filter(order => order.userId === currentUser?.id);

  const getStatusIcon = (status: string, isActive: boolean) => {
    const className = isActive ? "h-6 w-6" : "h-6 w-6 text-muted-foreground";
    
    switch (status) {
      case 'pending':
        return isActive ? <Circle className={className} /> : <Circle className={className} />;
      case 'processing':
        return isActive ? <Package className={className} /> : <Package className={className} />;
      case 'shipped':
        return isActive ? <Truck className={className} /> : <Truck className={className} />;
      case 'delivered':
        return <CheckCircle2 className="h-6 w-6 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return <Circle className={className} />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl">Order Tracking</h2>
      
      {userOrders.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg mb-2">No orders found</h3>
              <p className="text-sm text-muted-foreground">Your orders will appear here</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="text-lg">Order {order.id}</CardTitle>
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p>{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity} × ₱{item.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status Progress */}
                {order.status !== 'cancelled' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      {statusSteps.map((step, index) => {
                        const currentIndex = statusSteps.indexOf(order.status);
                        const isActive = index <= currentIndex;
                        const isLast = index === statusSteps.length - 1;
                        
                        return (
                          <div key={step} className="flex items-center flex-1">
                            <div className="flex flex-col items-center">
                              {getStatusIcon(step, isActive)}
                              <span className={`text-xs mt-1 capitalize ${isActive ? '' : 'text-muted-foreground'}`}>
                                {step}
                              </span>
                            </div>
                            {!isLast && (
                              <div className={`flex-1 h-0.5 mx-2 ${isActive ? 'bg-primary' : 'bg-muted'}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t">
                  <span>Total</span>
                  <span className="text-lg">₱{order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
