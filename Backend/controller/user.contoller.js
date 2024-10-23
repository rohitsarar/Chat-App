import User from '../models/user.models.js';

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        console.log("Logged-in user ID:", loggedInUserId);  // Print the user ID

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        console.log("Filtered users:", filteredUsers);  // Print the filtered users

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUserForSidebar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


