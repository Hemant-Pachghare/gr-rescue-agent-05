
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Calendar } from 'lucide-react';

interface InvoiceTicketListProps {
  onInvoiceSelect: (invoiceId: string) => void;
  onBack: () => void;
}

const InvoiceTicketList: React.FC<InvoiceTicketListProps> = ({ onInvoiceSelect, onBack }) => {
  const invoices = [
    {
      id: 'GUJARAT FREIGHT TOOLS',
      vendorName: 'GUJARAT FREIGHT TOOLS',
      amount: '₹1,25,000',
      date: '2024-01-15',
      status: 'Pending Review',
      priority: 'High'
    },
    {
      id: 'MUMBAI LOGISTICS PVT LTD',
      vendorName: 'MUMBAI LOGISTICS PVT LTD',
      amount: '₹85,500',
      date: '2024-01-14',
      status: 'Under Review',
      priority: 'Medium'
    },
    {
      id: 'CHENNAI TRANSPORT CO',
      vendorName: 'CHENNAI TRANSPORT CO',
      amount: '₹2,15,750',
      date: '2024-01-13',
      status: 'Processing',
      priority: 'Low'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Invoice Processing Worklist</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pending Invoice Reviews</h2>
          <p className="text-gray-600">Select an invoice to begin the automated processing workflow</p>
        </div>

        <div className="grid gap-4">
          {invoices.map((invoice) => (
            <Card
              key={invoice.id}
              className="p-6 cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
              onClick={() => onInvoiceSelect(invoice.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{invoice.vendorName}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{invoice.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>{invoice.amount}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={invoice.priority === 'High' ? 'destructive' : invoice.priority === 'Medium' ? 'default' : 'secondary'}
                  >
                    {invoice.priority} Priority
                  </Badge>
                  <Badge variant="outline">
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Demo Note:</strong> Click on "GUJARAT FREIGHT TOOLS" to see the full invoice processing workflow. 
            Other invoices will show "Feature under development" message.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTicketList;
