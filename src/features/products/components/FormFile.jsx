import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";

const MAX_FILES = 4;

const FormFile = ({ name }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  // FIX: useWatch instead of watch
  const files = useWatch({
    control,
    name,
    defaultValue: [],
  });

  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (!files) return;

    const urls = files.map((file) =>
      file ? URL.createObjectURL(file) : null
    );

    setPreviews(urls);

    return () => {
      urls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [files]);

  const handleChange = (index, file) => {
    const updated = [...(files || [])];
    updated[index] = file;

    setValue(name, updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleRemove = (index) => {
    const updated = [...(files || [])];
    updated[index] = null;

    setValue(name, updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div>
      <label className="block mb-2 font-medium">
        Product Images (max 4)
      </label>

      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: MAX_FILES }).map((_, index) => {
          const preview = previews[index];

          return (
            <div
              key={index}
              className="relative border border-gray-500 rounded-sm h-22 flex items-center justify-center overflow-hidden bg-gray-50"
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="absolute top-1 right-1 bg-black text-white text-xs px-1 rounded"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <span className="text-xs text-gray-400">
                  Upload
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) =>
                  handleChange(index, e.target.files[0])
                }
              />
            </div>
          );
        })}
      </div>

      <p className="text-red-500 text-sm mt-1">
        {errors[name]?.message}
      </p>
    </div>
  );
};

export default FormFile;
