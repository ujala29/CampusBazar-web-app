import User from "../model/user.schema.js";


export const getcurrentuser=async(req,res)=>{
    try {
        const userID=req.userID;        
        const user=await User.findById(userID).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found"});
        }   
        return  res.status(200).json(user);
    }
        catch (error) { 
        console.error('Error fetching current user:', error.message);
        return res.status(500).json({message:"Internal server error"});
    }   
}


// update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userID;
    const { name, phoneNumber, rollNumber, address, upiId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.rollNumber = rollNumber || user.rollNumber;
    user.address = address || user.address;
    user.upiId = upiId || user.upiId;

    await user.save();
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
