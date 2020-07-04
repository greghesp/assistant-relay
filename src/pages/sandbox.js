import { useState } from 'react';
import Dashboard from '~/src/layouts/Dashboard';
import path from 'path';
import low from 'lowdb';

const presets = [
  {
    key: 'none',
    title: '',
  },
  {
    key: 'wakeup',
    title: 'Wake Up',
  },
  {
    key: 'breakfast',
    title: 'Breakfast',
  },
  {
    key: 'lunch',
    title: 'Lunch',
  },
  {
    key: 'dinner',
    title: 'Dinner',
  },
  {
    key: 'timetoleave',
    title: 'Time To Leave',
  },
  {
    key: 'arrivedhome',
    title: 'Arrived Home',
  },
  {
    key: 'ontheway',
    title: 'On The Way',
  },
  {
    key: 'movietime',
    title: 'Movie Time',
  },
  {
    key: 'bedtime',
    title: 'Bed Time',
  },
];

function Sandbox({ users }) {
  const [json, setJSON] = useState({ broadcast: true, converse: false });
  const [disabled, setDisabled] = useState([]);

  return (
    <Dashboard title="Sandbox">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="bg-white rounded-lg shadow-lg p-5 mt-10 md:col-span-2">
          <form>
            <div>
              <div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Assistant Relay Sandbox
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Use the below form to build and test the JSON data to send to the assistant
                    endpoint
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="user"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      User
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <select
                        id="user"
                        className="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        onChange={e => {
                          const u = document.getElementById('user').value;
                          if (u.length === 0) {
                            return setJSON($ => {
                              delete $.user;
                              return { ...$ };
                            });
                          }
                          setJSON($ => ({ ...$, user: u }));
                        }}
                      >
                        <option key="none" />
                        {users.map((u, i) => {
                          return (
                            <option key={i} value={u}>
                              {u}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Command
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <textarea
                        disabled={disabled.includes('command')}
                        id="command"
                        rows="3"
                        className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        onKeyUp={() => {
                          const c = document.getElementById('command').value;

                          if (c.length === 0) {
                            setDisabled($ => {
                              const a = $.filter(f => f !== 'preset');
                              return a;
                            });

                            return setJSON($ => {
                              delete $.command;
                              return { ...$ };
                            });
                          }
                          setDisabled($ => [...$, 'preset']);
                          setJSON($ => {
                            if (json.preset) delete $.preset;
                            return { ...$, command: c };
                          });
                        }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Tell Google Assistant what you want it to do.
                    </p>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="preset"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Presets
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <select
                        disabled={disabled.includes('preset')}
                        id="preset"
                        className="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        value={json.preset ? json.preset : 'none'}
                        onChange={e => {
                          const u = document.getElementById('preset').value;
                          if (u.length === 0) {
                            return setJSON($ => {
                              delete $.preset;
                              return { ...$ };
                            });
                          }
                          setJSON($ => ({ ...$, preset: u }));
                        }}
                      >
                        {presets.map((p, i) => {
                          return (
                            <option key={i} value={p.key}>
                              {p.title}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <div className="relative flex items-start">
                    <div className="absolute flex items-center h-5">
                      <input
                        id="broadcast"
                        disabled={disabled.includes('broadcast')}
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        defaultChecked={json.broadcast}
                        onChange={() => {
                          const u = document.getElementById('broadcast').checked;
                          setJSON($ => ({ ...$, broadcast: u }));
                        }}
                      />
                    </div>
                    <div className="pl-7 text-sm leading-5">
                      <label htmlFor="broadcast" className="font-medium text-gray-700">
                        Broadcast
                      </label>
                      <p className="text-gray-500">Broadcast the command entered above</p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="relative flex items-start">
                    <div className="absolute flex items-center h-5">
                      <input
                        id="converse"
                        disabled={disabled.includes('converse')}
                        defaultChecked={json.converse}
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        onChange={() => {
                          const u = document.getElementById('converse').checked;

                          if (u) {
                            setDisabled($ => [...$, 'preset']);
                            return setJSON($ => ({ ...$, converse: u }));
                          }

                          setDisabled($ => {
                            const a = $.filter(f => f !== 'preset');
                            return a;
                          });

                          return setJSON($ => {
                            delete $.converse;
                            return { ...$ };
                          });
                        }}
                      />
                    </div>
                    <div className="pl-7 text-sm leading-5">
                      <label htmlFor="converse" className="font-medium text-gray-700">
                        Converse
                      </label>
                      <p className="text-gray-500">Broadcast the response from the above command</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-5">
              <div className="flex justify-end">
                <span className="ml-3 inline-flex rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-indigo active:bg-blue-700 transition duration-150 ease-in-out"
                  >
                    Execute
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5 mt-10 md:col-span-1">
          <div>
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">JSON Data</h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Use this data in your request to the assistant endpoint
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Command
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <textarea
                      id="command"
                      readOnly
                      rows="18"
                      className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={JSON.stringify(json, null, 4)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" pt-5">
            <div className="flex justify-end">
              <span className="ml-3 inline-flex rounded-md shadow-sm">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-indigo active:bg-blue-700 transition duration-150 ease-in-out"
                >
                  Copy JSON
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export async function getStaticProps(context) {
  const FileSync = require('lowdb/adapters/FileSync');
  const dbAdapter = new FileSync(path.resolve(process.cwd(), 'server/bin', 'db.json'));
  const db = await low(dbAdapter);
  const responses = await db.get('users').value();
  const users = [];

  responses.forEach(u => users.push(u.name));

  return {
    props: {
      users,
    },
  };
}

export default Sandbox;
