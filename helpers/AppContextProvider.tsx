import React from 'react';

/* BEGIN CONTEXT DECLARATION */
// Create the context state here as the truth value going forward
export const ClockFaceAppContext = React.createContext({
    AnalogClockValue: false,
    setClockFaceValue: () => {}
  });
  
  /* END CONTEXT DECLARATION */
  