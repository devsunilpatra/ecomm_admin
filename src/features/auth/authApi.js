import { useMutation } from "@tanstack/react-query";
import API from "../../http/api";
import { useAuthStore } from "./store/authStore";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data) => API.post("/users/login", data),
    onSuccess: (res) => {
 
      console.log(res, "res");

      setAuth({
        accessToken: res.data.accessToken,
        user: res.data.role,
      });
    },
  });
};
