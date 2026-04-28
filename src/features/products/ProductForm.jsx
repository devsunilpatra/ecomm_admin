import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormConfig } from "./config/productFormConfig";
import { generateSchema } from "./schema/generateSchema";
import DynamicField from "./components/DynamicField";
import { useCreateProducts } from "./hooks/productHooks";

const ProductForm = () => {
  const { mutate } = useCreateProducts();

  const schema = generateSchema(productFormConfig.fields);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      sizes: [],
      bestseller: false,
      images: [null, null, null, null],
    },
  });

  const { handleSubmit, watch, setValue, reset } = methods;

  // WATCH CATEGORY
  const category = watch("category");

  // RESET SUBCATEGORY WHEN CATEGORY CHANGES
  useEffect(() => {
    setValue("subCategory", "");
  }, [category, setValue]);

  const onSubmit = (data) => {
    console.log("Final Data:", data);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((file) => {
          if (file) formData.append("images", file);
        });
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    mutate(formData);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {productFormConfig.fields.map((field) => {
          const isFullWidth =
            field.type === "textarea" || field.type === "file";

          return (
            <div
              key={field.name}
              className={isFullWidth ? "md:col-span-2" : ""}
            >
              <DynamicField field={field} />
            </div>
          );
        })}

        <button className="bg-black text-white py-2 md:col-span-2 cursor-pointer">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default ProductForm;
