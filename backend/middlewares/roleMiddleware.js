const isRecruiter = (req, res, next) => {
    const userRole = req.user?.role; // Assuming role is decoded in JWT

    if (userRole !== "recruiter") {
        return res.status(403).json({
            message: "Access denied. Only recruiters can post jobs.",
            success: false
        });
    }
    next();
};

export { isRecruiter };
