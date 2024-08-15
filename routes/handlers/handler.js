const express = require("express");
const authRouter = express();

const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../../service/auth");
const shortID = require("shortid");

authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: false }));
const userDb = require("../../models/userDb");

async function loginhandlear(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userDb.findOne({ email: email });

    if (!user) {
      return res.status(400).render("login", {
        message: "Invalid User",
      });
    }
    console.log("User : " + user.email + " Password : " + user.password);
    if (user.password != password) {
      return res.render("login", {
        message: "Invalid password",
      });
    }
    if (user.email === email && user.password === password) {
      const SessionId = uuidv4();
      setUser(SessionId, user);
      res.cookie("uid", SessionId);
      return res.redirect("/urls");
    }
  } catch (err) {
    console.log(err);
  }
}

async function signuphandlear(req, res) {
  try {
    console.log("inside signupPost");
    const { fullname, email, password, confirmPassword } = req.body;
    console.log("body:", req.body);
    if (!fullname || !email || !password || !confirmPassword) {
      return res.status(400).render("signup", {
        message: "Please enter all fields",
      });
    }
    if (password.length < 6)
      return res.status(400).render("signup", {
        message: "Password should be atleast 6 characters long",
      });
    const checkExists = await userDb.findOne({ email: email });
    if (checkExists) {
      return res.status(400).render("signup", {
        message: "User already exists",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).render("signup", {
        message: "Passwords do not match",
      });
    }
    const shortid = shortID.generate();

    // Create a new instance of the user model
    const newUser = new userDb({
      fullname,
      email,
      password,
      userid: shortid,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    console.log("User saved:", savedUser);
    return res.redirect("/login");
  } catch (error) {
    console.error("Error during signup post:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { loginhandlear, signuphandlear };
