export enum SELECTORS  {
  'POPULAR' = 'Популярные',
  'TOPPRICE' = 'Сначала дешевле',
  'LOWPRICE' = 'Сначала дороже',
}

export interface Filters {
  prise: {
    top: number,
    low: number,
  },
  selectors: SELECTORS,
  assembled: boolean,
}