import { useAuthStore } from "../../store/authStore";
import { assets } from "../../assets/assets";

export const Header = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="flex justify-between items-center py-2 px-[4%] border-b border-gray-200">
      <img src={assets.logo} alt="logo" className="w-[max(150px)]" />
      <button
        onClick={logout}
        className="bg-gray-600 text-white px-5 py-2 sm:px-8 sm:py-2 rounded-full hover:bg-gray-500 cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
};
