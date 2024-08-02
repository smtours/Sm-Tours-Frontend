import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import Loader from "react-js-loader"

const Profile = () => {
  const navigate = useNavigate();
  const { user, token, dispatch } = useContext(AuthContext);
  const [isLoading,setIsLoading]=useState(false)
  const { apiData: updatedUser, error } = useFetch(
    `${BASE_URL}/tour/${user._id}`
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    photo: "",
  });

  useEffect(() => {
    setFormData({ username: user.username, email: user.email, photo: "" });
  }, [user]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    setIsLoading(true)
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/user/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const { message } = await response.json();

      if (response.ok) {
        // dispatch({type: "LOGIN_START"})
        setIsLoading(false)
        dispatch({
          type: "UPDATE_USER",
          payload: {
            user: response.data,
            token: response.token,
          },
        });

        navigate("/login");
        toast.success(message);
      } else {
        setIsLoading(false)
        toast.error(message);
      }
    } catch (err) {
      setIsLoading(false)
      toast.error("Server not responding");
    }
  };

  return (
    <div className="py-8">
      <form action="" onSubmit={submitHandler}>
        <div className="my-4">
          <input
            type="text"
            placeholder="Name"
            name="username"
            value={formData.username}
            onChange={handleInput}
            required
            className="w-full px-4 py-3 focus:outline-none border-b border-solid focus:border-b-Color"
          />
        </div>
       

        <div className="mb-1 flex items-center gap-3">
          {user.photo && (
            <figure className="w-[45px] h-[45px] rounded-full border-2 border-solid border-Color  flex items-center justify-center ">
              <img src={user.photo} alt="" className="w-full rounded-full" />
            </figure>
          )}

          <div className="relative w-[120px] h-[40px] my-4">
            <input
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              id="customFile"
              accept=".png, .jpg, .jpeg"
            />
            
          </div>
        </div>

        <div>
          <button className="Searchbtn w-full rounded-md h-12 flex align-middle justify-center" disabled={isLoading}>
          {isLoading ? (
                  
            
                  <Loader type="ping-cube" bgColor={"white"} color={"white"}  size={50}/>
               
               
              ) : (
                "Register"
              )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
