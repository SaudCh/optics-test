import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { RiCloseFill } from "react-icons/ri";
import './index.css'
import CheckBox from "./checkBox";
import { frameMaterial, frameShape, frameType, gender, productColors } from "./data";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function BasicModal({ open, handleClose, filters, setFilters }) {

  const windowDimensions = useWindowDimensions()

  const handleFilter = (e) => {

    if (e.target.checked) {
      let val = filters[e.target.name]
      let newFilters = [...val, e.target.value]

      setFilters({
        ...filters,
        [e.target.name]: newFilters
      })

    } else {
      let newFilters = filters[e.target.name].filter(item => item !== e.target.value)

      setFilters({
        ...filters,
        [e.target.name]: newFilters
      })

    }


  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowDimensions?.width < 600 ? windowDimensions?.width - 25 : 600,
    height: window.innerHeight - 20,
    overflowY: "scroll",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    py: 9,
    pb: 0,
    borderRadius: 2,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className='modal-custom relative'>
        <div className="fixed flex items-center justify-between top-0 right-0 left-0 px-2 bg-white">
          <h1 className="font-bold text-xl my-5">Filter Contents For You</h1>
          <button
            className="bg-gray-100 rounded-full text-lg text-gray-700 p-1"
            onClick={handleClose}
          >
            <RiCloseFill />
          </button>
        </div>
        <div className="relative">

          <h1 className="font-semibold text-xs  text-gray-500">Gender</h1>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 flex-row my-4">

            {
              gender.map((e) => (
                <CheckBox
                  key={e.id}
                  handleFilter={handleFilter}
                  name="productGender"
                  value={e.value}
                  label={e.label}
                  checked={filters?.productGender?.includes(e.value)}
                />
              ))

            }

          </div>

          <h1 className="font-semibold text-xs  text-gray-500 my-5">
            Frame Type
          </h1>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">

            {
              frameType.map((e) => (
                <CheckBox
                  key={e.id}
                  handleFilter={handleFilter}
                  name="frameType"
                  value={e.value}
                  label={e.label}
                  checked={filters?.frameType?.includes(e.value)}

                />
              ))

            }

          </div>
          <hr className="my-3" />

          <h1 className="font-semibold text-xs  text-gray-500 my-5">Shape</h1>
          <div className="grid grid-cols-3 md:grid-cols-4 flex-row gap-4">

            {
              frameShape.map((e) => (
                <CheckBox
                  key={e.id}
                  handleFilter={handleFilter}
                  name="shape"
                  value={e.value}
                  label={e.label}
                  checked={filters?.shape?.includes(e.value)}

                />
              ))
            }

          </div>
          <hr className="my-3" />

          <h1 className="font-semibold text-xs  text-gray-500 my-5">Color</h1>
          <div className="grid grid-cols-3 md:grid-cols-4 flex-row">
            {
              productColors.map((e) => (
                <CheckBox
                  key={e.id}
                  handleFilter={handleFilter}
                  name="colors"
                  value={e.value}
                  label={e.label}
                  checked={filters?.colors?.includes(e.value)}

                />
              ))
            }
          </div>
          <hr className="my-3" />

          <h1 className="font-semibold text-xs  text-gray-500">Frame Material</h1>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 flex-row my-4">
            {
              frameMaterial.map((e) => (
                <CheckBox
                  key={e.id}
                  handleFilter={handleFilter}
                  name="frameMaterial"
                  value={e.value}
                  label={e.label}
                  checked={filters?.frameMaterial?.includes(e.value)}
                />
              ))
            }
          </div>
          <div className="sticky bottom-0 left-0 right-0 flex justify-evenly items-center border bg-white">
            <button
              onClick={
                () => setFilters({
                  shape: [],
                  colors: [],
                  frameType: [],
                  frameMaterial: [],
                  productGender: []
                })
              }
              className="uppercase bg-transparent text-gray-500 text-xs rounded-md font-semibold px-10 py-4"
            >
              Clear
            </button>
            <button
              onClick={handleClose}
              className="uppercase bg-gray-500 text-white ml-3 text-xs rounded-md p-2 font-semibold"
            >
              apply filter
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
