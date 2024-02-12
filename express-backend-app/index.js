const express = require('express');
const bcrypt = require('bcrypt');
const app = express()
const port = 3000

app.use(express.json());


const users = []
const questions = [
    {
        title:'two sum',
        description: 'Given array, return the maximum of the array',
        testcases:[{
            input: '[1,2,3,4,5]',
            output: '5'
        }]
    }
]
const submissions = [
    {
        userId: '123',
        questionID: '1',
        code: 'code',
        status: 'accepted' 
    }]
app.post('/signup', async (req, res) => {
    //add logic to decode body
    //body should have email and body
    //store email and pwd in the user array above (only if the user email given doesn't exist)
    //retrn back 200 status code back to client
    
    try{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).send('email and password required');
    }

    const userExists = users.some(user => user.email === email);
    if(userExists){
        return res.status(400).send('user already exists');
    }

    const hashedpwd = await bcrypt.hash(password,10);

    const newUser = { email, password: hashedpwd};
    users.push(newUser);

    res.status(200).send('signup successfull')
    } 
    catch{
    res.status(500).send('Server error')
    }
})

app.post('/login', async (req, res) => {
    //add logic to decode the body
    //ody should have email and password
    //check if the user with the given email exists in user array
    //also ensure that pwd is same, if pwd is same send 200 status code else send 201 status code
    try{
        const {email, password} = req.body;

        if( !email || !password){
            return res.status(400).send('email and password required')
        }

        const user = users.find(user => user.email === email);

        if(!user){
            return res.status(401).send('user doesnot exists');
        }

        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).send('Password is incorrect');
        }

        res.status(200).send('login successfull');
    } catch (error){
        res.status(500).send('Server error');
    }
})

app.get('/questions', (req,res) => {
    //return all the questions to user
    try{
    if(questions.length == 0){
        return res.status(204).send('No questions available');
    }
    res.status(200).json(questions);
} catch(error){
    res.status(500).send('Server error');
}
})

app.get('/submissions', (req,res) => {
    //return the user submission to this problem

})


app.post('/submissions', (req,res) => {

    //let the user submit a problem, randomly accept or reject the solution
    //store the submission in the submission array above
    res.send('submissions')
})

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})