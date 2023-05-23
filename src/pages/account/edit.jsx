import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import Input from "./Input";
import axios from 'axios'
import { toast } from "react-toastify";
import { LoadingContext } from "../../context/loadingContext";

export default function EditAccount() {

  const inputRef = useRef(null)
  const { setIsLoading } = useContext(LoadingContext)

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    country: '',
    city: '',
    address: '',
    phone: '',
  })
  const [errors, setErrors] = useState({})

  const phoneNumberFormat = (value) => {

    const phoneNumber = value.replace(/[^0-9]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 5) return phoneNumber;
    if (phoneNumberLength < 12) {
      return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
    }
    return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4, 11)}`;

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = Validation(data);

    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append('firstname', data.firstname)
    formData.append('lastname', data.lastname)
    formData.append('email', data.email)
    formData.append('country', data.country)
    formData.append('city', data.city)
    formData.append('address', data.address)
    formData.append('phone', data.phone)
    if (image) formData.append('image', image)

    setIsLoading(true)

    await axios.patch('/user/update-user', formData)
      .then(res => {
        toast.success("Your account has been updated successfully")
      })
      .catch(err => {
        setErrors({ api: err?.response?.data?.message })
      })

    setIsLoading(false)

  };

  const handleImage = (e) => {
    if (e.target.files.length) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {

    const getUser = async () => {

      setIsLoading(true)

      await axios.get('/user/get-user-info')
        .then(res => {
          const user = res.data.user

          setData({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            country: user.country,
            city: user.city,
            address: user.address,
            phone: user.phone,
            avatar: user.avatar
          })

        }
        )
        .catch(err => setErrors({ api: err?.response?.data?.message }))

      setIsLoading(false)

    }

    getUser()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_50%)]  justify-center bg-slate-50">
      <div className="grid grid-cols-1 gap-4 border-2 shadow my-10">
        <div className="col-span-1 w-100 sm:p-5 bg-white">
          {
            errors.api && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
              <span className="block sm:inline">{errors.api}</span>
            </div>
          }
          <div className="flex justify-center mb-3 relative">
            <div className="rounded-full flex items-center justify-center bg-gray-200 text-gray-400 relative">
              {
                preview ?
                  <img
                    src={preview}
                    alt="profile"
                    className="w-[120px] h-[120px] rounded-full object-cover"
                  /> :
                  <img
                    src={data?.avatar ? import.meta.env.VITE_SERVER_URL + data?.avatar : "https://randomuser.me/api/portraits/men/1.jpg"}
                    alt="profile"
                    className="w-[120px] h-[120px] rounded-full object-cover"
                  />
              }
              <button
                onClick={() => inputRef.current.click()}
                className="bg-white border rounded-full p-1 absolute bottom-[2px] right-[0px] text-2xl"
              >
                <AiOutlineCamera className="" />
              </button>
              <input
                ref={inputRef}
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                hidden
                onChange={(e) => handleImage(e)}
              />
            </div>
          </div>
          <form className="mx-7" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name={'firstname'}
                placeholder="John"
                value={data.firstname}
                onChange={(e) => setData({ ...data, firstname: e.target.value })}
                error={errors.firstname}
              />

              <Input
                label="Last Name"
                name={'lastname'}
                placeholder="Doe"
                value={data.lastname}
                onChange={(e) => setData({ ...data, lastname: e.target.value })}
                error={errors.lastname}
              />

            </div>

            <Input
              label="Email"
              name={'email'}
              placeholder=""
              value={data.email}
              // onChange={(e) => setData({ ...data, email: e.target.value })}
              error={errors.email}
            />

            <Input
              label="Phone"
              name={'phone'}
              placeholder="03xx-xxxxxxx"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: phoneNumberFormat(e.target.value) })}
              error={errors.phone}
            />

            <Input
              label="Country"
              name={'country'}
              placeholder="Pakistan"
              value={data.country}
              onChange={(e) => setData({ ...data, country: e.target.value })}
              error={errors.country}
            />

            <Input
              label="City"
              name={'city'}
              placeholder="Lahore"
              value={data.city}
              onChange={(e) => setData({ ...data, city: e.target.value })}
              error={errors.city}
            />

            <Input
              label="Address"
              name={'address'}
              placeholder="House # 123, Street # 123, ABC Road"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              error={errors.address}
            />

            <div className="flex justify-center">
              <button
                type="button"
                className=" bg-gray-100 text-gray-700 text-sm px-6  py-2 font-semibold rounded-md"
              >
                Cancel
              </button>
              <button
                className="btn rounded-md w-100 bg-[#031e4a]   title-font ml-3 text-white px-6 py-2 text-sm"
                style={{ minWidth: "100px" }}
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


const Validation = (data) => {

  const errors = {}

  if (!data?.firstname) {
    errors.firstname = "First Name is required"
  }

  if (!data?.country) {
    errors.country = "Country is required"
  }

  if (!data?.address) {
    errors.address = "Address is required"
  }

  if (!data?.city) {
    errors.city = "City is required"
  }

  if (!data?.phone) {
    errors.phone = "Phone is required"
  } else if (!/^[0-9]{4}-[0-9]{7}$/.test(data?.phone)) {
    errors.phone = "Invalid phone number"
  }

  return errors
}
