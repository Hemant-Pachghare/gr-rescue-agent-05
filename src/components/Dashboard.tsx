
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Dashboard = ({ onCreateNew }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const agentCards = [
    // Core Accounting
    {
      id: 'AGT0001001',
      category: 'Core Accounting',
      state: 'Active',
      priority: 'High Impact',
      description: 'Autonomous Anomaly Detector: Continuously scans all journal entries 24/7, flagging unusual account combinations, times, or amounts.',
      capabilities: 'Real-time monitoring, Pattern recognition',
      lastUpdated: '2 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'AGT0001002',
      category: 'Core Accounting',
      state: 'Active',
      priority: 'High Impact',
      description: 'Intelligent Reconciliation Agent: Automates reconciliation of high-volume accounts by matching transactions and identifying discrepancies.',
      capabilities: 'Auto-matching, Variance analysis',
      lastUpdated: '5 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'AGT0001003',
      category: 'Core Accounting',
      state: 'Active',
      priority: 'Medium Impact',
      description: 'Accrual & Prepayment Manager: Scans contracts and invoices to autonomously calculate and post month-end entries.',
      capabilities: 'Contract analysis, Auto-posting',
      lastUpdated: '15 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    },
    {
      id: 'AGT0001004',
      category: 'Core Accounting',
      state: 'Active',
      priority: 'High Impact',
      description: 'Subsidiary Ledger Sentinel: Performs continuous reconciliation between GL control accounts and sub-ledgers.',
      capabilities: 'Continuous monitoring, Auto-reconciliation',
      lastUpdated: '30 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'AGT0001005',
      category: 'Core Accounting',
      state: 'Active',
      priority: 'Critical',
      description: 'Automated Period-End Closer: Orchestrates the entire month-end closing checklist and escalates exceptions.',
      capabilities: 'Process orchestration, Exception handling',
      lastUpdated: '1 hour ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'AGT0001006',
      category: 'Core Accounting',
      state: 'Active',
      priority: 'Medium Impact',
      description: 'FX Revaluation Agent: Monitors foreign currency exchange rates daily and automatically revalues balances.',
      capabilities: 'Currency monitoring, Auto-revaluation',
      lastUpdated: '2 hours ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    },

    // Accounts Receivable
    {
      id: 'AGT0002001',
      category: 'Accounts Receivable',
      state: 'Active',
      priority: 'Critical',
      description: 'Compliance Verification Bot: Cross-references journal entries against IFRS/GAAP requirements for revenue recognition.',
      capabilities: 'Compliance checking, Standards verification',
      lastUpdated: '10 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'AGT0002002',
      category: 'Accounts Receivable',
      state: 'Active',
      priority: 'High Impact',
      description: 'Credit Policy Agent: Autonomously assesses new customer creditworthiness and recommends credit limits.',
      capabilities: 'Credit assessment, Risk analysis',
      lastUpdated: '25 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'AGT0002003',
      category: 'Accounts Receivable',
      state: 'Active',
      priority: 'High Impact',
      description: 'Dynamic Risk-Based Collector: Prioritizes collection activities and sends tailored collection notices.',
      capabilities: 'Risk prioritization, Automated communications',
      lastUpdated: '45 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'AGT0002004',
      category: 'Accounts Receivable',
      state: 'Active',
      priority: 'Medium Impact',
      description: 'Cash Application Specialist: Automatically matches incoming cash receipts to open invoices.',
      capabilities: 'Payment matching, Complex scenarios',
      lastUpdated: '1 hour ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    },

    // Accounts Payable
    {
      id: 'AGT0003001',
      category: 'Accounts Payable',
      state: 'Active',
      priority: 'Critical',
      description: 'Duplicate Payment Hunter: Scans all invoices in real-time to identify potential duplicates.',
      capabilities: 'Real-time scanning, Duplicate detection',
      lastUpdated: '5 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'AGT0003002',
      category: 'Accounts Payable',
      state: 'Active',
      priority: 'High Impact',
      description: 'Vendor Master File Gatekeeper: Performs due diligence on new vendors to prevent fraud.',
      capabilities: 'Vendor verification, Fraud prevention',
      lastUpdated: '20 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'AGT0003003',
      category: 'Accounts Payable',
      state: 'Active',
      priority: 'High Impact',
      description: 'Three-Way Match Maverick: Autonomously matches invoices to purchase orders and goods receipts.',
      capabilities: 'Three-way matching, Discrepancy resolution',
      lastUpdated: '35 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },

    // Treasury
    {
      id: 'AGT0005001',
      category: 'Treasury',
      state: 'Active',
      priority: 'Critical',
      description: 'Intelligent Cash Forecaster: Provides highly accurate 13-week cash flow forecasts.',
      capabilities: 'Predictive analytics, Real-time integration',
      lastUpdated: '15 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'AGT0005002',
      category: 'Treasury',
      state: 'Active',
      priority: 'High Impact',
      description: 'Liquidity Optimization Agent: Monitors bank accounts and executes cash sweeps autonomously.',
      capabilities: 'Cash concentration, Auto-execution',
      lastUpdated: '30 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'AGT0005003',
      category: 'Treasury',
      state: 'Active',
      priority: 'High Impact',
      description: 'FX Exposure Management Bot: Tracks currency exposures and executes hedging strategies.',
      capabilities: 'Exposure tracking, Auto-hedging',
      lastUpdated: '1 hour ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },

    // Asset Accounting
    {
      id: 'AGT0004001',
      category: 'Asset Accounting',
      state: 'Active',
      priority: 'Medium Impact',
      description: 'Asset Acquisition Verifier: Identifies potential capital expenditures and initiates approval workflows.',
      capabilities: 'Capex identification, Workflow automation',
      lastUpdated: '45 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    },
    {
      id: 'AGT0004002',
      category: 'Asset Accounting',
      state: 'Active',
      priority: 'High Impact',
      description: 'Ghost Asset Hunter: Uses IoT sensors for continuous physical verification of assets.',
      capabilities: 'IoT integration, Physical verification',
      lastUpdated: '2 hours ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },

    // Planning
    {
      id: 'AGT0006001',
      category: 'Planning',
      state: 'Active',
      priority: 'Critical',
      description: 'Dynamic Forecaster: Continuously updates financial forecasts with real-time data integration.',
      capabilities: 'Real-time forecasting, Multi-source integration',
      lastUpdated: '10 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'AGT0006002',
      category: 'Planning',
      state: 'Active',
      priority: 'High Impact',
      description: 'Budget Variance Investigator: Identifies variances and provides automated narrative analysis.',
      capabilities: 'Variance analysis, Narrative generation',
      lastUpdated: '25 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },

    // Corporate Secretarial & Compliance
    {
      id: 'AGT0007001',
      category: 'Corporate Secretarial',
      state: 'Active',
      priority: 'Critical',
      description: 'Regulatory Change Agent: Scans government gazettes 24/7 to identify new regulations.',
      capabilities: '24/7 monitoring, Legal scanning',
      lastUpdated: '5 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'AGT0007002',
      category: 'Corporate Secretarial',
      state: 'Active',
      priority: 'High Impact',
      description: 'Statutory Filings Automator: Autonomously prepares and files routine statutory forms.',
      capabilities: 'Auto-filing, Deadline tracking',
      lastUpdated: '40 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    }
  ];

  const categories = ['all', 'Core Accounting', 'Accounts Receivable', 'Accounts Payable', 'Asset Accounting', 'Planning', 'Treasury', 'Corporate Secretarial'];

  const filteredAgents = selectedCategory === 'all' 
    ? agentCards 
    : agentCards.filter(agent => agent.category === selectedCategory);

  return (
    <div className="space-y-6">
      <Card className="shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-700 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold border-2 border-white">
                AI
              </div>
              <h1 className="text-2xl font-bold">AI MVP Generator: Intelligent Agent Dashboard</h1>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={onCreateNew}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Deploy New Agent
              </Button>
              <Button 
                variant="secondary"
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Configure
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200 flex items-center space-x-4 bg-gray-50">
          <Input 
            placeholder="Search AI agents..." 
            className="flex-grow"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.slice(1).map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Agent List Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Agent ID</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Status</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Impact Level</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Description & Function</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Key Capabilities</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id} className="hover:bg-gray-50">
                  <TableCell>
                    <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                      {agent.id}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">{agent.category}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${agent.stateClass} font-semibold`}>
                      {agent.state}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${agent.priorityClass}`}>
                      {agent.priority}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-md">
                    {agent.description}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {agent.capabilities}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {agent.lastUpdated}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
