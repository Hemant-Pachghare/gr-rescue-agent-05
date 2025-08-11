
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, FileText, Package, ShoppingCart, BarChart3, Settings, Zap } from 'lucide-react';

const AgentsDashboard = ({ onAgentSelect }) => {
  const agents = [
    {
      id: 'invoice-processor',
      title: 'Automated Invoice Processor',
      description: 'Fully automate the invoice-to-post process for non-PO invoices, leveraging data extraction, validation, and ERP posting.',
      icon: FileText,
      status: 'Active',
      bgColor: 'bg-gradient-to-br from-blue-50 to-green-50',
      borderColor: 'border-blue-200',
      isMain: true
    },
    {
      id: 'batch-job-agent',
      title: 'Batch Job Automation Agent',
      description: 'Monitor and automatically resolve batch job failures across enterprise systems.',
      icon: Settings,
      status: 'Active',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'goods-receipt-agent',
      title: 'PO Goods Receipt Agent',
      description: 'Automatically process and post goods receipts for purchase orders.',
      icon: Package,
      status: 'Active',
      bgColor: 'bg-gradient-to-br from-green-50 to-teal-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'sales-order-agent',
      title: 'E-commerce Sales Order Integration Agent',
      description: 'Seamlessly integrate e-commerce sales orders into ERP systems.',
      icon: ShoppingCart,
      status: 'Active',
      bgColor: 'bg-gradient-to-br from-orange-50 to-yellow-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'reporting-agent',
      title: 'Reporting Automation Agent',
      description: 'Generate and distribute automated reports across business functions.',
      icon: BarChart3,
      status: 'Active',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'general-resolver',
      title: 'General Incident Resolver',
      description: 'Handle and resolve general IT incidents and operational issues.',
      icon: Bot,
      status: 'Active',
      bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50',
      borderColor: 'border-gray-200'
    }
  ];

  const handleAgentClick = (agentId) => {
    if (agentId === 'invoice-processor') {
      onAgentSelect('invoice-list');
    } else {
      // For other agents, show placeholder
      onAgentSelect('under-construction');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">AI Process Agents Overview</h1>
        <p className="text-gray-600">Select an AI agent to view its active processing workload</p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const IconComponent = agent.icon;
          return (
            <Card 
              key={agent.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${agent.bgColor} ${agent.borderColor} border-2`}
              onClick={() => handleAgentClick(agent.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                        <Zap className="mr-1 h-3 w-3" />
                        AI/ML
                      </Badge>
                    </div>
                  </div>
                  <Badge className={agent.status === 'Active' ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'}>
                    {agent.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-gray-900">{agent.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    View Workload
                  </Button>
                  {agent.isMain && (
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      Featured
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats Summary */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-2xl font-bold text-blue-600">6</h3>
              <p className="text-sm text-gray-600">Active Agents</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-600">127</h3>
              <p className="text-sm text-gray-600">Tasks Processed Today</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-orange-600">94%</h3>
              <p className="text-sm text-gray-600">Automation Success Rate</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-purple-600">12m</h3>
              <p className="text-sm text-gray-600">Avg Processing Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentsDashboard;
