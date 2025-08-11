
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Bot, FileText, User, Eye } from 'lucide-react';
import TimelinePanel from '@/components/TimelinePanel';
import { toast } from '@/hooks/use-toast';

const InvoiceHILReview = ({ ticketData, setTicketData, onNext }) => {
  const [reviewConfidence, setReviewConfidence] = useState(97);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    // Simulate loading the review data
    const timer = setTimeout(() => {
      setShowReview(true);
      
      const newTimelineItem = {
        id: 4,
        type: 'hil_review',
        title: 'Human-in-the-Loop Agent Initiated',
        description: 'Tax Invoice review and approval initiated for INV0001002 (GST-3425-26). Awaiting human confirmation of GL Account for final posting.',
        timestamp: new Date(),
        icon: User,
        status: 'completed',
        confidence: 97
      };

      setTicketData(prev => ({
        ...prev,
        timeline: [...prev.timeline, newTimelineItem]
      }));
    }, 1500);

    return () => clearTimeout(timer);
  }, [setTicketData]);

  const handleApprove = () => {
    toast({
      title: "Invoice Approved",
      description: "ERP Posting Agent will now execute automated posting to SAP...",
    });
    onNext('erp-posting');
  };

  const handleFlag = () => {
    toast({
      title: "Invoice Flagged for Exception",
      description: "Invoice flagged for additional review. Manual intervention required.",
      variant: "destructive",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Work Area */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-lg border-l-4 border-l-blue-500">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardTitle className="flex items-center text-blue-700">
              <Eye className="mr-2 h-6 w-6" />
              Tax Invoice Review & Approval
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {showReview ? (
                <div className="space-y-4">
                  {/* Analysis Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3">Analysis Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Invoice ID:</span> 
                        <span className="font-medium ml-2">INV0001002 (GST-3425-26)</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Vendor:</span> 
                        <span className="font-medium ml-2">GUJARAT FREIGHT TOOLS</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Amount:</span> 
                        <span className="font-medium text-green-600 ml-2">₹4,490.00</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Tax Details:</span> 
                        <span className="font-medium ml-2">IGST ₹684.90 @ 18%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Validation Status:</span> 
                        <span className="font-medium text-green-600 ml-2">All Automated Checks Passed (by Analysis Agents)</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Review Required:</span> 
                        <span className="font-medium text-yellow-600 ml-2">Yes - Tax Code & Final Posting Approval</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 text-lg mb-2">
                      ✅ Status: Ready for Posting after Human Approval
                    </h4>
                    <p className="text-green-700 font-medium">
                      Human agent to review extracted tax invoice data and GL code proposed by Analysis Agents. Approve for ERP posting via Action Agents.
                    </p>
                  </div>

                  {/* HIL Action Required */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 text-lg mb-3">
                      👤 Human-in-the-Loop (HIL) Action Required:
                    </h4>
                    <div className="space-y-3 text-blue-700">
                      <div className="flex items-start space-x-2">
                        <span className="font-medium">1.</span>
                        <p>Carefully review all extracted invoice data (gathered by Data Agents and validated by Analysis Agents), especially product/service details, quantities, rates, and tax components (IGST).</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="font-medium">2.</span>
                        <p>Verify and confirm the proposed GL Account: <strong>40010 - Tool & Equipment Purchases</strong> (Proposed by GL Code Suggester Agent, an Analysis Agent, with 92% confidence).</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="font-medium">3.</span>
                        <p>Click "Approve for Posting" to proceed with automated execution (by Action Agents), or "Flag for Exception" if discrepancies or additional review is needed.</p>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Document */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3">Original Tax Invoice Document</h4>
                    <div className="flex justify-center">
                      <img
                        src="/lovable-uploads/dec729cb-29b1-4461-b85d-5594a6045f9c.png"
                        alt="Gujarat Freight Tools Tax Invoice GST-3425-26"
                        className="max-w-full h-auto border border-gray-300 rounded-lg shadow-sm"
                      />
                    </div>
                  </div>

                  {/* AI Confidence */}
                  <div className="bg-green-100 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-800">AI Resolution Confidence</h4>
                      <Badge variant="default" className="bg-green-600 text-white">
                        High Confidence
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2 flex-1">
                        <Progress value={reviewConfidence} className="flex-1 h-3" />
                        <span className="font-bold text-lg text-green-600">
                          {reviewConfidence}%
                        </span>
                      </div>
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                      <Bot className="h-4 w-4 inline mr-1" />
                      <strong>Recommendation:</strong> Human-in-the-Loop required for final tax code verification and posting approval due to tax complexity. High confidence in extracted data from Data Agents and analysis by Analysis Agents.
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-6">
                    <Button
                      onClick={handleApprove}
                      className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Approve for Posting
                    </Button>
                    
                    <Button
                      onClick={handleFlag}
                      variant="outline"
                      className="px-6 py-3 border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Flag for Exception
                    </Button>
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

export default InvoiceHILReview;
