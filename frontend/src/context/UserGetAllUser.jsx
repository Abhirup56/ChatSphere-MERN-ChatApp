import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
function UserGetAllUser() {
  const [alluser, setAllUser] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        const response = await axios.get("/api/user/getUser", {
          Credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in UsergetAlluser :" + error);
      }
    };
    getUser();
  }, []);
  return [alluser,loading];
}

export default UserGetAllUser;
