import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConvo from "../../states/useConvo";
import UserGetAllUser from "../../context/UserGetAllUser.jsx";
import toast, { Toaster } from 'react-hot-toast';
function Search() {
  const [search, setSearch] = React.useState("");
  const [alluser] = UserGetAllUser();
  const { setSelectedConvo } = useConvo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const user = alluser.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    if (user) {
      setSelectedConvo(user);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="py-3">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 px-2">
          <label className="input input-info flex items-center gap-2 w-full sm:w-[90%]">
            <input
              type="text"
              className="grow text-sm sm:text-base"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button className="btn btn-outline btn-info transform hover:scale-110 transition">
            <IoSearchSharp />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
