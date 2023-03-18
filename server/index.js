const express = require('express');
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a Merkle Tree root here representing the whole nice list
// Paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '';

app.post('/gift', (req, res) => {
  const { name, proof } = req.body;

  // Verify that the proof is valid for the given name and Merkle Tree root
  const isValid = verifyProof(proof, name, MERKLE_ROOT);

  if (isValid) {
    // If the proof is valid, send the gift message
    res.send('You got a toy robot!');
  } else {
    // Otherwise, send an error message
    res.status(400).send('You are not on the list :(');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
