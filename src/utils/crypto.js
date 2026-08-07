// SHA-256 Hash utility for client-side password verification
export const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Exact SHA-256 Hash of 'foxbat'
export const ADMIN_PASSWORD_HASH = "48fa9e716c5b6935e0ffb336acfb46844a4416a3d2f9b9cea813feede48df9c2";
