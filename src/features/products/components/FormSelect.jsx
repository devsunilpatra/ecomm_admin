import { useFormContext } from "react-hook-form";

const FormSelect = ({ name, label, options }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label>{label}</label>
      <select {...register(name)} className="border border-gray-500 rounded-sm p-2 w-full">
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <p className="text-red-500">{errors[name]?.message}</p>
    </div>
  );
};

export default FormSelect;
