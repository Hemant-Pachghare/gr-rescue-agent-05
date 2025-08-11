import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, CheckCircle, AlertTriangle, Bot, X } from 'lucide-react';
import TimelinePanel from '@/components/TimelinePanel';
import { toast } from '@/hooks/use-toast';

const ResolutionProposal = ({ ticketData, setTicketData, onNext }) => {
  const [resolutionConfidence, setResolutionConfidence] = useState(75);
  const [showProposal, setShowProposal] = useState(false);

  const isBatchJobFailure = ticketData.isBatchJobFailure;
  const isGoodsReceiptBlocked = ticketData.isGoodsReceiptBlocked;
  const isSalesOrderInterfaceIssue = ticketData.isSalesOrderInterfaceIssue;

  useEffect(() => {
    // Set different confidence based on scenario
    let confidence = 75;
    let proposalDescription = 'AI proposed a resolution for the general issue.';
    
    if (isBatchJobFailure) {
      confidence = 85;
      proposalDescription = 'Identified root cause as incorrect movement type and proposed "Correct Movement Type in MIGO and Rerun Batch Job".';
    } else if (isGoodsReceiptBlocked) {
      confidence = 88;
      proposalDescription = 'Identified root cause and proposed "Unblock quantity via SAP transaction MIGO".';
    } else if (isSalesOrderInterfaceIssue) {
      confidence = 88;
      proposalDescription = 'Identified root cause as interface connectivity/mapping issue and proposed "Restart Interface Channel and Reprocess Failed Messages".';
    }
    
    setResolutionConfidence(confidence);
    
    // Simulate AI resolution analysis
    const timer = setTimeout(() => {
      setShowProposal(true);
      
      const newTimelineItem = {
        id: 4,
        type: 'resolution_proposal',
        title: 'AI Resolution Proposal',
        description: `${proposalDescription} Confidence: ${confidence}%`,
        timestamp: new Date(),
        icon: Lightbulb,
        status: 'completed',
        confidence: confidence
      };

      setTicketData(prev => ({
        ...prev,
        timeline: [...prev.timeline, newTimelineItem]
      }));
    }, 1500);

    return () => clearTimeout(timer);
  }, [setTicketData, isBatchJobFailure, isGoodsReceiptBlocked, isSalesOrderInterfaceIssue]);

  const handleApprove = () => {
    toast({
      title: "Resolution Approved",
      description: "AI will now execute the resolution in SAP system...",
    });
    onNext('execution');
  };

  const handleDecline = () => {
    toast({
      title: "Manual Intervention Required",
      description: "Resolution declined. The case will be assigned for manual review.",
      variant: "destructive",
    });
  };

  const getConfidenceColor = (conf) => {
    if (conf >= 85) return 'text-green-600';
    if (conf >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBg = (conf) => {
    if (conf >= 85) return 'bg-green-100 border-green-200';
    if (conf >= 70) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  const renderBatchJobProposal = () => (
    <>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-3">Analysis Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Batch Job Name:</span> 
            <span className="font-medium ml-2">Inventory Reconciliation Load</span>
          </div>
          <div>
            <span className="text-gray-500">Affected Document:</span> 
            <span className="font-medium text-red-600 ml-2">#987654321</span>
          </div>
          <div>
            <span className="text-gray-500">Job Status:</span> 
            <span className="font-medium text-red-600 ml-2">Failed</span>
          </div>
          <div>
            <span className="text-gray-500">Error Type:</span> 
            <span className="font-medium ml-2">Data Validation Failure</span>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-red-800 text-lg mb-2">
          🔍 Identified Root Cause:
        </h4>
        <p className="text-red-700 font-medium">
          Incorrect Movement Type (e.g., '101') in Material Document #987654321 preventing load.
        </p>
        <p className="text-sm text-red-600 mt-2">
          Data validation failure in ETL process due to incorrect movement type configuration.
        </p>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-green-800 text-lg mb-2">
          ✅ Proposed Resolution:
        </h4>
        <p className="text-green-700 font-medium">
          Correct Movement Type in MIGO (or relevant SAP transaction) for document #987654321, then Rerun Batch Job
        </p>
        <div className="mt-3">
          <p className="text-sm text-green-600 mb-2">Resolution Steps:</p>
          <ul className="text-sm text-green-600 space-y-1 ml-4">
            <li>1. Access SAP MIGO transaction (or relevant SAP transaction)</li>
            <li>2. Locate Material Document #987654321</li>
            <li>3. Correct Movement Type</li>
            <li>4. Initiate re-run of 'Inventory Reconciliation Load' batch job</li>
          </ul>
        </div>
      </div>
    </>
  );

  const renderGoodsReceiptProposal = () => (
    <>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-3">Analysis Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">PO Number:</span> 
            <span className="font-medium ml-2">#12345</span>
          </div>
          <div>
            <span className="text-gray-500">Blocked Quantity:</span> 
            <span className="font-medium text-red-600 ml-2">70 units</span>
          </div>
          <div>
            <span className="text-gray-500">Total Quantity:</span> 
            <span className="font-medium ml-2">100 units</span>
          </div>
          <div>
            <span className="text-gray-500">PO Status:</span> 
            <span className="font-medium text-green-600 ml-2">Open</span>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-red-800 text-lg mb-2">
          🔍 Identified Root Cause:
        </h4>
        <p className="text-red-700 font-medium">
          Quantity blocked: 70 of 100 units
        </p>
        <p className="text-sm text-red-600 mt-2">
          Multiple line items have quality holds and quantity variances preventing GR posting.
        </p>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-green-800 text-lg mb-2">
          ✅ Proposed Resolution:
        </h4>
        <p className="text-green-700 font-medium">
          Unblock quantity via SAP transaction MIGO
        </p>
        <div className="mt-3">
          <p className="text-sm text-green-600 mb-2">Resolution Steps:</p>
          <ul className="text-sm text-green-600 space-y-1 ml-4">
            <li>1. Access SAP MIGO transaction</li>
            <li>2. Release quality holds for blocked items</li>
            <li>3. Adjust quantity variances</li>
            <li>4. Post goods receipt for unblocked quantities</li>
          </ul>
        </div>
      </div>
    </>
  );

  const renderSalesOrderInterfaceProposal = () => (
    <>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-3">Analysis Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Interface Name:</span> 
            <span className="font-medium ml-2">E-commerce ERP Sales Order</span>
          </div>
          <div>
            <span className="text-gray-500">Affected Channel:</span> 
            <span className="font-medium text-red-600 ml-2">SalesOrder_In</span>
          </div>
          <div>
            <span className="text-gray-500">Current Status:</span> 
            <span className="font-medium text-red-600 ml-2">Stuck/Failed</span>
          </div>
          <div>
            <span className="text-gray-500">Error Type:</span> 
            <span className="font-medium ml-2">Connectivity Issue</span>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-red-800 text-lg mb-2">
          🔍 Identified Root Cause:
        </h4>
        <p className="text-red-700 font-medium">
          Connectivity Failure between E-commerce Interface and ERP
        </p>
        <p className="text-sm text-red-600 mt-2">
          Interface channel 'SalesOrder_In' is experiencing connectivity issues preventing message processing.
        </p>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-green-800 text-lg mb-2">
          ✅ Proposed Resolution:
        </h4>
        <p className="text-green-700 font-medium">
          Restart Interface Channel 'SalesOrder_In' in PI/PO (or correct mapping for Customer ID), then Reprocess Failed Messages
        </p>
        <div className="mt-3">
          <p className="text-sm text-green-600 mb-2">Resolution Steps:</p>
          <ul className="text-sm text-green-600 space-y-1 ml-4">
            <li>1. Access Interface Monitoring Tool (e.g., PI/PO)</li>
            <li>2. Locate Interface Channel 'SalesOrder_In'</li>
            <li>3. Restart Channel (or apply corrected mapping for Customer ID)</li>
            <li>4. Initiate re-processing of failed sales order messages</li>
          </ul>
        </div>
      </div>
    </>
  );

  const renderGenericProposal = () => (
    <>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-3">Analysis Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Issue Type:</span> 
            <span className="font-medium ml-2">General Issue</span>
          </div>
          <div>
            <span className="text-gray-500">Impact:</span> 
            <span className="font-medium text-yellow-600 ml-2">[Level]</span>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-red-800 text-lg mb-2">
          🔍 Identified Root Cause:
        </h4>
        <p className="text-red-700 font-medium">
          Root cause identified: [Generic Cause]
        </p>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-green-800 text-lg mb-2">
          ✅ Proposed Resolution:
        </h4>
        <p className="text-green-700 font-medium">
          Proposed resolution: [Generic Resolution]
        </p>
        <div className="mt-3">
          <p className="text-sm text-green-600 mb-2">Resolution Steps:</p>
          <ul className="text-sm text-green-600 space-y-1 ml-4">
            <li>1. [Generic Step 1]</li>
            <li>2. [Generic Step 2]</li>
            <li>3. [Generic Step 3]</li>
          </ul>
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
              <Lightbulb className="mr-2 h-6 w-6" />
              AI Resolution Proposal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {showProposal ? (
                <div className="space-y-4">
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Resolution Analysis</h3>
                    
                    {/* Render content based on scenario */}
                    {isBatchJobFailure && renderBatchJobProposal()}
                    {isGoodsReceiptBlocked && renderGoodsReceiptProposal()}
                    {isSalesOrderInterfaceIssue && renderSalesOrderInterfaceProposal()}
                    {!isBatchJobFailure && !isGoodsReceiptBlocked && !isSalesOrderInterfaceIssue && renderGenericProposal()}

                    {/* AI Confidence */}
                    <div className={`p-4 rounded-lg border ${getConfidenceBg(resolutionConfidence)}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-800">AI Resolution Confidence</h4>
                        <Badge variant={resolutionConfidence >= 85 ? "default" : "secondary"}>
                          {resolutionConfidence >= 85 ? "High Confidence" : resolutionConfidence >= 70 ? "Medium Confidence" : "Low Confidence"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2 flex-1">
                          <Progress value={resolutionConfidence} className="flex-1 h-3" />
                          <span className={`font-bold text-lg ${getConfidenceColor(resolutionConfidence)}`}>
                            {resolutionConfidence}%
                          </span>
                        </div>
                        {resolutionConfidence >= 85 ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-6 w-6 text-yellow-600" />
                        )}
                      </div>
                      
                      {resolutionConfidence < 85 && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                          <AlertTriangle className="h-4 w-4 inline mr-1" />
                          {resolutionConfidence < 70 ? "Low" : "Medium"} confidence detected. Consider manual review if resolution fails.
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-6">
                      <Button
                        onClick={handleApprove}
                        className={`px-8 py-3 ${
                          resolutionConfidence >= 85 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Approve & Execute Resolution
                      </Button>
                      
                      <Button
                        onClick={handleDecline}
                        variant="outline"
                        className="px-6 py-3 border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Decline & Manual Intervention
                      </Button>
                    </div>

                    {resolutionConfidence >= 85 ? (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-800">
                          <CheckCircle className="h-4 w-4 inline mr-1 text-blue-600" />
                          <strong>Recommended:</strong> High confidence resolution detected. 
                          Safe to proceed with automated execution.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-sm text-yellow-800">
                          <AlertTriangle className="h-4 w-4 inline mr-1 text-yellow-600" />
                          <strong>Recommended:</strong> Review and proceed manually.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Panel */}
      <div className="lg:col-span-1">
        <TimelinePanel timeline={ticketData.timeline} />
      </div>
    </div>
  );
};

export default ResolutionProposal;
