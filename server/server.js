const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const AKENEO_BASE_URL = process.env.AKENEO_BASE_URL;


app.use(cors());
app.use(bodyParser.json());

app.post('/api/token', async (req, res) => {
  try {
    const response = await axios.post(
      `${AKENEO_BASE_URL}/api/oauth/v1/token`,
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error obtaining token:', error.response?.data || error.message);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: 'An error occurred while obtaining the token' });
  }
});

app.get('/api/*', async (req, res) => {
  const token = req.headers.authorization;
  const endpoint = req.params[0];
  try {
    const response = await axios.get(
      `${AKENEO_BASE_URL}/api/${endpoint}`,
      {
        headers: {
          Authorization: token,
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error.response?.data || error.message);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: `An error occurred while fetching data from ${endpoint}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
