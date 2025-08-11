
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowLeft, Clock, DollarSign } from 'lucide-react';

const InvoiceTicketList = ({ onInvoiceSelect, onBack }) => {
  const invoices = [
    {
      id: 'INV0001002',
      gstId: 'GST-3425-26',
      vendorName: 'GUJARAT FREIGHT TOOLS',
      status: 'HIL Review Pending',
      lastUpdated: 'Just now',
      amount: '₹4,490.00',
      statusColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      isMainInvoice: true
    },
    {
      id: 'INV0001003',
      gstId: 'REG-1234-56',
      vendorName: 'Acme Corp',
      status: 'Data Extraction',
      lastUpdated: '5 mins ago',
      amount: '$1,200.00',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
      isMainInvoice: false
    },
    {
      id: 'INV0001004',
      gstId: 'STD-7890-12',
      vendorName: 'XYZ Services',
      status: 'ERP Posting',
      lastUpdated: '10 mins ago',
      amount: '$750.00',
      statusColor: 'bg-green-100 text-green-800 border-green-200',
      isMainInvoice: false
    }
  ];

  const handleInvoiceClick = (invoice) => {
    if (invoice.isMainInvoice) {
      // Set invoice data and navigate to HIL review
      onInvoiceSelect({
        id: invoice.gstId,
        subject: `Tax Invoice Processing: ${invoice.vendorName}`,
        description: `Processing tax invoice ${invoice.gstId} from ${invoice.vendorName} for amount ${invoice.amount}`,
        status: 'In Progress',
        isInvoiceProcessing: true,
        timeline: [
          {
            id: 1,
            type: 'invoice_received',
            title: 'Invoice Received',
            description: `Tax Invoice ${invoice.gstId} received from ${invoice.vendorName}`,
            timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
            icon: FileText,
            status: 'completed'
          },
          {
            id: 2,
            type: 'ocr_extraction',
            title: 'OCR Data Extraction',
            description: 'AI agent extracted vendor details, line items, and tax information',
            timestamp: new Date(Date.now() - 12 * 60000), // 12 minutes ago
            icon: FileText,
            status: 'completed'
          },
          {
            id: 3,
            type: 'validation',
            title: 'Advanced Validation',
            description: 'AI performed GST validation and tax code verification',
            timestamp: new Date(Date.now() - 8 * 60000), // 8 minutes ago
            icon: FileText,
            status: 'completed'
          },
          {
            id: 4,
            type: 'hil_triggered',
            title: 'HIL Review Triggered',
            description: 'Human-in-the-Loop review required for tax complexity verification',
            timestamp: new Date(),
            icon: FileText,
            status: 'completed'
          }
        ]
      }, 'proposal');
    } else {
      // For other invoices, show under construction
      onInvoiceSelect(null, 'under-construction');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Agents</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Automated Invoice Processor</h1>
            <p className="text-gray-600">Active Worklist</p>
          </div>
        </div>
        <Badge className="bg-blue-600 text-white">
          3 Active Invoices
        </Badge>
      </div>

      {/* Invoice List */}
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <Card 
            key={invoice.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
              invoice.isMainInvoice ? 'border-2 border-blue-300 bg-blue-50' : 'border border-gray-200'
            }`}
            onClick={() => handleInvoiceClick(invoice)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{invoice.id}</h3>
                      <span className="text-gray-500">•</span>
                      <span className="text-sm text-gray-600">{invoice.gstId}</span>
                      {invoice.isMainInvoice && (
                        <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                          Featured Demo
                        </Badge>
                      )}
                    </div>
                    <p className="font-medium text-gray-800">{invoice.vendorName}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{invoice.lastUpdated}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{invoice.amount}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${invoice.statusColor} border`}>
                    {invoice.status}
                  </Badge>
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      View Processing
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Processing Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <h3 className="text-xl font-bold text-green-600">15</h3>
              <p className="text-sm text-gray-600">Processed Today</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-600">1</h3>
              <p className="text-sm text-gray-600">Pending HIL Review</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-600">97%</h3>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceTicketList;
