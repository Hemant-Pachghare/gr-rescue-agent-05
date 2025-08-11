
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Bot, CheckCircle, Loader2, Settings } from 'lucide-react';
import TimelinePanel from '@/components/TimelinePanel';

const SAPExecution = ({ ticketData, setTicketData, onNext }) => {
  const [executionStep, setExecutionStep] = useState(0);
  const [isExecuting, setIsExecuting] = useState(true);

  const isBatchJobFailure = ticketData.isBatchJobFailure;
  const isGoodsReceiptBlocked = ticketData.isGoodsReceiptBlocked;
  const isSalesOrderInterfaceIssue = ticketData.isSalesOrderInterfaceIssue;

  const getExecutionSteps = () => {
    if (isBatchJobFailure) {
      return [
        { 
          title: 'AI Agent Opening SAP Transaction MIGO...', 
          description: 'Connecting to SAP system and accessing MIGO transaction',
          duration: 2000 
        },
        { 
          title: 'AI Agent Correcting Movement Type...', 
          description: 'Correcting Movement Type for Material Document #987654321',
          duration: 3000 
        },
        { 
          title: 'Batch Job Rerun Initiated...', 
          description: 'Initiating re-run of Inventory Reconciliation Load batch job',
          duration: 2000 
        }
      ];
    } else if (isGoodsReceiptBlocked) {
      return [
        { 
          title: 'AI Agent Opening SAP Transaction MIGO...', 
          description: 'Connecting to SAP system and accessing MIGO transaction',
          duration: 2000 
        },
        { 
          title: 'AI Agent Unblocking Quantity...', 
          description: 'Releasing quality holds and adjusting quantity variances',
          duration: 3000 
        },
        { 
          title: 'Confirmation of GR Posting...', 
          description: 'Validating goods receipt posting and updating PO status',
          duration: 2000 
        }
      ];
    } else if (isSalesOrderInterfaceIssue) {
      return [
        { 
          title: 'AI Agent Accessing Interface Monitoring Tool...', 
          description: 'Connecting to PI/PO and accessing interface monitoring tools',
          duration: 2000 
        },
        { 
          title: 'AI Agent Restarting Interface Channel...', 
          description: 'Restarting SalesOrder_In channel and clearing error queue',
          duration: 3000 
        },
        { 
          title: 'Reprocessing Failed Messages...', 
          description: 'Initiating reprocessing of failed sales order messages',
          duration: 2000 
        }
      ];
    } else {
      return [
        { 
          title: 'AI Agent Connecting to System...', 
          description: 'Establishing connection to target system',
          duration: 2000 
        },
        { 
          title: 'Executing Resolution...', 
          description: 'Applying proposed resolution changes',
          duration: 3000 
        },
        { 
          title: 'Validating Changes...', 
          description: 'Confirming successful resolution implementation',
          duration: 2000 
        }
      ];
    }
  };

  const executionSteps = getExecutionSteps();

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
      
      let timelineDescription = 'AI initiated execution of the proposed resolution.';
      let timelineTitle = 'Resolution Execution';
      
      if (isBatchJobFailure) {
        timelineTitle = 'SAP/Job Scheduler Action';
        timelineDescription = 'AI agent corrected Movement Type for Material Document #987654321 and initiated a re-run of the \'Inventory Reconciliation Load\' batch job.';
      } else if (isGoodsReceiptBlocked) {
        timelineTitle = 'SAP Action: Unblock GR';
        timelineDescription = 'AI agent successfully executed MIGO transaction and unblocked quantity for PO #12345.';
      } else if (isSalesOrderInterfaceIssue) {
        timelineTitle = 'Interface/ERP Action';
        timelineDescription = 'AI agent restarted Interface Channel \'SalesOrder_In\' and initiated re-processing of failed sales orders.';
      }

      const newTimelineItem = {
        id: 5,
        type: 'sap_execution',
        title: timelineTitle,
        description: timelineDescription,
        timestamp: new Date(),
        icon: Database,
        status: 'completed',
        sapExecution: true
      };

      setTicketData(prev => ({
        ...prev,
        timeline: [...prev.timeline, newTimelineItem],
        status: 'Resolved'
      }));
    }, totalDuration);

  }, [setTicketData, isBatchJobFailure, isGoodsReceiptBlocked, isSalesOrderInterfaceIssue]);

  const calculateProgress = () => {
    if (!isExecuting) return 100;
    return ((executionStep + 1) / executionSteps.length) * 100;
  };

  const getPageTitle = () => {
    if (isBatchJobFailure) return 'SAP/Job Scheduler Execution - AI Action In Progress';
    if (isGoodsReceiptBlocked) return 'SAP MIGO Transaction - AI Execution in Progress';
    if (isSalesOrderInterfaceIssue) return 'Interface/ERP Execution - AI Action In Progress';
    return 'Execution in Progress';
  };

  const getTransactionInfo = () => {
    if (isBatchJobFailure) return 'Transaction: MIGO & Job Scheduler';
    if (isGoodsReceiptBlocked) return 'Transaction: MIGO | Goods Movement';
    if (isSalesOrderInterfaceIssue) return 'Interface Monitoring Tool (PI/PO) & ERP';
    return 'Generic System Action';
  };

  const renderBatchJobExecution = () => (
    <>
      {/* Document Details */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-600">Material Document</label>
          <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
            <span className="font-mono text-sm">#987654321</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Movement Type Correction</label>
          <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
            <span className="font-mono text-sm">Executed</span>
          </div>
        </div>
      </div>

      {/* Batch Job Status */}
      <div className="bg-gray-50 p-3 rounded">
        <h5 className="font-medium text-gray-700 mb-2 text-sm">Batch Job Processing</h5>
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-gray-500">Batch Job Name:</span>
            <div className="font-mono font-bold">
              Inventory Reconciliation Load
            </div>
          </div>
          <div>
            <span className="text-gray-500">Status:</span>
            <div className="font-mono font-bold text-green-600">
              {isExecuting ? 'Re-running' : 'Completed'}
            </div>
          </div>
          <div>
            <span className="text-gray-500">Documents Processed:</span>
            <div className="font-mono font-bold text-green-600">
              {isExecuting ? 'Processing...' : 'All documents processed'}
            </div>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="space-y-1">
        {executionStep >= 0 && (
          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">MIGO transaction accessed successfully</span>
          </div>
        )}
        {executionStep >= 1 && (
          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">Movement Type corrected for document #987654321</span>
          </div>
        )}
        {executionStep >= 2 && (
          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">Batch job 'Inventory Reconciliation Load' re-run initiated via scheduler</span>
          </div>
        )}
      </div>
    </>
  );

  const renderGoodsReceiptExecution = () => (
    <>
      {/* PO Details */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-600">Purchase Order</label>
          <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
            <span className="font-mono text-sm">12345</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Movement Type</label>
          <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
            <span className="font-mono text-sm">101 - GR for PO</span>
          </div>
        </div>
      </div>

      {/* Quantity Details */}
      <div className="bg-gray-50 p-3 rounded">
        <h5 className="font-medium text-gray-700 mb-2 text-sm">Quantity Processing</h5>
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-gray-500">Total Quantity:</span>
            <div className="font-mono font-bold">
              100 Units
            </div>
          </div>
          <div>
            <span className="text-gray-500">Previously Blocked:</span>
            <div className="font-mono font-bold text-red-600">
              {isExecuting ? 70 : 0} Units
            </div>
          </div>
          <div>
            <span className="text-gray-500">Available for GR:</span>
            <div className="font-mono font-bold text-green-600">
              {isExecuting ? 30 : 100} Units
            </div>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="space-y-1">
        {executionStep >= 0 && (
          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">MIGO transaction accessed successfully</span>
          </div>
        )}
        {executionStep >= 1 && (
          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">Quality holds released for blocked items</span>
          </div>
        )}
        {executionStep >= 2 && (
          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">Goods Receipt posted successfully</span>
          </div>
        )}
      </div>
    </>
  );

  const renderSalesOrderInterfaceExecution = () => (
    <>
      {/* Interface Details */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-600">Interface Channel</label>
          <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
            <span className="font-mono text-sm">SalesOrder_In</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Channel Restart</label>
          <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
            <span className="font-mono text-sm">Executed</span>
          </div>
        </div>
      </div>

      {/* Message Processing */}
      <div className="bg-gray-50 p-3 rounded">
        <h5 className="font-medium text-gray-700 mb-2 text-sm">Message Processing</h5>
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-gray-500">Interface Tool:</span>
            <div className="font-mono font-bold">
              PI/PO (Simulated)
            </div>
          </div>
          <div>
            <span className="text-gray-500">Status:</span>
            <div className="font-mono font-bold text-green-600">
              {isExecuting ? 'Reprocessing' : 'Orders Integrated'}
            </div>
          </div>
          <div>
            <span className="text-gray-500">Failed Messages:</span>
            <div className="font-mono font-bold text-green-600">
              {isExecuting ? 'Processing...' : 'All processed'}
            </div>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="space-y-1">
        {executionStep >= 0 && (
          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">Interface monitoring tool accessed successfully</span>
          </div>
        )}
        {executionStep >= 1 && (
          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">Interface channel 'SalesOrder_In' restarted successfully</span>
          </div>
        )}
        {executionStep >= 2 && (
          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">Failed sales order messages reprocessed</span>
          </div>
        )}
      </div>
    </>
  );

  const renderGenericExecution = () => (
    <>
      {/* Generic Action Details */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-600">Action</label>
          <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
            <span className="font-mono text-sm">[Action Name]</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Status</label>
          <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded">
            <span className="font-mono text-sm">{isExecuting ? 'In Progress' : 'Completed'}</span>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="space-y-1">
        {executionStep >= 0 && (
          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">System connection established</span>
          </div>
        )}
        {executionStep >= 1 && (
          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">Resolution changes applied</span>
          </div>
        )}
        {executionStep >= 2 && (
          <div className="flex items-center space-x-2 text-xs">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">Changes validated successfully</span>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Work Area */}
      <div className="lg:col-span-2 space-y-4">
        {/* SAP Header */}
        <div className="bg-blue-800 text-white p-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white text-blue-800 px-3 py-1 rounded text-sm font-bold">
                {isBatchJobFailure || isGoodsReceiptBlocked ? 'SAP' : isSalesOrderInterfaceIssue ? 'PI/PO' : 'SYS'}
              </div>
              <span className="text-sm">
                {isBatchJobFailure ? 'R/3 System | MIGO & Job Scheduler' 
                 : isGoodsReceiptBlocked ? 'R/3 System | MIGO - Goods Movement'
                 : isSalesOrderInterfaceIssue ? 'Interface System | PI/PO - Sales Order Integration'
                 : 'System | Generic Action'}
              </span>
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
              {getPageTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Execution Progress */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-blue-800">AI Agent Status</h3>
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
                    {getTransactionInfo()}
                  </h4>
                </div>
                
                <div className="p-3 space-y-3">
                  {isBatchJobFailure && renderBatchJobExecution()}
                  {isGoodsReceiptBlocked && renderGoodsReceiptExecution()}
                  {isSalesOrderInterfaceIssue && renderSalesOrderInterfaceExecution()}
                  {!isBatchJobFailure && !isGoodsReceiptBlocked && !isSalesOrderInterfaceIssue && renderGenericExecution()}

                  {!isExecuting && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium text-green-800 text-sm">Transaction Completed Successfully</h4>
                          <p className="text-xs text-green-700">
                            {isBatchJobFailure 
                              ? 'Movement type has been corrected and batch job has been successfully re-run.'
                              : isGoodsReceiptBlocked
                              ? 'All blocked quantities have been released and goods receipt has been posted.'
                              : isSalesOrderInterfaceIssue
                              ? 'Interface channel has been restarted and all failed messages have been reprocessed.'
                              : 'Resolution has been successfully implemented.'}
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
              onClick={() => onNext('closure')} 
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              Next
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

export default SAPExecution;
