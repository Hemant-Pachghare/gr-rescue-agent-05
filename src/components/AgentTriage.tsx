
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, Clock, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import TimelinePanel from '@/components/TimelinePanel';

const AgentTriage = ({ ticketData, setTicketData, onNext }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [confidence, setConfidence] = useState(0);

  const isInvoiceProcessing = ticketData.isInvoiceProcessing;

  useEffect(() => {
    // Simulate AI analysis
    const timer = setTimeout(() => {
      let finalConfidence = 92;
      let analysisDescription = 'AI classified issue and initiated standard workflow.';
      let detectedItem = 'General issue detected';

      if (isInvoiceProcessing) {
        finalConfidence = 96;
        analysisDescription = 'Orchestrator Agent initiated workflow for Tax Invoice processing.';
        detectedItem = 'Invoice ID: GST-3425-26, Vendor: Gujarat Freight Tools';
      }

      setConfidence(finalConfidence);
      setIsAnalyzing(false);
      
      const newTimelineItem = {
        id: 2,
        type: 'triage',
        title: isInvoiceProcessing ? 'Orchestration Started' : 'Agent Auto-Triage',
        description: analysisDescription,
        timestamp: new Date(),
        icon: Bot,
        status: 'completed',
        confidence: finalConfidence
      };

      if (isInvoiceProcessing) {
        // Add additional timeline item for Data Agent Activation
        const dataAgentItem = {
          id: 3,
          type: 'data_extraction',
          title: 'Data Agent Activation',
          description: 'OCR Invoice Reader Agent activated for comprehensive data extraction from PDF invoice. ERP System Agent (SAP) prepared for data transfer.',
          timestamp: new Date(),
          icon: Bot,
          status: 'completed'
        };

        setTicketData(prev => ({
          ...prev,
          confidence: finalConfidence,
          timeline: [...prev.timeline, newTimelineItem, dataAgentItem]
        }));
      } else {
        setTicketData(prev => ({
          ...prev,
          confidence: finalConfidence,
          timeline: [...prev.timeline, newTimelineItem]
        }));
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [setTicketData, isInvoiceProcessing]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Work Area */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardTitle className="flex items-center text-blue-700">
              <Bot className="mr-2 h-6 w-6" />
              {isInvoiceProcessing ? 'Invoice Ingestion & Initial Extraction' : 'Agent Auto-Triage'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Ticket Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-3">
                  {isInvoiceProcessing ? 'Invoice Details' : 'Incident Details'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">
                      {isInvoiceProcessing ? 'Invoice ID:' : 'Ticket ID:'}
                    </span> 
                    <span className="font-medium ml-2">{ticketData.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Requester:</span> 
                    <span className="font-medium ml-2">
                      {isInvoiceProcessing ? 'Accounts Payable Dept.' : 'Operations Shift Lead'}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-500">Subject:</span> 
                    <span className="font-medium ml-2">{ticketData.subject}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-500">Description:</span> 
                    <span className="font-medium ml-2">{ticketData.description}</span>
                  </div>
                </div>
              </div>

              {/* AI Analysis Section */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Classification</h3>
                
                {isAnalyzing ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">
                          {isInvoiceProcessing 
                            ? 'Orchestrating invoice processing workflow...'
                            : 'AI analyzing incident patterns and context...'}
                        </p>
                        <p className="text-sm text-blue-600">
                          {isInvoiceProcessing 
                            ? 'Activating specialized agents for tax invoice processing'
                            : 'Comparing against historical data and determining optimal resolution path'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-green-800">Issue Type</h4>
                        <Badge variant="default" className="bg-green-600">
                          {isInvoiceProcessing ? 'Tax Invoice Processing - Data Extraction Initiated' : 'Batch Job Failure - Data Inconsistency'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-green-600">AI Confidence Score:</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <Progress value={confidence} className="flex-1 h-2" />
                            <span className="font-bold text-green-700">{confidence}%</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-green-600">
                            {isInvoiceProcessing ? 'Detected Item/ID:' : 'Root Cause:'}
                          </span>
                          <p className="font-medium text-green-800 mt-1">
                            {isInvoiceProcessing 
                              ? 'Invoice ID: GST-3425-26, Vendor: Gujarat Freight Tools'
                              : 'Data validation failure in ETL process'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Resolution Path */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">
                        {isInvoiceProcessing ? 'Processing Path' : 'Resolution Path'}
                      </h4>
                      <div className="text-sm text-gray-600">
                        <p className="mb-2">
                          {isInvoiceProcessing 
                            ? 'AI will coordinate specialized agents for comprehensive invoice processing:'
                            : 'AI will perform deep system analysis and propose automated resolution:'}
                        </p>
                        <ul className="space-y-1 ml-4">
                          {isInvoiceProcessing ? (
                            <>
                              <li>• OCR Invoice Reader Agent - Data extraction from PDF</li>
                              <li>• Vendor Master File Agent - Vendor verification</li>
                              <li>• AP Processing Policies Agent - Policy compliance check</li>
                              <li>• Chart of Accounts Agent - GL code suggestion</li>
                              <li>• ERP System Agent (SAP) - Final posting preparation</li>
                            </>
                          ) : (
                            <>
                              <li>• Query SAP systems for related data</li>
                              <li>• Analyze batch job logs and failure patterns</li>
                              <li>• Identify root cause and propose resolution</li>
                              <li>• Execute automated fix if confidence is high</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end pt-4">
                      <Button 
                        onClick={() => onNext('rca')} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                      >
                        {isInvoiceProcessing ? 'Start Data Extraction' : 'Proceed to Analysis'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
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

export default AgentTriage;
