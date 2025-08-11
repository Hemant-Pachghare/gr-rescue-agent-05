
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const IncidentCreation = ({ ticketData, setTicketData, onNext, onSubmit }) => {
  const [formData, setFormData] = useState({
    incidentNumber: 'INC0001234',
    caller: '',
    category: '',
    subcategory: '',
    service: '',
    serviceOffering: '',
    configurationItem: '',
    contactType: 'Self-service',
    state: 'New',
    impact: '',
    urgency: '',
    priority: '',
    assignmentGroup: '',
    assignedTo: '',
    notify: '',
    shortDescription: '',
    description: ''
  });

  const isInvoiceProcessing = formData.shortDescription === 'New Tax Invoice Received: Gujarat Freight Tools';

  // Auto-populate fields based on short description
  useEffect(() => {
    if (isInvoiceProcessing) {
      setFormData(prev => ({
        ...prev,
        incidentNumber: 'INV0001002',
        description: 'Automated system detected a new TAX INVOICE from \'GUJARAT FREIGHT TOOLS\' (PDF format) received via email, requiring full processing and posting to ERP.',
        contactType: 'Automated System',
        caller: 'Accounts Payable Dept.',
        category: 'Invoice Processing',
        subcategory: 'Tax Invoice Processing',
        service: 'Tax & AP Automation',
        serviceOffering: 'Invoice-to-Pay Automation',
        configurationItem: 'Automated Invoice Processor',
        impact: 'Medium',
        urgency: 'Medium',
        priority: 'Standard',
        assignmentGroup: 'AP Automation Agent',
        notify: 'AP Team Lead, Tax Compliance Team'
      }));
    } else {
      // Reset to generic/empty values for other scenarios
      setFormData(prev => ({
        ...prev,
        incidentNumber: 'INC0001234',
        description: prev.shortDescription === '' ? '' : 'Details of the incident...',
        contactType: 'Self-service',
        caller: prev.shortDescription === '' ? '' : 'Select Caller',
        category: prev.shortDescription === '' ? '' : 'Select Category',
        subcategory: prev.shortDescription === '' ? '' : 'Select Subcategory',
        service: prev.shortDescription === '' ? '' : 'Select Service',
        serviceOffering: prev.shortDescription === '' ? '' : 'Select Service Offering',
        configurationItem: prev.shortDescription === '' ? '' : 'Select Configuration Item',
        impact: prev.shortDescription === '' ? '' : 'Select Impact',
        urgency: prev.shortDescription === '' ? '' : 'Select Urgency',
        priority: prev.shortDescription === '' ? '' : 'Select Priority',
        assignmentGroup: prev.shortDescription === '' ? '' : 'Select Assignment Group',
        notify: prev.shortDescription === '' ? '' : 'Select Notification Recipient'
      }));
    }
  }, [formData.shortDescription, isInvoiceProcessing]);

  // Priority calculation logic
  const updatePriority = () => {
    if (isInvoiceProcessing) return; // Don't override for invoice scenario
    
    const { impact, urgency } = formData;
    let priority = 'Low';

    if ((impact === 'High' && urgency === 'High') || 
        (impact === 'High' && urgency === 'Medium') || 
        (impact === 'Medium' && urgency === 'High')) {
      priority = 'Critical';
    } else if (impact === 'High' || urgency === 'High') {
      priority = 'High';
    } else if (impact === 'Medium' || urgency === 'Medium') {
      priority = 'Moderate';
    } else {
      priority = 'Low';
    }

    setFormData(prev => ({ ...prev, priority }));
  };

  useEffect(() => {
    if (!isInvoiceProcessing) {
      updatePriority();
    }
  }, [formData.impact, formData.urgency, isInvoiceProcessing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description.trim()) {
      toast({
        title: "Error",
        description: "Please provide a description of the issue",
        variant: "destructive",
      });
      return;
    }

    const newTimeline = [{
      id: 1,
      type: 'creation',
      title: isInvoiceProcessing ? 'Invoice Received' : 'Incident Created',
      description: isInvoiceProcessing 
        ? `New invoice ${formData.incidentNumber} (GST-3425-26) detected by Email Inbox Agent.`
        : `New incident ${formData.incidentNumber} submitted by ${formData.caller || 'User'} regarding "${formData.shortDescription}".`,
      timestamp: new Date(),
      status: 'completed'
    }];

    setTicketData({
      ...ticketData,
      id: formData.incidentNumber,
      subject: formData.shortDescription,
      description: formData.description,
      isInvoiceProcessing: isInvoiceProcessing,
      status: 'Open',
      priority: formData.priority,
      timeline: newTimeline
    });

    toast({
      title: "Success",
      description: isInvoiceProcessing 
        ? "Invoice received successfully. Click 'Start Processing' to begin workflow." 
        : "Manufacturing incident created successfully. Click 'Show Backend Actions' to proceed with triage.",
    });

    if (onSubmit) {
      onSubmit();
    }
  };

  const handleCancel = () => {
    toast({
      title: "Cancelled",
      description: isInvoiceProcessing ? "Invoice submission cancelled" : "Incident creation cancelled",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-xl overflow-hidden">
        {/* ServiceNow Style Header */}
        <div className="bg-slate-700 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {isInvoiceProcessing ? 'INV' : 'MFG'}
              </div>
              <h1 className="text-2xl font-bold">
                {isInvoiceProcessing ? 'Submit New Invoice for Processing' : 'Create New Manufacturing Incident'}
              </h1>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Submit
              </Button>
              <Button 
                onClick={handleCancel}
                variant="secondary"
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-6 bg-slate-50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Top Section: Short Description and Description */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="shortDescription" className="text-slate-600 font-medium">Short description</Label>
                <Input
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Type 'New Tax Invoice Received: Gujarat Freight Tools' or other"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-slate-600 font-medium">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  placeholder="Provide detailed description of the incident..."
                />
              </div>
            </div>

            {/* Second Section: Number and Contact Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="incidentNumber" className="text-slate-600 font-medium">Number</Label>
                <Input
                  id="incidentNumber"
                  value={formData.incidentNumber}
                  className="bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <Label htmlFor="contactType" className="text-slate-600 font-medium">Contact type</Label>
                <Select value={formData.contactType} onValueChange={(value) => setFormData({ ...formData, contactType: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Self-service">Self-service</SelectItem>
                    <SelectItem value="Automated System">Automated System</SelectItem>
                    <SelectItem value="User Submitted">User Submitted</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Chat">Chat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Remaining Fields in Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="caller" className="text-slate-600 font-medium">Caller</Label>
                  <Input
                    id="caller"
                    value={formData.caller}
                    onChange={(e) => setFormData({ ...formData, caller: e.target.value })}
                    placeholder={isInvoiceProcessing ? "" : "Enter caller name"}
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-slate-600 font-medium">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Invoice Processing">Invoice Processing</SelectItem>
                      <SelectItem value="Production Systems">Production Systems</SelectItem>
                      <SelectItem value="Supply Chain">Supply Chain</SelectItem>
                      <SelectItem value="Quality Control">Quality Control</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="ERP (SAP)">ERP (SAP)</SelectItem>
                      <SelectItem value="MES/SCADA">MES/SCADA</SelectItem>
                      <SelectItem value="Data Integration">Data Integration</SelectItem>
                      <SelectItem value="Integration">Integration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subcategory" className="text-slate-600 font-medium">Subcategory</Label>
                  <Select value={formData.subcategory} onValueChange={(value) => setFormData({ ...formData, subcategory: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="--None--">--None--</SelectItem>
                      <SelectItem value="Tax Invoice Processing">Tax Invoice Processing</SelectItem>
                      <SelectItem value="SAP - Materials Management (MM)">SAP - Materials Management (MM)</SelectItem>
                      <SelectItem value="SAP - Production Planning (PP)">SAP - Production Planning (PP)</SelectItem>
                      <SelectItem value="SAP - Quality Management (QM)">SAP - Quality Management (QM)</SelectItem>
                      <SelectItem value="MES - Data Sync">MES - Data Sync</SelectItem>
                      <SelectItem value="SCADA - Connectivity">SCADA - Connectivity</SelectItem>
                      <SelectItem value="PLC - Control Issue">PLC - Control Issue</SelectItem>
                      <SelectItem value="Warehouse Management System (WMS)">Warehouse Management System (WMS)</SelectItem>
                      <SelectItem value="ETL Processes">ETL Processes</SelectItem>
                      <SelectItem value="Sales Order Interface">Sales Order Interface</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="service" className="text-slate-600 font-medium">Service</Label>
                  <Input
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    placeholder={isInvoiceProcessing ? "" : "Enter service"}
                  />
                </div>

                <div>
                  <Label htmlFor="serviceOffering" className="text-slate-600 font-medium">Service offering</Label>
                  <Input
                    id="serviceOffering"
                    value={formData.serviceOffering}
                    onChange={(e) => setFormData({ ...formData, serviceOffering: e.target.value })}
                    placeholder={isInvoiceProcessing ? "" : "Enter service offering"}
                  />
                </div>

                <div>
                  <Label htmlFor="configurationItem" className="text-slate-600 font-medium">Configuration item</Label>
                  <Input
                    id="configurationItem"
                    value={formData.configurationItem}
                    onChange={(e) => setFormData({ ...formData, configurationItem: e.target.value })}
                    placeholder={isInvoiceProcessing ? "" : "Enter configuration item"}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="state" className="text-slate-600 font-medium">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    className="bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>

                <div>
                  <Label htmlFor="impact" className="text-slate-600 font-medium">Impact</Label>
                  <Select value={formData.impact} onValueChange={(value) => setFormData({ ...formData, impact: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="urgency" className="text-slate-600 font-medium">Urgency</Label>
                  <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority" className="text-slate-600 font-medium">Priority</Label>
                  <Input
                    id="priority"
                    value={formData.priority}
                    className="bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>

                <div>
                  <Label htmlFor="assignmentGroup" className="text-slate-600 font-medium">Assignment group</Label>
                  <Select value={formData.assignmentGroup} onValueChange={(value) => setFormData({ ...formData, assignmentGroup: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AP Automation Agent">AP Automation Agent</SelectItem>
                      <SelectItem value="SAP Basis Team">SAP Basis Team</SelectItem>
                      <SelectItem value="SAP Functional - MM">SAP Functional - MM</SelectItem>
                      <SelectItem value="Integration Support">Integration Support</SelectItem>
                      <SelectItem value="Integration Team">Integration Team</SelectItem>
                      <SelectItem value="OT Support">OT Support</SelectItem>
                      <SelectItem value="Network Operations">Network Operations</SelectItem>
                      <SelectItem value="Data Operations Team">Data Operations Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="assignedTo" className="text-slate-600 font-medium">Assigned to</Label>
                  <Input
                    id="assignedTo"
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    placeholder="Search for user..."
                  />
                </div>

                <div>
                  <Label htmlFor="notify" className="text-slate-600 font-medium">Notify</Label>
                  <Select value={formData.notify} onValueChange={(value) => setFormData({ ...formData, notify: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Do Not Notify">Do Not Notify</SelectItem>
                      <SelectItem value="Notify Caller">Notify Caller</SelectItem>
                      <SelectItem value="Notify Assignment Group">Notify Assignment Group</SelectItem>
                      <SelectItem value="AP Team Lead, Tax Compliance Team">AP Team Lead, Tax Compliance Team</SelectItem>
                      <SelectItem value="Data Operations Team Lead">Data Operations Team Lead</SelectItem>
                      <SelectItem value="Sales Team Lead">Sales Team Lead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentCreation;
