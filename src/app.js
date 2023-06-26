import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const tweets = [];

const users = [];

app.post("/sign-up", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  users.push(newUser);

  res.status(201).send("Ok!");
});

app.post("/tweets", (req, res) => {
  const { tweet, username } = req.body;

  const signedUser = users.find((user) => user.username === username);

  if (!signedUser) {
    res.status(401).send("Usuário não cadastrado!");
    return;
  }

  const newTweet = {
    username,
    tweet,
  };

  tweets.push(newTweet);

  res.status(201).send("Ok");
});

app.get("/tweets", (req, res) => {
  let lastTweets = tweets
    .slice(-10)
    .reverse()
    .map((tweet) => {
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

app.get("/users", (req, res) => {
  res.send(users);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
