
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, Book, ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import TimelinePanel from '@/components/TimelinePanel';
import { toast } from '@/hooks/use-toast';

const TicketClosure = ({ ticketData, setTicketData, onNext }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);

  const isBatchJobFailure = ticketData.isBatchJobFailure;
  const isGoodsReceiptBlocked = ticketData.isGoodsReceiptBlocked;
  const isSalesOrderInterfaceIssue = ticketData.isSalesOrderInterfaceIssue;

  useEffect(() => {
    // Auto-close ticket and update knowledge base
    const timer = setTimeout(() => {
      let resolutionDescription = 'Resolution confirmed for generic issue.';
      let closureDescription = 'Incident automatically closed. Generic notes added to knowledge base.';
      
      if (isBatchJobFailure) {
        resolutionDescription = 'SAP Agent confirmed Movement Type correction and successful re-run of the batch job.';
        closureDescription = 'Incident automatically closed in ServiceNow. Resolution details added to knowledge base.';
      } else if (isGoodsReceiptBlocked) {
        resolutionDescription = 'SAP action confirmed. Goods Receipt successfully posted.';
        closureDescription = 'Incident automatically closed in ServiceNow. Resolution details added to knowledge base for future reference.';
      } else if (isSalesOrderInterfaceIssue) {
        resolutionDescription = 'AI agent confirmed successful restart and reprocessing, orders now in ERP.';
        closureDescription = 'Incident automatically closed in ServiceNow. Resolution details added to knowledge base for future reference.';
      }

      const closureItems = [
        {
          id: 6,
          type: 'resolution_confirmed',
          title: 'Resolution Confirmed',
          description: resolutionDescription,
          timestamp: new Date(),
          icon: CheckCircle,
          status: 'completed'
        },
        {
          id: 7,
          type: 'ticket_closed',
          title: 'Ticket Closed & KB Updated',
          description: closureDescription,
          timestamp: new Date(),
          icon: FileText,
          status: 'completed'
        }
      ];

      setTicketData(prev => ({
        ...prev,
        timeline: [...prev.timeline, ...closureItems],
        status: 'Closed'
      }));

      setShowFeedback(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setTicketData, isBatchJobFailure, isGoodsReceiptBlocked, isSalesOrderInterfaceIssue]);

  const handleFeedback = (isPositive) => {
    toast({
      title: "Thank you for your feedback!",
      description: isPositive ? "Your positive feedback helps us improve our AI system." : "We'll use your feedback to enhance our resolution accuracy.",
    });
  };

  const handleRating = (stars) => {
    setRating(stars);
    toast({
      title: "Rating Submitted",
      description: `Thank you for rating this resolution ${stars} star${stars > 1 ? 's' : ''}!`,
    });
  };

  const getResolutionSummary = () => {
    if (isBatchJobFailure) {
      return {
        title: "Batch Job Failure for 'Inventory Reconciliation Load' resolved, and job re-run successfully.",
        processingTime: '15 mins',
        confidence: '85%',
        method: 'Automated Correction & Rerun',
        transaction: 'MIGO (Simulated)',
        action: 'Job Scheduler Action: Rerun Initiated',
        quantity: 'All documents processed',
        kbUpdate: 'Resolved batch job failure by correcting Movement Type in MIGO for document #987654321 and re-running the job successfully. This information has been added to the knowledge base for future reference.',
        notification: 'An email notification was sent to System Monitoring confirming the resolution.'
      };
    } else if (isGoodsReceiptBlocked) {
      return {
        title: "Goods Receipt for PO #12345 unblocked and posted successfully.",
        processingTime: '3 minutes 42 seconds',
        confidence: '88%',
        method: 'SAP MIGO Transaction',
        transaction: 'MIGO',
        action: 'Unblocked Quantity: 70 units',
        quantity: '70 units',
        kbUpdate: 'Successfully unblocked Goods Receipt for PO #12345 by releasing quality holds and adjusting quantity variances in MIGO. This has been added to the knowledge base.',
        notification: 'Automated notification sent to Dabur Employee confirming the resolution. PO #12345 is now ready for goods receipt processing.'
      };
    } else if (isSalesOrderInterfaceIssue) {
      return {
        title: "Interface issue resolved, all missing sales orders now in ERP.",
        processingTime: '20 mins',
        confidence: '88%',
        method: 'Automated Restart & Reprocess',
        transaction: 'PI/PO (Simulated)',
        action: 'Orders Integrated',
        quantity: 'All messages processed',
        kbUpdate: 'Resolved interface issue by restarting channel \'SalesOrder_In\' and re-processing failed messages. All missing orders now in ERP. This information has been added to the knowledge base for future reference.',
        notification: 'An email notification was sent to Sales Team Lead confirming the resolution.'
      };
    } else {
      return {
        title: "Generic incident resolved successfully.",
        processingTime: '30 mins',
        confidence: '75%',
        method: 'Manual',
        transaction: 'Generic System',
        action: 'Resolution Applied',
        quantity: 'N/A',
        kbUpdate: 'Generic resolution notes added to knowledge base.',
        notification: 'Notification sent to relevant parties.'
      };
    }
  };

  const summary = getResolutionSummary();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Work Area */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-lg border-l-4 border-l-green-500">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle className="mr-2 h-8 w-8" />
              Issue Resolved & Ticket Closed!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Success Summary */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="text-center space-y-3">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
                  <h2 className="text-2xl font-bold text-green-800">Resolution Successful!</h2>
                  <p className="text-green-700 font-medium">
                    {summary.title}
                  </p>
                </div>
              </div>

              {/* Resolution Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-800 mb-3">Resolution Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Processing Time:</span>
                        <span className="font-medium">{summary.processingTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">AI Confidence:</span>
                        <span className="font-medium text-green-600">{summary.confidence}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Resolution Method:</span>
                        <span className="font-medium">{summary.method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {isBatchJobFailure ? 'Job Scheduler Action:' 
                           : isGoodsReceiptBlocked ? 'Unblocked Quantity:'
                           : isSalesOrderInterfaceIssue ? 'ERP Status:'
                           : 'Action Taken:'}
                        </span>
                        <span className="font-medium text-green-600">
                          {isBatchJobFailure ? 'Rerun Initiated'
                           : isGoodsReceiptBlocked ? `${summary.quantity}`
                           : isSalesOrderInterfaceIssue ? 'Orders Integrated'
                           : 'Resolution Applied'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-800 mb-3">Ticket Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className="bg-green-600 text-white">Closed</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Closure Time:</span>
                        <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Auto-Resolved:</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Knowledge Base Update */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Book className="h-6 w-6 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-800 mb-2">Knowledge Base Update</h3>
                    <p className="text-sm text-blue-700 mb-3">
                      {summary.kbUpdate}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Knowledge Article
                    </Button>
                  </div>
                </div>
              </div>

              {/* Customer Notification */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800 mb-2">Customer Notification</h3>
                <p className="text-sm text-yellow-700">
                  {summary.notification}
                </p>
              </div>

              {/* Feedback Section */}
              {showFeedback && (
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-medium text-gray-800 mb-4">Resolution Feedback</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-3">Was this resolution helpful?</p>
                      <div className="flex space-x-3">
                        <Button
                          onClick={() => handleFeedback(true)}
                          variant="outline"
                          size="sm"
                          className="border-green-300 text-green-700 hover:bg-green-50"
                        >
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          Yes, Helpful
                        </Button>
                        <Button
                          onClick={() => handleFeedback(false)}
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-700 hover:bg-red-50"
                        >
                          <ThumbsDown className="mr-2 h-4 w-4" />
                          Needs Improvement
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-3">Rate this resolution:</p>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRating(star)}
                            className={`p-1 rounded ${
                              star <= rating ? 'text-yellow-500' : 'text-gray-300'
                            } hover:text-yellow-500 transition-colors`}
                          >
                            <Star className="h-6 w-6 fill-current" />
                          </button>
                        ))}
                      </div>
                      {rating > 0 && (
                        <p className="text-sm text-gray-600 mt-2">
                          Thank you for rating this resolution {rating} star{rating > 1 ? 's' : ''}!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex space-x-4">
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            Create New Incident
          </Button>
          <Button 
            variant="outline"
            onClick={() => toast({ title: "Dashboard", description: "Redirecting to main dashboard..." })}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>

      {/* Timeline Panel */}
      <div className="lg:col-span-1">
        <TimelinePanel timeline={ticketData.timeline} />
      </div>
    </div>
  );
};

export default TicketClosure;
