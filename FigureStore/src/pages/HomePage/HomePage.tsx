import { webLogo } from "../../assets";
import { useAppSelector } from "../../common/redux";
import { formatPrice } from "../../utils";
import Banner from "./components/Banner";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const getRandomProducts = (products, count) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const HomePage = () => {
  const products = useAppSelector((state) => state.home.products);

  // Lấy 4 sản phẩm ngẫu nhiên từ mảng products cho Trending
  const randomTrendingProducts = useMemo(
    () => getRandomProducts(products, 4),
    [products]
  );

  // Lấy 4 sản phẩm ngẫu nhiên từ mảng products cho Yêu Thích, đảm bảo không trùng với Trending
  const randomFavoriteProducts = useMemo(() => {
    const filteredProducts = products.filter(
      (product) => !randomTrendingProducts.includes(product)
    );
    return getRandomProducts(filteredProducts, 4);
  }, [products, randomTrendingProducts]);

  return (
    <div className="w-full mx-auto">
      <Banner />

      {/* Trending Products Section */}
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Trending</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {randomTrendingProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full h-48 mb-4 overflow-hidden">
                {product.images.length > 0 ? (
                  <img
                    src={`http://localhost:8080/images/${product.images[0].url}`}
                    className="object-cover w-full h-full"
                    alt={product.name}
                  />
                ) : (
                  <img
                    src={webLogo}
                    className="object-cover w-full h-full"
                    alt="Web Logo"
                  />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-lg font-bold">
                {formatPrice(product.price)} VND
              </p>
            </div>
          ))}
          <Link
            to="/collections"
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
          >
            <span className="text-lg font-bold text-primeColor hover:text-primeColor-dark transition-colors duration-300">
              Shop Now
            </span>
          </Link>
        </div>
      </div>

      {/* Favorite Products Section */}
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Yêu Thích</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Link
            to="/collections"
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
          >
            <span className="text-lg font-bold text-primeColor hover:text-primeColor-dark transition-colors duration-300">
              Shop Now
            </span>
          </Link>
          {randomFavoriteProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full h-48 mb-4 overflow-hidden">
                {product.images.length > 0 ? (
                  <img
                    src={`http://localhost:8080/images/${product.images[0].url}`}
                    className="object-cover w-full h-full"
                    alt={product.name}
                  />
                ) : (
                  <img
                    src={webLogo}
                    className="object-cover w-full h-full"
                    alt="Web Logo"
                  />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-lg font-bold">
                {formatPrice(product.price)} VND
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
