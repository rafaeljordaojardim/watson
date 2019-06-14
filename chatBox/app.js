
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;
/*
username:   '{apikey}',
password: '{FaUsZP9hRN806Rgrvd90GOOcGEyfHomEk4QNjqYyXu3b>}',
url: 'https://gateway.watsonplatform.net/assistant/api/',
*/
const assistant = new AssistantV1({
  username: 'apikey',
  password: 'F2bssm3KJjTrxVGjQiPevNaTr0ZSI8t0tpGrcoyGisNj',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version:'2019-06-14',
});

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id:'03141835-dc53-493c-955a-d08d24c6d39d',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));