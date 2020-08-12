import { useEffect, useState } from 'react';
import { post, postWithKey } from '../helpers/api';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import withAuth from '~/src/helpers/withAuth';

import Dashboard from '~/src/layouts/Dashboard';
import ResponseBlock from '../components/ResponseBlock';
import LoadingAnimation from '../components/LoadingAnimation';

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

function Sandbox() {
  const [json, setJSON] = useState({ broadcast: false, talkback: false });
  const [apiKey, setApiKey] = useState();
  const [showResponse, setShowResponse] = useState(false);
  const [disabled, setDisabled] = useState([]);
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const r = await post('/api/server/getUsers');
        setUsers(r.data.users);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    getUsers();
  }, []);

  async function sendRequest(e) {
    e.preventDefault();
    setSending(true);
    try {
      const response = await postWithKey('/api/assistant', json, apiKey);
      setResponse(response.data);
    } catch (e) {
      if (e.response.status === 401) {
        setResponse({
          success: false,
          response: e.response.data.msg,
        });
      } else {
        setResponse({
          success: false,
          response: e.response.data.error,
        });
      }
    }
    setSending(false);
    setShowResponse(true);
  }

  if (loading) return null;
  return (
    <Dashboard title="Sandbox">
      {response?.rawHtml ? (
        <div className="overlay" dangerouslySetInnerHTML={{ __html: response.rawHtml }} />
      ) : null}
      <ResponseBlock response={response} show={showResponse} close={() => setShowResponse(false)} />
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
                          const u = e.target.value;
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
                        placeholder="How much wood could a woodchuck chuck, if a woodchuck could chuck wood?"
                        onKeyUp={e => {
                          const c = e.target.value;

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
                      Ask the Google Assistant a question or tell it a command.
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
                          const u = e.target.value;
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
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="preset"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Device
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        id="device"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        onChange={e => {
                          const u = e.target.value;
                          if (u.length === 0) {
                            return setJSON($ => {
                              delete $.device;
                              return { ...$ };
                            });
                          }
                          setJSON($ => ({ ...$, device: u }));
                        }}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="apiKey"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      API Key
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        id="apiKey"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        onChange={e => {
                          const u = e.target.value;
                          if (u.length === 0) return setApiKey(null);
                          setApiKey(u);
                        }}
                      />
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
                        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        defaultChecked={json.broadcast}
                        onChange={e => {
                          const u = e.target.checked;
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
                        id="talkback"
                        disabled={disabled.includes('talkback')}
                        defaultChecked={json.talkback}
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        onChange={e => {
                          const u = e.target.checked;

                          if (u) {
                            setDisabled($ => [...$, 'preset']);
                            return setJSON($ => ({ ...$, talkback: u }));
                          }

                          setDisabled($ => {
                            const a = $.filter(f => f !== 'preset');
                            return a;
                          });

                          return setJSON($ => {
                            delete $.talkback;
                            return { ...$ };
                          });
                        }}
                      />
                    </div>
                    <div className="pl-7 text-sm leading-5">
                      <label htmlFor="talkback" className="font-medium text-gray-700">
                        Talkback
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
                    onClick={e => sendRequest(e)}
                    disabled={sending}
                    className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                  >
                    {sending ? (
                      <span className="-my-5 h-15 ">
                        <LoadingAnimation />
                      </span>
                    ) : (
                      <span>Execute</span>
                    )}
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
                <CopyToClipboard text={JSON.stringify(json, null, 4)}>
                  <button className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
                    Copy JSON
                  </button>
                </CopyToClipboard>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default withAuth(Sandbox);
