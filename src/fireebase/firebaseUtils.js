
import { getDatabase, ref, set, get } from "firebase/database";


// Function to save profile data to Firebase Realtime Database
export const saveProfileToDatabase = async (profileData, currentUser) => {
  try {
    const db = getDatabase(); // Get a reference to the database
    const userId = currentUser.uid; // Get the current user's ID
    const userRef = ref(db, `users/${userId}`); // Reference to the user's data in the database

    // Update the user's profile data in the database
    await set(userRef, {
      username: profileData.username,
      profileImage: profileData.profileImage,
      highestScore: profileData.highestScore
    });
  } catch (error) {
    console.error("Error saving profile data:", error);
    throw error; // Propagate the error to the caller
  }
};

// Function to fetch username from Firebase Realtime Database
export const fetchUsernameFromDatabase = async (currentUser) => {
  try {
    const db = getDatabase(); // Get a reference to the database
    const userId = currentUser.uid; // Get the current user's ID
    const userRef = ref(db, `users/${userId}`); // Reference to the user's data in the database

    // Retrieve the user's data from the database
    const snapshot = await get(userRef);
    const userData = snapshot.val();

    // Return the fetched username
    return userData?.username || "";
  } catch (error) {
    console.error("Error fetching username:", error);
    throw error; // Propagate the error to the caller
  }
};

