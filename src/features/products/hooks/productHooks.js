import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getAllProducts,
  createProduct,
  deleteProducts,
  updateProducts,
} from "../services/productApi";
 

// To get all products
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

// To add or create a products
export const useCreateProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      queryClient.invalidateQueries(["products"]);
    },
  });
};

//To delete products
export const useDeleteProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProducts,
    onSuccess: (data) => {
    toast.success(data.message)
      console.log(data);
      queryClient.invalidateQueries({ queryClient: ["products"] });
    },
  });
};



//To update products
export const useUpdateProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProducts,
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
