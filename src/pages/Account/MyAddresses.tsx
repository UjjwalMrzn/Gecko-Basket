// src/pages/Account/MyAddresses.tsx

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ShippingAddress } from '../../types/address';
import { fetchUserAddresses, createNewAddress, updateUserAddress, deleteUserAddress } from '../../api/addressApi';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Plus, Edit, Trash2, ShieldAlert } from 'lucide-react';
import Loader from '../../components/ui/Loader';

type ModalMode = 'add' | 'edit';

const initialAddressState: Omit<ShippingAddress, '_id' | 'isDefault'> = {
  fullName: '', phoneNumber: '', addressLine1: '', addressLine2: '',
  city: '', postalCode: '', country: 'Nepal',
};

const MyAddresses = () => {
  const { user, token } = useAuth();
  const { addToast } = useToast();

  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [addressForm, setAddressForm] = useState<Partial<ShippingAddress>>(initialAddressState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FIX: Added state for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<ShippingAddress | null>(null);

  useEffect(() => {
    if (token) {
      const getAddresses = async () => {
        setLoading(true);
        try {
          const fetchedAddresses = await fetchUserAddresses(token);
          setAddresses(fetchedAddresses);
        } catch (error) { addToast("Failed to load addresses.", "error"); } 
        finally { setLoading(false); }
      };
      getAddresses();
    }
  }, [token, addToast]);

  const openFormModal = (mode: ModalMode, address: ShippingAddress | null = null) => {
    setModalMode(mode);
    setAddressForm(address ? { ...address } : { ...initialAddressState, fullName: user?.name || '' });
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setAddressForm(initialAddressState);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsSubmitting(true);
    const { _id, ...submissionData } = addressForm;
    try {
      if (modalMode === 'add') {
        const newAddress = await createNewAddress(submissionData as Omit<ShippingAddress, '_id' | 'isDefault'>, token);
        setAddresses(prev => [...prev, newAddress]);
        addToast("Address added successfully!", "success");
      } else if (_id) {
        const updatedAddress = await updateUserAddress(_id, submissionData, token);
        setAddresses(prev => prev.map(a => a._id === _id ? updatedAddress : a));
        addToast("Address updated successfully!", "success");
      }
      closeFormModal();
    } catch (error) {
      addToast(`Failed to ${modalMode} address.`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // FIX: Replaced window.confirm with a professional modal confirmation
  const openDeleteModal = (address: ShippingAddress) => {
    setAddressToDelete(address);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setAddressToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!token || !addressToDelete) return;
    try {
      await deleteUserAddress(addressToDelete._id, token);
      setAddresses(prev => prev.filter(a => a._id !== addressToDelete._id));
      addToast("Address deleted successfully.", "success");
    } catch (error) {
      addToast("Failed to delete address.", "error");
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">My Addresses</h2>
          <Button size="sm" icon={<Plus size={16} />} onClick={() => openFormModal('add')} testId="add-new-address-button">
            Add New Address
          </Button>
        </div>
        {loading ? <Loader /> : (
          <div className="space-y-4">
            {addresses.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed rounded-lg" data-testid="no-addresses-message">
                <p className="text-sm text-gray-500">You have no saved addresses.</p>
                <p className="text-xs text-gray-400 mt-1">Addresses you add will appear here for faster checkout.</p>
              </div>
            ) : (
              addresses.map(addr => (
                <div key={addr._id} className="border rounded-lg p-4 flex justify-between items-start" data-testid={`address-card-${addr._id}`}>
                  <div>
                    <p className="font-semibold text-gray-800 flex items-center gap-2">{addr.fullName}</p>
                    {/* FIX: Correctly render address details */}
                    <p className="text-sm text-gray-600 mt-1">{addr.addressLine1}, {addr.city}, {addr.postalCode}</p>
                    <p className="text-sm text-gray-500">{addr.phoneNumber}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 ml-4">
                    <Button variant="outline" size="sm" onClick={() => openFormModal('edit', addr)} testId={`edit-address-${addr._id}`}><Edit size={14} /></Button>
                    <Button variant="outline" size="sm" onClick={() => openDeleteModal(addr)} testId={`delete-address-${addr._id}`}><Trash2 size={14} /></Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Modal isOpen={isFormModalOpen} onClose={closeFormModal}>
        <h2 className="text-lg font-semibold mb-4">{modalMode === 'add' ? 'Add New Shipping Address' : 'Edit Shipping Address'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" type="text" name="fullName" value={addressForm.fullName || ''} onChange={handleChange} required testId="address-modal-name-input" />
            <Input label="Phone Number" type="tel" name="phoneNumber" value={addressForm.phoneNumber || ''} onChange={handleChange} required testId="address-modal-phone-input" />
            <Input label="Address Line 1" type="text" name="addressLine1" value={addressForm.addressLine1 || ''} onChange={handleChange} required testId="address-modal-addr1-input" />
            <Input label="City" type="text" name="city" value={addressForm.city || ''} onChange={handleChange} required testId="address-modal-city-input" />
            <Input label="Postal Code" type="text" name="postalCode" value={addressForm.postalCode || ''} onChange={handleChange} required testId="address-modal-postal-input" />
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={closeFormModal} testId="address-modal-cancel-button">Cancel</Button>
            <Button type="submit" disabled={isSubmitting} testId="address-modal-save-button">{isSubmitting ? 'Saving...' : 'Save Address'}</Button>
          </div>
        </form>
      </Modal>

      {/* FIX: Add the new confirmation modal for deleting */}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <div className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Delete Address</h3>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete this address? This action cannot be undone.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={closeDeleteModal} variant="outline" testId="delete-cancel-button">Cancel</Button>
            <Button onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 focus:ring-red-500" testId="delete-confirm-button">Delete</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyAddresses;