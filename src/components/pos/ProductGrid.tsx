import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/mockData';
import { ShoppingCart, Package } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <Package className="h-16 w-16 mb-4" />
        <p className="text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-y-auto">
      {products.map((product) => (
        <Card
          key={product.id}
          className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group"
        >
          <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <div>
              <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
              <p className="text-xs text-muted-foreground">{product.sku}</p>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant={product.stock > 20 ? 'default' : product.stock > 0 ? 'secondary' : 'destructive'}>
                {product.stock} in stock
              </Badge>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
              <Button
                size="sm"
                onClick={() => onAddToCart(product)}
                className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ShoppingCart className="h-3 w-3" />
                Add
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
