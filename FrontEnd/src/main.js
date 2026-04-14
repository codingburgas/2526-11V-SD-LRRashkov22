import { requireAuth, requireAdmin, requireUserOrAdmin, logout } from "./utils/auth.js";

requireAuth();

window.requireAdmin = requireAdmin;
window.requireUserOrAdmin = requireUserOrAdmin;
window.logout = logout;