import { Product } from './product.types';
import { User } from './user.types';

export interface Order {
  id: string;
  user: User;
  items: { product: Product; quantity: number }[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
}
