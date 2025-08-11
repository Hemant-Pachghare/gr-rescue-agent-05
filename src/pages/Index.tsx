
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Clock, Bot, Database, CheckCircle, AlertTriangle, Lightbulb, FileText, Cog } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import IncidentCreation from '@/components/IncidentCreation';
import AgentTriage from '@/components/AgentTriage';
import RCAAnalysis from '@/components/RCAAnalysis';
import ResolutionProposal from '@/components/ResolutionProposal';
import SAPExecution from '@/components/SAPExecution';
import TicketClosure from '@/components/TicketClosure';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [showBackendActions, setShowBackendActions] = useState(false);
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);
  const [ticketData, setTicketData] = useState({
    id: 'INC0001234',
    subject: '',
    description: '',
    poNumber: '',
    confidence: 92,
    status: 'New',
    timeline: []
  });

  const isInvoiceProcessing = ticketData.isInvoiceProcessing;

  const screens = {
    dashboard: { title: 'Incident Dashboard', component: Dashboard },
    incident: { 
      title: isInvoiceProcessing ? 'Submit New Invoice for Processing' : 'New Incident', 
      component: IncidentCreation 
    },
    triage: { 
      title: isInvoiceProcessing ? 'Invoice Ingestion & Initial Extraction' : 'Agent Auto-Triage', 
      component: AgentTriage 
    },
    rca: { 
      title: isInvoiceProcessing ? 'Tax Invoice Data Extraction & Validation' : 'RCA', 
      component: RCAAnalysis 
    },
    proposal: { 
      title: isInvoiceProcessing ? 'Tax Invoice Review & Approval' : 'Resolution Proposal', 
      component: ResolutionProposal 
    },
    execution: { 
      title: isInvoiceProcessing ? 'ERP Posting Execution - AI Action In Progress' : 'SAP Execution', 
      component: SAPExecution 
    },
    closure: { 
      title: isInvoiceProcessing ? 'Invoice Processed & Archived!' : 'Ticket Closure', 
      component: TicketClosure 
    }
  };

  const CurrentComponent = screens[currentScreen]?.component;

  const handleCreateNew = () => {
    setCurrentScreen('incident');
    setIncidentSubmitted(false);
    setShowBackendActions(false);
    // Scroll to top when navigating to new screen
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIncidentSubmit = () => {
    setIncidentSubmitted(true);
    // Stay on incident screen after submit
  };

  const handleShowBackendActions = () => {
    if (incidentSubmitted) {
      setShowBackendActions(true);
      setCurrentScreen('triage'); // Navigate to Agent Auto-Triage
      // Scroll to top when navigating to new screen
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Add scroll to top functionality for all navigation
  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center">
              <h1 className="text-base font-semibold text-gray-900">
                {screens[currentScreen]?.title || 'Incident Management'}
              </h1>
            </div>
            {currentScreen !== 'dashboard' && (
              <Badge variant={ticketData.status === 'Closed' ? 'default' : 'secondary'}>
                {ticketData.id} - {ticketData.status}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Screen Navigation Pills - Only show when not on dashboard */}
      {currentScreen !== 'dashboard' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex space-x-2 overflow-x-auto items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavigation('dashboard')}
              className="whitespace-nowrap text-xs px-2 py-1 h-7"
            >
              ← Back to Dashboard
            </Button>
            
            {/* Step 1: New Incident */}
            <Button
              variant={currentScreen === 'incident' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleNavigation('incident')}
              className="whitespace-nowrap text-xs px-2 py-1 h-7"
            >
              <span className="mr-1 text-xs bg-gray-200 rounded-full w-3 h-3 flex items-center justify-center text-[10px]">
                1
              </span>
              {isInvoiceProcessing ? 'Invoice Submission' : 'New Incident'}
            </Button>

            {/* Show Backend Actions button OR Backend Actions group */}
            {!showBackendActions ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleShowBackendActions}
                className="whitespace-nowrap bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 text-xs px-2 py-1 h-7"
                disabled={!incidentSubmitted}
              >
                <Cog className="mr-1 h-3 w-3" />
                {isInvoiceProcessing ? '[Start Processing]' : '[Show Backend Actions]'}
              </Button>
            ) : (
              <div className="flex items-center space-x-1 px-2 py-1 bg-gray-50 rounded-md border border-gray-200 h-7">
                <span className="text-xs font-medium text-gray-600 italic">
                  {isInvoiceProcessing ? 'Processing Actions' : 'Backend Actions'}
                </span>
                <div className="flex space-x-1">
                  <Button
                    variant={currentScreen === 'triage' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleNavigation('triage')}
                    className="whitespace-nowrap text-xs px-1 py-0 h-5 text-[10px]"
                  >
                    {isInvoiceProcessing ? 'Orchestration' : 'Agent Auto-Triage'}
                  </Button>
                  <Button
                    variant={currentScreen === 'rca' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleNavigation('rca')}
                    className="whitespace-nowrap text-xs px-1 py-0 h-5 text-[10px]"
                  >
                    {isInvoiceProcessing ? 'Data Extraction' : 'RCA'}
                  </Button>
                </div>
              </div>
            )}

            {/* Remaining steps with proper numbering */}
            <Button
              variant={currentScreen === 'proposal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleNavigation('proposal')}
              className="whitespace-nowrap text-xs px-2 py-1 h-7"
            >
              <span className="mr-1 text-xs bg-gray-200 rounded-full w-3 h-3 flex items-center justify-center text-[10px]">
                2
              </span>
              {isInvoiceProcessing ? 'Human Review' : 'Resolution Proposal'}
            </Button>

            <Button
              variant={currentScreen === 'execution' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleNavigation('execution')}
              className="whitespace-nowrap text-xs px-2 py-1 h-7"
            >
              <span className="mr-1 text-xs bg-gray-200 rounded-full w-3 h-3 flex items-center justify-center text-[10px]">
                3
              </span>
              {isInvoiceProcessing ? 'ERP Posting' : 'SAP Execution'}
            </Button>

            <Button
              variant={currentScreen === 'closure' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleNavigation('closure')}
              className="whitespace-nowrap text-xs px-2 py-1 h-7"
            >
              <span className="mr-1 text-xs bg-gray-200 rounded-full w-3 h-3 flex items-center justify-center text-[10px]">
                4
              </span>
              {isInvoiceProcessing ? 'Processing Complete' : 'Ticket Closure'}
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        {CurrentComponent && (
          <CurrentComponent
            ticketData={ticketData}
            setTicketData={setTicketData}
            onNext={(nextScreen) => {
              setCurrentScreen(nextScreen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCreateNew={handleCreateNew}
            onSubmit={handleIncidentSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
