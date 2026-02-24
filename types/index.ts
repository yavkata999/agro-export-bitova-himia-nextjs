export interface Product {
    id: string;
    slug: string;
    name: string;
    category: string;
    description: string;
    imageUrl: string;

    seoTitle?: string;
    seoDescription?: string;
    shortDescription?: string;
    marketingDescription?: string;
    features?: string[];
    keyBenefits?: string[];
    usageInstructions?: string;
    targetClients?: string[];
    brand?: string;
    metaKeywords?: string[];

    safetyDataSheetUrl?: string;
}

export interface DataStore {
    products: Product[];
    categories: string[];
}