import { Trash2, SquarePen, RefreshCcwDot } from "lucide-react";
import {
  useProducts,
  useDeleteProducts,
} from "../features/products/hooks/productHooks";

const ListItems = () => {
  const { data, isLoading, error, isError, refetch } = useProducts();
  const deleteProducts = useDeleteProducts();

  const handleDelete = (id) => {
    deleteProducts.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.message}</p>;

  const products = data.products || [];

  if (products.length === 0) return <p>Products not found</p>;

  return (
    <main>
      <div className="flex justify-between">
        <h2 className="text-xl text-gray-600">All Products</h2>

        <RefreshCcwDot onClick={() => refetch()} />
      </div>

      <div className="overflow-x-auto mt-4 text-left">
        <table className="w-full">
          <thead className="w-full">
            <tr className="md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center bg-gray-100 text-sm font-light">
              <th className=" border border-gray-200 py-1 px-2">Image</th>
              <th className=" border border-gray-200 py-1 px-2">Name</th>
              <th className=" border border-gray-200 py-1 px-2">Category</th>
              <th className="border border-gray-200 py-1 px-2">Price</th>
              <th className="border border-gray-200 py-1 px-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {

              return (
                <tr
                  key={product._id}
                  className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center bg-gray-50 border border-gray-100 my-2 text-sm"
                >
                  <td className="px-2 py-1">
                    <img src={product.images[0]} alt="remote" className="w-12" />
                  </td>
                  <td className="px-2 py-1">{product.name}</td>
                  <td className="px-2 py-1">{product.category}</td>
                  <td className="px-2 py-1">₹ {product.price}</td>
                  <td className="px-2 py-1 flex gap-2 justify-between">
                    <SquarePen className="text-blue-400" />
                    <Trash2
                      className="w-10 text-red-400 cursor-pointer"
                      onClick={() => handleDelete(product._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ListItems;
