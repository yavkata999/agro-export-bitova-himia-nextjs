import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import DistributorsPage from '@/pages/distributors';
import ProductPage from '@/pages/products/[slug]';
import { products } from '@/lib/data';

describe('Рендериране на основни страници', () => {
  test('дистрибуторската страница съдържа ключово послание и CTA', () => {
    const html = renderToStaticMarkup(<DistributorsPage />);
    expect(html).toContain('Активно търсим дистрибутори в България');
    expect(html).toContain('Изпрати запитване');
  });

  test('продуктова страница визуализира правилни данни', () => {
    const product = products[0];
    const html = renderToStaticMarkup(<ProductPage product={product} />);
    expect(html).toContain(product.name);
    expect(html).toContain(product.category);
  });
});
