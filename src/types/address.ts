
export interface Address {
  _id: string;
  fullName: string;
  phoneNumber: string;
  streetAddress: string; // The new, clearer name for the address line
  city: string; // This will come from the new list of serviceable locations
  isDefault: boolean;
}