import { z } from "zod";

export const generateSchema = (fields) => {
  const shape = {};

  fields.forEach((field) => {
    let schema;

    switch (field.type) {
      case "input":
      case "textarea":
        schema = z.string();
        if (field.validation?.minLength) {
          schema = schema.min(field.validation.minLength);
        }
        break;

      case "number":
        schema = z.coerce.number();
        if (field.validation?.min) {
          schema = schema.min(field.validation.min);
        }
        break;

      case "select":
        schema = z.string().min(1, "Please select an option");
        break;

      case "multiselect":
        schema = z
          .array(z.string())
          .min(
            1,
            field.validation?.required ||
              `Please select at least one ${field.label.toLowerCase()}`,
          );
        break;

      case "checkbox":
        schema = z.boolean().optional();
        break;

      case "file":
        schema = z
          .array(z.any().nullable())
          .refine(
            (files) => files.filter(Boolean).length > 0,
            "At least one image is required",
          )
          .refine(
            (files) => files.filter(Boolean).length <= 4,
            "Maximum 4 images allowed",
          );
        break;

      default:
        schema = z.any();
    }

    shape[field.name] = schema;
  });

  return z.object(shape);
};
