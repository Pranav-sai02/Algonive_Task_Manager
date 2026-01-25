export function makeUserId() {
  const random = Math.floor(100000 + Math.random() * 900000); // 6 digits
  return `ALG-U-${random}`;
}
