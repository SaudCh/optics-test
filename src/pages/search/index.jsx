import React, { useContext, useEffect, useState } from "react";
import NewArrivalCard from "../../components/home/NewArrivalCard";
import SearchCard from "../../components/search";
import Filters from "../../components/search/filters";
import SearchBar from "../../components/search/searchBar";
import { LoadingContext } from "../../context/loadingContext";
import axios from "axios";

export default function Search() {
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    shape: [],
    colors: [],
    frameType: [],
    frameMaterial: [],
    productGender: []
  });

  const { setIsLoading } = useContext(LoadingContext)

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {

    const getProduct = async () => {
      setIsLoading(true)
      await axios.get("/product")
        .then(res => {
          setProducts(res?.data?.products)
          setFilteredProducts(res?.data?.products)
        }
        )
        .catch(err => console.log(err))
      setIsLoading(false)
    }

    getProduct();

  }, []);

  useEffect(() => {

    let filtered = [...products]


    if (search) {
      filtered = filtered.filter(item => item?.title?.toLowerCase().includes(search.toLowerCase()))
    }

    if (filters.shape.length > 0) {
      filtered = filtered.filter(item => filters.shape.includes(item?.shape))
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter(item => item?.color?.some(color => filters.colors.includes(color)))
    }

    if (filters.frameType.length > 0) {
      filtered = filtered.filter(item => filters.frameType.includes(item?.frameType))
    }

    if (filters.frameMaterial.length > 0) {
      filtered = filtered.filter(item => filters.frameMaterial.includes(item?.frameMaterial))
    }

    if (filters.productGender.length > 0) {
      filtered = filtered.filter(item => filters.productGender.includes(item?.productGender))
    }

    setFilteredProducts(filtered)

  }, [search, products, filters])

  return (
    <div className=" pt-5 min-h-screen bg-slate-50 pb-5">
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleFilter={openModal}
      />

      <div className="grid grid-cols-12 gap-4 justify-evenly">
        <div className="col-span-1 md:col-span-2" />
        <div className="col-span-10 sm:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center items-center sm:pr-10">
          {
            filteredProducts.map((item, index) => (
              <SearchCard
                key={index}
                product={item}
              />
            ))
          }
        </div>
      </div>

      <Filters
        open={modalIsOpen}
        handleClose={closeModal}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}
