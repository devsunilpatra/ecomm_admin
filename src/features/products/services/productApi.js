import API from "../../../http/api";

// Get all products
export const getAllProducts = async () => {
  const { data } = await API.get("/products");
  return data;
};

// Get a single product
export const getSingleProduct = async (id) => {
  const { data } = await API.get(`/products/${id}`);
  return data;
};

// Create a product
export const createProduct = async (formData) => {
  const { data } = await API.post("/products", formData);
  return data;
};

// Update product
export const updateProducts = async ({ _id, formData }) => {
  const { data } = await API.post(`/products/${_id}`, formData);
  return data;
};

// Delete product
export const deleteProducts = async (_id) => {
  const { data } = await API.delete(`/products/${_id}`);
  return data;
};
