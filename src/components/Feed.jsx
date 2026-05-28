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
    if(feed.length > 0) return;
    try {
      const feedData = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feedData.data.feed));
      console.log("Feed data: ", feedData.data);
    } catch (err) {
      console.error("Error fetching feed: ", err);
    }
  };

  useEffect(() => {
      getFeed();
  }, []);

  return (
    <div className="flex justify-around my-10">
      {feed.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Feed;
