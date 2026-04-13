import User from "../modules/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "User exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true
        });

        res.json({ msg: "Signup success" });
    } catch (error) {
        res.status(500).json({ msg: "Registration failed", error: error.message });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user._id);

            res.cookie("token", token, {
                httpOnly: true
            });

            return res.json({ msg: "Login success" });
        }

        res.status(401).json({ msg: "Invalid credentials" });
    } catch (error) {
        res.status(500).json({ msg: "Login failed", error: error.message });
    }
};


export const logoutUser = (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(0),
            httpOnly: true
        });

        res.json({ msg: "Logout successful" });
    } catch (error) {
        res.status(500).json({ msg: "Logout failed", error: error.message });
    }
};
