import { useEffect, useState } from "react";
import { Header, Categories, Features, Wrapper, Products } from "@/components";
import { productService } from "@/services";
import styles from "./home.module.scss";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await productService.getAll(
        `specialFeatures=Popular`
      );
      setProducts(productsData.data.slice(0, 4));
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <section>
          <h2>Popular Products</h2>
          <Products products={products} />
        </section>
        <section>
          <h2>Shop By Categories</h2>
          <Categories />
        </section>
        <section>
          <h2>Why People Choose Us?</h2>
          <Features />
        </section>
      </div>
    </>
  );
};

export default Home;
