import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import TimelinePanel from '@/components/TimelinePanel';

const AgentTriage = ({ ticketData, setTicketData, onNext }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [confidence, setConfidence] = useState(0);

  const isBatchJobFailure = ticketData.isBatchJobFailure;
  const isGoodsReceiptBlocked = ticketData.isGoodsReceiptBlocked;
  const isSalesOrderInterfaceIssue = ticketData.isSalesOrderInterfaceIssue;

  useEffect(() => {
    // Simulate AI triage process
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      let confidenceScore = 80;
      let issueType = 'General Issue';
      let detectedItem = 'Affected System: [System Name]';
      let description = 'System classified as "General Issue".';

      if (isBatchJobFailure) {
        confidenceScore = 93;
        issueType = 'Batch Job Failure - Data Inconsistency';
        detectedItem = 'Batch Job Name: Inventory Reconciliation Load';
        description = 'System classified as "Batch Job Failure - Data Inconsistency".';
      } else if (isGoodsReceiptBlocked) {
        confidenceScore = 92;
        issueType = 'PO Issue - Goods Receipt Blocked';
        detectedItem = 'PO Number Identified: #12345';
        description = 'System classified as "PO Issue - Goods Receipt Blocked".';
      } else if (isSalesOrderInterfaceIssue) {
        confidenceScore = 90;
        issueType = 'Interface Issue - Sales Order Integration';
        detectedItem = 'Interface Channel: SalesOrder_In';
        description = 'System classified as "Interface Issue - Sales Order Integration".';
      }

      setConfidence(confidenceScore);
      
      const newTimelineItem = {
        id: 2,
        type: 'ai_triage',
        title: 'AI Auto-Triage',
        description: `${description} Confidence: ${confidenceScore}%`,
        timestamp: new Date(),
        icon: Bot,
        status: 'completed',
        confidence: confidenceScore
      };

      setTicketData(prev => ({
        ...prev,
        confidence: confidenceScore,
        issueType: issueType,
        detectedItem: detectedItem,
        timeline: [...prev.timeline, newTimelineItem]
      }));
    }, 2000);

    return () => clearTimeout(timer);
  }, [setTicketData, isBatchJobFailure, isGoodsReceiptBlocked, isSalesOrderInterfaceIssue]);

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

  const getRequester = () => {
    if (isBatchJobFailure) return 'System Monitoring';
    if (isGoodsReceiptBlocked) return 'Hemant';
    if (isSalesOrderInterfaceIssue) return 'Sales Team Lead';
    return 'User';
  };

  const getIssueType = () => {
    if (isBatchJobFailure) return 'Batch Job Failure - Data Inconsistency';
    if (isGoodsReceiptBlocked) return 'PO Issue - Goods Receipt Blocked';
    if (isSalesOrderInterfaceIssue) return 'Interface Issue - Sales Order Integration';
    return 'General Issue';
  };

  const getDetectedItem = () => {
    if (isBatchJobFailure) return 'Batch Job Name: Inventory Reconciliation Load';
    if (isGoodsReceiptBlocked) return 'PO Number Identified: #12345';
    if (isSalesOrderInterfaceIssue) return 'Interface Channel: SalesOrder_In';
    return 'Affected System: [System Name]';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Work Area */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 py-4">
            <CardTitle className="flex items-center text-blue-700">
              <Bot className="mr-2 h-6 w-6" />
              Incident Details & AI Triage
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Ticket Information */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-gray-500">Ticket ID</p>
                  <p className="text-base font-semibold">{ticketData.id}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Requester</p>
                  <p className="text-base font-semibold">{getRequester()}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Subject</p>
                <p className="text-sm">{ticketData.subject}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Description</p>
                <p className="text-sm bg-gray-50 p-2 rounded-md">{ticketData.description}</p>
              </div>

              {/* AI Classification */}
              <div className="border-t pt-3 mt-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-gray-900">AI Classification</h3>
                  {isAnalyzing && (
                    <Badge variant="secondary" className="animate-pulse">
                      <Clock className="w-3 h-3 mr-1" />
                      Analyzing...
                    </Badge>
                  )}
                </div>

                {!isAnalyzing ? (
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg border ${getConfidenceBg(confidence)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-800 text-sm">Issue Type</p>
                        <Badge className="bg-blue-600 text-white text-xs">
                          {getIssueType()}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <p className="text-xs font-medium text-gray-600">AI Confidence Score:</p>
                        <div className="flex items-center space-x-2 flex-1">
                          <Progress value={confidence} className="flex-1 h-2" />
                          <span className={`font-bold text-sm ${getConfidenceColor(confidence)}`}>
                            {confidence}%
                          </span>
                        </div>
                        {confidence >= 85 ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        )}
                      </div>
                      
                      {confidence < 85 && (
                        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                          <AlertTriangle className="h-3 w-3 inline mr-1" />
                          Low confidence detected. Manual review may be required.
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50 p-2 rounded-md">
                      <p className="text-xs font-medium text-blue-800">
                        {getDetectedItem()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="animate-pulse">
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {!isAnalyzing && (
          <div className="flex justify-end">
            <Button 
              onClick={() => onNext('rca')} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Proceed to RCA
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

export default AgentTriage;
