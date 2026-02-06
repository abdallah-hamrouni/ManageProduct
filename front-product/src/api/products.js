import { api } from "./client";

export const ProductsAPI = {
  // GET /api/products
  list: async () => {
    const res = await api.get("/products");
    return res.data;
  },

  // GET /api/products/:id (optionnel)
  getById: async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  // POST /api/products
  create: async (payload) => {
    const res = await api.post("/products", payload);
    return res.data;
  },

  // PUT /api/products/:id
  update: async (id, payload) => {
    const res = await api.put(`/products/${id}`, payload);
    return res.data;
  },

  // DELETE /api/products/:id
  remove: async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};
