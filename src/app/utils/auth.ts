export const ADMIN_PHONE = "09123456789";

export function isAdminPhone(phone?: string | null) {
  return phone === ADMIN_PHONE;
}
