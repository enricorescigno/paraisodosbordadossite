
export interface BaseEntity {
  id: number | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
  weight: number;
}

export interface Rating {
  value: number;
  count?: number;
}

export interface Price {
  value: string;
  originalValue?: string;
  discount?: string;
  currency?: string;
}
