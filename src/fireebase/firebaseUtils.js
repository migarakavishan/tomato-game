import { getDatabase, ref, set, get } from "firebase/database";

// Function to save profile data to Firebase Realtime Database
export const saveProfileToDatabase = async (profileData, currentUser) => {
  try {
    const db = getDatabase(); // Get a reference to the database
    const userId = currentUser.uid; // Get the current user's ID
    const userRef = ref(db, `users/${userId}`); // Reference to the user's data in the database

    // Prepare the data to be set
    const userData = {
      username: profileData.username,
      highscore: profileData.highscore
    };

    // Add profileImage to userData if it exists
    if (profileData.profileImage) {
      userData.profileImage = profileData.profileImage;
    }

    // Update the user's profile data in the database
    await set(userRef, userData);
  } catch (error) {
    console.error("Error saving profile data:", error);
    throw error; // Propagate the error to the caller
  }
};


// Function to save only the highscore to Firebase Realtime Database
export const saveHighscoreToDatabase = async (currentUser, highscore) => {
  try {
    const db = getDatabase(); // Get a reference to the database
    const userId = currentUser.uid; // Get the current user's ID
    const userRef = ref(db, `users/${userId}`); // Reference to the user's data in the database

    // Update the user's highscore in the database
    await set(userRef, { highscore }, { merge: true }); // Merge with existing data to preserve other fields

    // Optionally, you can return a success message or true if needed
    return "Highscore saved successfully";
  } catch (error) {
    console.error("Error saving highscore:", error);
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

// Function to fetch highscore from Firebase Realtime Database
export const fetchHighscoreFromDatabase = async (currentUser) => {
  try {
    const db = getDatabase(); // Get a reference to the database
    const userId = currentUser.uid; // Get the current user's ID
    const userRef = ref(db, `users/${userId}/highscore`); // Reference to the user's highscore in the database

    // Retrieve the highscore from the database
    const snapshot = await get(userRef);
    const highscoreData = snapshot.val();

    // Return the fetched highscore
    return highscoreData || 0;
  } catch (error) {
    console.error("Error fetching highscore:", error);
    throw error; // Propagate the error to the caller
  }
};
