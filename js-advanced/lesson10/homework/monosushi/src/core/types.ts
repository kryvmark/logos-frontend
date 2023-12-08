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
  subcat?: MarketItemSubcat;
  name: string;
  path: string;
  comp?: string;
  weight: string;
  price: string;
  logo: string;
};

export type MarketOrder = MarketRecord & {
  completed: boolean;
  items: MarketOrderItem[];
};

export type MarketItemSubcat =
  | 'roll-philadelphia'
  | 'roll-california'
  | 'roll-baked'
  | 'sushi-craft'
  | 'roll-maki'
  | 'sushi-premium';

export type MarketOrderItem = {
  itemId: number;
  qty: number;
};

export type MarketPath = 'offer' | 'product' | 'item' | 'order';

export type MarketCart = {
  items: number;
  total: number;
};
