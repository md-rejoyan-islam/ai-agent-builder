import { useEffect, useRef } from 'react';

export const useAnalytics = (agentName: string) => {
  const agentNameRef = useRef(agentName);

  useEffect(() => {
    agentNameRef.current = agentName;
  }, [agentName]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const analyticsInterval = setInterval(() => {
        const currentName = agentNameRef.current;
        if (currentName !== '') {
          console.log(`[Analytics Heartbeat] User is working on agent named: "${currentName}"`);
        } else {
          console.log(`[Analytics Heartbeat] User is working on an unnamed agent draft...`);
        }
      }, 8000);

      return () => clearInterval(analyticsInterval);
    }
  }, []);
};
