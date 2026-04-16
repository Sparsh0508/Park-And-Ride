import jwt from "jsonwebtoken";

const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not set in the server environment");
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};

export default generateToken;
