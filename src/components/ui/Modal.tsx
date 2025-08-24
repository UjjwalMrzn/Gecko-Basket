// src/components/ui/Modal.tsx

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      data-testid="modal-overlay"
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl px-6 py-8 sm:px-8 sm:py-10"
      >
        {/* --- The New, Professional Close Button --- */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close modal"
          data-testid="modal-close-button"
        >
          <X size={24} />
        </button>
        
        {children}
      </div>
    </div>
  );
};

export default Modal;