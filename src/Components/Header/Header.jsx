import { Link, useLocation, useNavigate } from "react-router-dom";
import calender from "../../assets/Images/calendar.png";
import { useEffect, useState } from "react";

function Header() {
  const location = useLocation();
  const navigate = useNavigate()

  const [auth, setAuth] = useState(false);
  const [home, setHome] = useState(false);

  useEffect(() => {
    if (location.pathname == "/auth/login") {
      setAuth(true);
    } else if (location.pathname == "/auth/signup") {
      setAuth(false);
    } else if (location.pathname == "/") {
      setHome(true);
    }
  }, []);

  const handleLogout =async ()=>{
    try {
     localStorage.removeItem("Jwt")
      navigate('/auth/login')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="h-10 bg-blue-600 flex items-center justify-between px-3">
        <img className="w-7 h-7" src={calender} alt="" />
        {!home ? (<div className="flex gap-4">
          <Link to={"/auth/login"}>
            <h1
              className={`text-white ${
                auth
                  ? "bg-white px-2 py-[2px] text-blue-700 rounded-md text-sm"
                  : " "
              }`}
            >
              Login
            </h1>
          </Link>
          <Link to={"/auth/signup"}>
            <button
              className={`text-white ${
                !auth
                  ? "bg-white px-2 py-[2px] text-blue-700 rounded-md text-sm "
                  : ""
              }`}
            >
              Signup
            </button>
          </Link>
        </div>) : (<button onClick={handleLogout} className="bg-red-600 px-2 py-1 text-white rounded-sm text-sm">Logout</button>)}
      </div>
    </>
  );
}

export default Header;
