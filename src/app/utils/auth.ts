export function normalizePhone(phone?: string | null) {
  if (!phone) return "";

  return phone
    .replace(/[\u0660-\u0669]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) - 1728))
    .replace(/\D/g, "")
    .replace(/^98/, "0")
    .replace(/^\+98/, "0")
    .replace(/^0098/, "0");
}

export function getAdminPhones() {
  const raw = process.env.ADMIN_PHONES || process.env.ADMIN_PHONE || "09123456789";

  return raw
    .split(",")
    .map((phone) => normalizePhone(phone))
    .filter(Boolean);
}

export function isAdminPhone(phone?: string | null) {
  const normalized = normalizePhone(phone);
  return getAdminPhones().includes(normalized);
}
