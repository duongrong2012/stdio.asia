import { Product } from "./product";

export type ProductAction =
  | { type: 'GET_PRODUCTS' }
  | { type: 'GET_PRODUCTS_SUCCESS'; payload: Product}
  | { type: 'GET_PRODUCTS_FAILED' };