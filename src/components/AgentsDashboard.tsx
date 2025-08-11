
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Database, 
  DollarSign, 
  Calculator, 
  Building, 
  Shield, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  BarChart3,
  Settings,
  Globe,
  Zap,
  Brain,
  Target,
  Layers,
  PieChart,
  Calendar,
  Search,
  Filter,
  Mail,
  Phone,
  Truck,
  Package,
  CreditCard,
  Coins
} from 'lucide-react';

const AgentsDashboard = ({ onNavigateToInvoiceList }) => {
  const [activeSection, setActiveSection] = useState('core-accounting');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Check if section is in viewport
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['core-accounting', 'compliance', 'insurance', 'internal-audit', 'treasury', 'direct-taxes', 'indirect-taxes'];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const agentCards = [
    // General Ledger and Accounting
    {
      title: "Autonomous Anomaly Detector",
      description: "Real-time detection of unusual journal entries, account balances, and transaction patterns using advanced machine learning algorithms.",
      icon: AlertTriangle,
      category: "gl-accounting"
    },
    {
      title: "Intelligent Reconciliation Agent",
      description: "Automated bank, inter-company, and account reconciliations with smart matching algorithms and exception handling.",
      icon: CheckCircle,
      category: "gl-accounting"
    },
    {
      title: "Accrual & Prepayment Manager",
      description: "Automated calculation and posting of accruals, deferrals, and prepayments based on historical patterns and contract terms.",
      icon: Calendar,
      category: "gl-accounting"
    },
    {
      title: "Subsidiary Ledger Sentinel",
      description: "Continuous monitoring and validation of subsidiary ledger balances against general ledger with automated variance analysis.",
      icon: Database,
      category: "gl-accounting"
    },
    {
      title: "Automated Period-End Closer",
      description: "Streamlined month-end and year-end closing procedures with automated checklist execution and deadline monitoring.",
      icon: Clock,
      category: "gl-accounting"
    },
    {
      title: "FX Revaluation Agent",
      description: "Automated foreign exchange revaluation for multi-currency transactions with real-time rate updates and impact analysis.",
      icon: Globe,
      category: "gl-accounting"
    },
    {
      title: "Journal Entry Auditor",
      description: "Intelligent review of journal entries for completeness, accuracy, and compliance with accounting standards and policies.",
      icon: Search,
      category: "gl-accounting"
    },
    
    // Accounts Receivable
    {
      title: "Compliance Verification Bot",
      description: "Automated verification of invoice compliance with tax regulations, contract terms, and customer-specific requirements.",
      icon: Shield,
      category: "accounts-receivable"
    },
    {
      title: "Credit Policy Agent",
      description: "Dynamic credit limit management and customer risk assessment using real-time financial data and payment history.",
      icon: TrendingUp,
      category: "accounts-receivable"
    },
    {
      title: "Dynamic Risk-Based Collector",
      description: "Intelligent collections strategy with personalized communication and escalation based on customer behavior analysis.",
      icon: Phone,
      category: "accounts-receivable"
    },
    {
      title: "Cash Application Specialist",
      description: "Automated matching of customer payments to outstanding invoices using advanced pattern recognition and machine learning.",
      icon: CreditCard,
      category: "accounts-receivable"
    },
    {
      title: "Dispute Resolution Bot",
      description: "Automated dispute management with intelligent routing, documentation, and resolution tracking for customer queries.",
      icon: Mail,
      category: "accounts-receivable"
    },
    {
      title: "Sales Credit Note Verifier",
      description: "Automated validation and processing of credit notes with approval workflow and accounting impact analysis.",
      icon: FileText,
      category: "accounts-receivable"
    },
    {
      title: "AR Sub-ledger Integrity Checker",
      description: "Continuous monitoring of accounts receivable sub-ledger for data consistency, aging accuracy, and balance validation.",
      icon: Database,
      category: "accounts-receivable"
    },
    {
      title: "Bad Debt Provision Analyst",
      description: "Automated calculation of bad debt provisions using historical data, customer risk profiles, and regulatory requirements.",
      icon: AlertTriangle,
      category: "accounts-receivable"
    },
    {
      title: "Order-to-Cash Process Miner",
      description: "Process optimization through automated analysis of order-to-cash workflows, identifying bottlenecks and improvement opportunities.",
      icon: BarChart3,
      category: "accounts-receivable"
    },
    {
      title: "Customer Master File Guardian",
      description: "Automated maintenance and validation of customer master data with duplicate detection and data quality monitoring.",
      icon: Users,
      category: "accounts-receivable"
    },
    {
      title: "Revenue Recognition Agent",
      description: "Automated revenue recognition based on contract terms, delivery confirmation, and accounting standards compliance.",
      icon: DollarSign,
      category: "accounts-receivable"
    },

    // Accounts Payable
    {
      title: "Duplicate Payment Hunter",
      description: "Advanced detection and prevention of duplicate payments using multi-dimensional matching algorithms and vendor analysis.",
      icon: Search,
      category: "accounts-payable"
    },
    {
      title: "Vendor Master File Gatekeeper",
      description: "Automated vendor onboarding, validation, and maintenance with compliance checks and risk assessment.",
      icon: Building,
      category: "accounts-payable"
    },
    {
      title: "Three-Way Match Maverick",
      description: "Intelligent three-way matching of purchase orders, receipts, and invoices with automated exception handling.",
      icon: CheckCircle,
      category: "accounts-payable"
    },
    {
      title: "Invoice Anomaly Detector",
      description: "Real-time detection of unusual invoice patterns, amounts, and vendor behavior using machine learning algorithms.",
      icon: AlertTriangle,
      category: "accounts-payable"
    },
    {
      title: "Automated Invoice Processor",
      description: "End-to-end invoice processing from receipt to posting with OCR, validation, and approval workflow automation.",
      icon: FileText,
      category: "accounts-payable",
      isInteractive: true
    },
    {
      title: "Maverick Spending Monitor",
      description: "Detection and analysis of off-contract purchases and policy violations with automated reporting and escalation.",
      icon: AlertTriangle,
      category: "accounts-payable"
    },
    {
      title: "Vendor Spend Concentration Analyst",
      description: "Analysis of vendor spending patterns and concentration risk with recommendations for supplier diversification.",
      icon: PieChart,
      category: "accounts-payable"
    },
    {
      title: "Early Payment Discount Optimizer",
      description: "Automated identification and capture of early payment discounts with cash flow impact analysis.",
      icon: Coins,
      category: "accounts-payable"
    },
    {
      title: "Procure-to-Pay Process Controller",
      description: "End-to-end monitoring and optimization of procure-to-pay processes with automated workflow management.",
      icon: Truck,
      category: "accounts-payable"
    },
    {
      title: "T&E Expense Auditor",
      description: "Automated travel and expense report validation with policy compliance checking and receipt verification.",
      icon: Calculator,
      category: "accounts-payable"
    },
    {
      title: "Ghost Vendor Seeker",
      description: "Detection of fraudulent or inactive vendors with risk assessment and recommended actions for vendor file cleanup.",
      icon: Shield,
      category: "accounts-payable"
    },

    // Product & Actual Costing
    {
      title: "Standard Costing Agent",
      description: "Automated standard cost maintenance and updates based on material costs, labor rates, and overhead allocation changes.",
      icon: Calculator,
      category: "product-costing"
    },
    {
      title: "Variance Analysis Investigator",
      description: "Intelligent analysis of cost variances with root cause identification and management reporting.",
      icon: BarChart3,
      category: "product-costing"
    },
    {
      title: "Work-in-Progress (WIP) Auditor",
      description: "Automated WIP validation and analysis with production stage tracking and cost allocation verification.",
      icon: Settings,
      category: "product-costing"
    },
    {
      title: "Overhead Allocation Agent",
      description: "Dynamic overhead allocation based on activity drivers with real-time cost distribution and analysis.",
      icon: PieChart,
      category: "product-costing"
    },
    {
      title: "Bill of Materials (BOM) Integrity Checker",
      description: "Automated validation of BOM accuracy, cost calculations, and engineering change impact analysis.",
      icon: Layers,
      category: "product-costing"
    },
    {
      title: "Scrap Reporting Analyst",
      description: "Automated scrap and waste reporting with cost impact analysis and trend identification for process improvement.",
      icon: AlertTriangle,
      category: "product-costing"
    },
    {
      title: "Inventory Valuation Specialist",
      description: "Automated inventory valuation using various costing methods with compliance and accuracy validation.",
      icon: Package,
      category: "product-costing"
    },
    {
      title: "Product Margin Monitor",
      description: "Real-time monitoring of product profitability with margin analysis and pricing recommendation insights.",
      icon: TrendingUp,
      category: "product-costing"
    },
    {
      title: "Cost Run Simulator",
      description: "Automated cost run execution and validation with scenario analysis and impact assessment capabilities.",
      icon: Target,
      category: "product-costing"
    },
    {
      title: "Intercompany Costing Agent",
      description: "Automated intercompany cost allocation and transfer pricing with compliance and documentation management.",
      icon: Globe,
      category: "product-costing"
    },

    // Asset Accounting
    {
      title: "Asset Acquisition Verifier",
      description: "Automated validation of asset acquisitions with capitalization rules compliance and documentation verification.",
      icon: CheckCircle,
      category: "asset-accounting"
    },
    {
      title: "Ghost Asset Hunter",
      description: "Detection and identification of assets that may no longer exist or are not properly recorded in the asset register.",
      icon: Search,
      category: "asset-accounting"
    },
    {
      title: "Depreciation Run Automator",
      description: "Automated depreciation calculations and postings with method validation and regulatory compliance checking.",
      icon: Calculator,
      category: "asset-accounting"
    },
    {
      title: "Impairment Trigger Monitor",
      description: "Continuous monitoring for asset impairment indicators with automated testing and reporting capabilities.",
      icon: AlertTriangle,
      category: "asset-accounting"
    },
    {
      title: "Underutilized Asset Analyst",
      description: "Analysis of asset utilization patterns with recommendations for optimization and disposal considerations.",
      icon: BarChart3,
      category: "asset-accounting"
    },
    {
      title: "Obsolete Asset Identifier",
      description: "Automated identification of obsolete or end-of-life assets with disposal and write-off recommendations.",
      icon: Filter,
      category: "asset-accounting"
    },
    {
      title: "Capital Projects Monitor",
      description: "Real-time monitoring of capital projects with budget tracking, milestone management, and capitalization rules.",
      icon: Building,
      category: "asset-accounting"
    },
    {
      title: "Maintenance Cost Analyzer",
      description: "Analysis of asset maintenance costs with optimization recommendations and lifecycle cost evaluation.",
      icon: Settings,
      category: "asset-accounting"
    },
    {
      title: "Asset Register Integrity Sentinel",
      description: "Continuous validation of asset register accuracy with physical verification and reconciliation capabilities.",
      icon: Database,
      category: "asset-accounting"
    },
    {
      title: "Insurance Value Assessor",
      description: "Automated assessment of asset insurance values with coverage gap identification and recommendation updates.",
      icon: Shield,
      category: "asset-accounting"
    },

    // Planning
    {
      title: "Dynamic Forecaster",
      description: "AI-powered financial forecasting with real-time data integration and scenario analysis capabilities.",
      icon: TrendingUp,
      category: "planning"
    },
    {
      title: "Budget Variance Investigator",
      description: "Automated analysis of budget variances with root cause identification and corrective action recommendations.",
      icon: BarChart3,
      category: "planning"
    },
    {
      title: "Scenario Modeling Agent",
      description: "Advanced scenario modeling and sensitivity analysis for strategic planning and risk assessment.",
      icon: Target,
      category: "planning"
    },
    {
      title: "Headcount & Payroll Planner",
      description: "Integrated workforce and payroll planning with cost optimization and compliance consideration analysis.",
      icon: Users,
      category: "planning"
    },
    {
      title: "Strategic Initiative Tracker",
      description: "Monitoring and analysis of strategic initiatives with ROI tracking and milestone achievement assessment.",
      icon: Brain,
      category: "planning"
    },
    {
      title: "Competitor Analysis Bot",
      description: "Automated competitive intelligence gathering and analysis with market positioning and strategy insights.",
      icon: Search,
      category: "planning"
    },
    {
      title: "Capital Allocation Agent",
      description: "Optimized capital allocation recommendations based on ROI analysis, risk assessment, and strategic priorities.",
      icon: DollarSign,
      category: "planning"
    },
    {
      title: "Working Capital Optimizer",
      description: "Analysis and optimization of working capital components with cash flow improvement recommendations.",
      icon: Coins,
      category: "planning"
    },
    {
      title: "Covenant Compliance Forecaster",
      description: "Predictive monitoring of debt covenant compliance with early warning systems and remediation planning.",
      icon: Shield,
      category: "planning"
    },

    // Inventory Management
    {
      title: "Material Availability Gap Analyst",
      description: "Real-time analysis of material availability gaps with supplier performance tracking and risk mitigation.",
      icon: Package,
      category: "inventory-management"
    },
    {
      title: "Obsolete Inventory Identifier",
      description: "Automated identification of obsolete inventory with disposal recommendations and write-off impact analysis.",
      icon: AlertTriangle,
      category: "inventory-management"
    },
    {
      title: "Excess Inventory Alert",
      description: "Monitoring and alerting for excess inventory levels with optimization recommendations and cost analysis.",
      icon: Filter,
      category: "inventory-management"
    },
    {
      title: "Low Inventory Turnover Analyst",
      description: "Analysis of slow-moving inventory with turnover optimization strategies and demand forecasting insights.",
      icon: BarChart3,
      category: "inventory-management"
    },
    {
      title: "Unoptimized Safety Stock Recommender",
      description: "Optimization of safety stock levels based on demand variability, supplier reliability, and service level targets.",
      icon: Target,
      category: "inventory-management"
    },
    {
      title: "Shrinkage & Theft Detector",
      description: "Detection and analysis of inventory shrinkage patterns with loss prevention recommendations and controls.",
      icon: Shield,
      category: "inventory-management"
    },

    // Treasury
    {
      title: "Intelligent Cash Forecaster",
      description: "AI-powered cash flow forecasting with real-time bank data integration and liquidity management insights.",
      icon: TrendingUp,
      category: "treasury"
    },
    {
      title: "Liquidity Optimization Agent",
      description: "Automated liquidity management with investment recommendations and cash positioning optimization strategies.",
      icon: DollarSign,
      category: "treasury"
    },
    {
      title: "FX Exposure Management Bot",
      description: "Real-time foreign exchange exposure monitoring with hedging recommendations and risk mitigation strategies.",
      icon: Globe,
      category: "treasury"
    },
    {
      title: "Debt Covenant Sentinel",
      description: "Continuous monitoring of debt covenant compliance with early warning systems and breach prevention strategies.",
      icon: Shield,
      category: "treasury"
    },
    {
      title: "Investment Compliance Agent",
      description: "Automated investment policy compliance monitoring with risk assessment and regulatory adherence validation.",
      icon: CheckCircle,
      category: "treasury"
    },
    {
      title: "Bank Fee Auditor",
      description: "Automated analysis and optimization of banking fees with cost reduction recommendations and negotiation insights.",
      icon: Calculator,
      category: "treasury"
    },
    {
      title: "Payment Fraud Detector",
      description: "Real-time payment fraud detection using machine learning with automated blocking and investigation capabilities.",
      icon: AlertTriangle,
      category: "treasury"
    },
    {
      title: "Surety Bond & Guarantee Manager",
      description: "Automated management of surety bonds and guarantees with renewal tracking and cost optimization analysis.",
      icon: FileText,
      category: "treasury"
    },
    {
      title: "Hedge Accounting Assistant",
      description: "Automated hedge accounting documentation and effectiveness testing with compliance and reporting support.",
      icon: Database,
      category: "treasury"
    },
    {
      title: "Counterparty Risk Monitor",
      description: "Continuous monitoring of counterparty credit risk with exposure analysis and mitigation recommendations.",
      icon: Users,
      category: "treasury"
    }
  ];

  const renderAgentCard = (agent) => (
    <Card 
      key={agent.title} 
      className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${
        agent.isInteractive ? 'hover:bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
      }`}
      onClick={() => {
        if (agent.isInteractive) {
          onNavigateToInvoiceList();
        } else {
          // Show "Feature under development" message for non-interactive cards
          alert('Feature under development');
        }
      }}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
          <agent.icon className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 leading-tight">
              {agent.title}
            </h3>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs ml-2">
              AI/ML
            </Badge>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {agent.description}
          </p>
        </div>
      </div>
    </Card>
  );

  const sections = [
    { id: 'core-accounting', label: 'Core Accounting' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'internal-audit', label: 'Internal Audit' },
    { id: 'treasury', label: 'Treasury' },
    { id: 'direct-taxes', label: 'Direct Taxes' },
    { id: 'indirect-taxes', label: 'Indirect Taxes' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img 
                  src="/lovable-uploads/3920afe6-68c2-4fc5-918b-c86b958f7e12.png" 
                  alt="EY Logo" 
                  className="h-8 w-8 object-contain"
                />
              </div>
              
              {/* Navigation Links */}
              <nav className="flex space-x-8">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-sm transition-all duration-200 ${
                      activeSection === section.id
                        ? 'font-bold text-gray-900 border-b-2 border-gray-900 pb-1'
                        : 'font-normal text-gray-600 hover:font-bold hover:text-gray-900 hover:border-b-2 hover:border-gray-900 hover:pb-1'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CFO's Office <span className="text-yellow-500">Agentverse</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Enhancing the integrity and efficiency of financial operations through intelligent, autonomous AI agents.
          </p>
        </div>

        {/* Core Accounting Section */}
        <section id="core-accounting" className="mb-16">
          <div className="border-l-4 border-blue-500 pl-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Core Accounting</h2>
            <p className="text-gray-600">
              Enhancing the integrity and efficiency of financial reporting through real-time, autonomous analysis.
            </p>
          </div>

          {/* General Ledger and Accounting */}
          <div id="gl-accounting" className="mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-gray-200 w-0.5 h-6 mr-3"></span>
              1.1 General Ledger and Accounting
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {agentCards.filter(agent => agent.category === 'gl-accounting').map(renderAgentCard)}
            </div>
          </div>

          {/* Accounts Receivable */}
          <div id="accounts-receivable" className="mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-gray-200 w-0.5 h-6 mr-3"></span>
              1.2 Accounts Receivable
            </h3>
            <p className="text-gray-600 mb-4">
              Automating customer invoice processing, collections, and cash application to optimize cash flow and reduce DSO.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {agentCards.filter(agent => agent.category === 'accounts-receivable').map(renderAgentCard)}
            </div>
          </div>

          {/* Accounts Payable */}
          <div id="accounts-payable" className="mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-gray-200 w-0.5 h-6 mr-3"></span>
              1.3 Accounts Payable
            </h3>
            <p className="text-gray-600 mb-4">
              Streamlining vendor invoice processing, payment execution, and spend analysis to ensure accuracy and control.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {agentCards.filter(agent => agent.category === 'accounts-payable').map(renderAgentCard)}
            </div>
          </div>

          {/* Product & Actual Costing */}
          <div id="product-costing" className="mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-gray-200 w-0.5 h-6 mr-3"></span>
              1.4 Product & Actual Costing
            </h3>
            <p className="text-gray-600 mb-4">
              Automating cost calculations, variance analysis, and profitability reporting to ensure accurate product costing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {agentCards.filter(agent => agent.category === 'product-costing').map(renderAgentCard)}
            </div>
          </div>

          {/* Asset Accounting */}
          <div id="asset-accounting" className="mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-gray-200 w-0.5 h-6 mr-3"></span>
              1.5 Asset Accounting
            </h3>
            <p className="text-gray-600 mb-4">
              Managing fixed asset lifecycles from acquisition to disposal with automated depreciation and compliance tracking.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {agentCards.filter(agent => agent.category === 'asset-accounting').map(renderAgentCard)}
            </div>
          </div>

          {/* Planning */}
          <div id="planning" className="mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-gray-200 w-0.5 h-6 mr-3"></span>
              1.6 Planning
            </h3>
            <p className="text-gray-600 mb-4">
              Enhancing financial planning and analysis with predictive analytics and automated reporting capabilities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {agentCards.filter(agent => agent.category === 'planning').map(renderAgentCard)}
            </div>
          </div>

          {/* Inventory Management */}
          <div id="inventory-management" className="mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-gray-200 w-0.5 h-6 mr-3"></span>
              1.7 Inventory Management
            </h3>
            <p className="text-gray-600 mb-4">
              Optimizing inventory levels and turnover through intelligent analysis and automated monitoring systems.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {agentCards.filter(agent => agent.category === 'inventory-management').map(renderAgentCard)}
            </div>
          </div>

          {/* Payroll */}
          <div id="payroll" className="mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-gray-200 w-0.5 h-6 mr-3"></span>
              1.8 Payroll
            </h3>
            <p className="text-gray-600 mb-4">
              Automating payroll processes to ensure accuracy, timeliness, and compliance with labor regulations.
            </p>
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-600 italic">Payroll automation agents coming soon...</p>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section id="compliance" className="mb-16">
          <div className="border-l-4 border-green-500 pl-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Corporate Secretarial & Compliance</h2>
            <p className="text-gray-600">
              Ensuring an always-on state of compliance through continuous monitoring and automated response to regulatory changes.
            </p>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600 italic">Compliance automation agents coming soon...</p>
          </div>
        </section>

        {/* Insurance Section */}
        <section id="insurance" className="mb-16">
          <div className="border-l-4 border-purple-500 pl-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Insurance</h2>
            <p className="text-gray-600">
              Transforming claims, underwriting, and risk management with intelligent, data-driven automation.
            </p>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600 italic">Insurance automation agents coming soon...</p>
          </div>
        </section>

        {/* Internal Audit Section */}
        <section id="internal-audit" className="mb-16">
          <div className="border-l-4 border-red-500 pl-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Internal Audit, Risk & Assurance</h2>
            <p className="text-gray-600">
              Automating the entire audit lifecycle to free up human auditors for strategic, high-impact analysis.
            </p>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600 italic">Audit automation agents coming soon...</p>
          </div>
        </section>

        {/* Treasury Section */}
        <section id="treasury" className="mb-16">
          <div className="border-l-4 border-yellow-500 pl-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">5. Treasury</h2>
            <p className="text-gray-600">
              Optimizing cash flow, managing financial risk, and ensuring liquidity with real-time, predictive insights.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {agentCards.filter(agent => agent.category === 'treasury').map(renderAgentCard)}
          </div>
        </section>

        {/* Direct Taxes Section */}
        <section id="direct-taxes" className="mb-16">
          <div className="border-l-4 border-indigo-500 pl-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">6. Direct Taxes</h2>
            <p className="text-gray-600">
              Streamlining tax compliance and planning through automated data aggregation, calculation, and analysis.
            </p>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600 italic">Direct tax automation agents coming soon...</p>
          </div>
        </section>

        {/* Indirect Taxes Section */}
        <section id="indirect-taxes" className="mb-16">
          <div className="border-l-4 border-orange-500 pl-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">7. Indirect Taxes</h2>
            <p className="text-gray-600">
              Ensuring transactional compliance for VAT/GST with real-time determination and automated reporting.
            </p>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600 italic">Indirect tax automation agents coming soon...</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AgentsDashboard;
