// src/pages/Account/MyAddresses.tsx
import { useState, useEffect, useCallback } from 'react';
import { Address } from '../../types/address';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getAddresses, addAddress, updateAddress, deleteAddress } from '../../api/addressApi';
import Button from '../../components/ui/Button';
import { Plus, Edit, Trash2, MoreVertical } from 'lucide-react';
import AddressModal from '../../components/shared/AddressModal/AddressModal';

// This is the data type for our form, matching the AddressModal
type AddressFormData = Omit<Address, '_id'>;

const MyAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { token } = useAuth();
  const { addToast } = useToast();

  const fetchAddresses = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await getAddresses(token);
      setAddresses(response.data);
    } catch (error) {
      addToast('Could not load addresses.', 'error');
    } finally {
      setLoading(false);
    }
  }, [token, addToast]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleOpenModal = (address?: Address) => {
    setAddressToEdit(address || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAddressToEdit(null);
  };

  const handleSaveAddress = async (data: AddressFormData) => {
    if (!token) return;
    setIsSaving(true);
    try {
      if (addressToEdit) {
        await updateAddress(addressToEdit._id, data, token);
        addToast('Address updated successfully!', 'success');
      } else {
        await addAddress(data, token);
        addToast('Address added successfully!', 'success');
      }
      handleCloseModal();
      await fetchAddresses(); // Refresh the list
    } catch (error) {
      addToast('Failed to save address.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!token) return;
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(id, token);
        addToast('Address deleted successfully!', 'info');
        await fetchAddresses();
      } catch (error) {
        addToast('Failed to delete address.', 'error');
      }
    }
  };

  if (loading) {
    return <div data-testid="loading-addresses">Loading addresses...</div>;
  }

  return (
    <div className="font-inter" data-testid="my-addresses-page">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#272343]">My Addresses</h2>
        <Button onClick={() => handleOpenModal()} icon={<Plus size={16} />} testId="add-new-address-button">
          Add New
        </Button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onEdit={() => handleOpenModal(address)}
              onDelete={() => handleDeleteAddress(address._id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-gray-500">You have no saved addresses.</p>
        </div>
      )}

      <AddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAddress}
        addressToEdit={addressToEdit}
        isLoading={isSaving}
      />
    </div>
  );
};

// Sub-component for displaying a single address card
const AddressCard = ({ address, onEdit, onDelete }: { address: Address, onEdit: () => void, onDelete: () => void }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <div className="bg-white p-5 rounded-lg border shadow-sm relative" data-testid={`address-card-${address._id}`}>
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-800">{address.fullName}</h3>
                        {address.isDefault && (
                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Default</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{address.streetAddress}</p>
                    <p className="text-sm text-gray-600">{address.city}</p>
                    <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Phone:</span> {address.phoneNumber}
                    </p>
                </div>
                 <div className="relative">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1" data-testid="address-menu-button">
                        <MoreVertical size={18} />
                    </button>
                    {isMenuOpen && (
                         <div onMouseLeave={() => setIsMenuOpen(false)} className="absolute top-full right-0 mt-1 bg-white border rounded-md shadow-lg w-32 z-10">
                            <button onClick={() => { onEdit(); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2" data-testid="edit-address-button">
                                <Edit size={14}/> Edit
                            </button>
                            <button onClick={() => { onDelete(); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2" data-testid="delete-address-button">
                                <Trash2 size={14}/> Delete
                            </button>
                         </div>
                    )}
                 </div>
            </div>
        </div>
    )
}

export default MyAddresses;