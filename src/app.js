import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const tweets = [
  {
    username: "bobesponja",
    avatar:
      "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
    tweet: "Eu amo hambúrguer de siri!",
  },
];

const users = [
  {
    username: "bobesponja",
    avatar:
      "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
  },
];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  const newUser = {
    username,
    avatar,
  };

  users.push(newUser);
  res.status(201).send("Ok!");
});

app.post("tweets", (req, res) => {
  const { tweet, username } = req.body;

  const signedUser = users.find((user) => user.username === username);

  if (!signedUser) {
    res.status(401).send("Usuário não cadastrado!");
    return;
  }

  const newTweet = {
    username: username,
    tweet: tweet,
  };

  tweets.push(newTweet);

  res.status(201).send("Ok");
});

app.get("/tweets", (req, res) => {
  let lastTweets = [];

  if (tweets.length > 10) {
    lastTweets = tweets.slice(tweets.length - 10);
  } else {
    lastTweets = tweets.slice();
  }

  lastTweets = lastTweets.map((tweet) => {
    const user = users.find((user) => user.username === tweet.username);
    if (user) {
      return {
        ...tweet,
        avatar: user.avatar,
      };
    }
    return tweet;
  });

  res.send(lastTweets);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
