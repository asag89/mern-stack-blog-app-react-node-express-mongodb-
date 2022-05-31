
const router = require("express").Router()

const protect = require("../middleware/authMiddleware")

const {
    login,
    register,
    getUser,
    updateUser,
    deleteUser } = require("../controllers/userController")

router.post("/login", login)

router.post("/register", register)

router.get("/:id", getUser)

router.put("/updateUser", protect, updateUser)

router.delete("/", protect, deleteUser)

module.exports = router