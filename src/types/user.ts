export type User = {
  id: string; // This will be mapped from your database's unique ID (e.g., _id)
  name: string;
  email: string;
  role: 'user' | 'admin';
};