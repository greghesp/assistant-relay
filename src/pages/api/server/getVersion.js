const packageFile = require('../../../../package.json');

export default async (req, res) => {
  try {
    const { version } = packageFile;
    let v = version;

    if (version === '4.0.0') v = '4.0.0 (Alpha)';
    res.status(200).send({ version: v });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
