import User from "../modules/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const buildUserResponse = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone || "",
    avatar: user.avatar || "",
    memberSince: new Date(user.createdAt).getFullYear().toString()
});


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Name, email, and password are required" });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            return res.status(400).json({ msg: "User exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true
        });

        res.json({ msg: "Signup success", user: buildUserResponse(user) });
    } catch (error) {
        res.status(500).json({ msg: "Registration failed", error: error.message });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user._id);

            res.cookie("token", token, {
                httpOnly: true
            });

            return res.json({ msg: "Login success", user: buildUserResponse(user) });
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
