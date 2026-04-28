import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormMultiSelect from "./FormMultiSelect";
import FormFile from "./FormFile";
import FormCheckbox from "./FormCheckbox";
import FormTextarea from "./FormTextarea";
import { useFormContext, useWatch } from "react-hook-form";

const DynamicField = ({ field }) => {
  const {
    control,
    // register
    // formState: { errors },
  } = useFormContext();

  // FIX: useWatch instead of watch
  const dependentValue = useWatch({
    control,
    name: field.dependsOn,
  });

  switch (field.type) {
    case "input":
    case "number":
      return (
        <FormInput name={field.name} label={field.label} type={field.type} />
      );

    case "textarea":
      return <FormTextarea name={field.name} label={field.label} />;

    case "select":
      let options = field.options;

      // FIX: use dependentValue
      if (field.dependsOn) {
        options = field.optionsMap?.[dependentValue] || [];
      }

      return (
        <FormSelect name={field.name} label={field.label} options={options} />
      );

    case "multiselect":
      return (
        <FormMultiSelect
          name={field.name}
          label={field.label}
          options={field.options}
        />
      );

    case "checkbox":
      return (
        <FormCheckbox
          name={field.name}
          label={field.label}
          options={field.options}
        />
      );

    case "file":
      return <FormFile name={field.name} maxFiles={field.maxFiles} />;

    default:
      return null;
  }
};

export default DynamicField;
