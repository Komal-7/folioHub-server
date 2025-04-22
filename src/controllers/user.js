const UserService = require("../services/user");

const UserController = {
    async register(req, res) {
        try {
            await UserService.registerUser(req.body);
            res.status(201).json({ message: "User registered" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async login(req, res) {
        try {
            const token = await UserService.loginUser(req.body.email, req.body.password);
            
            // Set token in HTTP-only cookie
            res.cookie("authToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 3600000, // 1 hour
            });

            res.json({ message: "Login successful" });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    },

    async getUser(req, res) {
        try {
            const user = await UserService.currentUser(req.user.user_id);
            res.status(200).json({ username: user.username, email: user.email });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async logout(req, res) {
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
          });
        
        res.json({ message: "Logged out successfully!" });
    }
};

module.exports = UserController;
