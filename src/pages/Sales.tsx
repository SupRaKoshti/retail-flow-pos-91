import Navbar from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sales } from '@/data/mockData';
import { Printer, Eye } from 'lucide-react';
import { format } from 'date-fns';

const Sales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Sales History</h1>
          <p className="text-muted-foreground">View and manage your sales transactions</p>
        </div>

        <Card className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Invoice</th>
                  <th className="text-left p-3 font-semibold">Date & Time</th>
                  <th className="text-left p-3 font-semibold">Customer</th>
                  <th className="text-left p-3 font-semibold">Items</th>
                  <th className="text-left p-3 font-semibold">Payment</th>
                  <th className="text-left p-3 font-semibold">Total</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-right p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-3">
                      <code className="text-sm bg-primary/10 text-primary px-2 py-1 rounded font-mono">
                        {sale.invoiceNumber}
                      </code>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{format(new Date(sale.date), 'MMM dd, yyyy')}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(sale.date), 'hh:mm a')}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">{sale.customerName}</td>
                    <td className="p-3">
                      <Badge variant="outline">{sale.items} items</Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="secondary">{sale.paymentMethod}</Badge>
                    </td>
                    <td className="p-3 font-bold text-primary">
                      ₹{sale.total.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <Badge variant={sale.status === 'completed' ? 'default' : 'destructive'}>
                        {sale.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Sales;
