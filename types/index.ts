export interface Product {
    id: string;
    slug: string;
    name: string;
    category: string;
    description: string;
    imageUrl: string;
}

export interface DataStore {
    products: Product[];
    categories: string[];
}