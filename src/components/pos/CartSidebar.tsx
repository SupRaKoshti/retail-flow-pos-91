import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CartSidebar = () => {
  const { items, updateQuantity, removeItem, clearCart, subtotal, tax, total } = useCart();
  const navigate = useNavigate();

  const handleCompleteSale = () => {
    if (items.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    const invoiceNumber = `INV-${Date.now()}`;
    toast.success(`Sale completed! Invoice: ${invoiceNumber}`);
    clearCart();
  };

  if (items.length === 0) {
    return (
      <Card className="h-full flex flex-col items-center justify-center p-8 text-center">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="font-semibold text-lg mb-2">Cart is Empty</h3>
        <p className="text-sm text-muted-foreground">
          Add products to start a new sale
        </p>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Current Bill</h2>
        <Badge variant="outline">#{Date.now().toString().slice(-6)}</Badge>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {items.map((item) => (
          <Card key={item.id} className="p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.sku}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-16 h-7 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">₹{item.price} each</div>
                <div className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <Separator />
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (18% GST)</span>
            <span className="font-medium">₹{tax.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">₹{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Button className="w-full" size="lg" onClick={handleCompleteSale}>
            Complete Sale
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button variant="outline" size="sm">
              Hold Bill
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartSidebar;
