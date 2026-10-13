const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../Models/User");

exports.SignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const found = await User.findOne({ email });

    if (found) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Email is already existed" }] });
    }

    const newUser = new User(req.body);

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    newUser.password = hashedPassword;
    await newUser.save();

    // token
    const payload = { id: newUser._id };
    var token = jwt.sign(payload, process.env.privateKey, {expiresIn : '1h'});

    res.status(200).send({ msg: "Account created", newUser, token });
  } catch (error) {
    res
      .status(500)
      .send({ errors: [{ msg: "could not create user account" }] });
  }
}


exports.SignIn = async(req, res)=>{
  try{
const {email, password} = req.body

const found = await User.findOne({email})

if(!found){
  return res.status(400).send({errors : [{msg: "Email not found"}]})
}

const matched = bcrypt.compareSync(password, found.password)
if(!matched){
  return res.status(400).send({errors : [{msg: "Wrog password"}]})
}

 // token
    const payload = { id: found._id };
    var token = jwt.sign(payload, process.env.privateKey, {expiresIn : '1h'});

    res.status(200).send({msg: "Logged in", found, token})
  }catch(error){
    res.status(500).send({msg: "could not logIn"})
  }
}