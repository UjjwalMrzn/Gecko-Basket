// src/pages/Account/AccountPage.tsx
import { useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { User as UserIcon, Lock, ShoppingBag, MapPin, UserCog, Undo2, XCircle, ChevronDown } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useToast } from "../../context/ToastContext";
import ManageMyAccount from "./ManageMyAccount";
import MyOrdersPage from "./MyOrderPage";
import MyAddresses from "./MyAddresses";
import MyReturnsPage from "./MyReturnsPage";
import MyCancellationsPage from "./MyCancellationPage";
// ✅ Import the new API functions
import { updateUserProfile, changeUserPassword } from "../../api/userApi"; 
import CustomSelect, { SelectOption } from "../../components/ui/CustomSelect";

type AccountTab = 'dashboard' | 'profile' | 'orders' | 'returns' | 'cancellations' | 'addresses' | 'security';

// This data can be moved to a separate file later if needed
const days: SelectOption[] = Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }));
const months: SelectOption[] = Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: new Date(0, i).toLocaleString('default', { month: 'long' }) }));
const currentYear = new Date().getFullYear();
const years: SelectOption[] = Array.from({ length: 100 }, (_, i) => ({ value: String(currentYear - i), label: String(currentYear - i) }));
const genderOptions: SelectOption[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const AccountPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, token, updateUserContext } = useAuth();
  const { addToast } = useToast();
  
  const [activeTab, setActiveTab] = useState<AccountTab>(searchParams.get('tab') as AccountTab || 'dashboard');
  
  // State for forms
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', gender: user?.gender || '', day: '', month: '', year: '' });
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm(prev => ({ ...prev, name: user.name, gender: user.gender || '' }));
      if (user.birthday) {
        const date = new Date(user.birthday);
        setProfileForm(prev => ({ ...prev, day: String(date.getDate()), month: String(date.getMonth() + 1), year: String(date.getFullYear()) }));
      }
    }
  }, [user]);

  useEffect(() => {
    const currentTab = searchParams.get('tab') as AccountTab || 'dashboard';
    setActiveTab(currentTab);
  }, [searchParams]);

  const handleTabClick = (tab: AccountTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleProfileChange = (name: string, value: string) => {
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsProfileSubmitting(true);
    try {
      // ✅ Connect to the backend API
      const birthday = profileForm.year && profileForm.month && profileForm.day 
        ? new Date(`${profileForm.year}-${profileForm.month}-${profileForm.day}`).toISOString() 
        : undefined;
      
      const updatedData = { name: profileForm.name, gender: profileForm.gender, birthday: birthday || undefined };

      const response = await updateUserProfile(updatedData, token);

      // ✅ Update the user context with the new user data from the server
      updateUserContext(response.data);
      addToast("Profile updated successfully!", "success");

    } catch (error) {
      addToast("Failed to update profile. Please try again.", "error");
    } finally {
      setIsProfileSubmitting(false);
    }
  };
  
  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast("New passwords do not match.", "error");
      return;
    }
    if (!token) return;
    setIsPasswordSubmitting(true);
    try {
      // ✅ Connect to the backend API
      await changeUserPassword({ oldPassword, newPassword }, token);
      addToast("Password changed successfully!", "success");
      // ✅ Clear the form fields on success
      setOldPassword(''); 
      setNewPassword(''); 
      setConfirmPassword('');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to change password.";
      addToast(errorMessage, "error");
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  if (!user) return <div className="text-center py-20">Loading user profile...</div>;

  const TabButton = ({ tab, label, icon: Icon, testId }: { tab: AccountTab, label: string, icon: React.ElementType, testId: string }) => (
    <button onClick={() => handleTabClick(tab)} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all w-full text-left ${activeTab === tab ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'}`} data-testid={testId} >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

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
    <div className="bg-gray-50 min-h-[calc(100vh-300px)] font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white p-4 rounded-xl shadow-sm border space-y-2 sticky top-24">
              <p className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase">Manage My Account</p>
              <TabButton tab="dashboard" label="My Account" icon={UserCog} testId="account-dashboard-tab" />
              <TabButton tab="profile" label="My Profile" icon={UserIcon} testId="account-profile-tab" />
              <TabButton tab="addresses" label="Address Book" icon={MapPin} testId="account-addresses-tab" />
              <TabButton tab="security" label="Security" icon={Lock} testId="account-security-tab" />
              <p className="px-4 pt-4 pb-1 text-xs font-semibold text-gray-400 uppercase">My Orders</p>
              <TabButton tab="orders" label="My Orders" icon={ShoppingBag} testId="account-orders-tab" />
              <TabButton tab="returns" label="My Returns" icon={Undo2} testId="account-returns-tab" />
              <TabButton tab="cancellations" label="My Cancellations" icon={XCircle} testId="account-cancellations-tab" />
            </div>
          </aside>
          <main className="lg:col-span-3">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border">
              {activeTab === 'dashboard' && ( <ManageMyAccount /> )}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Information</h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <Input label="Full Name" type="text" name="name" value={profileForm.name} onChange={(e) => handleProfileChange('name', e.target.value)} required testId="account-name-input" />
                    <Input label="Email Address" type="email" value={user.email} onChange={() => {}} disabled testId="account-email-input" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Birthday</label>
                        <div className="flex gap-2">
                           <CustomSelect value={days.find(d => d.value === profileForm.day) || null} options={days} onChange={(option) => handleProfileChange('day', option.value)} renderTrigger={(value, isOpen) => renderGenericTrigger(value, 'Day', isOpen)} renderOption={renderGenericOption} testId="bday-day-select" />
                           <CustomSelect value={months.find(m => m.value === profileForm.month) || null} options={months} onChange={(option) => handleProfileChange('month', option.value)} renderTrigger={(value, isOpen) => renderGenericTrigger(value, 'Month', isOpen)} renderOption={renderGenericOption} testId="bday-month-select" />
                           <CustomSelect value={years.find(y => y.value === profileForm.year) || null} options={years} onChange={(option) => handleProfileChange('year', option.value)} renderTrigger={(value, isOpen) => renderGenericTrigger(value, 'Year', isOpen)} renderOption={renderGenericOption} testId="bday-year-select" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                         <CustomSelect value={genderOptions.find(g => g.value === profileForm.gender) || null} options={genderOptions} onChange={(option) => handleProfileChange('gender', option.value)} renderTrigger={(value, isOpen) => renderGenericTrigger(value, 'Select Gender', isOpen)} renderOption={renderGenericOption} testId="gender-select" />
                      </div>
                    </div>
                    <div className="text-right pt-2">
                      <Button type="submit" disabled={isProfileSubmitting} testId="account-save-profile-button">{isProfileSubmitting ? 'Saving...' : 'Save Changes'}</Button>
                    </div>
                  </form>
                </div>
              )}
              {activeTab === 'orders' && ( <MyOrdersPage /> )}
              {activeTab === 'returns' && ( <MyReturnsPage /> )}
              {activeTab === 'cancellations' && ( <MyCancellationsPage /> )}
              {activeTab === 'addresses' && ( <MyAddresses /> )}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <Input label="Current Password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required testId="account-current-password-input" />
                    <Input label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required testId="account-new-password-input" />
                    <Input label="Confirm New Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required testId="account-confirm-password-input" />
                    <div className="text-right pt-2">
                      <Button type="submit" disabled={isPasswordSubmitting} testId="account-update-password-button">{isPasswordSubmitting ? 'Updating...' : 'Update Password'}</Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;