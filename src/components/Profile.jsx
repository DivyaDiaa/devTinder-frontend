import { useSelector } from "react-redux";
import Editprofile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  console.log("User in Profile: ", user);

  return <><Editprofile user={user}/></>;
};

export default Profile;
