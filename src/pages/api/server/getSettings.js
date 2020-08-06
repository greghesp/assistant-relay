const { configuration } = require('../.././../../server/helpers/db');

export default async (req, res) => {
  try {
    const db = configuration();

    let port = db.get('port').value();
    let muteStartup = db.get('muteStartup').value();
    let quietHours = db.get('quietHours').value();
    let language = db.get('conversation.lang').value();
    let track = db.get('track').value();

    res.status(200).send({ port, muteStartup, quietHours, language, track });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
