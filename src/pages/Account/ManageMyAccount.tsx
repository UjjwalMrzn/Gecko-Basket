// src/pages/Account/ManageMyAccount.tsx

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Edit } from 'lucide-react';

const mockDefaultAddress = {
  fullName: 'Ujjwal Maharjan',
  addressLine1: 'Naya Nakap, Bus Stop',
  city: 'Kathmandu',
  phoneNumber: '(+977) 9840209417'
};

const ManageMyAccount = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Or a loading state
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Manage My Account</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Personal Profile Card */}
        <div className="bg-gray-50/70 p-6 rounded-lg border" data-testid="profile-summary-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700">Personal Profile</h3>
            <Link to="/account?tab=profile" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              <Edit size={12} /> EDIT
            </Link>
          </div>
          <div className="text-sm space-y-2 text-gray-600">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>

        {/* Address Book Card */}
        <div className="bg-gray-50/70 p-6 rounded-lg border" data-testid="address-summary-card">
           <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700">Address Book</h3>
             <Link to="/account?tab=addresses" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              <Edit size={12} /> MANAGE
            </Link>
          </div>
           <div className="text-sm space-y-2 text-gray-600">
            <p className="font-semibold text-gray-800">Default Shipping Address</p>
            <p>{mockDefaultAddress.fullName}</p>
            <p>{mockDefaultAddress.addressLine1}, {mockDefaultAddress.city}</p>
            <p>{mockDefaultAddress.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMyAccount;