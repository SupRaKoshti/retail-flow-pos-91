import Navbar from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
// import { products } from '@/data/mockData';
import { Search, Plus, Edit, Trash2, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProductVariant {
  id: number;
  variant_name: string;
  sku: string;
  price: number;
}

interface SubCategory {
  id: number;
  name: string;
  category_name: string;
}

interface Product {
  id: number;
  name: string;
  description?: string;
  image?: string | null;
  subcategory: SubCategory;
  variants: ProductVariant[];
}

const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/inventory/products/');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.variants.some((v) =>
      v.sku.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    product.subcategory?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your product inventory</p>
          </div>
          <Link to="/products/add">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>

        <Card className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products by name, SKU, or category..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Product</th>
                  <th className="text-left p-3 font-semibold">SKU</th>
                  <th className="text-left p-3 font-semibold">SubCategory</th>
                  <th className="text-left p-3 font-semibold">Price</th>
                  <th className="text-right p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          {product.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <code className="text-sm bg-muted px-2 py-1 rounded">{product.variants?.[0]?.sku || '-'}
                      </code>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{product.subcategory?.name || '-'}</Badge>
                     </td>
                    <td className="p-3 font-semibold">₹{product.variants?.[0]?.price?.toLocaleString() || '—'}</td>
                    {/* <td className="p-3">
                      <Badge 
                        variant={product.stock > 20 ? 'default' : product.stock > 0 ? 'secondary' : 'destructive'}
                      >
                        {product.stock} units
                      </Badge>
                    </td> */}
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4" />
              <p>No products found</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Products;
