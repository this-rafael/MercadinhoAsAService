export interface BaseInputProductModel {
  sellerEid: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export type EnrichedProductModel = BaseInputProductModel & {
  seller?: object;
  category?: object;
};

export type FullProductModel = EnrichedProductModel & {
  createdAt: Date;
  updatedAt: Date;
};
