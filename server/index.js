const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require('./models/User')



const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://vhwang:vhwang@styleme.ac7anh6.mongodb.net/")


// Add a new endpoint to fetch user information by email
app.get('/user/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await UserModel.findOne({ email: email });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error('Error fetching user info:', err);
        res.status(500).json({ message: "An error occurred. Please try again later." });
    }
});


app.post('/saveUserData', async (req, res) => {
    const { givenName, email } = req.body;

    // Assuming you want to save the given_name as the 'name' field
    const newUser = new UserModel({
        name: givenName,
        email,
        // You can decide how to handle the password, city, and style fields based on your requirements
        // For simplicity, you can set them to default values or leave them empty
        password: 'defaultPassword',
        city: 'defaultCity',
        style: 'defaultStyle',
    });

    try {
        await newUser.save();
        res.status(201).send('User data saved successfully.');
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Update the /login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Respond with a structured JSON response
                    res.json({ success: true, user: { name: user.name, email: user.email, city: user.city } });
                } else {
                    res.json({ success: false, message: "The password is incorrect" });
                }
            } else {
                res.json({ success: false, message: "No record exists" });
            }
        })
        .catch(err => res.status(500).json({ success: false, message: "An error occurred. Please try again later." }));
});

app.post('/register', async (req, res) => {
    const { email, city, style } = req.body;

    try {
        // Check if the user already exists in the database
        const existingUser = await UserModel.findOne({ email: email });

        if (existingUser) {
            // If the user exists, update their information
            existingUser.city = city || existingUser.city; // Use the new value if provided, otherwise keep the existing value
            existingUser.style = style || existingUser.style;
            await existingUser.save();
            res.json(existingUser);
        } else {
            // If the user does not exist, create a new user
            const newUser = new UserModel({
                email,
                city: city || 'defaultCity', // Set default values if not provided
                style: style || 'defaultStyle',
            });
            await newUser.save();
            res.json(newUser);
        }
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// New endpoint to fetch user information by email
app.get('/user/:email', (req, res) => {
    const email = req.params.email;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => res.status(500).json({ message: "An error occurred. Please try again later." }));
});


app.get('/outfits/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await UserModel.findOne({ email: email });

        if (user) {
            const { city } = user;
            // Fetch weather data based on user's city
            const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${user.city}&units=imperial&appid=${apiKey}`);
            const weatherData = weatherResponse.data;

            // Construct a query for outfit based on weather data
            const query = `outfit for ${weatherData.main.temp}°F ${weatherData.weather[0].description}`;

            // Fetch outfit search results using Custom Search API
            const searchResponse = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${searchEngineId}&cx=017576662512468239146:omuauf_lfve&q=${query}`);
            const outfitResults = searchResponse.data.items || [];

            res.json({ user, weather: weatherData, outfits: outfitResults });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error('Error fetching outfits:', err);
        res.status(500).json({ message: "An error occurred. Please try again later." });
    }
});


app.listen(3001, () => {
    console.log("Server is Running")
})
