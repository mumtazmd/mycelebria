import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => (
  <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
    <AlertCircle size={20} />
    <span>{message}</span>
  </div>
);

export default ErrorMessage;