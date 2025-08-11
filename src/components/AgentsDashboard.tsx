
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, FileText, Package, ShoppingCart, BarChart3, Settings, Zap, 
  Shield, AlertTriangle, Calculator, DollarSign, Cog, TrendingUp,
  Database, Clock, Eye, Search, Users, CheckCircle, FileCheck,
  Clipboard, Archive, Target, PieChart, Building, Gavel, Car,
  UserCheck, Banknote, CreditCard, Receipt
} from 'lucide-react';

const AgentsDashboard = ({ onAgentSelect }) => {
  const handleAgentClick = (agentId) => {
    if (agentId === 'automated-invoice-processor') {
      onAgentSelect('invoice-list');
    } else {
      onAgentSelect('under-construction');
    }
  };

  const AgentCard = ({ agent, onClick }) => {
    const IconComponent = agent.icon;
    return (
      <Card 
        className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-white border border-gray-200 rounded-lg ${onClick ? 'hover:border-blue-300' : ''}`}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-50 rounded-full">
                <IconComponent className="h-5 w-5 text-yellow-600" />
              </div>
              <Badge className="bg-blue-100 text-blue-700 text-xs">AI/ML</Badge>
            </div>
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-gray-900 mb-2">{agent.title}</CardTitle>
            <p className="text-xs text-gray-600">{agent.description}</p>
          </div>
        </CardHeader>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <span className="font-bold text-gray-900">EY Logo</span>
            </div>
            <div className="flex items-center space-x-8">
              <span className="font-semibold text-gray-900 border-b-2 border-gray-700 pb-1">Core Accounting</span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Compliance</span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Insurance</span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Internal Audit</span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Treasury</span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Direct Taxes</span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Indirect Taxes</span>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            CFO's Office <span className="text-yellow-400">Agentverse</span>
          </h1>
        </div>

        {/* 1. Core Accounting */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Core Accounting</h2>
            <div className="w-24 h-0.5 bg-yellow-400 mb-3"></div>
            <p className="text-gray-600">Enhancing the integrity and efficiency of financial reporting through real-time, autonomous analysis.</p>
          </div>

          {/* 1.1 General Ledger and Accounting */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 bg-yellow-400 mr-4"></div>
              <h3 className="text-xl font-bold text-gray-900">1.1 General Ledger and Accounting</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AgentCard agent={{
                title: "Autonomous Anomaly Detector",
                description: "Continuously scans all journal entries 24/7, flagging unusual account combinations, times, or amounts, and initiates an inquiry with the preparer.",
                icon: AlertTriangle
              }} />
              <AgentCard agent={{
                title: "Intelligent Reconciliation Agent",
                description: "Automates reconciliation of high-volume accounts by matching transactions, identifying discrepancies, and independently investigating their origin.",
                icon: CheckCircle
              }} />
              <AgentCard agent={{
                title: "Accrual & Prepayment Manager",
                description: "Scans contracts and invoices to autonomously calculate, propose, and post month-end accrual and prepayment entries with documentation.",
                icon: Calculator
              }} />
              <AgentCard agent={{
                title: "Subsidiary Ledger Sentinel",
                description: "Performs continuous reconciliation between the GL control accounts and sub-ledgers (AR, AP, FA), instantly flagging and investigating imbalances.",
                icon: Shield
              }} />
              <AgentCard agent={{
                title: "Automated Period-End Closer",
                description: "Orchestrates the entire month-end closing checklist, executing tasks, verifying completion, and escalating exceptions or delays.",
                icon: Clock
              }} />
              <AgentCard agent={{
                title: "FX Revaluation Agent",
                description: "Monitors foreign currency exchange rates daily, automatically revaluing balances and posting unrealized gains or losses.",
                icon: TrendingUp
              }} />
            </div>
          </div>

          {/* 1.2 Accounts Receivable */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 bg-yellow-400 mr-4"></div>
              <h3 className="text-xl font-bold text-gray-900">1.2 Accounts Receivable</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AgentCard agent={{
                title: "Compliance Verification Bot",
                description: "Cross-references journal entries against IFRS/GAAP requirements to flag potential non-compliance in revenue recognition or lease accounting.",
                icon: FileCheck
              }} />
              <AgentCard agent={{
                title: "Credit Policy Agent",
                description: "Autonomously assesses new customer creditworthiness using external and internal data to recommend and set initial credit limits.",
                icon: CreditCard
              }} />
              <AgentCard agent={{
                title: "Dynamic Risk-Based Collector",
                description: "Prioritizes collection activities by analyzing customer patterns and risk signals, then autonomously sends tailored collection notices.",
                icon: Target
              }} />
              <AgentCard agent={{
                title: "Cash Application Specialist",
                description: "Automatically matches incoming cash receipts to open invoices, handling complex scenarios like partial or bundled payments.",
                icon: Banknote
              }} />
              <AgentCard agent={{
                title: "Revenue Recognition Agent",
                description: "For complex contracts, tracks the delivery of performance obligations and autonomously triggers revenue recognition.",
                icon: Receipt
              }} />
            </div>
          </div>

          {/* 1.3 Accounts Payable */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 bg-yellow-400 mr-4"></div>
              <h3 className="text-xl font-bold text-gray-900">1.3 Accounts Payable</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AgentCard agent={{
                title: "Duplicate Payment Hunter",
                description: "Scans all paid and unpaid invoices in real-time to identify potential duplicates, placing suspect invoices on immediate payment hold.",
                icon: Search
              }} />
              <AgentCard agent={{
                title: "Vendor Master File Gatekeeper",
                description: "Performs due diligence on new vendors by verifying details against external databases and watchlists to prevent fraud.",
                icon: Shield
              }} />
              <AgentCard agent={{
                title: "Three-Way Match Maverick",
                description: "Autonomously matches invoices to purchase orders and goods receipt notes, initiating resolution for any discrepancies.",
                icon: Clipboard
              }} />
              <AgentCard 
                agent={{
                  title: "Automated Invoice Processor",
                  description: "Receives, validates, and matches invoices, then autonomously posts the final journal entry to the ERP system (e.g., SAP).",
                  icon: FileText
                }}
                onClick={() => handleAgentClick('automated-invoice-processor')}
              />
              <AgentCard agent={{
                title: "Maverick Spending Monitor",
                description: "Reduces off-contract or unauthorized vendor spend by identifying purchases that bypass procurement policies.",
                icon: Eye
              }} />
              <AgentCard agent={{
                title: "Early Payment Discount Optimizer",
                description: "Analyzes vendor payment terms and cash position to identify and execute early payments that capture valuable discounts.",
                icon: DollarSign
              }} />
            </div>
          </div>

          {/* 1.4 Product & Actual Costing */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 bg-yellow-400 mr-4"></div>
              <h3 className="text-xl font-bold text-gray-900">1.4 Product & Actual Costing</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AgentCard agent={{
                title: "Standard Costing Agent",
                description: "Autonomously updates standard costs by monitoring changes in raw material prices, labor rates, and manufacturing overheads.",
                icon: Calculator
              }} />
              <AgentCard agent={{
                title: "Variance Analysis Investigator",
                description: "Automatically identifies significant production cost variances and drills down into data to pinpoint the root cause.",
                icon: BarChart3
              }} />
              <AgentCard agent={{
                title: "Product Margin Monitor",
                description: "Tracks the gross margin of every product in real-time, alerting management when profitability drops below a set threshold.",
                icon: TrendingUp
              }} />
            </div>
          </div>

          {/* 1.5 Asset Accounting */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 bg-yellow-400 mr-4"></div>
              <h3 className="text-xl font-bold text-gray-900">1.5 Asset Accounting</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AgentCard agent={{
                title: "Asset Acquisition Verifier",
                description: "Automatically identifies potential capital expenditures from purchasing data and initiates a capitalization approval workflow.",
                icon: Building
              }} />
              <AgentCard agent={{
                title: "Ghost Asset Hunter",
                description: "Uses RFID, network data, or IoT sensors for continuous physical verification of assets against the fixed asset register.",
                icon: Search
              }} />
              <AgentCard agent={{
                title: "Depreciation Run Automator",
                description: "Autonomously calculates and posts the monthly depreciation charge for all assets based on policy.",
                icon: Calculator
              }} />
            </div>
          </div>

          {/* 1.6 Planning */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 bg-yellow-400 mr-4"></div>
              <h3 className="text-xl font-bold text-gray-900">1.6 Planning</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AgentCard agent={{
                title: "Dynamic Forecaster",
                description: "Continuously updates financial forecasts by integrating real-time sales, operational, and macroeconomic data.",
                icon: TrendingUp
              }} />
              <AgentCard agent={{
                title: "Budget Variance Investigator",
                description: "Not only identifies variances but autonomously drills down into transactional data to provide a narrative on why it occurred.",
                icon: BarChart3
              }} />
              <AgentCard agent={{
                title: "Scenario Modeling Agent",
                description: "Runs thousands of simulations based on different assumptions to model potential impacts on profitability and cash flow.",
                icon: PieChart
              }} />
            </div>
          </div>
        </div>

        {/* Inventory Management */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Inventory Management</h2>
            <div className="w-24 h-0.5 bg-yellow-400 mb-3"></div>
            <p className="text-gray-600">Optimizing inventory levels and reducing carrying costs through intelligent analysis.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AgentCard agent={{
              title: "Obsolete Inventory Identifier",
              description: "Increases cash flow by identifying and flagging non-moving or obsolete inventory for disposal or write-down.",
              icon: Archive
            }} />
            <AgentCard agent={{
              title: "Shrinkage & Theft Detector",
              description: "Reduces losses by analyzing inventory count discrepancies and transaction patterns to identify potential theft or shrinkage.",
              icon: Shield
            }} />
          </div>
        </div>

        {/* 2. Corporate Secretarial & Compliance */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Corporate Secretarial & Compliance</h2>
            <div className="w-24 h-0.5 bg-yellow-400 mb-3"></div>
            <p className="text-gray-600">Ensuring an always-on state of compliance through continuous monitoring and automated response to regulatory changes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AgentCard agent={{
              title: "Regulatory Change Agent",
              description: "Scans government gazettes and legal news 24/7 to identify new or amended laws that impact the company.",
              icon: Gavel
            }} />
            <AgentCard agent={{
              title: "AML/KYC Screening Agent",
              description: "Performs continuous screening of customer and vendor lists against global sanctions and Politically Exposed Persons (PEP) lists.",
              icon: UserCheck
            }} />
          </div>
        </div>

        {/* 5. Treasury */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">5. Treasury</h2>
            <div className="w-24 h-0.5 bg-yellow-400 mb-3"></div>
            <p className="text-gray-600">Optimizing cash flow, managing financial risk, and ensuring liquidity with real-time, predictive insights.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AgentCard agent={{
              title: "Intelligent Cash Forecaster",
              description: "Provides a highly accurate, rolling 13-week cash flow forecast by integrating real-time data from across the business.",
              icon: TrendingUp
            }} />
            <AgentCard agent={{
              title: "Liquidity Optimization Agent",
              description: "Continuously monitors bank accounts, autonomously executing cash sweeps to concentrate funds and minimize borrowing.",
              icon: Banknote
            }} />
            <AgentCard agent={{
              title: "FX Exposure Management Bot",
              description: "Tracks foreign currency exposures in real-time and can autonomously execute predefined hedging strategies.",
              icon: TrendingUp
            }} />
          </div>
        </div>

        {/* Placeholder sections */}
        <div className="space-y-12">
          {[
            { number: "3", title: "Insurance", description: "Transforming claims, underwriting, and risk management with intelligent, data-driven automation." },
            { number: "4", title: "Internal Audit, Risk & Assurance", description: "Automating the entire audit lifecycle to free up human auditors for strategic, high-impact analysis." },
            { number: "6", title: "Direct Taxes", description: "Streamlining tax compliance and planning through automated data aggregation, calculation, and analysis." },
            { number: "7", title: "Indirect Taxes", description: "Ensuring transactional compliance for VAT/GST with real-time determination and automated reporting." }
          ].map((section) => (
            <div key={section.number} className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{section.number}. {section.title}</h2>
                <div className="w-24 h-0.5 bg-yellow-400 mb-3"></div>
                <p className="text-gray-600">{section.description}</p>
              </div>
              <div className="text-center py-8 text-gray-500">
                <p>Agents coming soon...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsDashboard;
