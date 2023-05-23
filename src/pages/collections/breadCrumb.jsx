import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";

const Breadcrumb = ({ collection }) => {
  return (
    <div className="bg-gray-100 p-2">
      <div className="mx-auto flex max-w-6xl items-center gap-4 text-sm">
        <Link className="hover:underline" to="/">
          Home
        </Link>
        <BsChevronRight />
        <p
          className="truncate"
          //   to={`/collections/${product.subcategory?._id}`}
        >
          Collections
        </p>
        <BsChevronRight className="h-3 w-3" />
        <span className="truncate capitalize">{collection}</span>
      </div>
    </div>
  );
};

export default Breadcrumb;
