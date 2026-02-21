export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  imageUrl: string;
};
