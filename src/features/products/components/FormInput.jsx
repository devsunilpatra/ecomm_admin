import { useFormContext } from "react-hook-form";

const FormInput = ({ name, label, type = "text" }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label>{label}</label>
      <input {...register(name)} type={type} className="border border-gray-500 rounded-sm p-2 w-full" />
      <p className="text-red-500">{errors[name]?.message}</p>
    </div>
  );
};

export default FormInput;
