import { OpenGraph } from '@ronaldocreis/wishlist-schema';

export const getOpenGraphInfo = (openGraph: OpenGraph) => {
  const ogImage = Array.isArray(openGraph.ogImage)
    ? openGraph.ogImage[0]?.url
    : openGraph.ogImage?.url;

  const jsonLDImage = Array.isArray(openGraph.jsonLD?.[0]?.image)
    ? openGraph.jsonLD?.[0]?.image[0]
    : openGraph.jsonLD?.[0]?.image;

  const imageUrl = ogImage || jsonLDImage;

  const title =
    openGraph.ogTitle || openGraph.jsonLD?.[0]?.name || openGraph.twitterTitle;

  const basePrice =
    openGraph.ogPriceAmount ||
    (Array.isArray(openGraph.jsonLD?.[0]?.offers) &&
      openGraph.jsonLD?.[0]?.offers[0]?.price) ||
    (!Array.isArray(openGraph.jsonLD?.[0]?.offers) &&
      openGraph.jsonLD?.[0]?.offers?.price);

  const price =
    typeof basePrice === 'string'
      ? Number(basePrice.replace(',', '.'))
      : Number(basePrice);

  const store =
    openGraph.ogSiteName ||
    openGraph.jsonLD?.[0]?.brand?.name ||
    openGraph.twitterSite;

  return { imageUrl, title, price, store };
};
