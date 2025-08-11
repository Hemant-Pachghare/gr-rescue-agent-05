
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, Book, ThumbsUp, ThumbsDown, Star, Bot } from 'lucide-react';
import TimelinePanel from '@/components/TimelinePanel';
import { toast } from '@/hooks/use-toast';

const InvoiceClosure = ({ ticketData, setTicketData, onNext }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Auto-close and update knowledge base
    const timer = setTimeout(() => {
      const closureItems = [
        {
          id: 7,
          type: 'archive_complete',
          title: 'ERP Posting Agent Confirmation',
          description: 'ERP Posting Agent confirmed successful invoice posting for INV0001002 to SAP system.',
          timestamp: new Date(),
          icon: CheckCircle,
          status: 'completed'
        },
        {
          id: 8,
          type: 'invoice_archived',
          title: 'Invoice Archived & Process Complete',
          description: 'Invoice INV0001002 archived and confirmation emails sent by Confirmation Email Agent. Process complete.',
          timestamp: new Date(),
          icon: FileText,
          status: 'completed'
        }
      ];

      setTicketData(prev => ({
        ...prev,
        timeline: [...prev.timeline, ...closureItems],
        status: 'Archived'
      }));

      setShowFeedback(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setTicketData]);

  const handleFeedback = (isPositive) => {
    toast({
      title: "Thank you for your feedback!",
      description: isPositive ? "Your positive feedback helps us improve our AI system." : "We'll use your feedback to enhance our processing accuracy.",
    });
  };

  const handleRating = (stars) => {
    setRating(stars);
    toast({
      title: "Rating Submitted",
      description: `Thank you for rating this invoice processing ${stars} star${stars > 1 ? 's' : ''}!`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Work Area */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-lg border-l-4 border-l-green-500">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle className="mr-2 h-8 w-8" />
              Invoice Processed & Archived!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Success Summary */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="text-center space-y-3">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
                  <h2 className="text-2xl font-bold text-green-800">Tax Invoice Processed & Archived!</h2>
                  <p className="text-green-700 font-medium">
                    Tax Invoice GST-3425-26 from GUJARAT FREIGHT TOOLS successfully processed and posted to ERP by Automated Invoice Processor (Orchestrator Agent and Action Agents), and archived.
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
                        <span className="text-gray-600">Processing Method:</span>
                        <span className="font-medium">Automated (with HIL Confirmation via Orchestrator Agent)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ERP Posting Status:</span>
                        <span className="font-medium text-green-600">Successful (via ERP Posting Agent)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Invoice ID:</span>
                        <span className="font-medium">INV0001002 / GST-3425-26</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vendor:</span>
                        <span className="font-medium">GUJARAT FREIGHT TOOLS</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount Posted:</span>
                        <span className="font-medium text-green-600">₹4,490.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time to Process:</span>
                        <span className="font-medium">5 minutes 15 seconds</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-800 mb-3">Process Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Overall Status:</span>
                        <Badge className="bg-green-600 text-white">Completed & Archived</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Archive Time:</span>
                        <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Auto-Processed:</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Agent Efficiency Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Bot className="h-6 w-6 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-800 mb-2">Agent Efficiency Summary</h3>
                    <p className="text-sm text-blue-700 mb-3">
                      The Orchestrator Agent seamlessly coordinated Data Agents for extraction, Analysis Agents for validation and GL suggestion, and Action Agents for posting, achieving results significantly faster than manual processing. Human-in-the-loop was effectively used for critical tax code verification.
                    </p>
                  </div>
                </div>
              </div>

              {/* Knowledge Base Update */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Book className="h-6 w-6 text-purple-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-medium text-purple-800 mb-2">Knowledge Base Update</h3>
                    <p className="text-sm text-purple-700 mb-3">
                      Detailed automated processing notes for Tax Invoice GST-3425-26 (GUJARAT FREIGHT TOOLS), including data extracted by OCR Invoice Reader Agent, GL code confirmed by GL Code Suggester Agent, SAP posting confirmation by ERP Posting Agent, and process flow, have been added to the knowledge base for future reference and AI learning.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
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
                  An email notification was sent by the Confirmation Email Agent to Accounts Payable Dept. and Tax Compliance Team confirming successful invoice processing and posting for INV0001002.
                </p>
              </div>

              {/* Complete Timeline Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-3">Complete Process Timeline</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Invoice INV0001002 (GST-3425-26) received via Email Inbox Agent (Data Agent)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Orchestrator Agent initiated workflow</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>OCR Invoice Reader Agent (Data Agent) completed data extraction</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Invoice Data Validator and Duplicate Check Agent (Analysis Agents) performed validation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>GL Code Suggester Agent (Analysis Agent) proposed GL codes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Human-in-the-Loop Agent facilitated human review and approval</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>ERP Posting Agent executed SAP posting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Confirmation Email Agent sent notifications</span>
                  </div>
                </div>
              </div>

              {/* Feedback Section */}
              {showFeedback && (
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-medium text-gray-800 mb-4">Process Feedback</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-3">Was this automated invoice processing helpful?</p>
                      <div className="flex space-x-3">
                        <Button
                          onClick={() => handleFeedback(true)}
                          variant="outline"
                          size="sm"
                          className="border-green-300 text-green-700 hover:bg-green-50"
                        >
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          Yes, Very Efficient
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
                      <p className="text-sm text-gray-600 mb-3">Rate this invoice processing workflow:</p>
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
                          Thank you for rating this invoice processing {rating} star{rating > 1 ? 's' : ''}!
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
            Process New Invoice
          </Button>
          <Button 
            variant="outline"
            onClick={() => toast({ title: "Dashboard", description: "Returning to main dashboard..." })}
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

export default InvoiceClosure;
