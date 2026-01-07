import { Product } from './product.types';

export interface Catalog {
  id: string;
  name: string;
  products: Product[];
}
