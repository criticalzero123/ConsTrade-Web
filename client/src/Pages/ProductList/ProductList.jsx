import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductByUserId } from "../../actions/productActions";
import ProductListCard from "../../Components/ProductListCard/ProductListCard";

const ProductList = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const getproductbyuserid = useSelector(
    (state) => state.getProductByUserIdReducer
  );

  const { loading, error, products } = getproductbyuserid;

  useEffect(() => {
    dispatch(getProductByUserId(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="mt-5">
      {error && <p>Something Went Wrong</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        products && (
          <div className="grid lg:grid-cols-3 justify-center">
            {products.map((product) => (
              <ProductListCard product={product} key={product.title} />
            ))}
          </div>
        )
      )}

      {products !== undefined && products.length === 0 && (
        <div>
          <div>There is no product listing.</div>
          <Link to="/product/add" className="text-blue-700">
            Add here
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductList;
