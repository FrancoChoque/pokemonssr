const router = require('express').Router();
const webpush = require('web-push');

webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY);
webpush.setVapidDetails(
  'http://localhost:3000',
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY,
);

const testData = {
  title: 'Testing',
  body: "It's a success!",
  icon: '/static/Pokeball.png',
};
let pushIntervalID;

router.post('/register', (req, res) => {
  const endpoint = req.body;
  res.sendStatus(201);
  setTimeout(() => webpush.sendNotification(endpoint.subs, JSON.stringify(testData))
    .then(resp => console.log(resp))
    .catch(err => console.log(err)), 2000);
});

router.delete('/unregister', (req, res) => {
  clearInterval(pushIntervalID);
  res.sendStatus(200);
});

module.exports = router;
