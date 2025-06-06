const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/user");
const { v4: uuidv4 } = require("uuid");

const UserService = {
    async registerUser(userData) {
        const { email, password, username } = userData;

        // Check if user exists
        const existingUser = await UserRepository.getUserByEmail(email);
        if (existingUser) throw new Error("User already exists");

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store user
        const newUser = { user_id: uuidv4() ,email, password: hashedPassword, username };
        return await UserRepository.createUser(newUser);
    },

    async loginUser(email, password) {
        const user = await UserRepository.getUserByEmail(email);
        if (!user) throw new Error("User doesn't exist");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        // Generate JWT token
        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: "8h" });
        return token;
    },

    async currentUser(user_id){
        const user = await UserRepository.getUserById(user_id);
        if (!user) throw new Error("Invalid credentials");
        return user;
    }
};

module.exports = UserService;
