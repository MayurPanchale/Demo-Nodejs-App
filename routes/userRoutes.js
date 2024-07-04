const db = require('../db/index')
const router = require('express').Router()

router.post('/register', async (req, res) => {

    //validate request
    if (!req.body.email) return res.status(400).send("Ooops.. Email missing")
    if (!req.body.username) return res.status(400).send("Ooops.. Username missing")
    if (!req.body.userpassword) return res.status(400).send("Ooops.. Password missing")

    //register new user
     await db.query('INSERT INTO test_table (email, username, userpassword) VALUES($1, $2, $3)', [req.body.email, req.body.username, req.body.userpassword], (err, result) => {
        if (err) {
            console.log("into register",err);
            return res.status(500).json(err)
        }
        return res.status(201).json({
            email: req.body.email,
            username: req.body.username
        })
    })
})

router.get('/findAll', async (req, res) => {
    console.log("inside users route!");
    //find a new user
    await db.query('SELECT * FROM test_table', (err, result) => {
        if (err) {
            console.log('error: ', err);
            return res.status(500).json(err)
        }
        return res.status(200).send(result.rows)

    })
})

router.get('/findOne/:email', async (req, res) => {
const email = req.params.email
    //validate request
    if (!email) return res.status(400).send('Username required..')

    //find a new user
    await db.query('SELECT * FROM test_table WHERE position (username in $1)>0', [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err)
        }
        return res.status(200).send(result.rows)

    })
})
router.delete('/delete/:username', async (req, res) => {

    //validate request
    if (!req.params.username) return res.status(400).send('Username required..')

     await db.query("DELETE FROM test_table WHERE position (username in $1)>0", [req.params.username], (err, result) => {
        if (err) {
            console.log("delete error",err);

            return res.status(500).json(err)
        }
        return res.status(200).json({ message: "User deleted successfully..." })
    })

})

router.put('/update/:username', async (req, res) => {

    //validate request
    if (!req.params.username) return res.status(400).send('Username required..')

    await db.query("UPDATE test_table SET email = $1, userpassword = $2 WHERE username =$3", [req.body.email, req.body.userpassword, req.params.username], (err, result) => {
        if (err) {
            console.log("UPDATE error",err);
            return res.status(500).json(err)
        }
        return res.status(200).json({ message: "User modified..." })
    })

})

module.exports = router