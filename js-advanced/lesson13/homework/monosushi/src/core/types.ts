export type Market = {
  offers: MarketOffer[];
  products: MarketProduct[];
  items: MarketItem[];
};

export type MarketRecord = {
  id?: number;
};

export type MarketOffer = MarketRecord & {
  date: number;
  name: string;
  title: string;
  terms: string[];
  logo: string;
};

export type MarketProduct = MarketRecord & {
  name: string;
  path: string;
  logo: string;
};

export type MarketItem = MarketRecord & {
  product: string;
  category?: MarketItemCategory;
  name: string;
  path: string;
  comp?: string;
  weight: string;
  price: string;
  logo: string;
};

export type MarketProductItem = {
  name: string;
  path: string;
  item: MarketItem | null;
};

export type MarketItemCategory =
  | 'philadelphia'
  | 'california'
  | 'baked'
  | 'craft'
  | 'maki'
  | 'premium';

export type MarketCart = {
  total: {
    items: number;
    price: number;
  };

  items: MarketOrderItem[];
};

export type MarketStoredItem = {
  id: number;
  qty: number;
};

export type MarketOrderItem = MarketStoredItem & {
  name: string;
  product: string;
  path: string;
  logo: string;
  price: number;
};

export type MarketOrder = {
  id?: string;
  uid?: string;
  date: number;
  firstName: string;
  phone: string;
  items: MarketOrderItem[];

  utensils: {
    regular: number;
    trial: number;
  };

  cash: boolean;
  selfPickup: boolean;
  address: string;
  call: boolean;
  complete: boolean;
  total: number;
};

export type MarketPath = 'offers' | 'products' | 'items';

export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  admin?: boolean;
  orders?: MarketOrder[];
  addresses?: string[];
};

export type UserPath = 'main' | 'history';

export type AdminPath = MarketPath | 'orders';
