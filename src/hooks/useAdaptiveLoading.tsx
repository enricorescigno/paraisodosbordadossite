
import { useState, useEffect } from 'react';

interface ConnectionInfo {
  effectiveType: '2g' | '3g' | '4g' | 'slow-2g';
  downlink: number;
  saveData: boolean;
}

interface UseAdaptiveLoadingOptions {
  lowBandwidthThreshold?: number;
  highBandwidthThreshold?: number;
}

export const useAdaptiveLoading = (options: UseAdaptiveLoadingOptions = {}) => {
  const { lowBandwidthThreshold = 1, highBandwidthThreshold = 10 } = options;
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo | null>(null);
  const [loadingStrategy, setLoadingStrategy] = useState<'aggressive' | 'balanced' | 'conservative'>('balanced');

  useEffect(() => {
    // @ts-ignore - Navigator connection is experimental
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
      const updateConnectionInfo = () => {
        const info: ConnectionInfo = {
          effectiveType: connection.effectiveType || '4g',
          downlink: connection.downlink || 10,
          saveData: connection.saveData || false
        };
        
        setConnectionInfo(info);
        
        // Determine loading strategy
        if (info.saveData || info.effectiveType === 'slow-2g' || info.effectiveType === '2g') {
          setLoadingStrategy('conservative');
        } else if (info.downlink > highBandwidthThreshold && info.effectiveType === '4g') {
          setLoadingStrategy('aggressive');
        } else {
          setLoadingStrategy('balanced');
        }
      };

      updateConnectionInfo();
      connection.addEventListener('change', updateConnectionInfo);

      return () => {
        connection.removeEventListener('change', updateConnectionInfo);
      };
    }
  }, [lowBandwidthThreshold, highBandwidthThreshold]);

  const getImageQuality = () => {
    switch (loadingStrategy) {
      case 'conservative':
        return 'low';
      case 'aggressive':
        return 'high';
      default:
        return 'medium';
    }
  };

  const getPreloadCount = () => {
    switch (loadingStrategy) {
      case 'conservative':
        return 1;
      case 'aggressive':
        return 5;
      default:
        return 3;
    }
  };

  const shouldPreloadImages = () => {
    return loadingStrategy !== 'conservative';
  };

  return {
    connectionInfo,
    loadingStrategy,
    getImageQuality,
    getPreloadCount,
    shouldPreloadImages
  };
};
