const router = require('express').Router()

router.get('/', async (req, res) => {
console.log("in the route");
    res.send("Hello there!!")
})
module.exports = router