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

export class PurchaseIterator {
  private constructor(purchase: PurchaseItem[]);

  static create(items: PurchaseItem[]): PurchaseIterator;

  [Symbol.asyncIterator](): AsyncPurchaseIterator;
}

export interface BasketOptions {
  basketTotalLimit: number;
}

export class Basket {
  #promise: Promise<BasketResult>;
  #resolve: (result: BasketResult) => void;

  constructor(options: BasketOptions);

  limit: number;
  total: number;

  items: {
    successful: PurchaseItem[];
    failed: PurchaseItem[];
  };

  add(item: PurchaseItem): void;
  end(): Basket;

  then(onFulfilled: (data: BasketResult) => void): Promise<void>;
  finally(onFinally: () => void): Promise<void>;
}

export function printBasket(basket: Basket): Promise<void>;
