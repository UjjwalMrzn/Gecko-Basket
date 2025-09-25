// // src/api/productApi.ts
// import axios from 'axios';
// import { Product } from '../types/product'; // Assuming you have a Product type

// const API_URL = `${import.meta.env.VITE_API_URL}/products`;

// // Define the shape of the data for submitting a review
// interface ReviewData {
//   rating: number;
//   comment: string;
// }

// /**
//  * Adds a review to a specific product.
//  * @param productId - The ID of the product being reviewed.
//  * @param reviewData - The review data (rating and comment).
//  * @param token - The user's authentication token.
//  * @returns The server's response.
//  */
// export const addProductReview = (productId: string, reviewData: ReviewData, token: string) => {
//   return axios.post(`${API_URL}/${productId}/reviews`, reviewData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// /**
//  * Fetches a single product by its URL slug.
//  * @param slug - The URL slug of the product.
//  * @returns The product data.
//  */
// export const getProductBySlug = (slug: string) => {
//   return axios.get<{ data: Product }>(`${API_URL}/slug/${slug}`);
// };