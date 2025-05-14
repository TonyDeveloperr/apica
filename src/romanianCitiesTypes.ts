declare module "romanian-cities" {
  interface RomanianCity {
    name: string;
    county: string;
  }

  const cities: RomanianCity[];
  export default cities;
}