import { webLogo } from "../../assets";
import { useAppSelector } from "../../common/redux";
import Banner from "./components/Banner";

const HomePage = () => {
  const products = useAppSelector((state) => state.home.products);
  const categories = useAppSelector((state) => state.home.categories);
  return (
    <div className="w-full mx-auto">
      <Banner />
      <h1 className="text-lg">Products</h1>
      {categories
        .filter((category) => category.name === "Hàng order")
        .map((category) => (
          <div key={category.id}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {category.products.map((product: any) => (
                <div key={product.id} style={{ margin: "10px" }}>
                  {product.images.length > 0 ? (
                    <img
                      src={`http://localhost:8080/images/${product.images[0].url}`}
                      style={{ width: 100, height: 100 }}
                      alt={product.name}
                    />
                  ) : (
                    <img
                      src={webLogo}
                      style={{ width: 100, height: 100 }}
                      alt="Web Logo"
                    />
                  )}
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
