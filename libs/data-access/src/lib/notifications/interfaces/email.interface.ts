export interface EmailDto extends Record<string, any> {
  email: string;
  product: {
    name: string,
    count: number,
    price: number,
    img: string,
    totalPriceProduct: number,
  }[],
  totalPrice: number,
  logo: string,
  address: string,
  data: string,
  time: string,
}