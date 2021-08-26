const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.get('/api/quotes/random', (req, res) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote});
})

app.get('/api/quotes', (req, res) => {
  if (req.query.person) {
    var queryPerson = req.query.person;
    var result = quotes.filter(quote => quote.person === queryPerson);
    res.send({quotes: result})
  } else {
    res.send({
      quotes: quotes
    })
  }
})

app.post('/api/quotes', (req, res) => {
  const newQuote = req.query.quote;
  const newPerson = req.query.person;
  if (newPerson && newQuote) {
    const newObject = {quote: newQuote, person: newPerson};
    quotes.push(newObject);
    res.send({quote: newObject})
  } else {
    res.status(400).send();
  }
})

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

