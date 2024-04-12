import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import { FaAward, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { MdErrorOutline, MdLeaderboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/index";
import { doSignOut } from "../fireebase/auth";
import {
  fetchHighscoreFromDatabase,
  fetchUsernameFromDatabase,
  saveProfileToDatabase,
} from "../fireebase/firebaseUtils";

import tomato1 from "../assets/tomato.png"


import { GiTomato } from "react-icons/gi";
import { uploadProfileImageToStorage } from "../fireebase/forStroage";

import { Howl, Howler } from "howler";

import backgroundSoundUrl from "../assets/bg.mp3";
import clickSoundUrl from "../assets/click1.wav";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    profileImage: "",
    highscore: 0,
  });
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const backgroundSound = new Howl({
    src: [backgroundSoundUrl],
    loop: true, // Loop the background sound
    volume: 0.4, // Adjust the volume as needed
    mute: isMuted, // Initial mute state
  });

  const clickSound = new Howl({
    src: [clickSoundUrl],
    volume: 0.5, // Adjust the volume as needed
  });

  useEffect(() => {
    // Initialize profileData with the user's email when the component mounts
    if (currentUser && currentUser.email) {
      setProfileData((prevData) => ({
        ...prevData,
        email: currentUser.email,
      }));
    }

    // Fetch username from the database when the profile dialog is opened
    if (profileOpen === false && currentUser) {
      // Fetch the username from the database when profile dialog is closed
      fetchUsernameFromDatabase(currentUser)
        .then((username) => {
          // Check if the username exists
          if (!username) {
            // If username doesn't exist, open the welcome dialog
            setShowWelcomeDialog(true);
          }
          setProfileData((prevData) => ({ ...prevData, username }));
        })
        .catch((error) => {
          console.error("Error fetching username:", error);
        });
    }
    if (currentUser) {
      fetchHighscoreFromDatabase(currentUser)
        .then((highscore) => {
          // Update the highscore state
          setProfileData((prevData) => ({ ...prevData, highscore }));
        })
        .catch((error) => {
          console.error("Error fetching highscore:", error);
        });
    }

    Howler.volume(0.5); // Set the global volume for Howler
    backgroundSound.play();

    return () => {
      // Clean up by stopping the background sound when the component unmounts
      backgroundSound.stop();
    };
  }, [currentUser, profileOpen]);

  const handleProfileSave = () => {
    // Save profile data to Firebase Realtime Database
    saveProfileToDatabase(profileData, currentUser)
      .then(() => {
        console.log("Profile data saved to database:", profileData);

        // Check if the username is newly created
        if (!profileData.username) {
          // If username is newly created, set the highscore to 0
          const newProfileData = { ...profileData, highscore: 0 };

          // Save the updated profile data with highscore to the database
          saveProfileToDatabase(newProfileData, currentUser)
            .then(() => {
              console.log("Highscore set to 0 for newly created username.");
              // Close the profile dialog after saving changes
              setProfileOpen(false);
            })
            .catch((error) => {
              console.error(
                "Error setting highscore for newly created username:",
                error
              );
            });
        } else {
          // Close the profile dialog after saving changes
          setProfileOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error saving profile data:", error);
      });
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    try {
      const downloadURL = await uploadProfileImageToStorage(file, currentUser);
      console.log("Profile image uploaded. Download URL:", downloadURL);
      // Set the profile image URL in the state
      setProfileImage(downloadURL);
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
    Howler.mute(isMuted); // Mute or unmute Howler.js globally
  };

  const handleButtonClick = () => {
    // Play the click sound when a button is clicked
    clickSound.play();

    // Add your button click logic here
    navigate("/play");
  };

  return (
    <div className="h-screen flex justify-center items-center relative">
      <div className="box-content border-blue-200 h-5/6 w-4/6 p-4 border-8 justify-start items-start bg-slate-700">
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
                        backgroundImage: profileImage
                          ? `url(${profileImage})`
                          : "",
                      }}
                    ></div>
                    <span className="ml-2 mr-2 font-medium text-white">
                      {profileData.username}
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
                          onClick={() => setProfileOpen(true)}
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
            <div className="flex flex-col mb-2 ">
              <div className="text-lg">{profileData.highscore}</div>
              <div className="text-xs">Highscore</div>
            </div>
          </div>

          <div className="pl-3 pt-3 pb-3 rounded-2xl bg-slate-400 text-white pr-1">
            <div className="flex justify-center items-center bg-gray-500 rounded-full h-10 w-10  mr-2">
              <Link to={"/leaderboard"}>
                <MdLeaderboard className="text-2xl" />
              </Link>
            </div>
          </div>

          <div className="ml-5 pl-3 pt-3 pb-3 rounded-2xl bg-slate-400 text-white pr-1">
            <div className="flex justify-center items-center bg-gray-500 rounded-full h-10 w-10  mr-2">
              <Link to={"/instruction"}>
                <MdErrorOutline className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 transform -translate-y-1/2 ml-20">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-8 px-9 rounded-full text-6xl"
            onClick={handleButtonClick}
          >
            <Link to={"/play"} className="text-blue-100">
              Play
            </Link>
            
          </button>
          
        </div>
        
        <div className="ml-96 mr-72">
        <img src={tomato1} alt="Tomato" className="ml-28" />
        </div>
        

        {/* Welcome Popup Dialog */}
        {showWelcomeDialog && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg flex flex-col items-center">
              <div className="flex items-center mb-4">
                <GiTomato className="text-5xl mr-2 text-red-600" />
                <h2 className="text-xl font-semibold">
                  Welcome to Tomato Game
                </h2>
              </div>
              {/* Username Input */}
              <div className="mb-4">
                <label className="block mb-1">Please enter username</label>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={profileData.username}
                  onChange={(e) =>
                    setProfileData({ ...profileData, username: e.target.value })
                  }
                />
              </div>
              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    setShowWelcomeDialog(false);
                    handleProfileSave();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Popup Dialog */}
        {profileOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
              {/* Profile Image Upload Section */}
              <div className="flex justify-center items-center mb-4">
                <div className="relative overflow-hidden w-24 h-24 rounded-full bg-gray-200">
                  {profileImage && (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  )}
                  <input
                    type="file"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    onChange={handleProfileImageChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1">Username</label>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={profileData.username}
                  onChange={(e) =>
                    setProfileData({ ...profileData, username: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  className="border rounded-md p-2 w-full"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                />
              </div>
              {/* Save and Cancel Buttons */}
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => setProfileOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  onClick={handleProfileSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* sound mute  button */}
        <div className="absolute bottom-28 left-96">
          <button className="text-white" onClick={toggleMute}>
            {isMuted ? <FaVolumeUp size={30} /> : <FaVolumeMute size={30} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
