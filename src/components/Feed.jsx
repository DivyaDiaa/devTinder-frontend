import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const feedData = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feedData));
    } catch (err) {
      console.error("Error fetching feed: ", err);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, [feed]);

  return (
    <div className="flex justify-around my-10">
      <UserCard feed={feed[0]} />
    </div>
  );
};

export default Feed;
