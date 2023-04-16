function send_push(key) {
  fetch(`https://api.pushbullet.com/v2/pushes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Token": `${process.env.PUSHBULLET_TOKEN}`,
    },
    body: JSON.stringify({
      "body": `Salaisuuden ID on ${key}`,
      "title": "Uusi salaisuus vastaanotettu",
      "url": `https://salaisuus.oskarijarvelin.fi/lue/${key}`,
      "type": "link"
    }),
  });
}

export default function handler(req, res) {
  const body = req.body;

  if (!body.pid) {
    return res.status(400).json({ data: "Missing Project ID" });
  }

  if (!body.title) {
    return res.status(400).json({ data: "Missing task title" });
  }

  fetch(
    `https://api.clickup.com/api/v2/list/${body.pid}/task?custom_task_ids=true&team_id=${process.env.CLICKUP_TEAM_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${process.env.CLICKUP_API_KEY}`
      },
      body: JSON.stringify({
        "name": body.title,
        "description": "Budjetti " + body.budget + "€",
        "priority": body.priority,
        "due_date": body.deadline,
        "due_date_time": true,
        "notify_all": true,
        "parent": null,
        "links_to": null,
      })
    }
  )
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp?.name === body.title) {
        //send_push(resp.secret_key);
        res.status(201).json({ success: true });
      } else {
        res
          .status(400)
          .json({ data: "Error. Task not created." });
      }
    });
}