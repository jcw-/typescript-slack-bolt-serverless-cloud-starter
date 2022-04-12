import { api, data, http, params } from "@serverless/cloud";
import { GenericMessageEvent } from "@slack/bolt";
import pkg from "@slack/bolt";
import * as bolt from "@slack/bolt";
const { App, ExpressReceiver } = pkg ?? bolt;

const receiver = new ExpressReceiver({
  signingSecret: params.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: params.SLACK_BOT_TOKEN,
  receiver,
  processBeforeResponse: true,
});

type User = {
  key: string;
  value: {
    id: string;
    name: string;
    status: string;
  };
  label1: string;
};

api.get("/users", async (_req, res) => {
  const { items } = (await data.get("user:*", true)) as {
    items: User[];
  };

  res.send({
    users: items,
  });
});

// Listens to incoming messages that contain "hello"
app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  const msg = message as GenericMessageEvent;
  await say(`Hey there <@${msg.user}>!`);
});

http.use(receiver.app);
