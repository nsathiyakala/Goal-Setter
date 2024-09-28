const GoalModel = require("../Model/goalSchema")
const userModel = require("../Model/userSchema")

exports.getGoals = async (req, res) => {
    try {
        const getGoal = await GoalModel.find({ user: req.user.id })

        res.status(200).json({
            status: "Success",
            message: getGoal
        })
    } catch (error) {
        res.status(400).json({
            status: "false",
            message: error.message
        })
    }

}

exports.postGoal = async (req, res) => {
    try {
        const { text } = req.body
        const postGoal = await GoalModel.create({ text, user: req.user.id })


        res.status(200).json({
            status: "Success",
            message: postGoal
        })
    } catch (error) {
        res.status(400).json({
            status: "false",
            message: error.message
        })
    }


}

exports.putGoal = async (req, res) => {
    try {
        const GoalId = await GoalModel.findById(req.params.id)
        if (!GoalId) {
            return res.status(400).json({
                status: "false",
                message: "Goal not Found"
            })

        }

        const user = await userModel.findById(req.user.id)

        if (GoalId.user.toString() !== user.id) {
            return res.status(400).json({
                status: "false",
                message: "Goal not Found in your List"
            })
        }


        const putGoal = await GoalModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({
            status: "success",
            message: putGoal
        })
    } catch (error) {
        res.status(400).json({
            status: "false",
            message: error.message
        })
    }

}

exports.deleteGoal = async (req, res) => {

    try {
        const goalId = await GoalModel.findById(req.params.id)
        if (!goalId) {
            return res.status(400).json({
                status: "false",
                message: "Goal Not Found"
            })
        }

        const user = await userModel.findById(req.user.id)

        if (goalId.user.toString() !== user.id) {
            return res.status(400).json({
                status: "false",
                message: "Goal not Found in your List"  
            })
        } 

        const deleteGoal = await GoalModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "true",
            message: deleteGoal._id
        })
    }

    catch (error) {
        res.status(400).json({
            status: "false",
            message: error.message
        })
    }

}