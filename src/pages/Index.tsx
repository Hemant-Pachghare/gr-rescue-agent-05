
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
import AgentsDashboard from '@/components/AgentsDashboard';
import InvoiceTicketList from '@/components/InvoiceTicketList';
import UnderConstruction from '@/components/UnderConstruction';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('agents-dashboard');
  const [showBackendActions, setShowBackendActions] = useState(false);
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);
  const [ticketData, setTicketData] = useState({
    id: 'INC0001234',
    subject: '',
    description: '',
    poNumber: '',
    confidence: 92,
    status: 'New',
    timeline: [],
    isInvoiceProcessing: false,
    isReportFailure: false
  });

  const isInvoiceProcessing = ticketData.isInvoiceProcessing;
  const isReportFailure = ticketData.isReportFailure;

  const getScreenTitle = (screen, isInvoice, isReport) => {
    const screenTitles = {
      'agents-dashboard': 'AI MVP Generator: Intelligent Agent Dashboard',
      'invoice-list': 'Invoice Processing Worklist',
      'under-construction': 'Feature Under Development',
      dashboard: 'Incident Dashboard',
      incident: isInvoice ? 'Submit New Invoice for Processing' : isReport ? 'Create New Operational Incident' : 'New Incident',
      triage: isInvoice ? 'Invoice Ingestion & Initial Extraction' : isReport ? 'Incident Auto-Triage & Classification' : 'Agent Auto-Triage',
      rca: isInvoice ? 'Tax Invoice Data Extraction & Validation' : isReport ? 'Report Failure Root Cause Analysis' : 'RCA',
      proposal: isInvoice ? 'Tax Invoice Review & Approval' : isReport ? 'Proposed Resolution for Report Failure' : 'Resolution Proposal',
      execution: isInvoice ? 'ERP Posting Execution - AI Action In Progress' : isReport ? 'Database/Job Scheduler Execution - AI Action In Progress' : 'SAP Execution',
      closure: isInvoice ? 'Invoice Processed & Archived!' : isReport ? 'Issue Resolved & Ticket Closed!' : 'Ticket Closure'
    };
    
    return screenTitles[screen] || 'AI MVP Generator';
  };

  const screens = {
    'agents-dashboard': { title: 'AI MVP Generator: Intelligent Agent Dashboard', component: AgentsDashboard },
    'invoice-list': { title: 'Invoice Processing Worklist', component: InvoiceTicketList },
    'under-construction': { title: 'Feature Under Development', component: UnderConstruction },
    dashboard: { title: 'Incident Dashboard', component: Dashboard },
    incident: { 
      title: getScreenTitle('incident', isInvoiceProcessing, isReportFailure), 
      component: IncidentCreation 
    },
    triage: { 
      title: getScreenTitle('triage', isInvoiceProcessing, isReportFailure), 
      component: AgentTriage 
    },
    rca: { 
      title: getScreenTitle('rca', isInvoiceProcessing, isReportFailure), 
      component: RCAAnalysis 
    },
    proposal: { 
      title: getScreenTitle('proposal', isInvoiceProcessing, isReportFailure), 
      component: ResolutionProposal 
    },
    execution: { 
      title: getScreenTitle('execution', isInvoiceProcessing, isReportFailure), 
      component: SAPExecution 
    },
    closure: { 
      title: getScreenTitle('closure', isInvoiceProcessing, isReportFailure), 
      component: TicketClosure 
    }
  };

  const CurrentComponent = screens[currentScreen]?.component;

  const handleCreateNew = () => {
    setCurrentScreen('incident');
    setIncidentSubmitted(false);
    setShowBackendActions(false);
    // Set invoice processing mode
    setTicketData(prev => ({
      ...prev,
      isInvoiceProcessing: true,
      isReportFailure: false,
      subject: 'Invoice Processing Request',
      description: 'Processing invoice from GUJARAT FREIGHT TOOLS'
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIncidentSubmit = () => {
    setIncidentSubmitted(true);
  };

  const handleShowBackendActions = () => {
    if (incidentSubmitted) {
      setShowBackendActions(true);
      setCurrentScreen('triage');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToInvoiceList = () => {
    setCurrentScreen('invoice-list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInvoiceSelect = (invoiceId) => {
    if (invoiceId === 'GUJARAT FREIGHT TOOLS') {
      // Set up for invoice processing workflow
      setTicketData(prev => ({
        ...prev,
        isInvoiceProcessing: true,
        isReportFailure: false,
        subject: 'Tax Invoice Processing',
        description: `Processing invoice from ${invoiceId}`,
        status: 'In Progress'
      }));
      setIncidentSubmitted(true);
      setShowBackendActions(true);
      setCurrentScreen('proposal'); // Start at HIL review stage
    } else {
      setCurrentScreen('under-construction');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStepLabel = (step) => {
    if (isInvoiceProcessing) {
      const invoiceLabels = {
        incident: 'Invoice Submission',
        proposal: 'Human Review',
        execution: 'ERP Posting',
        closure: 'Processing Complete'
      };
      return invoiceLabels[step] || step;
    } else if (isReportFailure) {
      const reportLabels = {
        incident: 'Report Incident',
        proposal: 'Resolution Proposal',
        execution: 'Database/Job Fix',
        closure: 'Issue Resolved'
      };
      return reportLabels[step] || step;
    } else {
      const defaultLabels = {
        incident: 'New Incident',
        proposal: 'Resolution Proposal',
        execution: 'SAP Execution',
        closure: 'Ticket Closure'
      };
      return defaultLabels[step] || step;
    }
  };

  const getBackendActionsLabel = () => {
    if (isInvoiceProcessing) return '[Start Processing]';
    if (isReportFailure) return '[Show Backend Actions]';
    return '[Show Backend Actions]';
  };

  const getBackendGroupLabel = () => {
    if (isInvoiceProcessing) return 'Processing Actions';
    if (isReportFailure) return 'Analysis Actions';
    return 'Backend Actions';
  };

  const getTriageLabel = () => {
    if (isInvoiceProcessing) return 'Orchestration';
    if (isReportFailure) return 'Auto-Triage';
    return 'Agent Auto-Triage';
  };

  const getRCALabel = () => {
    if (isInvoiceProcessing) return 'Data Extraction';
    if (isReportFailure) return 'RCA';
    return 'RCA';
  };

  // Special rendering for agents dashboard
  if (currentScreen === 'agents-dashboard') {
    return <AgentsDashboard onNavigateToInvoiceList={handleNavigateToInvoiceList} />;
  }

  // Special rendering for invoice list
  if (currentScreen === 'invoice-list') {
    return <InvoiceTicketList onInvoiceSelect={handleInvoiceSelect} onBack={() => setCurrentScreen('agents-dashboard')} />;
  }

  // Special rendering for under construction
  if (currentScreen === 'under-construction') {
    return <UnderConstruction onBack={() => setCurrentScreen('agents-dashboard')} />;
  }

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
              {getStepLabel('incident')}
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
                {getBackendActionsLabel()}
              </Button>
            ) : (
              <div className="flex items-center space-x-1 px-2 py-1 bg-gray-50 rounded-md border border-gray-200 h-7">
                <span className="text-xs font-medium text-gray-600 italic">
                  {getBackendGroupLabel()}
                </span>
                <div className="flex space-x-1">
                  <Button
                    variant={currentScreen === 'triage' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleNavigation('triage')}
                    className="whitespace-nowrap text-xs px-1 py-0 h-5 text-[10px]"
                  >
                    {getTriageLabel()}
                  </Button>
                  <Button
                    variant={currentScreen === 'rca' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleNavigation('rca')}
                    className="whitespace-nowrap text-xs px-1 py-0 h-5 text-[10px]"
                  >
                    {getRCALabel()}
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
              {getStepLabel('proposal')}
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
              {getStepLabel('execution')}
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
              {getStepLabel('closure')}
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
            onNavigateToInvoiceList={handleNavigateToInvoiceList}
            onInvoiceSelect={handleInvoiceSelect}
            onBack={() => setCurrentScreen('agents-dashboard')}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
