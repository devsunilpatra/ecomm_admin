export const productFormConfig = {
  fields: [
    {
      type: "input",
      name: "name",
      label: "Product Name",
      validation: { required: "Required", minLength: 2 },
    },
    {
      type: "select",
      name: "category",
      label: "Category",
      options: [
        { label: "Men", value: "men" },
        { label: "Women", value: "women" },
        { label: "Kids", value: "kids" },
      ],
      validation: { required: "Required" },
    },
    {
      type: "select",
      name: "subCategory",
      label: "Sub Category",
      dependsOn: "category",
      optionsMap: {
        men: [
          { label: "Topwear", value: "topwear" },
          { label: "Bottomwear", value: "bottomwear" },
        ],
        women: [
          { label: "Topwear", value: "topwear" },
          { label: "Bottomwear", value: "bottomwear" },
          
        ],
         kids: [
          { label: "Topwear", value: "topwear" },
          { label: "Bottomwear", value: "bottomwear" },
          
        ],
      },
      validation: { required: "Required" },
    },
    {
      type: "number",
      name: "price",
      label: "Price",
      validation: { required: "Required", min: 1 },
    },
    {
      type: "multiselect",
      name: "sizes",
      label: "Sizes",
      options: ["S", "M", "L", "XL"],
      validation: { required: "Select at least one" }
    },
   
    {
      type: "textarea",
      name: "description",
      label: "Description",
      validation: { required: "Required", minLength: 10 },
    },
     {
      type: "checkbox",
      name: "bestseller",
      label: "Bestseller",
    },
    {
      type: "file",
      name: "images",
      label: "Images",
      maxFiles: 4,
      validation: { required: "Upload images" },
    },
  ],
};
