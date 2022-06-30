import React from 'react';

interface ErrorMessage {
  children?: string;
}

export const Error: React.FC<ErrorMessage> = ({ children }) => {
  return !!children ? <span>{ children }</span> : null;
};
