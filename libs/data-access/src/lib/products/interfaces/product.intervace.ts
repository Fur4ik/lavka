export interface Product {
  id: number,
  categoryId: number,
  name: string,
  images: string[],
  price: number,
  oldPrice: number,
  score: number,
  scoreCount: number,
  description: string,
  availabilityTime: number,
  assembled: boolean,
}