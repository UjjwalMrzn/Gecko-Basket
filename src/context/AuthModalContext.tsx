import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type ModalType = "login" | "register" | null;

interface AuthModalContextProps {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  modalType: ModalType;
  isOpen: boolean;
}

const AuthModalContext = createContext<AuthModalContextProps | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const isOpen = modalType !== null;

  // Optional: disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <AuthModalContext.Provider value={{ openModal, closeModal, modalType, isOpen }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error("useAuthModal must be used inside AuthModalProvider");
  return context;
};
