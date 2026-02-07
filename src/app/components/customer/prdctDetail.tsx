import React, { useState } from 'react';
import type { Product } from '../../types/types';
import { useStore } from '../../context/storeContext';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart!`);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-3xl">{product.name}</h1>
              <Badge variant={product.stock > 0 ? 'default' : 'destructive'} className="text-sm">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
              </Badge>
            </div>
            <p className="text-muted-foreground">{product.category}</p>
          </div>

          <div className="text-4xl">₱{product.price.toFixed(2)}</div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg">Product Description</h3>
            <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              
              {/* Product key features */}
              {product.keyFeatures && product.keyFeatures.length > 0 && (
                <div className="space-y-2 pt-4">
                  <h4 className="font-medium">Specifications:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {product.keyFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-2 pt-4">
                <h4 className="font-medium">Product Attributes:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>Category:</div>
                  <div>{product.category}</div>
                  <div>Product ID:</div>
                  <div>{product.id}</div>
                  <div>Availability:</div>
                  <div>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                  <div>Added:</div>
                  <div>{new Date(product.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add {quantity} to Cart
              </Button>
            </div>
          )}

          {product.stock === 0 && (
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  This product is currently out of stock. Please check back later.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};