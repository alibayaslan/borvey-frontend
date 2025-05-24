export const TypeText = (type) => {
  if (type === "home") {
    return "Evden Eve Nakliye";
  }
  if (type === "single") {
    return "Tekil Ürün Nakliye";
  }

  if (type === "office") {
    return "Ofis Nakliye";
  }
  if (type === "short") {
    return "Kısa Mesafeli Nakliye";
  }
};
