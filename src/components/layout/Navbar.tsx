import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Receipt, 
  LogOut,
  Store
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="border-b bg-card">
      <div className="flex h-16 items-center px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Store className="h-6 w-6" />
          <span>RetailPOS</span>
        </Link>

        <div className="ml-auto flex items-center gap-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          
          <Link to="/pos">
            <Button variant="ghost" size="sm" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Billing
            </Button>
          </Link>

          <Link to="/products">
            <Button variant="ghost" size="sm" className="gap-2">
              <Package className="h-4 w-4" />
              Products
            </Button>
          </Link>

          <Link to="/sales">
            <Button variant="ghost" size="sm" className="gap-2">
              <Receipt className="h-4 w-4" />
              Sales
            </Button>
          </Link>

          <div className="flex items-center gap-3 ml-4 pl-4 border-l">
            <div className="text-sm">
              <div className="font-medium">{user?.name}</div>
              <div className="text-muted-foreground capitalize">{user?.role}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
