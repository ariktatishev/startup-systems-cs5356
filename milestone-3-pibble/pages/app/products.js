import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("../api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="product-page-h1-centered">Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.title} className="product-card-new">
            <h2 className="product-card-header">{product.title}</h2>
            <div
              className="product-image-container"
              style={{ position: "relative", width: "100%", height: "360px" }}
            >
              <Image
                className="product-card-image-new"
                src={product.imageurl}
                alt={product.title}
                /*style={{ objectFit: 'cover' }}*/
                fill
                /*sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"*/
              />
            </div>
            <p className="product-card-p">{product.description}</p>
            <ul>
              {product.highlighted_features.map((feature) => (
                <li className="product-card-li" key={feature}>
                  {feature}
                </li>
              ))}
            </ul>
            <p className="product-card-price">Price: ${product.price}</p>
            <Link href={product.paymentlink}>
              <button className="product-card-button">Buy Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
