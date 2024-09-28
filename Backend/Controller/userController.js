const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const UsersModel = require('../Model/userSchema')
exports.registerUser = async (req, res) => {

    const { Name, Email, Password } = req.body

    if (!Name || !Email || !Password) {
        return res.status(400).json({
            status: false,
            message: "Please Fill All Fields !"
        })
    }

    const userExist = await UsersModel.findOne({ Email })

    if (userExist) {
        return res.status(400).json({
            status: false,
            message: "User Already Exist !"
        })
    }

    const slat = await bcrypt.genSalt(10)
    const hassedpassword = await bcrypt.hash(Password, slat)



    const registeruser = await UsersModel.create({ Name, Email, Password: hassedpassword })

    if (registeruser) {
        res.status(200).json({
            status: true,
            message: "User Registered !",
            data: {
                id: registeruser._id,
                name: registeruser.Name,
                email: registeruser.Email,
                token: generateTokens(registeruser._id)
            }
        })
    }
    else {
        res.status(400).json({
            status: false,
            message: error,
            data: message.error
        })
    }

    // try {
    //     return res.json({
    //         status: true, 
    //         message: "User Registered",
    //         data: registeruser
    //     }
    //     )
    // } catch (error) {
    //     return res.json({
    //         status: false,
    //         message: error,
    //         data: message.error
    //     }
    //     )
    // }


}

exports.loginUser = async (req, res) => {

    const { Email, Password } = req.body

    if (!Email || !Password) {
        res.status(400).json({
            status: false,
            message: "Please Fill All Fields !"
        })

    }

    const loginUser = await UsersModel.findOne({ Email })
    const loginPassword = await bcrypt.compare(Password, loginUser.Password)

    if (loginUser && loginPassword) {
        res.status(200).json({
            status: true,
            message: "User Logined !",
            data: {
                id: loginUser._id,
                name: loginUser.Name,
                email: loginUser.Email,
                token: generateTokens(loginUser._id)
            }
        })
    }
    else {
        res.status(400).json({
            status: false,
            message: "Invalid Credentials !"
        })
    }

    // return res.json({
    //     status: true,
    //     message: "User Login"
    // } 
    // )
}

exports.getUser = async (req, res) => {
    try {
        const { _id, Name, Email } = await UsersModel.findById(req.user.id)
        res.status(200).json({
            satus: true,
            message: {
                _id,
                Name,
                Email
            }
        })
    } catch (error) {
        res.status(200).json({
            satus: true,
            message:"user not fetched"
        })    
    }

}

const generateTokens = (id) => {
    return jsonwebtoken.sign({ id }, process.env.SCRET_KEY, { expiresIn: "30d" })
}



