
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Bot, Database, CheckCircle, Lightbulb, FileText, PlusCircle } from 'lucide-react';

interface TimelineItem {
  id: number;
  type: string;
  title: string;
  description: string;
  timestamp: Date;
  confidence?: number;
  status?: string;
}

interface TimelinePanelProps {
  timeline: TimelineItem[];
}

const TimelinePanel = ({ timeline }: TimelinePanelProps) => {
  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const getIconComponent = (type: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      creation: PlusCircle,
      ai_triage: Bot,
      sap_query: Database,
      resolution_proposal: Lightbulb,
      sap_execution: Database,
      resolution_confirmed: CheckCircle,
      ticket_closed: FileText
    };
    return iconMap[type] || Clock;
  };

  return (
    <Card className="shadow-lg h-fit sticky top-6 w-full">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
        <CardTitle className="text-lg font-medium text-gray-700">
          Timeline / AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {timeline.map((item, index) => {
            const IconComponent = getIconComponent(item.type);
            
            return (
              <div key={item.id} className="relative">
                <Card className="border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-500">
                            {getTimeAgo(item.timestamp)}
                          </span>
                        </div>
                        
                        <h4 className="font-medium text-gray-900 text-base mb-2">
                          {item.title}
                        </h4>
                        
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                        
                        {item.confidence && (
                          <div className="mt-3">
                            <Badge 
                              variant="outline" 
                              className={`text-sm ${
                                item.confidence >= 85 
                                  ? 'border-green-300 text-green-700 bg-green-50' 
                                  : 'border-yellow-300 text-yellow-700 bg-yellow-50'
                              }`}
                            >
                              Confidence: {item.confidence}%
                            </Badge>
                          </div>
                        )}
                        
                        {item.status === 'completed' && (
                          <div className="mt-3">
                            <CheckCircle className="h-4 w-4 text-green-600 inline" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
          
          {timeline.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Clock className="h-10 w-10 mx-auto mb-3 text-gray-400" />
              <p className="text-base">Timeline will appear here as actions are performed</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelinePanel;
