import { useCart } from "../../context/cart-context";
import { Product } from "./types";

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <div className="rounded shadow p-4 border w-full max-w-sm">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="font-semibold mt-2">Precio: ${product.price}</p>
      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      <button
        className="mt-3 bg-black text-white py-1 px-4 rounded"
        onClick={() =>
          addToCart({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: 1,
            image: product.image,
          })
        }
      >
        Agregar al carrito
      </button>
    </div>
  );
};
