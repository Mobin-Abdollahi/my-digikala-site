"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "../../store/auth-context";
import { isAdminPhone } from "../../utils/auth";
import type { Product } from "../../types/product";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../utils/productManager";

type ProductTag = "new" | "bestSeller";

type ProductForm = {
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  image: string;
  category: string;
  subcategory: string;
  rating: string;
  description: string;
  specsText: string;
  tagsText: string;
};

const initialForm: ProductForm = {
  title: "",
  price: "",
  oldPrice: "",
  discount: "",
  image: "",
  category: "",
  subcategory: "",
  rating: "0",
  description: "",
  specsText: "",
  tagsText: "",
};

function parseSpecs(text: string): Product["specs"] {
  const specs = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...valueParts] = line.split(":");
      const value = valueParts.join(":").trim();

      if (!label?.trim() || !value) return null;

      return {
        label: label.trim(),
        value,
      };
    })
    .filter(
      (item): item is { label: string; value: string } => item !== null
    );

  return specs.length ? specs : undefined;
}

function parseTags(text: string): ProductTag[] | undefined {
  const allowedTags: ProductTag[] = ["new", "bestSeller"];

  const tags = text
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag): tag is ProductTag =>
      allowedTags.includes(tag as ProductTag)
    );

  return tags.length ? [...new Set(tags)] : undefined;
}

function specsToText(specs?: Product["specs"]) {
  if (!specs?.length) return "";
  return specs.map((spec) => `${spec.label}: ${spec.value}`).join("\n");
}

export default function AdminProductsPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [editingId, setEditingId] = useState<Product["id"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !isAdminPhone(user?.phone)) {
      router.replace("/login?redirect=/admin/products");
      return;
    }

    setProducts(getProducts());
    setIsLoading(false);
  }, [isLoggedIn, user?.phone, router]);

  function refreshProducts() {
    setProducts(getProducts());
  }

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("فقط فایل تصویری انتخاب کنید.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("حجم تصویر باید حداکثر ۲ مگابایت باشد.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageResult = reader.result;

      if (typeof imageResult === "string") {
        setForm((previous) => ({
          ...previous,
          image: imageResult,
        }));
      }
    };

    reader.readAsDataURL(file);
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const price = Number(form.price);
    const oldPrice = form.oldPrice.trim() ? Number(form.oldPrice) : undefined;
    const discount = form.discount.trim() ? Number(form.discount) : undefined;
    const rating = Number(form.rating);

    if (!form.title.trim()) {
      toast.error("عنوان محصول را وارد کنید.");
      return;
    }

    if (!form.category.trim()) {
      toast.error("دسته‌بندی محصول را وارد کنید.");
      return;
    }

    if (!form.image.trim()) {
      toast.error("تصویر محصول را انتخاب کنید.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("قیمت محصول معتبر نیست.");
      return;
    }

    if (
      oldPrice !== undefined &&
      (!Number.isFinite(oldPrice) || oldPrice <= 0)
    ) {
      toast.error("قیمت قبلی معتبر نیست.");
      return;
    }

    if (
      discount !== undefined &&
      (!Number.isFinite(discount) || discount < 0 || discount > 100)
    ) {
      toast.error("تخفیف باید بین ۰ تا ۱۰۰ باشد.");
      return;
    }

    if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
      toast.error("امتیاز باید بین ۰ تا ۵ باشد.");
      return;
    }

    const productData: Omit<Product, "id"> = {
      title: form.title.trim(),
      price,
      oldPrice,
      discount,
      image: form.image,
      category: form.category.trim(),
      subcategory: form.subcategory.trim() || undefined,
      rating,
      description: form.description.trim() || undefined,
      specs: parseSpecs(form.specsText),
      tags: parseTags(form.tagsText),
    };

    if (editingId !== null) {
      updateProduct({
        ...productData,
        id: editingId,
      });

      toast.success("محصول ویرایش شد.");
    } else {
      createProduct(productData);
      toast.success("محصول ثبت شد.");
    }

    refreshProducts();
    resetForm();
  }

  function handleEdit(product: Product) {
    setEditingId(product.id);

    setForm({
      title: product.title,
      price: product.price.toString(),
      oldPrice:
        product.oldPrice !== undefined ? product.oldPrice.toString() : "",
      discount:
        product.discount !== undefined ? product.discount.toString() : "",
      image: product.image,
      category: product.category,
      subcategory: product.subcategory ?? "",
      rating: product.rating.toString(),
      description: product.description ?? "",
      specsText: specsToText(product.specs),
      tagsText: product.tags?.join(", ") ?? "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete(id: Product["id"]) {
    const selectedProduct = products.find(
      (product) => String(product.id) === String(id)
    );

    const confirmed = window.confirm(
      `آیا از حذف «${selectedProduct?.title ?? "این محصول"}» مطمئن هستید؟`
    );

    if (!confirmed) return;

    deleteProduct(id);
    refreshProducts();

    if (editingId !== null && String(editingId) === String(id)) {
      resetForm();
    }

    toast.success("محصول حذف شد.");
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 text-center">
        در حال بررسی دسترسی...
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8" dir="rtl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            مدیریت محصولات
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            افزودن، ویرایش و حذف محصولات فروشگاه
          </p>
        </div>

        <Link
          href="/"
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:bg-neutral-100"
        >
          بازگشت به فروشگاه
        </Link>
      </div>

      <section className="mb-10 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-7">
        <h2 className="mb-6 text-lg font-bold">
          {editingId !== null ? "ویرایش محصول" : "افزودن محصول جدید"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="عنوان محصول"
              className="rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-red-500"
            />

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="دسته‌بندی؛ مثال: موبایل"
              className="rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-red-500"
            />

            <input
              name="subcategory"
              value={form.subcategory}
              onChange={handleChange}
              placeholder="زیر دسته‌بندی"
              className="rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-red-500"
            />

            <input
              type="number"
              name="price"
              min="1"
              value={form.price}
              onChange={handleChange}
              placeholder="قیمت"
              className="rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-red-500"
            />

            <input
              type="number"
              name="oldPrice"
              min="1"
              value={form.oldPrice}
              onChange={handleChange}
              placeholder="قیمت قبل از تخفیف"
              className="rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-red-500"
            />

            <input
              type="number"
              name="discount"
              min="0"
              max="100"
              value={form.discount}
              onChange={handleChange}
              placeholder="درصد تخفیف"
              className="rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-red-500"
            />

            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={handleChange}
              placeholder="امتیاز"
              className="rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-red-500"
            />

            <input
              name="tagsText"
              value={form.tagsText}
              onChange={handleChange}
              placeholder="new, bestSeller"
              className="rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-red-500"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium">
              تصویر محصول
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full rounded-lg border border-neutral-300 p-2 text-sm"
            />

            {form.image && (
              <img
                src={form.image}
                alt="پیش‌نمایش محصول"
                className="h-36 w-36 rounded-xl border border-neutral-200 object-contain p-2"
              />
            )}
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="توضیحات محصول"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-red-500"
          />

          <textarea
            name="specsText"
            value={form.specsText}
            onChange={handleChange}
            rows={4}
            placeholder={`مشخصات فنی؛ هر خط مثل:\nرنگ: مشکی\nحافظه: ۲۵۶ گیگابایت`}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-red-500"
          />

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
            >
              {editingId !== null ? "ذخیره تغییرات" : "ثبت محصول"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-bold transition hover:bg-neutral-100"
              >
                لغو ویرایش
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2 className="mb-5 text-xl font-bold">
          لیست محصولات ({products.length})
        </h2>

        {products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 py-10 text-center text-neutral-500">
            هنوز محصولی ثبت نشده است.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={String(product.id)}
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-4 h-44 overflow-hidden rounded-xl bg-neutral-50">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-contain p-3"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                      تصویر محصول ثبت نشده است
                    </div>
                  )}
                </div>

                <h3 className="line-clamp-2 min-h-12 font-bold text-neutral-800">
                  {product.title}
                </h3>

                <p className="mt-2 text-sm text-neutral-500">
                  دسته‌بندی: {product.category}
                </p>

                <p className="mt-2 font-bold text-red-600">
                  {product.price.toLocaleString("fa-IR")} تومان
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(product)}
                    className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    ویرایش
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-red-700"
                  >
                    حذف
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
