
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
      id: 'Autonomous Anomaly Detector',
      category: 'Core Accounting',
      state: 'Active',
      priority: 'Critical',
      description: 'Continuously scans all journal entries 24/7, flagging unusual account combinations, times, or amounts, and initiates an inquiry with the preparer.',
      capabilities: 'Real-time monitoring, Pattern recognition, Automated inquiry',
      lastUpdated: '2 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'Intelligent Reconciliation Agent',
      category: 'Core Accounting',
      state: 'Active',
      priority: 'High Impact',
      description: 'Automates reconciliation of high-volume accounts by matching transactions, identifying discrepancies, and independently investigating their origin.',
      capabilities: 'Auto-matching, Variance analysis, Investigation workflows',
      lastUpdated: '5 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'Accrual & Prepayment Manager',
      category: 'Core Accounting',
      state: 'Active',
      priority: 'Medium Impact',
      description: 'Scans contracts and invoices to autonomously calculate, propose, and post month-end accrual and prepayment entries with documentation.',
      capabilities: 'Contract analysis, Auto-posting, Documentation',
      lastUpdated: '15 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    },
    {
      id: 'Subsidiary Ledger Sentinel',
      category: 'Core Accounting',
      state: 'Active',
      priority: 'High Impact',
      description: 'Performs continuous reconciliation between the GL control accounts and sub-ledgers (AR, AP, FA), instantly flagging and investigating imbalances.',
      capabilities: 'Continuous monitoring, Auto-reconciliation, Exception handling',
      lastUpdated: '30 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'Automated Period-End Closer',
      category: 'Core Accounting',
      state: 'Active',
      priority: 'Critical',
      description: 'Orchestrates the entire month-end closing checklist, executing tasks, verifying completion, and escalating exceptions or delays.',
      capabilities: 'Process orchestration, Task automation, Exception escalation',
      lastUpdated: '1 hour ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'FX Revaluation Agent',
      category: 'Core Accounting',
      state: 'Active',
      priority: 'Medium Impact',
      description: 'Monitors foreign currency exchange rates daily, automatically revaluing balances and posting unrealized gains or losses.',
      capabilities: 'Currency monitoring, Auto-revaluation, P&L posting',
      lastUpdated: '2 hours ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    },

    // Accounts Receivable
    {
      id: 'Compliance Verification Bot',
      category: 'Accounts Receivable',
      state: 'Active',
      priority: 'Critical',
      description: 'Cross-references journal entries against IFRS/GAAP requirements to flag potential non-compliance in revenue recognition or lease accounting.',
      capabilities: 'Compliance checking, Standards verification, Risk flagging',
      lastUpdated: '10 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'Credit Policy Agent',
      category: 'Accounts Receivable',
      state: 'Active',
      priority: 'High Impact',
      description: 'Autonomously assesses new customer creditworthiness using external and internal data to recommend and set initial credit limits.',
      capabilities: 'Credit assessment, Risk analysis, Limit recommendations',
      lastUpdated: '25 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'Dynamic Risk-Based Collector',
      category: 'Accounts Receivable',
      state: 'Active',
      priority: 'High Impact',
      description: 'Prioritizes collection activities by analyzing customer patterns and risk signals, then autonomously sends tailored collection notices.',
      capabilities: 'Risk prioritization, Automated communications, Pattern analysis',
      lastUpdated: '45 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'Cash Application Specialist',
      category: 'Accounts Receivable',
      state: 'Active',
      priority: 'Medium Impact',
      description: 'Automatically matches incoming cash receipts to open invoices, handling complex scenarios like partial or bundled payments.',
      capabilities: 'Payment matching, Complex scenarios, Auto-application',
      lastUpdated: '1 hour ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    },
    {
      id: 'Revenue Recognition Agent',
      category: 'Accounts Receivable',
      state: 'Active',
      priority: 'High Impact',
      description: 'For complex contracts, tracks the delivery of performance obligations and autonomously triggers revenue recognition.',
      capabilities: 'Contract tracking, Performance obligations, Auto-triggering',
      lastUpdated: '1.5 hours ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },

    // Accounts Payable
    {
      id: 'Duplicate Payment Hunter',
      category: 'Accounts Payable',
      state: 'Active',
      priority: 'Critical',
      description: 'Scans all paid and unpaid invoices in real-time to identify potential duplicates, placing suspect invoices on immediate payment hold.',
      capabilities: 'Real-time scanning, Duplicate detection, Payment holds',
      lastUpdated: '5 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'Vendor Master File Gatekeeper',
      category: 'Accounts Payable',
      state: 'Active',
      priority: 'High Impact',
      description: 'Performs due diligence on new vendors by verifying details against external databases and watchlists to prevent fraud.',
      capabilities: 'Vendor verification, Fraud prevention, Database cross-reference',
      lastUpdated: '20 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'Three-Way Match Maverick',
      category: 'Accounts Payable',
      state: 'Active',
      priority: 'High Impact',
      description: 'Autonomously matches invoices to purchase orders and goods receipt notes, initiating resolution for any discrepancies.',
      capabilities: 'Three-way matching, Discrepancy resolution, Auto-matching',
      lastUpdated: '35 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'Automated Invoice Processor',
      category: 'Accounts Payable',
      state: 'Active',
      priority: 'Medium Impact',
      description: 'Receives, validates, and matches invoices, then autonomously posts the final journal entry to the ERP system (e.g., SAP).',
      capabilities: 'Invoice processing, Validation, ERP integration',
      lastUpdated: '50 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    },

    // Product & Actual Costing
    {
      id: 'Standard Costing Agent',
      category: 'Product & Actual Costing',
      state: 'Active',
      priority: 'High Impact',
      description: 'Autonomously updates standard costs by monitoring changes in raw material prices, labor rates, and manufacturing overheads.',
      capabilities: 'Cost monitoring, Auto-updates, Price tracking',
      lastUpdated: '40 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'Variance Analysis Investigator',
      category: 'Product & Actual Costing',
      state: 'Active',
      priority: 'High Impact',
      description: 'Automatically identifies significant production cost variances and drills down into data to pinpoint the root cause.',
      capabilities: 'Variance detection, Root cause analysis, Data drilling',
      lastUpdated: '1 hour ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'Product Margin Monitor',
      category: 'Product & Actual Costing',
      state: 'Active',
      priority: 'Critical',
      description: 'Tracks the gross margin of every product in real-time, alerting management when profitability drops below a set threshold.',
      capabilities: 'Real-time tracking, Margin analysis, Threshold alerts',
      lastUpdated: '30 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },

    // Asset Accounting
    {
      id: 'Asset Acquisition Verifier',
      category: 'Asset Accounting',
      state: 'Active',
      priority: 'Medium Impact',
      description: 'Automatically identifies potential capital expenditures from purchasing data and initiates a capitalization approval workflow.',
      capabilities: 'Capex identification, Workflow automation, Approval routing',
      lastUpdated: '45 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    },
    {
      id: 'Ghost Asset Hunter',
      category: 'Asset Accounting',
      state: 'Active',
      priority: 'High Impact',
      description: 'Uses RFID, network data, or IoT sensors for continuous physical verification of assets against the fixed asset register.',
      capabilities: 'IoT integration, Physical verification, RFID tracking',
      lastUpdated: '2 hours ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'Depreciation Run Automator',
      category: 'Asset Accounting',
      state: 'Active',
      priority: 'Medium Impact',
      description: 'Autonomously calculates and posts the monthly depreciation charge for all assets based on policy.',
      capabilities: 'Auto-calculation, Policy compliance, Monthly posting',
      lastUpdated: '1.5 hours ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    },

    // Planning
    {
      id: 'Dynamic Forecaster',
      category: 'Planning',
      state: 'Active',
      priority: 'Critical',
      description: 'Continuously updates financial forecasts by integrating real-time sales, operational, and macroeconomic data.',
      capabilities: 'Real-time forecasting, Multi-source integration, Predictive analytics',
      lastUpdated: '10 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'Budget Variance Investigator',
      category: 'Planning',
      state: 'Active',
      priority: 'High Impact',
      description: 'Not only identifies variances but autonomously drills down into transactional data to provide a narrative on why it occurred.',
      capabilities: 'Variance analysis, Narrative generation, Data drilling',
      lastUpdated: '25 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'Scenario Modeling Agent',
      category: 'Planning',
      state: 'Active',
      priority: 'High Impact',
      description: 'Runs thousands of simulations based on different assumptions to model potential impacts on profitability and cash flow.',
      capabilities: 'Simulation modeling, Scenario analysis, Impact assessment',
      lastUpdated: '1 hour ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },

    // Inventory Management
    {
      id: 'Obsolete Inventory Identifier',
      category: 'Inventory Management',
      state: 'Active',
      priority: 'High Impact',
      description: 'Increases cash flow by identifying and flagging non-moving or obsolete inventory for disposal or write-down.',
      capabilities: 'Obsolescence detection, Cash flow optimization, Write-down recommendations',
      lastUpdated: '30 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'Shrinkage & Theft Detector',
      category: 'Inventory Management',
      state: 'Active',
      priority: 'Critical',
      description: 'Reduces losses by analyzing inventory count discrepancies and transaction patterns to identify potential theft or shrinkage.',
      capabilities: 'Loss prevention, Pattern analysis, Discrepancy detection',
      lastUpdated: '45 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },

    // Treasury
    {
      id: 'Intelligent Cash Forecaster',
      category: 'Treasury',
      state: 'Active',
      priority: 'Critical',
      description: 'Provides a highly accurate, rolling 13-week cash flow forecast by integrating real-time data from across the business.',
      capabilities: 'Predictive analytics, Real-time integration, 13-week rolling forecast',
      lastUpdated: '15 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'Liquidity Optimization Agent',
      category: 'Treasury',
      state: 'Active',
      priority: 'High Impact',
      description: 'Continuously monitors bank accounts, autonomously executing cash sweeps to concentrate funds and minimize borrowing.',
      capabilities: 'Cash concentration, Auto-execution, Liquidity management',
      lastUpdated: '30 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'FX Exposure Management Bot',
      category: 'Treasury',
      state: 'Active',
      priority: 'High Impact',
      description: 'Tracks foreign currency exposures in real-time and can autonomously execute predefined hedging strategies.',
      capabilities: 'Exposure tracking, Auto-hedging, Real-time monitoring',
      lastUpdated: '1 hour ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },

    // Corporate Secretarial & Compliance
    {
      id: 'Regulatory Change Agent',
      category: 'Corporate Secretarial',
      state: 'Active',
      priority: 'Critical',
      description: 'Scans government gazettes and legal news 24/7 to identify new or amended laws that impact the company.',
      capabilities: '24/7 monitoring, Legal scanning, Impact analysis',
      lastUpdated: '5 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'Statutory Filings Automator',
      category: 'Corporate Secretarial',
      state: 'Active',
      priority: 'High Impact',
      description: 'Autonomously prepares and files routine statutory forms with government bodies, ensuring deadlines are never missed.',
      capabilities: 'Auto-filing, Deadline tracking, Form preparation',
      lastUpdated: '40 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-green-600'
    },
    {
      id: 'AML/KYC Screening Agent',
      category: 'Corporate Secretarial',
      state: 'Active',
      priority: 'Critical',
      description: 'Performs continuous screening of customer and vendor lists against global sanctions and Politically Exposed Persons (PEP) lists.',
      capabilities: 'Continuous screening, Sanctions monitoring, PEP detection',
      lastUpdated: '20 mins ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-red-600'
    }
  ];

  const categories = [
    'all', 
    'Core Accounting', 
    'Accounts Receivable', 
    'Accounts Payable', 
    'Product & Actual Costing',
    'Asset Accounting', 
    'Planning', 
    'Inventory Management',
    'Treasury', 
    'Corporate Secretarial'
  ];

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
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Agent Name</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Status</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Impact Level</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Description & Function</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Key Capabilities</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent, index) => (
                <TableRow key={`${agent.id}-${index}`} className="hover:bg-gray-50">
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
