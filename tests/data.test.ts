import { slugify } from '@/lib/slug';
import { categories, getProductBySlug, products } from '@/lib/data';

describe('Нормализация на данни', () => {
  test('генерира slug за кирилица', () => {
    expect(slugify('Битова химия')).toBe('bitova-himiya');
  });

  test('всички продукти имат slug и image url', () => {
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => p.slug.length > 0 && p.imageUrl.startsWith('https://'))).toBe(true);
  });

  test('категориите са нормализирани', () => {
    expect(categories.length).toBeGreaterThan(0);
    expect(categories.every((c) => c.slug.length > 0)).toBe(true);
  });

  test('намира продукт по slug', () => {
    const first = products[0];
    expect(getProductBySlug(first.slug)?.id).toBe(first.id);
  });
});
