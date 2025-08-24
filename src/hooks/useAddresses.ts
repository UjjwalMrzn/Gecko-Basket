// src/hooks/useAddresses.ts
import { useState } from 'react';
import { ShippingAddress } from '../types/address';

// Mock data is now in one central place.
const mockAddresses: ShippingAddress[] = [
  {
    _id: '1',
    fullName: 'Ujjwal Maharjan',
    phoneNumber: '9840000001',
    addressLine1: 'Naya Naikap, Bus Stop',
    addressLine2: '',
    city: 'Kathmandu',
    postalCode: '44600',
    country: 'Nepal',
    isDefault: true,
  },
  {
    _id: '2',
    fullName: 'Jen Gecko',
    phoneNumber: '9840000002',
    addressLine1: 'Pulchowk, Lalitpur',
    addressLine2: 'Near the big temple',
    city: 'Lalitpur',
    postalCode: '44700',
    country: 'Nepal',
    isDefault: false,
  },
];

const useAddresses = () => {
  // In the future, this hook will fetch real data from the API.
  // For now, it provides our clean, mock data.
  const [addresses, setAddresses] = useState<ShippingAddress[]>(mockAddresses);

  // We can add functions to add, edit, and delete addresses here later.

  return { addresses };
};

export default useAddresses;