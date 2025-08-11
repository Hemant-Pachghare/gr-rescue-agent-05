
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Calculator, 
  FileText, 
  TrendingUp, 
  Building, 
  PieChart, 
  Warehouse, 
  Users, 
  Gavel, 
  ShieldCheck, 
  HeartHandshake, 
  Search, 
  DollarSign, 
  Receipt 
} from 'lucide-react';

interface AgentCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  onClick?: () => void;
  isInteractive?: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ title, description, icon: Icon, onClick, isInteractive = false }) => {
  return (
    <Card 
      className={`p-4 bg-white shadow-sm rounded-lg border border-gray-200 ${isInteractive ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFFBEB' }}>
          <Icon className="w-5 h-5" style={{ color: '#FBBF24' }} />
        </div>
        <Badge className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#DBEAFE', color: '#2563EB' }}>
          AI/ML
        </Badge>
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Card>
  );
};

interface AgentsDashboardProps {
  onNavigateToInvoiceList: () => void;
}

const AgentsDashboard: React.FC<AgentsDashboardProps> = ({ onNavigateToInvoiceList }) => {
  const [activeSection, setActiveSection] = useState('core-accounting');

  const navigationSections = [
    { id: 'core-accounting', label: 'Core Accounting' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'internal-audit', label: 'Internal Audit' },
    { id: 'treasury', label: 'Treasury' },
    { id: 'direct-taxes', label: 'Direct Taxes' },
    { id: 'indirect-taxes', label: 'Indirect Taxes' }
  ];

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleAgentClick = (agentName: string) => {
    if (agentName === 'Automated Invoice Processor') {
      onNavigateToInvoiceList();
    } else {
      alert('Feature under development');
    }
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationSections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const currentSection = sections.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f3f4f6' }}>
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
              </div>
              <nav className="flex space-x-6">
                {navigationSections.map((section) => (
                  <button 
                    key={section.id}
                    onClick={() => handleNavClick(section.id)}
                    className={`transition-all ${
                      activeSection === section.id 
                        ? 'font-bold text-gray-800 border-b-2 border-gray-800 pb-1'
                        : 'text-gray-500 hover:text-gray-800 hover:font-bold hover:border-b-2 hover:border-gray-800 hover:pb-1'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
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
            CFO's Office{' '}
            <span style={{ color: '#FBBF24' }}>Agentverse</span>
          </h1>
        </div>

        {/* 1. Core Accounting */}
        <section id="core-accounting" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">1. Core Accounting</h2>
            <div className="w-full h-0.5 mb-4" style={{ backgroundColor: '#FBBF24' }}></div>
            <p className="text-gray-600">Enhancing the integrity and efficiency of financial reporting through real-time, autonomous analysis.</p>
          </div>

          {/* 1.1 General Ledger and Accounting */}
          <div id="gl-accounting" className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
              <h3 className="text-xl font-bold text-gray-900">1.1 General Ledger and Accounting</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AgentCard
                title="Autonomous Anomaly Detector"
                description="Continuously scans all journal entries 24/7, flagging unusual account combinations, times, or amounts, and initiates an inquiry with the preparer."
                icon={Shield}
                onClick={() => handleAgentClick('Autonomous Anomaly Detector')}
              />
              <AgentCard
                title="Intelligent Reconciliation Agent"
                description="Automates reconciliation of high-volume accounts by matching transactions, identifying discrepancies, and independently investigating their origin."
                icon={Calculator}
                onClick={() => handleAgentClick('Intelligent Reconciliation Agent')}
              />
              <AgentCard
                title="Accrual & Prepayment Manager"
                description="Scans contracts and invoices to autonomously calculate, propose, and post month-end accrual and prepayment entries with documentation."
                icon={FileText}
                onClick={() => handleAgentClick('Accrual & Prepayment Manager')}
              />
              <AgentCard
                title="Subsidiary Ledger Sentinel"
                description="Performs continuous reconciliation between the GL control accounts and sub-ledgers (AR, AP, FA), instantly flagging and investigating imbalances."
                icon={TrendingUp}
                onClick={() => handleAgentClick('Subsidiary Ledger Sentinel')}
              />
              <AgentCard
                title="Automated Period-End Closer"
                description="Orchestrates the entire month-end closing checklist, executing tasks, verifying completion, and escalating exceptions or delays."
                icon={Building}
                onClick={() => handleAgentClick('Automated Period-End Closer')}
              />
              <AgentCard
                title="FX Revaluation Agent"
                description="Monitors foreign currency exchange rates daily, automatically revaluing balances and posting unrealized gains or losses."
                icon={DollarSign}
                onClick={() => handleAgentClick('FX Revaluation Agent')}
              />
              <AgentCard
                title="Journal Entry Auditor"
                description="Performs real-time analysis of journal entries to identify patterns that could indicate errors or fraudulent activity."
                icon={Search}
                onClick={() => handleAgentClick('Journal Entry Auditor')}
              />
            </div>
          </div>

          {/* 1.2 Accounts Receivable */}
          <div id="accounts-receivable" className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
              <h3 className="text-xl font-bold text-gray-900">1.2 Accounts Receivable</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AgentCard
                title="Compliance Verification Bot"
                description="Cross-references journal entries against IFRS/GAAP requirements to flag potential non-compliance in revenue recognition or lease accounting."
                icon={ShieldCheck}
                onClick={() => handleAgentClick('Compliance Verification Bot')}
              />
              <AgentCard
                title="Credit Policy Agent"
                description="Autonomously assesses new customer creditworthiness using external and internal data to recommend and set initial credit limits."
                icon={TrendingUp}
                onClick={() => handleAgentClick('Credit Policy Agent')}
              />
              <AgentCard
                title="Dynamic Risk-Based Collector"
                description="Prioritizes collection activities by analyzing customer patterns and risk signals, then autonomously sends tailored collection notices."
                icon={Users}
                onClick={() => handleAgentClick('Dynamic Risk-Based Collector')}
              />
              <AgentCard
                title="Cash Application Specialist"
                description="Automatically matches incoming cash receipts to open invoices, handling complex scenarios like partial or bundled payments."
                icon={DollarSign}
                onClick={() => handleAgentClick('Cash Application Specialist')}
              />
              <AgentCard
                title="Revenue Recognition Agent"
                description="For complex contracts, tracks the delivery of performance obligations and autonomously triggers revenue recognition."
                icon={Calculator}
                onClick={() => handleAgentClick('Revenue Recognition Agent')}
              />
            </div>
          </div>

          {/* 1.3 Accounts Payable */}
          <div id="accounts-payable" className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
              <h3 className="text-xl font-bold text-gray-900">1.3 Accounts Payable</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AgentCard
                title="Duplicate Payment Hunter"
                description="Scans all paid and unpaid invoices in real-time to identify potential duplicates, placing suspect invoices on immediate payment hold."
                icon={Search}
                onClick={() => handleAgentClick('Duplicate Payment Hunter')}
              />
              <AgentCard
                title="Vendor Master File Gatekeeper"
                description="Performs due diligence on new vendors by verifying details against external databases and watchlists to prevent fraud."
                icon={Shield}
                onClick={() => handleAgentClick('Vendor Master File Gatekeeper')}
              />
              <AgentCard
                title="Three-Way Match Maverick"
                description="Autonomously matches invoices to purchase orders and goods receipt notes, initiating resolution for any discrepancies."
                icon={FileText}
                onClick={() => handleAgentClick('Three-Way Match Maverick')}
              />
              <AgentCard
                title="Invoice Anomaly Detector"
                description="Uses AI to analyze incoming invoices for signs of fraud, such as non-standard formatting or unusual charges."
                icon={ShieldCheck}
                onClick={() => handleAgentClick('Invoice Anomaly Detector')}
              />
              <AgentCard
                title="Automated Invoice Processor"
                description="Receives, validates, and matches invoices, then autonomously posts the final journal entry to the ERP system (e.g., SAP)."
                icon={Receipt}
                onClick={() => handleAgentClick('Automated Invoice Processor')}
                isInteractive={true}
              />
            </div>
          </div>

          {/* 1.4 Product & Actual Costing */}
          <div id="product-costing" className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
              <h3 className="text-xl font-bold text-gray-900">1.4 Product & Actual Costing</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AgentCard
                title="Standard Costing Agent"
                description="Autonomously updates standard costs by monitoring changes in raw material prices, labor rates, and manufacturing overheads."
                icon={Calculator}
                onClick={() => handleAgentClick('Standard Costing Agent')}
              />
              <AgentCard
                title="Variance Analysis Investigator"
                description="Automatically identifies significant production cost variances and drills down into data to pinpoint the root cause."
                icon={TrendingUp}
                onClick={() => handleAgentClick('Variance Analysis Investigator')}
              />
              <AgentCard
                title="Product Margin Monitor"
                description="Tracks the gross margin of every product in real-time, alerting management when profitability drops below a set threshold."
                icon={PieChart}
                onClick={() => handleAgentClick('Product Margin Monitor')}
              />
            </div>
          </div>

          {/* 1.5 Asset Accounting */}
          <div id="asset-accounting" className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
              <h3 className="text-xl font-bold text-gray-900">1.5 Asset Accounting</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AgentCard
                title="Asset Acquisition Verifier"
                description="Automatically identifies potential capital expenditures from purchasing data and initiates a capitalization approval workflow."
                icon={Building}
                onClick={() => handleAgentClick('Asset Acquisition Verifier')}
              />
              <AgentCard
                title="Ghost Asset Hunter"
                description="Uses RFID, network data, or IoT sensors for continuous physical verification of assets against the fixed asset register."
                icon={Search}
                onClick={() => handleAgentClick('Ghost Asset Hunter')}
              />
              <AgentCard
                title="Depreciation Run Automator"
                description="Autonomously calculates and posts the monthly depreciation charge for all assets based on policy."
                icon={Calculator}
                onClick={() => handleAgentClick('Depreciation Run Automator')}
              />
            </div>
          </div>

          {/* 1.6 Planning */}
          <div id="planning" className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
              <h3 className="text-xl font-bold text-gray-900">1.6 Planning</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AgentCard
                title="Dynamic Forecaster"
                description="Continuously updates financial forecasts by integrating real-time sales, operational, and macroeconomic data."
                icon={TrendingUp}
                onClick={() => handleAgentClick('Dynamic Forecaster')}
              />
              <AgentCard
                title="Budget Variance Investigator"
                description="Not only identifies variances but autonomously drills down into transactional data to provide a narrative on why it occurred."
                icon={Search}
                onClick={() => handleAgentClick('Budget Variance Investigator')}
              />
              <AgentCard
                title="Scenario Modeling Agent"
                description="Runs thousands of simulations based on different assumptions to model potential impacts on profitability and cash flow."
                icon={PieChart}
                onClick={() => handleAgentClick('Scenario Modeling Agent')}
              />
            </div>
          </div>

          {/* Inventory Management */}
          <div id="inventory-management" className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
              <h3 className="text-xl font-bold text-gray-900">Inventory Management</h3>
            </div>
            <p className="text-gray-600 mb-6">Optimizing inventory levels and reducing carrying costs through intelligent monitoring and analysis.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AgentCard
                title="Obsolete Inventory Identifier"
                description="Increases cash flow by identifying and flagging non-moving or obsolete inventory for disposal or write-down."
                icon={Warehouse}
                onClick={() => handleAgentClick('Obsolete Inventory Identifier')}
              />
              <AgentCard
                title="Shrinkage & Theft Detector"
                description="Reduces losses by analyzing inventory count discrepancies and transaction patterns to identify potential theft or shrinkage."
                icon={Shield}
                onClick={() => handleAgentClick('Shrinkage & Theft Detector')}
              />
            </div>
          </div>

          {/* Payroll */}
          <div id="payroll" className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-1 h-6 mr-4" style={{ backgroundColor: '#FBBF24' }}></div>
              <h3 className="text-xl font-bold text-gray-900">Payroll</h3>
            </div>
            <p className="text-gray-600">Automating payroll processes to ensure accuracy, timeliness, and compliance.</p>
          </div>
        </section>

        {/* 2. Corporate Secretarial & Compliance */}
        <section id="compliance" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">2. Corporate Secretarial & Compliance</h2>
            <div className="w-full h-0.5 mb-4" style={{ backgroundColor: '#FBBF24' }}></div>
            <p className="text-gray-600">Ensuring an always-on state of compliance through continuous monitoring and automated response to regulatory changes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AgentCard
              title="Regulatory Change Agent"
              description="Scans government gazettes and legal news 24/7 to identify new or amended laws that impact the company."
              icon={Gavel}
              onClick={() => handleAgentClick('Regulatory Change Agent')}
            />
            <AgentCard
              title="AML/KYC Screening Agent"
              description="Performs continuous screening of customer and vendor lists against global sanctions and Politically Exposed Persons (PEP) lists."
              icon={ShieldCheck}
              onClick={() => handleAgentClick('AML/KYC Screening Agent')}
            />
          </div>
        </section>

        {/* 3. Insurance */}
        <section id="insurance" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">3. Insurance</h2>
            <div className="w-full h-0.5 mb-4" style={{ backgroundColor: '#FBBF24' }}></div>
            <p className="text-gray-600">Transforming claims, underwriting, and risk management with intelligent, data-driven automation.</p>
          </div>
        </section>

        {/* 4. Internal Audit, Risk & Assurance */}
        <section id="internal-audit" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">4. Internal Audit, Risk & Assurance</h2>
            <div className="w-full h-0.5 mb-4" style={{ backgroundColor: '#FBBF24' }}></div>
            <p className="text-gray-600">Automating the entire audit lifecycle to free up human auditors for strategic, high-impact analysis.</p>
          </div>
        </section>

        {/* 5. Treasury */}
        <section id="treasury" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">5. Treasury</h2>
            <div className="w-full h-0.5 mb-4" style={{ backgroundColor: '#FBBF24' }}></div>
            <p className="text-gray-600">Optimizing cash flow, managing financial risk, and ensuring liquidity with real-time, predictive insights.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AgentCard
              title="Intelligent Cash Forecaster"
              description="Provides a highly accurate, rolling 13-week cash flow forecast by integrating real-time data from across the business."
              icon={TrendingUp}
              onClick={() => handleAgentClick('Intelligent Cash Forecaster')}
            />
            <AgentCard
              title="Liquidity Optimization Agent"
              description="Continuously monitors bank accounts, autonomously executing cash sweeps to concentrate funds and minimize borrowing."
              icon={DollarSign}
              onClick={() => handleAgentClick('Liquidity Optimization Agent')}
            />
          </div>
        </section>

        {/* 6. Direct Taxes */}
        <section id="direct-taxes" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">6. Direct Taxes</h2>
            <div className="w-full h-0.5 mb-4" style={{ backgroundColor: '#FBBF24' }}></div>
            <p className="text-gray-600">Streamlining tax compliance and planning through automated data aggregation, calculation, and analysis.</p>
          </div>
        </section>

        {/* 7. Indirect Taxes */}
        <section id="indirect-taxes" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">7. Indirect Taxes</h2>
            <div className="w-full h-0.5 mb-4" style={{ backgroundColor: '#FBBF24' }}></div>
            <p className="text-gray-600">Ensuring transactional compliance for VAT/GST with real-time determination and automated reporting.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AgentsDashboard;
