
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction, ArrowLeft } from 'lucide-react';

const UnderConstruction = ({ onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto p-4 bg-orange-100 rounded-full w-fit mb-4">
            <Construction className="h-12 w-12 text-orange-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">Under Construction</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            This AI agent and its processing workflow are currently under development.
          </p>
          <p className="text-sm text-gray-500">
            Please try the "Automated Invoice Processor" for a complete demo experience.
          </p>
          <Button 
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Return to Agent Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnderConstruction;
