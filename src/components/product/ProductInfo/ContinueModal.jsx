import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

const ContinueModal = ({ isOpen, onClose, product }) => {
  const navigate = useNavigate();

  return (
    <Transition.Root show={isOpen}>
      <Dialog
        onClose={onClose}
        className="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto"
      >
        <Transition.Child
          enter="transition duration-100 ease-in-out"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition duration-75 ease-in-out"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/20" />
        </Transition.Child>

        <Transition.Child
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <div className="relative w-full max-w-md rounded-md bg-white p-4 shadow-md ">
            <div className="flex items-center gap-4">
              <div className="aspect-[3/4] w-28">
                <img
                  src={import.meta.env.VITE_SERVER_URL + product?.image}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="text-sm">
                <h3 className="text-base">
                  {product?.title}
                </h3>
                <p className="mt-2 text-gray-600">is added to your cart.</p>

                <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  <button
                    onClick={onClose}
                    className="rounded bg-slate-900 px-2 py-1 text-sm uppercase text-white"
                  >
                    Continue shopping
                  </button>
                  <button
                    onClick={() => {
                      navigate('/cart');
                      onClose();
                    }}
                    className="rounded bg-slate-900 px-2 py-1 text-sm uppercase text-white"
                  >
                    View Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default ContinueModal;
