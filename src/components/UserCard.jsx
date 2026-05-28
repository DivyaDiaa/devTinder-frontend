import axios from "axios";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, age, location, _id } = user || {};

  const handleSendRequest = async (status, userId) => {
    try {
      const data = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
      console.log("Connection request sent: ", data.data);
    } catch (err) {
      console.error("Error sending connection request: ", err);
    }
  };
  return (
    <div className="card bg-base-00 w-96 shadow-sm">
      <figure>
        <img
          src={
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
          alt="User Avatar"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{age} years old</p>
        <p>{location}</p>
        <div className="card-actions justify-end my-4">
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Send request
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
