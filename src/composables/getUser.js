import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

let userInfo = null;
onAuthStateChanged(auth, (user) => {
  userInfo = user;
});

const getUser = () => {
  return { userInfo };
};

export default getUser;
