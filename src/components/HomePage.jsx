import React from "react";
import { useAuth } from "../contexts/authContext/index";
import { doSignOut } from "../fireebase/auth";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <div>
        Hello{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email},
        you are now logged in.
      </div>
      <button
        onClick={() => {
          doSignOut().then(() => {
            navigate("/");
          });
        }}
        className="text-sm text-blue-600 underline"
      >
        Logout
      </button>
    </div>
  );
}

export default HomePage;
