import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import CategorySidebar from '@/components/pos/CategorySidebar';
import ProductGrid from '@/components/pos/ProductGrid';
import CartSidebar from '@/components/pos/CartSidebar';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const POS = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCart();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: typeof products[0]) => {
    if (product.stock === 0) {
      toast.error('Product out of stock');
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Category Sidebar - 20% */}
        <div className="col-span-2 overflow-hidden">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onSearch={setSearchQuery}
          />
        </div>

        {/* Product Grid - 50% */}
        <div className="col-span-6 overflow-hidden">
          <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
        </div>

        {/* Cart Sidebar - 30% */}
        <div className="col-span-4 overflow-hidden p-4">
          <CartSidebar />
        </div>
      </div>
    </div>
  );
};

export default POS;
