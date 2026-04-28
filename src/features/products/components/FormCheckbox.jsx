import { useFormContext } from "react-hook-form";

const FormCheckbox = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          {...register(name)}
          className="w-4 h-4"
        />
        <span className="">{label}</span>
      </label>

      {/* Error (optional, usually not needed for checkbox) */}
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default FormCheckbox;
