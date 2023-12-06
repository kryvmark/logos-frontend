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

export type MarketItem = MarketRecord;

export type MarketOrder = MarketRecord;

export type MarketPath = 'offer' | 'product' | 'item' | 'order';
