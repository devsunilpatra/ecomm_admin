import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "../features/auth/authApi";
// import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../features/auth/schema/authSchema";
// import { login } from "../features/auth/services/authApi";
// import { useAuthStore } from "../features/auth/store/authStore";

import Form from "../components/form/Form";
import FormInput from "../components/form/FormInput";

const Login = () => {

  

  const { mutate, isPending, isError, error } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/add";

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // real-time validation
  });

  const {
    formState: { isValid },
  } = methods;

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        navigate(from, { replace: true });
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Form
        methods={methods}
        onSubmit={onSubmit}
        className="p-6 shadow-sm rounded-lg w-96 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center">
          Admin Login
        </h2>

        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="Your@gmail.com"
        />

        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        {/* API Error */}
        {isError && (
          <p className="text-red-500 text-sm text-center">
            {error?.response?.data?.message || "Login failed"}
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid || isPending}
          className="bg-black text-white px-4 py-2 w-full rounded-sm disabled:opacity-50 mt-3"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </Form>
    </div>
  );
};

export default Login;
