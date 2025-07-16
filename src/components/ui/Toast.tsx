// src/components/ui/Toast.tsx
import { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  const bgColor = isSuccess ? 'bg-green-50' : 'bg-red-50';
  const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
  const iconColor = isSuccess ? 'text-green-500' : 'text-red-500';

  return (
    <div className={`fixed top-6 right-6 z-50 w-full max-w-sm rounded-lg shadow-lg p-4 flex items-start ${bgColor}`}>
      <div className="flex-shrink-0">
        {isSuccess ? (
          <CheckCircle className={iconColor} />
        ) : (
          <AlertTriangle className={iconColor} />
        )}
      </div>
      <div className={`ml-3 w-0 flex-1 pt-0.5 ${textColor}`}>
        <p className="text-sm font-medium">{message}</p>
      </div>
      <div className="ml-4 flex-shrink-0 flex">
        <button
          onClick={onClose}
          className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${textColor} hover:bg-opacity-50`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;