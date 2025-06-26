import userModels from "../models/user.models.js";
// user directly cannot update password
export const updateUsercontroller = async (req, res, next) => {
    const { name, lastName, email, location } = req.body;

    if (!name || !email) {
        return next(new Error("Please provide the requried fields."));
    }

    try {
        // if all updates are correct
        const user = await userModels.findOne({ _id: req.user.userId });
        // findOne() is a Mongoose method that finds one document in the MongoDB collection that matches the given condition.
        // Haan! JWT(JSON Web Token) ke andar user ID hota hai — agar aap usse encode(sign) karte waqt daaloge toh. aur wo hum dale ha jwt.sign define krne wakt
        //jwt Ek secure string jisme hota hai user ka data (jaise userId) — jo server sign karta hai using a secret key.Yeh token client ko diya jaata hai after login, aur har request ke sath bheja jaata hai to prove identity.

        //^ update user fields
        user.name = name;
        user.lastName = lastName;
        user.location = location;
        user.email = email;

        //^now saving the updated details:
        await user.save();

        //now again we make a token
        const token = user.createJWT();

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
            token
        });
    } catch (error) {
        return next(new Error("Error in updating fields:", err));
    }
}


// get user data fxn
export const getUserData = async (req, res, next) => {
    try {
        const user = await userModels.findById({ _id: req.body.user.userId });
        user.password = undefined;//this is to hide password in the inspect element
        if (!user) {//if user not found in the db
            return res.status(200).send({
                message: 'user not found',
                success: false,
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: user,
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "auth error",
            success: false,
            error: err.message
        })
    }
};