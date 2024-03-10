import { getStorage, ref, uploadBytes } from "firebase/storage";

// Function to upload profile image to Firebase Storage
export const uploadProfileImageToStorage = async (file, currentUser) => {
  try {
    const storage = getStorage(); // Get a reference to the storage service
    const userId = currentUser.uid; // Get the current user's ID
    const imageRef = ref(storage, `profileImages/${userId}/${file.name}`); // Reference to the location where the image will be stored in Firebase Storage
    
    // Upload the file to the specified storage reference
    const snapshot = await uploadBytes(imageRef, file);
    
    // Get the download URL of the uploaded image
    const downloadURL = await snapshot.ref.getDownloadURL();
    
    // Return the download URL
    return downloadURL;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error; // Propagate the error to the caller
  }
};
