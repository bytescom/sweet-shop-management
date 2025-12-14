import User from "../models/userSchema.js";

export const registerUser = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const newUser = new User({ name, email, password }); // No bcrypt yet
    await newUser.save();

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error("Register error:", err.message); // 🧪 log error
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("Received login:", req.body);
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    // Compare plain passwords (INSECURE)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};