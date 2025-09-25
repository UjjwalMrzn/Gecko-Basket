// src/components/shared/AddressModal/AddressModal.tsx
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Address } from '../../../types/address';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import CustomSelect, { SelectOption } from '../../ui/CustomSelect';
import { getServiceableLocations } from '../../../api/shippingApi';
import { ChevronDown } from 'lucide-react';

// Define the validation schema for the new, simpler address form
const addressSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phoneNumber: z.string().min(10, 'A valid phone number is required'),
  city: z.string().min(1, 'City is required'),
  streetAddress: z.string().min(1, 'Street address is required'),
  isDefault: z.boolean(),
});

// This is the data type for our form
type AddressFormData = Omit<Address, '_id'>;

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddressFormData) => void;
  addressToEdit?: Address | null;
  isLoading: boolean;
}

const AddressModal = ({ isOpen, onClose, onSave, addressToEdit, isLoading }: AddressModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      city: '',
      streetAddress: '',
      isDefault: false,
    },
  });

  const [serviceableCities, setServiceableCities] = useState<SelectOption[]>([]);

  // Effect to populate the form when editing an address
  useEffect(() => {
    if (addressToEdit) {
      reset(addressToEdit);
    } else {
      reset({ fullName: '', phoneNumber: '', city: '', streetAddress: '', isDefault: false });
    }
  }, [addressToEdit, reset, isOpen]);

  // Effect to fetch the list of serviceable cities when the modal opens
  useEffect(() => {
    if (isOpen) {
      getServiceableLocations()
        .then(res => {
          const cityOptions = res.data.map(city => ({ value: city, label: city }));
          setServiceableCities(cityOptions);
        })
        .catch(console.error);
    }
  }, [isOpen]);

  const onSubmit: SubmitHandler<AddressFormData> = (data) => {
    onSave(data);
  };
  
  // Replicated your custom select render functions from AccountPage.tsx
  const renderGenericTrigger = (value: SelectOption | null, placeholder: string, isOpen: boolean) => (
    <div className={`w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-lg border transition ${isOpen ? 'ring-2 ring-green-500 border-green-500' : 'border-gray-300'}`}>
      <span className={value?.label ? 'text-gray-800' : 'text-gray-400'}>{value?.label || placeholder}</span>
      <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </div>
  );

  const renderGenericOption = (option: SelectOption, isSelected: boolean) => (
    <div className={`px-4 py-2 text-sm cursor-pointer ${isSelected ? 'bg-green-100 text-green-800' : 'hover:bg-gray-50 text-gray-800'}`}>
      {option.label}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#272343] mb-6" data-testid="address-modal-title">
          {addressToEdit ? 'Edit Address' : 'Add New Address'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-inter" data-testid="address-form">
          <Controller name="fullName" control={control} render={({ field }) => (
            <Input label="Full Name" type="text" {...field} error={errors.fullName?.message} testId="full-name-input" />
          )}/>

          <Controller name="phoneNumber" control={control} render={({ field }) => (
            <Input label="Phone Number" type="text" {...field} error={errors.phoneNumber?.message} testId="phone-number-input" />
          )}/>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
            <Controller name="city" control={control} render={({ field }) => (
              <CustomSelect 
                value={serviceableCities.find(c => c.value === field.value) || null} 
                options={serviceableCities} 
                onChange={(option) => field.onChange(option.value)} 
                renderTrigger={(value, isOpen) => renderGenericTrigger(value, 'Select your city', isOpen)} 
                renderOption={renderGenericOption} 
                testId="city-select" 
              />
            )}/>
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
          </div>

          <Controller name="streetAddress" control={control} render={({ field }) => (
            <Input label="Street Address (e.g., House No, Street Name)" type="text" {...field} error={errors.streetAddress?.message} testId="street-address-input" />
          )}/>
          
          <label className="flex items-center gap-3 cursor-pointer pt-2">
            <Controller name="isDefault" control={control} render={({ field }) => (
              <input type="checkbox" checked={field.value} onChange={field.onChange} ref={field.ref} className="h-4 w-4 rounded border-gray-300 text-[#59b143] focus:ring-[#59b143]" data-testid="default-address-checkbox" />
            )}/>
            <span className="text-sm text-gray-700">Set as default address</span>
          </label>
          
          <div className="pt-4 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} testId="cancel-address-button">Cancel</Button>
            <Button type="submit" disabled={isLoading} testId="save-address-button">
              {isLoading ? 'Saving...' : 'Save Address'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddressModal;