
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Bot, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import TimelinePanel from '@/components/TimelinePanel';

const RCAAnalysis = ({ ticketData, setTicketData, onNext }) => {
  const [isQuerying, setIsQuerying] = useState(true);
  const [sapData, setSapData] = useState(null);

  const isBatchJobFailure = ticketData.isBatchJobFailure;
  const isGoodsReceiptBlocked = ticketData.isGoodsReceiptBlocked;
  const isSalesOrderInterfaceIssue = ticketData.isSalesOrderInterfaceIssue;

  useEffect(() => {
    // Simulate SAP/ETL data retrieval
    const timer = setTimeout(() => {
      let mockSapData = {};
      let timelineTitle = 'Data Retrieval';
      let timelineDescription = 'AI agent retrieved relevant system logs and data.';

      if (isBatchJobFailure) {
        mockSapData = {
          etlLogStatus: 'Errors Found',
          sapDataPulled: 'Incomplete',
          errorDetails: 'Data Validation Failure',
          affectedDocument: '987654321',
          material: 'Material XYZ',
          movementType: '101',
          blockedItems: [
            { 
              document: '#987654321', 
              material: 'Material XYZ', 
              reason: 'Incorrect Movement Type',
              movementType: '101'
            }
          ]
        };
        timelineTitle = 'SAP/ETL Data Retrieval';
        timelineDescription = 'AI agent queried ETL logs and SAP Material Document tables. Identified data validation failures for Material Document #987654321.';
      } else if (isGoodsReceiptBlocked) {
        mockSapData = {
          poStatus: 'Open',
          totalQuantity: 100,
          blockedQuantity: 70,
          poNumber: '12345',
          currency: 'INR',
          vendor: 'Supplier ABC Ltd',
          materialCode: 'MAT-001',
          blockedItems: [
            { lineItem: '001', material: 'Raw Material A', quantity: 40, reason: 'Quality hold' },
            { lineItem: '002', material: 'Raw Material B', quantity: 30, reason: 'Quantity variance' }
          ]
        };
        timelineTitle = 'SAP Data Retrieval';
        timelineDescription = 'AI agent retrieved PO data from SAP. Found 70 of 100 units blocked.';
      } else if (isSalesOrderInterfaceIssue) {
        mockSapData = {
          interfaceStatus: 'Error Queue / Processing Failures',
          middlewareLogs: 'Errors Found',
          erpIdocMonitor: 'Messages Stuck',
          interfaceChannel: 'SalesOrder_In',
          errorMessage: 'Invalid Customer ID',
          blockedItems: [
            { 
              document: 'SalesOrder_001', 
              error: 'Invalid Customer ID', 
              reason: 'Customer mapping failure'
            }
          ]
        };
        timelineTitle = 'Interface/ERP Data Retrieval';
        timelineDescription = 'AI agent queried Interface Monitoring Tool and ERP. Identified messages stuck in error queue for SalesOrder_In.';
      } else {
        // Generic scenario
        mockSapData = {
          systemStatus: 'Degraded',
          errorCount: 'High',
          affectedComponent: '[Component Name]',
          impactedUsers: '[Number]'
        };
      }

      setSapData(mockSapData);
      setIsQuerying(false);

      const newTimelineItem = {
        id: 3,
        type: 'sap_query',
        title: timelineTitle,
        description: timelineDescription,
        timestamp: new Date(),
        icon: Database,
        status: 'completed',
        sapData: mockSapData
      };

      setTicketData(prev => ({
        ...prev,
        timeline: [...prev.timeline, newTimelineItem],
        sapData: mockSapData
      }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [setTicketData, isBatchJobFailure, isGoodsReceiptBlocked, isSalesOrderInterfaceIssue]);

  const renderBatchJobAnalysis = () => (
    <>
      {/* ETL Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">ETL Log Status</p>
          <p className="text-lg font-semibold text-red-600">{sapData.etlLogStatus}</p>
        </div>
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">SAP Data Pulled</p>
          <p className="text-lg font-semibold text-red-600">{sapData.sapDataPulled}</p>
        </div>
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">Error Details</p>
          <p className="text-lg font-semibold text-red-600">{sapData.errorDetails}</p>
        </div>
      </div>

      {/* Affected Items */}
      <div>
        <h4 className="font-medium text-gray-800 mb-3">Affected Items Analysis</h4>
        <div className="space-y-2">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-800">Material Document #{sapData.affectedDocument}</p>
                <p className="text-sm text-gray-600">Associated Material: {sapData.material}</p>
              </div>
              <div className="text-right">
                <Badge variant="destructive" className="text-xs">
                  Incorrect Movement Type
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Root Cause Summary */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Root Cause Identified</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Incorrect Movement Type (e.g., '101') in Material Document #{sapData.affectedDocument} preventing load.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const renderGoodsReceiptAnalysis = () => (
    <>
      {/* PO Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">PO Status</p>
          <p className="text-lg font-semibold text-green-600">{sapData.poStatus}</p>
        </div>
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">Total Quantity</p>
          <p className="text-lg font-semibold">{sapData.totalQuantity} units</p>
        </div>
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">Blocked Quantity</p>
          <p className="text-lg font-semibold text-red-600">{sapData.blockedQuantity} units</p>
        </div>
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">Available</p>
          <p className="text-lg font-semibold text-green-600">
            {sapData.totalQuantity - sapData.blockedQuantity} units
          </p>
        </div>
      </div>

      {/* Vendor Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Purchase Order Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Vendor:</span> <span className="font-medium">{sapData.vendor}</span>
          </div>
          <div>
            <span className="text-gray-500">Currency:</span> <span className="font-medium">{sapData.currency}</span>
          </div>
        </div>
      </div>

      {/* Blocked Items */}
      <div>
        <h4 className="font-medium text-gray-800 mb-3">Blocked Items Analysis</h4>
        <div className="space-y-2">
          {sapData.blockedItems.map((item, index) => (
            <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Line {item.lineItem}: {item.material}</p>
                  <p className="text-sm text-gray-600">Blocked Quantity: {item.quantity} units</p>
                </div>
                <div className="text-right">
                  <Badge variant="destructive" className="text-xs">
                    {item.reason}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Summary */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Root Cause Identified</h4>
            <p className="text-sm text-yellow-700 mt-1">
              {sapData.blockedQuantity} of {sapData.totalQuantity} units are blocked due to quality holds and quantity variances. 
              Goods Receipt posting is prevented until these blocks are resolved.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const renderSalesOrderInterfaceAnalysis = () => (
    <>
      {/* Interface Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">Interface Status</p>
          <p className="text-lg font-semibold text-red-600">{sapData.interfaceStatus}</p>
        </div>
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">Middleware Logs</p>
          <p className="text-lg font-semibold text-red-600">{sapData.middlewareLogs}</p>
        </div>
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">ERP IDoc Monitor</p>
          <p className="text-lg font-semibold text-red-600">{sapData.erpIdocMonitor}</p>
        </div>
      </div>

      {/* Affected Items */}
      <div>
        <h4 className="font-medium text-gray-800 mb-3">Affected Items Analysis</h4>
        <div className="space-y-2">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-800">Interface Channel: {sapData.interfaceChannel}</p>
                <p className="text-sm text-gray-600">Error Message: {sapData.errorMessage}</p>
              </div>
              <div className="text-right">
                <Badge variant="destructive" className="text-xs">
                  Connectivity Refused
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Root Cause Summary */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Root Cause Identified</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Connectivity Failure between E-commerce Interface and ERP.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const renderGenericAnalysis = () => (
    <>
      {/* Generic System Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">System Status</p>
          <p className="text-lg font-semibold text-yellow-600">Degraded</p>
        </div>
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">Error Count</p>
          <p className="text-lg font-semibold text-red-600">High</p>
        </div>
        <div className="bg-white border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">Affected Component</p>
          <p className="text-lg font-semibold text-orange-600">[Component Name]</p>
        </div>
      </div>

      {/* Generic Analysis Summary */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Root Cause Identified</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Identified a general system anomaly affecting normal operations.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Work Area */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardTitle className="flex items-center text-blue-700">
              <Bot className="mr-2 h-6 w-6" />
              AI Root Cause Analysis (RCA)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Previous Classification */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Issue Classification</h3>
                <Badge className="bg-blue-600 text-white mb-2">
                  {isBatchJobFailure ? 'Batch Job Failure - Data Inconsistency' 
                   : isGoodsReceiptBlocked ? 'PO Issue - Goods Receipt Blocked'
                   : isSalesOrderInterfaceIssue ? 'Interface Issue - Sales Order Integration'
                   : 'General Issue'}
                </Badge>
                <p className="text-sm text-gray-600">
                  AI Confidence: <span className="font-medium text-green-600">{ticketData.confidence}%</span>
                </p>
              </div>

              {/* System Analysis Section */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isBatchJobFailure ? 'ETL/SAP System Analysis' 
                   : isGoodsReceiptBlocked ? 'SAP System Analysis'
                   : isSalesOrderInterfaceIssue ? 'Interface/ERP System Analysis'
                   : 'System Analysis'}
                </h3>
                
                {isQuerying ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">
                          {isBatchJobFailure 
                            ? 'Querying ETL logs and SAP Material Document tables...'
                            : isGoodsReceiptBlocked
                            ? `Querying SAP for PO #12345...`
                            : isSalesOrderInterfaceIssue
                            ? 'Querying Interface Monitoring Tool and ERP...'
                            : 'Querying system logs and data...'}
                        </p>
                        <p className="text-sm text-blue-600">
                          {isBatchJobFailure 
                            ? 'AI agent is checking batch job logs and identifying validation failures'
                            : isGoodsReceiptBlocked
                            ? 'AI agent is checking PO status, quantities, and identifying blocked items'
                            : isSalesOrderInterfaceIssue
                            ? 'AI agent is checking interface channels, message queues, and ERP integration status'
                            : 'AI agent is analyzing system performance and identifying issues'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {isBatchJobFailure && renderBatchJobAnalysis()}
                    {isGoodsReceiptBlocked && renderGoodsReceiptAnalysis()}
                    {isSalesOrderInterfaceIssue && renderSalesOrderInterfaceAnalysis()}
                    {!isBatchJobFailure && !isGoodsReceiptBlocked && !isSalesOrderInterfaceIssue && renderGenericAnalysis()}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {!isQuerying && (
          <div className="flex justify-end">
            <Button 
              onClick={() => onNext('proposal')} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              View Resolution Proposal
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

export default RCAAnalysis;
