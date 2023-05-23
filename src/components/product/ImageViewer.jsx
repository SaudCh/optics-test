import { useState, useEffect, useContext } from 'react';
import { WishlistContext } from "../../context/wishlistContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from 'react-router-dom';

const ImageViewer = ({ images = [], product }) => {

  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigate()


  const [selectedImage, setSelectedImage] = useState(
    images[0]
  );

  useEffect(() => {

    if (images[0]) {
      setSelectedImage(images[0]);
    }

  }, [images]);

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="relative col-span-10 aspect-[3/4]">

        {/* heart icon from react icons  */}
        <div className="absolute top-0 left-0">
          <button
            className=""
            onClick={() => {
              if (!isLoggedIn) {
                navigation("/login")
                return
              }
              toggleWishlist(product._id)
            }}
          >
            {wishlist.includes(product._id) ? (
              <AiFillHeart className="text-red-500 text-2xl " />
            ) : (
              <AiOutlineHeart className="text-2xl" />
            )}
          </button>
        </div>

        <img
          src={import.meta.env.VITE_SERVER_URL + selectedImage}
          alt=""
          className="h-full w-full object-contain"
        />
        <span className="absolute top-1/2 left-1/2 min-w-max -translate-x-1/2 -translate-y-1/2 select-none text-2xl font-medium text-white/50 z-10">
          MS Optics
        </span>
      </div>
      <div className="thin-scrollbar-y col-span-2 max-h-[500px] space-y-2 overflow-auto pr-1">
        {images?.filter((image) => image !== selectedImage)
          .map((image) => (
            <div
              key={image}
              className=""
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={import.meta.env.VITE_SERVER_URL + image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageViewer;
