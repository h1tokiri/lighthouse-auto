// // client/src/pages/HomePage.jsx
// import React from "react";

// export default function HomePage() {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold">Welcome to Lighthouse Auto</h1>
//       <p className="mt-2">Your premier automotive marketplace</p>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import * as UI from "../components/ui";
import Navbar from "../components/ui/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar>
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl">
            Lighthouse Auto
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <Link to="/login" className="btn btn-primary mr-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </div>
      </Navbar>

      <div className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to Lighthouse Auto</h1>
            <p className="py-6">
              Your premier automotive marketplace. Find, buy, and sell vehicles with ease.
            </p>
            <UI.Button className="btn-primary">Browse Listings</UI.Button>
          </div>
        </div>
      </div>
    </>
  );
}
