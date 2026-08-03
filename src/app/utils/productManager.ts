import { products as baseProducts } from "../data/products";
import type { Product } from "../types/product";

const PRODUCTS_KEY = "digikala-managed-products";
const DELETED_IDS_KEY = "digikala-deleted-product-ids";

function canUseStorage() {
  return typeof window !== "undefined";
}

function readLocalProducts(): Product[] {
  if (!canUseStorage()) return [];

  try {
    const savedProducts = localStorage.getItem(PRODUCTS_KEY);

    if (!savedProducts) return [];

    const parsed = JSON.parse(savedProducts);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readDeletedIds(): string[] {
  if (!canUseStorage()) return [];

  try {
    const savedIds = localStorage.getItem(DELETED_IDS_KEY);

    if (!savedIds) return [];

    const parsed = JSON.parse(savedIds);

    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function saveLocalProducts(products: Product[]) {
  if (!canUseStorage()) return;

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function saveDeletedIds(ids: string[]) {
  if (!canUseStorage()) return;

  localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(ids));
}

/**
 * محصولات ثابت data/products.ts را با تغییرات localStorage ادغام می‌کند.
 */
export function getProducts(): Product[] {
  const localProducts = readLocalProducts();
  const deletedIds = readDeletedIds();

  const availableBaseProducts = baseProducts.filter(
    (product) => !deletedIds.includes(String(product.id))
  );

  const mergedProducts = [...availableBaseProducts];

  localProducts.forEach((localProduct) => {
    const foundIndex = mergedProducts.findIndex(
      (product) => String(product.id) === String(localProduct.id)
    );

    if (foundIndex >= 0) {
      mergedProducts[foundIndex] = localProduct;
    } else {
      mergedProducts.push(localProduct);
    }
  });

  return mergedProducts;
}

/**
 * برای سازگاری با نام قبلی تابع در صفحه ادمین
 */
export const getManagedProducts = getProducts;

export function createProduct(data: Omit<Product, "id">): Product {
  const localProducts = readLocalProducts();

  const newProduct: Product = {
    ...data,
    id: `product-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  };

  saveLocalProducts([...localProducts, newProduct]);

  return newProduct;
}

export function updateProduct(updatedProduct: Product): void {
  const localProducts = readLocalProducts();

  const existingIndex = localProducts.findIndex(
    (product) => String(product.id) === String(updatedProduct.id)
  );

  if (existingIndex >= 0) {
    const updatedProducts = [...localProducts];
    updatedProducts[existingIndex] = updatedProduct;
    saveLocalProducts(updatedProducts);
    return;
  }

  /*
   اگر محصول اولیه از data/products.ts باشد، نسخه ویرایش‌شده‌اش
   در localStorage ذخیره می‌شود و هنگام خواندن جایگزین نسخه ثابت می‌شود.
  */
  saveLocalProducts([...localProducts, updatedProduct]);
}

export function deleteProduct(id: Product["id"]): void {
  const localProducts = readLocalProducts();
  const deletedIds = readDeletedIds();
  const idAsString = String(id);

  const updatedLocalProducts = localProducts.filter(
    (product) => String(product.id) !== idAsString
  );

  const isBaseProduct = baseProducts.some(
    (product) => String(product.id) === idAsString
  );

  let updatedDeletedIds = deletedIds;

  if (isBaseProduct && !deletedIds.includes(idAsString)) {
    updatedDeletedIds = [...deletedIds, idAsString];
  }

  saveLocalProducts(updatedLocalProducts);
  saveDeletedIds(updatedDeletedIds);
}
