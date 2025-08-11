
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const AgentCard = ({ agent, onClick = null }) => {
    const IconComponent = agent.icon;
    return (
      <Card 
        className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-white border border-gray-200 rounded-lg ${onClick ? 'hover:border-blue-300' : ''}`}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: '#FFFBEB' }}>
                <IconComponent className="h-5 w-5" style={{ color: '#FBBF24' }} />
              </div>
              <Badge className="text-xs" style={{ backgroundColor: '#DBEAFE', color: '#2563EB' }}>AI/ML</Badge>
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
    <div className="min-h-screen" style={{ backgroundColor: '#f3f4f6' }}>
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <span className="font-bold text-gray-900">EY Logo</span>
            </div>
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('core-accounting')}
                className="font-semibold pb-1 relative"
                style={{ 
                  color: '#374151',
                  borderBottom: '2px solid #374151'
                }}
              >
                Core Accounting
              </button>
              <button 
                onClick={() => scrollToSection('compliance')}
                className="pb-1 hover:font-semibold hover:border-b-2 transition-all duration-200"
                style={{ color: '#6B7280' }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#374151';
                  e.target.style.borderBottomColor = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6B7280';
                  e.target.style.borderBottomColor = 'transparent';
                }}
              >
                Compliance
              </button>
              <button 
                onClick={() => scrollToSection('insurance')}
                className="pb-1 hover:font-semibold hover:border-b-2 transition-all duration-200"
                style={{ color: '#6B7280' }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#374151';
                  e.target.style.borderBottomColor = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6B7280';
                  e.target.style.borderBottomColor = 'transparent';
                }}
              >
                Insurance
              </button>
              <button 
                onClick={() => scrollToSection('internal-audit')}
                className="pb-1 hover:font-semibold hover:border-b-2 transition-all duration-200"
                style={{ color: '#6B7280' }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#374151';
                  e.target.style.borderBottomColor = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6B7280';
                  e.target.style.borderBottomColor = 'transparent';
                }}
              >
                Internal Audit
              </button>
              <button 
                onClick={() => scrollToSection('treasury')}
                className="pb-1 hover:font-semibold hover:border-b-2 transition-all duration-200"
                style={{ color: '#6B7280' }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#374151';
                  e.target.style.borderBottomColor = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6B7280';
                  e.target.style.borderBottomColor = 'transparent';
                }}
              >
                Treasury
              </button>
              <button 
                onClick={() => scrollToSection('direct-taxes')}
                className="pb-1 hover:font-semibold hover:border-b-2 transition-all duration-200"
                style={{ color: '#6B7280' }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#374151';
                  e.target.style.borderBottomColor = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6B7280';
                  e.target.style.borderBottomColor = 'transparent';
                }}
              >
                Direct Taxes
              </button>
              <button 
                onClick={() => scrollToSection('indirect-taxes')}
                className="pb-1 hover:font-semibold hover:border-b-2 transition-all duration-200"
                style={{ color: '#6B7280' }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#374151';
                  e.target.style.borderBottomColor = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6B7280';
                  e.target.style.borderBottomColor = 'transparent';
                }}
              >
                Indirect Taxes
              </button>
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
            CFO's Office <span style={{ color: '#FBBF24' }}>Agentverse</span>
          </h1>
        </div>

        {/* 1. Core Accounting */}
        <div id="core-accounting" className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Core Accounting</h2>
            <div className="w-24 h-0.5 mb-3" style={{ backgroundColor: '#FBBF24' }}></div>
            <p className="text-gray-600">Enhancing the integrity and efficiency of financial reporting through real-time, autonomous analysis.</p>
          </div>

          {/* 1.1 General Ledger and Accounting */}
          <div id="gl-accounting" className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
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
          <div id="accounts-receivable" className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
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
          <div id="accounts-payable" className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
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
          <div id="product-costing" className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
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
          <div id="asset-accounting" className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
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
          <div id="planning" className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
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
        <div id="inventory-management" className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Inventory Management</h2>
            <div className="w-24 h-0.5 mb-3" style={{ backgroundColor: '#FBBF24' }}></div>
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
        <div id="compliance" className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Corporate Secretarial & Compliance</h2>
            <div className="w-24 h-0.5 mb-3" style={{ backgroundColor: '#FBBF24' }}></div>
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

        {/* 3. Insurance */}
        <div id="insurance" className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Insurance</h2>
            <div className="w-24 h-0.5 mb-3" style={{ backgroundColor: '#FBBF24' }}></div>
            <p className="text-gray-600">Transforming claims, underwriting, and risk management with intelligent, data-driven automation.</p>
          </div>
          <div className="text-center py-8 text-gray-500">
            <p>Agents coming soon...</p>
          </div>
        </div>

        {/* 4. Internal Audit, Risk & Assurance */}
        <div id="internal-audit" className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Internal Audit, Risk & Assurance</h2>
            <div className="w-24 h-0.5 mb-3" style={{ backgroundColor: '#FBBF24' }}></div>
            <p className="text-gray-600">Automating the entire audit lifecycle to free up human auditors for strategic, high-impact analysis.</p>
          </div>
          <div className="text-center py-8 text-gray-500">
            <p>Agents coming soon...</p>
          </div>
        </div>

        {/* 5. Treasury */}
        <div id="treasury" className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">5. Treasury</h2>
            <div className="w-24 h-0.5 mb-3" style={{ backgroundColor: '#FBBF24' }}></div>
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

        {/* 6. Direct Taxes */}
        <div id="direct-taxes" className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">6. Direct Taxes</h2>
            <div className="w-24 h-0.5 mb-3" style={{ backgroundColor: '#FBBF24' }}></div>
            <p className="text-gray-600">Streamlining tax compliance and planning through automated data aggregation, calculation, and analysis.</p>
          </div>
          <div className="text-center py-8 text-gray-500">
            <p>Agents coming soon...</p>
          </div>
        </div>

        {/* 7. Indirect Taxes */}
        <div id="indirect-taxes" className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">7. Indirect Taxes</h2>
            <div className="w-24 h-0.5 mb-3" style={{ backgroundColor: '#FBBF24' }}></div>
            <p className="text-gray-600">Ensuring transactional compliance for VAT/GST with real-time determination and automated reporting.</p>
          </div>
          <div className="text-center py-8 text-gray-500">
            <p>Agents coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsDashboard;
