// src/components/ui/Toast.tsx
import { useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-24 right-5 z-[100] space-y-3">
      {toasts.map(toast => (
        <ToastItem key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

// Individual toast item component
const ToastItem = ({ message, type, onDismiss }: { message: string, type: string, onDismiss: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000); // Auto-dismiss after 4 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const typeStyles = {
    success: {
      bg: 'bg-green-100',
      border: 'border-green-400',
      text: 'text-green-800',
      icon: <CheckCircle className="text-green-500" size={20} />,
    },
    error: {
      bg: 'bg-red-100',
      border: 'border-red-400',
      text: 'text-red-800',
      icon: <XCircle className="text-red-500" size={20} />,
    },
    // FIX: Add styles for the 'info' type
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-400',
      text: 'text-blue-800',
      icon: <Info className="text-blue-500" size={20} />,
    },
  };

  const styles = typeStyles[type as keyof typeof typeStyles] || typeStyles.info;

  return (
    <div className={`flex items-center gap-4 w-full max-w-xs p-4 rounded-lg shadow-lg border-l-4 ${styles.bg} ${styles.border}`} role="alert">
      {styles.icon}
      <div className={`text-sm font-medium ${styles.text}`}>
        {message}
      </div>
      <button onClick={onDismiss} className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 inline-flex h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-100">
        &times;
      </button>
    </div>
  );
};

export default Toast;