import fs from "node:fs/promises";

const API_URL =
  "https://agro-export-backend-strapi-v2-production.up.railway.app/api/products?fields[0]=title&fields[1]=slug&fields[2]=description&populate[seo][populate][metaImage][fields][0]=url&populate[seo][populate][metaImage][fields][1]=alternativeText&populate[seo][populate][metaImage][fields][2]=width&populate[seo][populate][metaImage][fields][3]=height&populate[seo][populate][metaSocial]=*&populate[product][populate]=*&populate[catalog][populate][file][fields][0]=url&populate[catalog][populate][image][fields][0]=url&filters[slug][$eq]=bio-bitova-himiya";

function mapData(entry) {
  const categoriesMap = new Map();

  for (const product of entry.product || []) {
    const key = product.subcategory || "Други";
    if (!categoriesMap.has(key)) {
      categoriesMap.set(key, {
        id: key.toLowerCase().replace(/\s+/g, "-"),
        name: key,
        description: "",
        products: [],
      });
    }

    categoriesMap.get(key).products.push({
      id: String(product.id),
      title: product.name,
      summary: product.description?.replace(/<[^>]+>/g, " ").trim() || "",
    });
  }

  return {
    seo: {
      title: entry.seo?.metaTitle || "Битова химия",
      description: entry.seo?.metaDescription || "",
      keywords: entry.seo?.keywords || "",
    },
    hero: {
      badge: "Официален внос и дистрибуция",
      title: entry.title || "Био Битова Химия",
      description: entry.description || "",
      distributorCta: "Търсим дистрибутори в цяла България",
    },
    distributor: {
      title: "Станете наш дистрибутор",
      description: "Търсим малки бизнеси, локални вериги и национални партньори.",
      requirements: [
        "Склад или осигурен достъп до логистика",
        "Покритие на локален или регионален пазар",
        "Редовна комуникация с търговския ни екип",
      ],
      benefits: ["Търговски отстъпки", "Маркетинг подкрепа", "Дългосрочни доставки"],
    },
    categories: [...categoriesMap.values()],
    contact: {
      phone: "+359895646164",
      email: "info@bitova-himia.com",
      company: "Агро Експорт-Импорт ООД",
    },
  };
}

async function sync() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Strapi request failed with status ${response.status}`);
  }

  const payload = await response.json();
  const entry = payload?.data?.[0];
  if (!entry) {
    throw new Error("No product entry found for slug bio-bitova-himiya");
  }

  const mapped = mapData(entry);
  await fs.writeFile("data/site-content.json", JSON.stringify(mapped, null, 2), "utf8");
  console.log("Updated data/site-content.json from Strapi.");
}

sync().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
