import ProductCard from '../ProductCard';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useState } from 'react';

const RelatedProducts = ({ subCategory, currentProduct }) => {
  const [data, setData] = useState([]);
  const products = data?.filter((product) => product._id !== currentProduct);

  const { width } = useWindowDimensions();
  const visibleSlides = width > 992 ? 4 : width > 768 ? 3 : width > 576 ? 2 : 1;

  return (
    <div className="mx-auto max-w-6xl p-10">
      <h2 className="text-2xl font-medium">Related Products</h2>

      {products?.length > 0 ? (
        <CarouselProvider
          className="relative mt-8"
          isIntrinsicHeight={true}
          naturalSlideWidth={250}
          totalSlides={products?.length}
          visibleSlides={visibleSlides}
        >
          {visibleSlides < products?.length && (
            <ButtonBack className="absolute top-1/2 left-0 z-20 m-4 -translate-x-1/2 -translate-y-20 rounded-full bg-white p-4 shadow-md transition hover:shadow-lg">
              <ChevronLeftIcon className="h-6 w-6" />
            </ButtonBack>
          )}

          <Slider>
            {products?.map((product, index) => (
              <Slide className=" px-4" index={index} key={product._id}>
                <ProductCard product={product} />
              </Slide>
            ))}
          </Slider>

          {visibleSlides < products?.length && (
            <ButtonNext className="absolute top-1/2 right-0 z-20 m-4 translate-x-1/2 -translate-y-20 rounded-full bg-white p-4 shadow-md transition hover:shadow-lg">
              <ChevronRightIcon className="h-6 w-6" />
            </ButtonNext>
          )}
        </CarouselProvider>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center">
          <h2 className="text-lg font-medium">No Related Products</h2>
          <p className="text-sm text-gray-600">
            There are no products related to this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
