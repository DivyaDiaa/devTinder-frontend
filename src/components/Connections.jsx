import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";
import UserCard from "./UserCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(response.data.connections));
      console.log("Connections data: ", response.data.connections);
    } catch (error) {
      console.error("Error fetching connections: ", error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="text-center my-10">
      <h1 className="text-2xl font-bold">Connections</h1>
      {connections.map((connection) => (
        <UserCard key={connection.id} user={connection} />
      ))}
    </div>
  );
};
export default Connections;
