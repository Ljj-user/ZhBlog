export function isAdminEnabled() {
  if (process.env.ADMIN_ENABLED === "true") {
    return true
  }

  if (process.env.VERCEL === "1") {
    return false
  }

  return process.env.NODE_ENV !== "production" || process.env.ADMIN_ENABLED === "true"
}

export function assertAdminEnabled() {
  if (!isAdminEnabled()) {
    throw new Error("Admin is disabled in this environment.")
  }
}
