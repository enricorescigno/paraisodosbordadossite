
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { Activity, Download, AlertTriangle, TrendingUp, Image, Clock } from 'lucide-react';

interface PerformanceDashboardProps {
  enabled?: boolean;
  compact?: boolean;
}

export const PerformanceDashboard = ({ enabled = true, compact = false }: PerformanceDashboardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { metrics, alerts, suggestions, clearAlerts, exportReport } = usePerformanceMonitor({ enabled });

  if (!enabled) return null;

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-green-600';
    if (value >= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'bg-green-500';
    if (value >= thresholds.warning) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (compact) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
          className="mb-2 bg-white/90 backdrop-blur-sm"
        >
          <Activity className="h-4 w-4 mr-2" />
          Performance
        </Button>
        
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-80"
          >
            <Card className="p-4 bg-white/95 backdrop-blur-sm border shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Performance Monitor</h3>
                  <Button size="sm" variant="ghost" onClick={exportReport}>
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>FPS</span>
                    </div>
                    <div className={`font-mono font-semibold ${getStatusColor(metrics.fps, { good: 50, warning: 30 })}`}>
                      {metrics.fps}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1">
                      <Image className="h-3 w-3" />
                      <span>Cache</span>
                    </div>
                    <div className={`font-mono font-semibold ${getStatusColor(metrics.cacheEfficiency, { good: 80, warning: 60 })}`}>
                      {metrics.cacheEfficiency.toFixed(0)}%
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Load</span>
                    </div>
                    <div className={`font-mono font-semibold ${getStatusColor(2000 - metrics.loadTime, { good: 1500, warning: 1000 })}`}>
                      {metrics.loadTime.toFixed(0)}ms
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Errors</span>
                    </div>
                    <div className={`font-mono font-semibold ${getStatusColor(10 - metrics.errorRate, { good: 8, warning: 5 })}`}>
                      {metrics.errorRate.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                {alerts.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-red-600">Alerts</span>
                      <Button size="sm" variant="ghost" onClick={clearAlerts} className="h-6 px-2 text-xs">
                        Clear
                      </Button>
                    </div>
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {alerts.slice(-3).map((alert, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Performance Dashboard</h2>
        <div className="flex gap-2">
          <Button onClick={clearAlerts} variant="outline" size="sm">
            Clear Alerts
          </Button>
          <Button onClick={exportReport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">FPS</p>
              <p className={`text-2xl font-bold ${getStatusColor(metrics.fps, { good: 50, warning: 30 })}`}>
                {metrics.fps}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
          <Progress 
            value={Math.min(metrics.fps, 60)} 
            max={60} 
            className="mt-3"
          />
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Memory Usage</p>
              <p className={`text-2xl font-bold ${getStatusColor(100 - metrics.memory, { good: 50, warning: 25 })}`}>
                {metrics.memory.toFixed(1)}%
              </p>
            </div>
            <Activity className="h-8 w-8 text-orange-500" />
          </div>
          <Progress 
            value={metrics.memory} 
            max={100} 
            className="mt-3"
          />
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Load Time</p>
              <p className={`text-2xl font-bold ${getStatusColor(2000 - metrics.loadTime, { good: 1500, warning: 1000 })}`}>
                {metrics.loadTime.toFixed(0)}ms
              </p>
            </div>
            <Clock className="h-8 w-8 text-green-500" />
          </div>
          <Progress 
            value={Math.min(metrics.loadTime, 2000)} 
            max={2000} 
            className="mt-3"
          />
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cache Hit Rate</p>
              <p className={`text-2xl font-bold ${getStatusColor(metrics.cacheEfficiency, { good: 80, warning: 60 })}`}>
                {metrics.cacheEfficiency.toFixed(0)}%
              </p>
            </div>
            <Image className="h-8 w-8 text-purple-500" />
          </div>
          <Progress 
            value={metrics.cacheEfficiency} 
            max={100} 
            className="mt-3"
          />
        </Card>
      </div>
      
      {alerts.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Performance Alerts
          </h3>
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <Badge key={index} variant="destructive" className="mr-2">
                {alert}
              </Badge>
            ))}
          </div>
        </Card>
      )}
      
      {suggestions.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Optimization Suggestions</h3>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5" />
                <span className="text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};
