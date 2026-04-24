import { useFormContext } from "react-hook-form";   
import Input from "../ui/Input";


const FormInput = ({name, ...props}) => {

const {register, formState:{errors}} =  useFormContext()

 return <Input {...props} {...register(name)} error={errors[name]?.message} />
}

export default FormInput