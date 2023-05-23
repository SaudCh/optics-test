import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/product/Breadcrumb";
import ImageViewer from "../../components/product/ImageViewer";
import ProductInfo from "../../components/product/ProductInfo";
// import RelatedProducts from '../components/Product/RelatedProducts';
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/loadingContext";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await axios.get(`/product/${id}`).then((res) => {
        setData(res.data.product);
      })
        .catch(err => console.log(err))


      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Breadcrumb product={data} />

      <div className="mx-auto py-6 grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
        <ImageViewer images={data?.images} image={data?.image} product={data} />
        <div>
          <ProductInfo product={data} />
        </div>
      </div>
      <div>{/* Your code here */}</div>
      {/* {data?.subCategory._id && (
        <RelatedProducts
          subCategory={data.subCategory._id}
          currentProduct={data._id}
        />
      )} */}
    </div>
  );
};

export default Product;
