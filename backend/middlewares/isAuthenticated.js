import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized: invalid token",
                    success: false
                });
            }
            req.id = decoded.userId;
            req.user = decoded; // ✅ Attach decoded data (including role)
            next();
        });
    } catch (error) {
        console.error("Error in isAuthenticated:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export default isAuthenticated;
