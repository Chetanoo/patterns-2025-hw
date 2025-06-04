export interface PurchaseItem {
  name: string;
  price: number;
}

export interface BasketResult {
  successful: PurchaseItem[];
  failed: PurchaseItem[];
  total: number;
}

export interface AsyncPurchaseIterator {
  counter: number;
  next(): Promise<IteratorResult<PurchaseItem>>;
}

export interface PurchaseIterator {
  create(items: PurchaseItem[]): {
    [Symbol.asyncIterator](): AsyncPurchaseIterator;
  };
}

export interface BasketOptions {
  basketTotalLimit: number;
}

export class Basket {
  constructor(options: BasketOptions);

  limit: number;
  total: number;

  items: {
    successful: PurchaseItem[];
    failed: PurchaseItem[];
  };

  add(item: PurchaseItem): void;

  end(): void;

  then(onFulfilled: (data: BasketResult) => void): void;
}
