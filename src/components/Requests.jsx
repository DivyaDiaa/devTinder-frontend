import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (action, requestId) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${action}/${requestId}`,
        {},
        {
          withCredentials: true,
        },
      );
      // Remove the request from the list after reviewing
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.error(`Error ${action}ing request: `, error);
    }
  };

  const getRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response.data.connectionRequests));
      console.log("Requests data: ", response.data.connectionRequests);
    } catch (error) {
      console.error("Error fetching requests: ", error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, location } =
          request.fromUserId;
          console.log("Request from user: ", request.fromUserId);
        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto"
          >
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{location}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", _id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", _id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
