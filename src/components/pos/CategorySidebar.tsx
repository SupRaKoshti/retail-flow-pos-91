import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categories } from '@/data/mockData';
import { Search, Grid3x3 } from 'lucide-react';
import * as Icons from 'lucide-react';

interface CategorySidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onSearch: (query: string) => void;
}

const CategorySidebar = ({ selectedCategory, onCategorySelect, onSearch }: CategorySidebarProps) => {
  return (
    <div className="h-full flex flex-col gap-4 p-4 bg-card border-r">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'ghost'}
          className="w-full justify-start gap-3"
          onClick={() => onCategorySelect('all')}
        >
          <Grid3x3 className="h-5 w-5" />
          <div className="flex-1 text-left">
            <div className="font-medium">All Products</div>
            <div className="text-xs text-muted-foreground">
              {categories.reduce((sum, cat) => sum + cat.count, 0)} items
            </div>
          </div>
        </Button>

        {categories.map((category) => {
          const IconComponent = (Icons as any)[category.icon] || Grid3x3;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? 'default' : 'ghost'}
              className="w-full justify-start gap-3"
              onClick={() => onCategorySelect(category.name)}
            >
              <IconComponent className="h-5 w-5" />
              <div className="flex-1 text-left">
                <div className="font-medium">{category.name}</div>
                <div className="text-xs text-muted-foreground">{category.count} items</div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySidebar;
