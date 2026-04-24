import { FormProvider } from "react-hook-form";

const Form = ({ methods, onSubmit, children, className }) => {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
