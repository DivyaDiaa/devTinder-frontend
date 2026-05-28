import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";

const Editprofile = ({ user }) => {
  const dispatch = useDispatch();
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [location, setLocation] = useState(user?.location || "");

  const handleSaveChanges = async () => {
    try{
      const saveData = await axios.patch(BASE_URL + "/profile/edit", {
        lastName,
        age,
        gender,
        location
      }, { withCredentials: true });
      dispatch(addUser(saveData.data.data));
    }catch(error){
      console.error("Error saving changes: ", error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit profile</h2>
            <div className="">
              <label className="w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs my-2"
                />
              </label>
              <label className="w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs my-2"
                />
              </label>
              <label className="w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs my-2"
                />
              </label>
              <label className="w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Location</span>
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs my-2"
                />
              </label>
            </div>
            <div className="card-actions justify-center m-2">
              <button className="btn btn-primary" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ lastName, age, gender, location }} />
    </div>
  );
};
export default Editprofile;
