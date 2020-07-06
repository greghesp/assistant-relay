const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const dbAdapter = new FileSync(path.resolve(process.cwd(), 'server/bin', 'db.json'));

async function RouteRedirect({ WrappedComponent, ...passThroughProps }) {
  const db = await low(dbAdapter);
  const userCount = await db.get('users').size().value();

  return <WrappedComponent userCount={userCount} {...passThroughProps} />;
}

export default RouteRedirect;
