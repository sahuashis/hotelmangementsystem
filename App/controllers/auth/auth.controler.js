const jwt=require('jsonwebtoken')
const userSchema=require('../../models/auth/auth.model')

// Register API
const registeruser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      isAdmin: isAdmin || false,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Login API
const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true if using https
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports={registeruser,loginuser}
