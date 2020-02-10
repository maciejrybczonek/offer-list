const express = require('express');
const faker = require('faker');
const cors = require('cors')
const weightedRandom = require('weighted-random');
const app = express();
const port = 3030;

let randomOffers = [];
let statuses = [
    {
        name: 'published',
        weight: 0.5
    }, {
        name: 'in_progress',
        weight: 0.2
    }, {
        name: 'waiting_for_approval',
        weight: 0.2
    }, {
        name: 'canceled',
        weight: 0.1
    }
];
let statusesWeights = statuses.map(status => status.weight);

for (let i = 0; i < 1000; i++) {
    let id = i + 1;
    randomOffers.push({
        id: id,
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        img_url: `https://picsum.photos/id/${10+id}/640/320`,
        price: faker.commerce.price(),
        discount: Math.floor(Math.random() * 80), // generate random number between 0 and 80
        rating: Math.round(((Math.random() * 4) + 1) * 100) / 100, // generate random rating between 1 and 5, then round to 2 decimal places
        status: statuses[weightedRandom(statusesWeights)].name, // select random weighted status
        created_at: new Date().toString()
    });
}

app.use(cors());

app.get('/v1/offers/', (req, res) => {
    let limit = req.query.limit || 30;
    let offset = req.query.offset || 0;
    let status = req.query.status;
    let offers = randomOffers.filter(randomOffer => !status ? randomOffer : randomOffer.status == status);
    setTimeout(() => {
        return res.json(offers.splice(offset, limit));
    }, 2000); // simulate internet connection delay
});

app.get('/v1/offers/:offerId', (req, res) => {
    let offerId = req.params.offerId;
    let offerDetails = randomOffers.find(randomOffer => randomOffer.id == offerId)
    return res.json(offerDetails);
});

app.listen(port, () => console.log(`API mock app listening on port ${port}!`))
