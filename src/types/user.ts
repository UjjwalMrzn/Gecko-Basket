export interface User {
  _id: string; // The user ID from the MongoDB database
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}