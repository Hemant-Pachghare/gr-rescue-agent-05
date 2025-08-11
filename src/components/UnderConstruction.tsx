
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction, Wrench } from 'lucide-react';

interface UnderConstructionProps {
  onBack: () => void;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Agents Dashboard</span>
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Feature Under Development</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Card className="max-w-md mx-auto p-8">
            <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Construction className="w-10 h-10 text-yellow-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            
            <p className="text-gray-600 mb-6">
              This feature is currently under development. We're working hard to bring you this functionality in a future update.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
              <Wrench className="w-4 h-4" />
              <span>Development in progress</span>
            </div>
            
            <Button onClick={onBack} className="w-full">
              Return to Agents Dashboard
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
