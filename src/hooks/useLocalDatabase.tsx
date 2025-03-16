
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import localDbService from '../services/localDbService';

// Hook to provide access to reset the database
export const useResetDatabase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => {
      return new Promise<void>((resolve) => {
        localDbService.resetDatabase();
        resolve();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
};

// Initialize database when app loads (useful for development)
export const useInitializeDatabase = () => {
  return useQuery({
    queryKey: ['db-initialized'],
    queryFn: () => {
      const isInitialized = localStorage.getItem('db_initialized') === 'true';
      if (!isInitialized) {
        localDbService.resetDatabase();
      }
      return isInitialized;
    },
    staleTime: Infinity
  });
};
