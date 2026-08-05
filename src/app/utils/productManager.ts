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

    const parsed: unknown = JSON.parse(savedProducts);

    return Array.isArray(parsed) ? (parsed as Product[]) : [];
  } catch {
    return [];
  }
}

function readDeletedIds(): string[] {
  if (!canUseStorage()) return [];

  try {
    const savedIds = localStorage.getItem(DELETED_IDS_KEY);

    if (!savedIds) return [];

    const parsed: unknown = JSON.parse(savedIds);

    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function saveLocalProducts(nextProducts: Product[]) {
  if (!canUseStorage()) return;

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(nextProducts));
}

function saveDeletedIds(ids: string[]) {
  if (!canUseStorage()) return;

  localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(ids));
}

function hasValidProductImage(image: unknown): image is string {
  return typeof image === "string" && image.trim().length > 0;
}

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    image: hasValidProductImage(product.image)
      ? product.image
      : "/images/product-placeholder.png",
  };
}

export function getProducts(): Product[] {
  const deletedIds = readDeletedIds();

  const availableBaseProducts = baseProducts
    .filter((product) => !deletedIds.includes(String(product.id)))
    .map(normalizeProduct);

  const mergedProducts = [...availableBaseProducts];

  readLocalProducts().forEach((localProduct) => {
    const normalizedProduct = normalizeProduct(localProduct);

    const foundIndex = mergedProducts.findIndex(
      (product) => String(product.id) === String(normalizedProduct.id)
    );

    if (foundIndex >= 0) {
      mergedProducts[foundIndex] = normalizedProduct;
    } else {
      mergedProducts.push(normalizedProduct);
    }
  });

  return mergedProducts;
}

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

  const updatedDeletedIds =
    isBaseProduct && !deletedIds.includes(idAsString)
      ? [...deletedIds, idAsString]
      : deletedIds;

  saveLocalProducts(updatedLocalProducts);
  saveDeletedIds(updatedDeletedIds);
}
