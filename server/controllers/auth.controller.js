import admin from "../config/firebase.js";
import User from "../models/User.model.js";

export const syncUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    // Verify the Firebase ID Token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, phone_number } = decodedToken;

    // Find user or create new one
    let user = await User.findOne({ firebaseId: uid });

    if (!user) {
      user = new User({
        firebaseId: uid,
        phone: phone_number,
        role: 'customer' // Default role
      });
      await user.save();
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Auth Sync Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};