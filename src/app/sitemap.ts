import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connect();

  //   Products Data
  const productData = await Product.find();
  const productEntries: MetadataRoute.Sitemap = productData.map((product) => ({
    url: `https://www.cozzycorner.in/product/${product.id}`,
  }));

  //   Series Data
  const seriesDataEntries = [
    {
      url: 'https://www.cozzycorner.in/series/naruto',
    },
    {
      url: 'https://www.cozzycorner.in/series/one-piece',
    },
    {
      url: 'https://www.cozzycorner.in/series/demon-slayer',
    },
    {
      url: 'https://www.cozzycorner.in/series/dragon-ball',
    },
    {
      url: 'https://www.cozzycorner.in/series/marvel',
    },
    {
      url: 'https://www.cozzycorner.in/series/others',
    },
  ];

  //   Category Data
  const categoryDataEntries = [
    {
      url: 'https://www.cozzycorner.in/category/action-figure',
    },
    {
      url: 'https://www.cozzycorner.in/category/miniature',
    },
    {
      url: 'https://www.cozzycorner.in/category/bobble-head',
    },
    {
      url: 'https://www.cozzycorner.in/category/sets',
    },
    {
      url: 'https://www.cozzycorner.in/category/q-posket',
    },
  ];
  return [
    {
      url: 'https://www.cozzycorner.in/',
    },
    ...productEntries,
    ...seriesDataEntries,
    ...categoryDataEntries,
  ];
}
