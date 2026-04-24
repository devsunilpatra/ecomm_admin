import { useMutation } from "@tanstack/react-query";
import API from "../../services/api";
import { useAuthStore } from "../../store/authStore";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data) => API.post("/auth/login", data),
    onSuccess: (res) => {
      setAuth({
        accessToken: res.data.accessToken,
        user: res.data.user,
      });
    },
  });
};
