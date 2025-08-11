
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Bot, CheckCircle, Loader2, Settings } from 'lucide-react';
import TimelinePanel from '@/components/TimelinePanel';

const InvoiceERPPosting = ({ ticketData, setTicketData, onNext }) => {
  const [executionStep, setExecutionStep] = useState(0);
  const [isExecuting, setIsExecuting] = useState(true);

  const executionSteps = [
    { 
      title: 'ERP Posting Agent dynamically writing code for SAP posting...', 
      description: 'Generating dynamic code for Create Supplier Invoice transaction',
      duration: 2000 
    },
    { 
      title: 'ERP Posting Agent connecting to SAP and opening transaction...', 
      description: 'Connecting to SAP and accessing Create Supplier Invoice',
      duration: 3000 
    },
    { 
      title: 'ERP Posting Agent populating invoice header details...', 
      description: 'Entering basic data including invoice date, vendor, and amounts',
      duration: 2500 
    },
    { 
      title: 'ERP Posting Agent entering line item details and applying tax codes...', 
      description: 'Processing line items and applying IGST @ 18% tax codes',
      duration: 3000 
    },
    { 
      title: 'ERP Posting Agent performing SAP validation checks...', 
      description: 'Validating company code, amount consistency, and GL accounts',
      duration: 2000 
    },
    { 
      title: 'ERP Posting Agent executing final Post action in SAP...', 
      description: 'Finalizing invoice posting and generating document number',
      duration: 2500 
    }
  ];

  useEffect(() => {
    let totalDuration = 0;
    
    executionSteps.forEach((step, index) => {
      setTimeout(() => {
        setExecutionStep(index);
      }, totalDuration);
      totalDuration += step.duration;
    });

    // Complete execution
    setTimeout(() => {
      setIsExecuting(false);
      
      const newTimelineItems = [
        {
          id: 5,
          type: 'erp_posting',
          title: 'ERP Posting Agent Execution',
          description: 'ERP Posting Agent completed posting of Tax Invoice GST-3425-26 to SAP. Exception Queue Agent monitored for deviations; no exceptions detected.',
          timestamp: new Date(),
          icon: Database,
          status: 'completed',
          erpExecution: true
        },
        {
          id: 6,
          type: 'confirmation',
          title: 'Confirmation Email Agent',
          description: 'Confirmation Email Agent sent confirmation for INV0001002 to Accounts Payable Dept. and Tax Compliance Team.',
          timestamp: new Date(),
          icon: CheckCircle,
          status: 'completed'
        }
      ];

      setTicketData(prev => ({
        ...prev,
        timeline: [...prev.timeline, ...newTimelineItems],
        status: 'Posted'
      }));
    }, totalDuration);

  }, [setTicketData]);

  const calculateProgress = () => {
    if (!isExecuting) return 100;
    return ((executionStep + 1) / executionSteps.length) * 100;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Work Area */}
      <div className="lg:col-span-2 space-y-4">
        {/* SAP Header */}
        <div className="bg-blue-800 text-white p-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white text-blue-800 px-3 py-1 rounded text-sm font-bold">
                SAP
              </div>
              <span className="text-sm">ERP System | Create Supplier Invoice</span>
            </div>
            <Badge variant="secondary" className="bg-green-500 text-white">
              Production System
            </Badge>
          </div>
        </div>

        <Card className="shadow-lg border-t-0 rounded-t-none">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b py-4">
            <CardTitle className="flex items-center text-gray-700">
              <Settings className="mr-2 h-6 w-6" />
              ERP Posting Execution - AI Action In Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Execution Progress */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-blue-800">ERP Posting Agent Status</h3>
                  <Badge className={`${isExecuting ? 'bg-blue-600' : 'bg-green-600'} text-white`}>
                    {isExecuting ? 'In Progress' : 'Completed'}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Progress value={calculateProgress()} className="flex-1 h-2" />
                    <span className="text-sm font-medium text-blue-600">
                      {Math.round(calculateProgress())}%
                    </span>
                  </div>
                  
                  {isExecuting && (
                    <div className="flex items-center space-x-3">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800 text-sm">
                          {executionSteps[executionStep]?.title}
                        </p>
                        <p className="text-xs text-blue-600">
                          {executionSteps[executionStep]?.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SAP Interface Simulation */}
              <div className="bg-white border-2 border-gray-300 rounded-lg">
                <div className="bg-gray-100 border-b border-gray-300 p-2">
                  <h4 className="font-medium text-gray-700 text-sm">
                    Transaction: Create Supplier Invoice | ERP Posting Agent (SAP BAPI) & Dynamic Code Generation
                  </h4>
                </div>
                
                <div className="p-3 space-y-3">
                  {/* Basic Data */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600">Transaction</label>
                      <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
                        <span className="font-mono text-sm">Invoice</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Invoice Date</label>
                      <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
                        <span className="font-mono text-sm">23-Jul-2025</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Invoicing Party</label>
                      <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
                        <span className="font-mono text-sm">GUJARAT FREIGHT TOOLS</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Company Code</label>
                      <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
                        <span className="font-mono text-sm">VFL1</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Amount</label>
                      <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
                        <span className="font-mono text-sm">₹4,490.00</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Reference</label>
                      <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
                        <span className="font-mono text-sm">GST-3425-26</span>
                      </div>
                    </div>
                  </div>

                  {/* Line Items */}
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-medium text-gray-700 mb-2 text-sm">Line Item Input (G/L Account Items)</h5>
                    <div className="space-y-2 text-xs">
                      <div className="grid grid-cols-4 gap-2 bg-white p-2 rounded border">
                        <div><strong>Item 1:</strong> Bosch All-in-one Metal Hand Tool Kit</div>
                        <div><strong>G/L:</strong> 40010</div>
                        <div><strong>Amount:</strong> ₹2,991.30</div>
                        <div><strong>Tax Code:</strong> I0</div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 bg-white p-2 rounded border">
                        <div><strong>Item 2:</strong> Taparia Universal Tool Kit</div>
                        <div><strong>G/L:</strong> 40010</div>
                        <div><strong>Amount:</strong> ₹1,498.60</div>
                        <div><strong>Tax Code:</strong> I0</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-blue-600">
                      <Bot className="h-3 w-3 inline mr-1" />
                      ERP Posting Agent auto-applying IGST @ 18% based on extracted invoice data.
                    </div>
                  </div>

                  {/* Status Messages */}
                  <div className="space-y-1">
                    {executionStep >= 0 && (
                      <div className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-green-700">ERP Posting Agent dynamically writing code for SAP posting</span>
                      </div>
                    )}
                    {executionStep >= 1 && (
                      <div className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-green-700">ERP Posting Agent connected to SAP and opened Create Supplier Invoice</span>
                      </div>
                    )}
                    {executionStep >= 2 && (
                      <div className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-green-700">ERP Posting Agent populated invoice header details</span>
                      </div>
                    )}
                    {executionStep >= 3 && (
                      <div className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-green-700">ERP Posting Agent entered line item details and applied tax codes</span>
                      </div>
                    )}
                    {executionStep >= 4 && (
                      <div className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-green-700">ERP Posting Agent performed SAP validation checks</span>
                      </div>
                    )}
                    {executionStep >= 5 && (
                      <div className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-green-700">SAP confirmed successful posting of invoice GST-3425-26 via ERP Posting Agent</span>
                      </div>
                    )}
                  </div>

                  {!isExecuting && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium text-green-800 text-sm">Invoice Posted Successfully</h4>
                          <p className="text-xs text-green-700">
                            Tax Invoice GST-3425-26 has been successfully posted to SAP by ERP Posting Agent. Confirmation Email Agent initiated.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {!isExecuting && (
          <div className="flex justify-end">
            <Button 
              onClick={() => onNext('invoice-closure')} 
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              Continue to Archival
            </Button>
          </div>
        )}
      </div>

      {/* Timeline Panel */}
      <div className="lg:col-span-1">
        <TimelinePanel timeline={ticketData.timeline} />
      </div>
    </div>
  );
};

export default InvoiceERPPosting;
