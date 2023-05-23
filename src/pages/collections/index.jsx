import React, { useContext, useEffect, useState } from "react";
import SearchCard from "../../components/search";
import Filters from "../../components/search/filters";
import SearchBar from "../../components/search/searchBar";
import Breadcrumb from "./breadCrumb";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoadingContext } from "../../context/loadingContext";

export default function Collections() {
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    shape: [],
    colors: [],
    frameType: [],
    frameMaterial: [],
    productGender: []
  });

  const { setIsLoading } = useContext(LoadingContext)

  const { id } = useParams()

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)
      await axios.get(`/product?pCollection=${id}`)
        .then(res => {
          setFilteredProducts(res.data.products)
          setProducts(res.data.products)
        })
        .catch(err => console.log(err))

      await axios.get(`/collection/${id}`)
        .then(res => {
          setType(res.data.collection)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))

      setIsLoading(false)
    }

    getProducts()

  }, [id]);

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
    <div className=" min-h-screen bg-slate-50 pb-5 ">
      <Breadcrumb collection={type?.name} />
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleFilter={openModal}
      />

      <div className="grid grid-cols-12 gap-4 justify-evenly">
        <div className="col-span-1 md:col-span-2" />
        <div className="col-span-10 sm:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center items-center sm:pr-10">
          {
            filteredProducts.map((product, index) => (
              <SearchCard
                key={index}
                product={product}
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
