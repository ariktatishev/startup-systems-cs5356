import Products from "../components/Products";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handlePreviousClick = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      {/* Main Bulk Start */}
      <main>
        {/* Start Section 1 */}
        <section id="section1" className="hero is-medium is-link">
          <div className="hero-body columns is-vcentered">
            <div className="column">
              <h1 className="teal-text">Pibble Pet</h1>
              <p className="white-text">
                At Pibble, we understand the challenges pet owners face in
                managing their cat&rsquo;s nutritional needs while balancing
                busy schedules. Our mission is to provide innovative solutions
                that prioritize your cat&rsquo;s health and well-being, making
                pet care more convenient and effortless.
              </p>
              <Products />
            </div>
            <div className="column">
              <figure>
                <Image
                  src="https://i.imgur.com/h8CGEHh.png"
                  alt="Ron and Jarfield"
                  width={640}
                  height={360}
                  priority={true}
                />
              </figure>
            </div>
          </div>
        </section>
        {/* End Section 1 */}

        {/* Start Section 2 */}
        <section id="sampleProduct" className="hero is-medium">
          {/* Start Main Div */}
          <div className="hero-body columns is-vcentered">
            {/* Image and Buttons Start */}
            <div className="column">
              <div className="product-image-container">
                {products[currentProductIndex]?.imageurl && (
                  <Image
                    src={products[currentProductIndex].imageurl}
                    alt={products[currentProductIndex]?.title}
                    className="product-image"
                    width={640}
                    height={360}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ maxWidth: "100%", maxHeight: "498.5px" }}
                    priority={true}
                  />
                )}
              </div>
              <div className="button-container">
                <button
                  id="previous-button"
                  className="button-carousel"
                  onClick={handlePreviousClick}
                >
                  &lt;
                </button>
                <button
                  id="next-button"
                  className="button-carousel"
                  onClick={handleNextClick}
                >
                  &gt;
                </button>
              </div>
            </div>
            {/* Image and Buttons End */}

            {/* Text Section Start */}
            <div className="column text-column">
              <div id="seg2r1_prod" className="index-title">
                {products[currentProductIndex]?.title}
              </div>
              <div id="seg2r1_price" className="price-font">
                Price: ${products[currentProductIndex]?.price}
              </div>
              <div id="seg2r1_desc" className="index-product-p">
                {products[currentProductIndex]?.description}
              </div>
              <ul>
                {products[currentProductIndex]?.highlighted_features.map(
                  (feature) => (
                    <li key={feature} className="index-product-li">
                      {feature}
                    </li>
                  )
                )}
              </ul>
              <Link href={products[currentProductIndex]?.paymentlink || "#"}>
                <button className="button1">Buy Now</button>
              </Link>
            </div>
            {/* Text Section End */}
          </div>
          {/* End Main Div */}
        </section>
        {/* End Section 2 */}

        {/* Start Section 3 */}
        <section
          id="whyPibble"
          className="hero is-medium has-background-white-ter"
        >
          <div className="hero-body columns is-vcentered">
            <div className="column">
              <h1>Why Pibble?</h1>
              <p>
                At Pibble, we excel at providing both nutritional freedom and
                proper feeding environments for your cats. Our automatic wet
                food feeder accommodates your cat&rsquo;s preferences while
                ensuring a clean and healthy eating experience. With features
                like self-cleaning and dynamic portioning, Pibble simplifies pet
                care and helps you nurture your cat&rsquo;s well-being, one meal
                at a time.
              </p>
            </div>
            <div className="column">
              <figure>
                <Image
                  src="https://i.imgur.com/yJSXIML.png"
                  alt="Party Cat!"
                  width={640}
                  height={360}
                  priority={true}
                />
              </figure>
            </div>
          </div>
        </section>
        {/* End Section 3 */}
      </main>
      {/* Main Bulk End */}
    </div>
  );
}
