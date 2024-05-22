import Link from "next/link";

const Products = () => {
  return (
    <div>
      <div className="field">
        <div className="control">
          <Link
            href="/app/products"
            style={{ scrollBehavior: "smooth !important" }}
          >
            <button className="button1">View Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
