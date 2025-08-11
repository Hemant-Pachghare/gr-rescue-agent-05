import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Dashboard = ({ onCreateNew }) => {
  const incidents = [
    {
      id: 'INC0010123',
      state: 'New',
      priority: '1 - Critical',
      description: 'SAP PP Production Order stuck in process. Halting Line A.',
      assignedTo: 'Amit Sharma (SAP Basis)',
      updated: '2 mins ago',
      stateClass: 'bg-red-100 text-red-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'INC0010124',
      state: 'In Progress',
      priority: '2 - High',
      description: 'MES data transfer failure to SAP QM for batch XYZ.',
      assignedTo: 'Priya Singh (Integration Team)',
      updated: '15 mins ago',
      stateClass: 'bg-yellow-100 text-yellow-800',
      priorityClass: 'text-orange-600'
    },
    {
      id: 'INC0010125',
      state: 'New',
      priority: '1 - Critical',
      description: 'SCADA system unresponsive for Packaging Line C.',
      assignedTo: 'Rahul Kumar (OT Support)',
      updated: '30 mins ago',
      stateClass: 'bg-red-100 text-red-800',
      priorityClass: 'text-red-600'
    },
    {
      id: 'INC0010126',
      state: 'Resolved',
      priority: '3 - Moderate',
      description: 'SAP MM Goods Receipt posting error for raw material #RM456.',
      assignedTo: 'Anjali Devi (SAP Functional)',
      updated: '1 hour ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    },
    {
      id: 'INC0010127',
      state: 'In Progress',
      priority: '2 - High',
      description: 'PLC firmware update failed on machine M10 - impacting production reporting.',
      assignedTo: 'Vikram Reddy (Automation Eng.)',
      updated: '2 hours ago',
      stateClass: 'bg-yellow-100 text-yellow-800',
      priorityClass: 'text-orange-600'
    },
    {
      id: 'INC0010128',
      state: 'Resolved',
      priority: '3 - Moderate',
      description: 'Network connectivity issues affecting shop floor terminals.',
      assignedTo: 'IT Operations Team',
      updated: 'Yesterday',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    },
    {
      id: 'INC0010129',
      state: 'Resolved',
      priority: '3 - Moderate',
      description: 'Quality inspection results not syncing from LIMS to SAP QM.',
      assignedTo: 'Integration Services',
      updated: '2 days ago',
      stateClass: 'bg-green-100 text-green-800',
      priorityClass: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-xl overflow-hidden">
        {/* ServiceNow Style Header */}
        <div className="bg-slate-700 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold border-2 border-white">
                MFG
              </div>
              <h1 className="text-2xl font-bold">Incident Management: All Incidents (Manufacturing)</h1>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={onCreateNew}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Create New
              </Button>
              <Button 
                variant="secondary"
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200 flex items-center space-x-4 bg-gray-50">
          <Input 
            placeholder="Search incidents..." 
            className="flex-grow"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Incidents</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Incident List Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Incident</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">State</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Priority</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Short Description</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Assigned To</TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase tracking-wider">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id} className="hover:bg-gray-50">
                  <TableCell>
                    <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                      {incident.id}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${incident.stateClass} font-semibold`}>
                      {incident.state}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${incident.priorityClass}`}>
                      {incident.priority}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-md">
                    {incident.description}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {incident.assignedTo}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {incident.updated}
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
