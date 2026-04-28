import { useFormContext } from "react-hook-form";

const FormTextarea = ({ name, label, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="block mb-1">{label}</label>

      <textarea
        {...register(name)}
        placeholder={placeholder}
        rows="4"
        className="border border-gray-500 rounded-sm p-2 w-full rounded"
      />

      <p className="text-red-500 text-sm">
        {errors[name]?.message}
      </p>
    </div>
  );
};

export default FormTextarea;
