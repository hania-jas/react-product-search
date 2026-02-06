export const MOCK_PRODUCTS = [
  { id: "p1", name: "Wireless Mouse", category: "electronics", price: 89, rating: 4.5, inStock: true },
  { id: "p2", name: "Mechanical Keyboard", category: "electronics", price: 349, rating: 4.8, inStock: false },
  { id: "p3", name: "USB-C Hub", category: "accessories", price: 129, rating: 4.4, inStock: true },
  { id: "p4", name: "27\" Monitor", category: "electronics", price: 1199, rating: 4.6, inStock: true },
  { id: "p5", name: "Office Chair", category: "furniture", price: 899, rating: 4.2, inStock: true },
  { id: "p6", name: "Standing Desk", category: "furniture", price: 1899, rating: 4.7, inStock: false },
  { id: "p7", name: "Noise Cancelling Headphones", category: "electronics", price: 999, rating: 4.9, inStock: true },
  { id: "p8", name: "Laptop Backpack", category: "accessories", price: 249, rating: 4.3, inStock: true },
];

export const fetchProducts = ({ query }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error("Network error"));
        return;
      }

      const q = (query || "").trim().toLowerCase();

      const result = MOCK_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(q)
      );
      resolve(result);
    }, 600);
  });
