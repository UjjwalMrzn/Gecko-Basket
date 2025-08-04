// src/components/ui/Toast.tsx
import { useEffect } from 'react';
import { useToast, ToastType } from '../../context/ToastContext';
import { CheckCircle, XCircle, Info, ShieldAlert } from 'lucide-react';

const icons: { [key in ToastType]: React.ReactNode } = {
  success: <CheckCircle className="text-green-500" size={20} />,
  error: <XCircle className="text-red-500" size={20} />,
  info: <Info className="text-blue-500" size={20} />,
  warning: <ShieldAlert className="text-yellow-500" size={20} />,
};

const styles: { [key in ToastType]: string } = {
  success: 'bg-green-100 border-green-400 text-green-800',
  error: 'bg-red-100 border-red-400 text-red-800',
  info: 'bg-blue-100 border-blue-400 text-blue-800',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
};

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

const ToastItem = ({ message, type, onDismiss }: { message: string, type: ToastType, onDismiss: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className={`flex items-center gap-4 w-full max-w-xs p-4 rounded-lg shadow-lg border-l-4 ${styles[type]}`} role="alert">
      {icons[type]}
      <div className="text-sm font-medium">
        {message}
      </div>
      <button onClick={onDismiss} className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 inline-flex h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-100">
        &times;
      </button>
    </div>
  );
};

export default Toast;