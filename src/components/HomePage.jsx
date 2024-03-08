import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import React, { Fragment, useState } from "react";
import { FaAward } from "react-icons/fa";
import { useAuth } from "../contexts/authContext/index";
import { doSignOut } from "../fireebase/auth";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center relative">
      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:bg-blue-600" onClick={() => navigate("/play")}>
        PLAY
      </button>

      <div className="box-content border-blue-200 h-5/6 w-4/6 p-4 border-8 flex flex-col justify-start items-start bg-slate-700">
        <div className="flex flex-row ml-10 mt-10 ">
          <div className="mr-80">
            <Menu as="div" className="absolute text-left ">
              <div className="bg-slate-400 pt-2 pb-1 rounded-2xl">
                <Menu.Button
                  className="ml-3 inline-flex  focus:outline-none"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span className="sr-only">Open Profile menu</span>
                  <div className="flex items-center pr-10">
                    <div
                      className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                      style={{
                        backgroundImage:
                          'url("https://source.unsplash.com/80x80?face")',
                      }}
                    ></div>
                    <span className="ml-2 mr-2 font-medium text-white">
                      {currentUser.email.split("@")[0]}
                    </span>
                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={`origin-top-right z-10 right-0 mt-2 w-48 rounded-2xl shadow-md p-1 bg-slate-600 focus:outline-none ${
                    menuOpen ? "" : "hidden"
                  }`}
                >
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active && "bg-slate-500 rounded-2xl",
                            "text-gray-100 focus:bg-gray-200 cursor-pointer round-2xl px-4 py-2"
                          )}
                          onClick={() => navigate("/profile")}
                        >
                          Your Profile
                        </div>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active && "bg-slate-500 rounded-2xl",
                            "text-gray-100 focus:bg-gray-200 cursor-pointer round-2xl px-4 py-2"
                          )}
                          onClick={() => navigate("/settings")}
                        >
                          Settings
                        </div>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active && "bg-slate-500 rounded-2xl",
                            "text-gray-100 focus:bg-gray-200 cursor-pointer round-2xl px-4 py-2"
                          )}
                          onClick={() => {
                            doSignOut().then(() => {
                              navigate("/");
                            });
                          }}
                        >
                          Logout
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="text-white mr-7 relative text-left bg-slate-400 pl-2 pr-6 pt-2 rounded-2xl flex flex-row">
            <div className="flex justify-center items-center bg-gray-500 rounded-full h-8 w-8 mt-1 mr-2">
              <FaAward />
            </div>
            <div className="flex flex-col mb-2">
              <div className="text-lg">5000</div>
              <div className="text-xs">Highscore</div>
            </div>
          </div>

          <div className="text-white">
            <p className="underline hover:text-blue-300">Leaderboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
