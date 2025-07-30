export interface ShippingAddress {
  _id: string;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string; // Optional field for apartment, etc.
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}