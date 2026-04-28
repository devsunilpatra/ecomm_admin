import { useFormContext } from "react-hook-form";

const FormMultiSelect = ({ name, label, options }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label>{label}</label>
      <div className="flex  gap-4">
        {options.map((opt) => (
          <label key={opt} className="flex items-center">
            <input
              type="checkbox"
              value={opt}
              {...register(name)}
              className="w-4 h-4 mr-1"
            />
            {opt}
          </label>
        ))}
      </div>
      <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
    </div>
  );
};

export default FormMultiSelect;
