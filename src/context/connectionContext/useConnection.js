import React, { createContext } from 'react';
import { useContext } from 'react';
import { errors } from '../../library/error';

export const connectionContext = createContext({});

function useConnection() {
  const context = useContext(connectionContext);
  if (!context) throw new Error(errors.CONNECTION_CONTEXT_ERROR);
  return context;
}

export default useConnection;
