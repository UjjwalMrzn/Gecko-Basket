import { useState, FormEvent, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { User as UserIcon, Lock, ShoppingBag, MapPin, Plus } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useToast } from "../../context/ToastContext";
import MyOrdersPage from "./MyOrderPage";
import Modal from "../../components/ui/Modal";
import { Link } from "react-router-dom";

type AccountTab = 'profile' | 'orders' | 'addresses' | 'security';

const AccountPage = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  
  const [activeTab, setActiveTab] = useState<AccountTab>('profile');
  const [name, setName] = useState(user?.name || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [addressForm, setAddressForm] = useState({
    fullName: '', phoneNumber: '', addressLine1: '', addressLine2: '',
    city: '', postalCode: '', isDefault: false
  });

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

  const handleProfileUpdate = (e: FormEvent) => {
    e.preventDefault();
    addToast("Profile editing is for UI demonstration only for now.", "info");
  };
  
  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast("New passwords do not match.", "error");
      return;
    }
    addToast("Password changing is for UI demonstration only for now.", "info");
    setOldPassword(''); setNewPassword(''); setConfirmPassword('');
  };

  const handleAddressSubmit = (e: FormEvent) => {
    e.preventDefault();
    addToast("Address management is for UI demonstration only for now.", "info");
    setIsAddressModalOpen(false);
  };

  if (!user) return <div>Loading user profile...</div>;

  const TabButton = ({ tab, label, icon: Icon, testId }: { tab: AccountTab, label: string, icon: React.ElementType, testId: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all w-full text-left ${
        activeTab === tab ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
      }`}
      data-testid={testId}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-10">My Account</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white p-4 rounded-xl shadow-sm border space-y-2">
                <TabButton tab="profile" label="Profile" icon={UserIcon} testId="account-profile-tab" />
                <TabButton tab="orders" label="My Orders" icon={ShoppingBag} testId="account-orders-tab" />
                <TabButton tab="addresses" label="My Addresses" icon={MapPin} testId="account-addresses-tab" />
                <TabButton tab="security" label="Security" icon={Lock} testId="account-security-tab" />
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border">
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Information</h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <Input label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} testId="account-name-input" />
                      <Input label="Email Address" type="email" value={user.email} onChange={() => {}} disabled testId="account-email-input" />
                      <div className="text-right pt-2">
                        <Button type="submit" testId="account-save-profile-button">Save Changes</Button>
                      </div>
                    </form>
                  </div>
                )}
                {activeTab === 'orders' && ( <MyOrdersPage /> )}
                {activeTab === 'addresses' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">My Addresses</h2>
                      <Button size="sm" icon={<Plus size={16}/>} onClick={() => setIsAddressModalOpen(true)} testId="add-new-address-button">Add New Address</Button>
                    </div>
                    <div className="text-center py-10 border-2 border-dashed rounded-lg">
                      <p className="text-sm text-gray-500">You have no saved addresses.</p>
                      <p className="text-xs text-gray-400 mt-1">Addresses you add will appear here for faster checkout.</p>
                    </div>
                  </div>
                )}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <Input label="Current Password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} testId="account-current-password-input" />
                      <Input label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} testId="account-new-password-input" />
                      <Input label="Confirm New Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} testId="account-confirm-password-input" />
                      <div className="text-right pt-2">
                        <Button type="submit" testId="account-update-password-button">Update Password</Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Modal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-1">Add New Shipping Address</h2>
        <p className="text-xs text-gray-500 mb-4">This information will be used for delivery purposes.</p>
        <form onSubmit={handleAddressSubmit} className="space-y-4">
          <Input label="Full Name" type="text" name="fullName" value={addressForm.fullName} onChange={() => {}} placeholder="Recipient's Name" required testId="address-modal-name-input" />
          <Input label="Phone Number" type="tel" name="phoneNumber" value={addressForm.phoneNumber} onChange={() => {}} placeholder="For delivery updates" required testId="address-modal-phone-input" />
          <Input label="Address Line 1" type="text" name="addressLine1" value={addressForm.addressLine1} onChange={() => {}} placeholder="Street Address, P.O. Box" required testId="address-modal-addr1-input" />
          <Input label="Address Line 2 (Optional)" type="text" name="addressLine2" value={addressForm.addressLine2} onChange={() => {}} placeholder="Apartment, suite, etc." testId="address-modal-addr2-input" />
          <Input label="City" type="text" name="city" value={addressForm.city} onChange={() => {}} placeholder="e.g., Kathmandu" required testId="address-modal-city-input" />
          <Input label="Postal Code" type="text" name="postalCode" value={addressForm.postalCode} onChange={() => {}} placeholder="e.g., 44600" required testId="address-modal-postal-input" />
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsAddressModalOpen(false)} testId="address-modal-cancel-button">Cancel</Button>
            <Button type="submit" testId="address-modal-save-button">Save Address</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AccountPage;