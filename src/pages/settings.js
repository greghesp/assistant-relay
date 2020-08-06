import Dashboard from '~/src/layouts/Dashboard';
import withAuth from '~/src/helpers/withAuth';
import { useEffect, useState } from 'react';
import { post } from '../helpers/api';

var TimePicker = require('basic-react-timepicker');

function Settings() {
  const [settings, setSettings] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSettings() {
      try {
        const r = await post('/api/server/getSettings');
        setSettings(r.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    getSettings();
  }, []);

  async function sendRequest(json) {
    try {
      await post('/api/server/saveSettings', json);
    } catch (e) {
      console.log(e);
    }
  }

  if (loading) return null;

  return (
    <Dashboard title="Settings">
      <div className="bg-white rounded-lg shadow-lg p-5 mt-10">
        <div className="mt-6">
          <div role="group" aria-labelledby="label-notifications">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
              <div>
                <div
                  className="text-base leading-6 font-medium text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700"
                  id="label-notifications"
                >
                  Mute Startup Sound
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="max-w-lg">
                  <p className="text-sm leading-5 text-gray-500">
                    Enabled or Disable the notification when Assistant Relay starts up
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <input
                        id="startup-sound"
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        defaultChecked={settings.muteStartup}
                        onChange={e => {
                          sendRequest({ muteStartup: e.target.checked });
                        }}
                      />
                      <label htmlFor="startup-sound" className="ml-3">
                        <span className="block text-sm leading-5 font-medium text-gray-700">
                          Enabled
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-5">
          <div role="group" aria-labelledby="label-notifications">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
              <div>
                <div
                  className="text-base leading-6 font-medium text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700"
                  id="label-notifications"
                >
                  Track Install
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="max-w-lg">
                  <p className="text-sm leading-5 text-gray-500">
                    Allow Assistant Relay to track to version you have installed
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <input
                        id="startup-sound"
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        defaultChecked={settings.track}
                        onChange={e => {
                          sendRequest({ track: e.target.checked });
                        }}
                      />
                      <label htmlFor="startup-sound" className="ml-3">
                        <span className="block text-sm leading-5 font-medium text-gray-700">
                          Enabled
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-5">
          <div role="group" aria-labelledby="label-notifications">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
              <div>
                <div
                  className="text-base leading-6 font-medium text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700"
                  id="label-notifications"
                >
                  Port Number
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="max-w-lg">
                  <p className="text-sm leading-5 text-gray-500">
                    Set the port Assistant Relay runs on
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <input
                        id="port"
                        defaultValue={settings.port}
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-5">
          <div role="group" aria-labelledby="label-notifications">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
              <div>
                <div
                  className="text-base leading-6 font-medium text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700"
                  id="label-notifications"
                >
                  Quiet Hours
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="max-w-lg">
                  <p className="text-sm leading-5 text-gray-500">
                    Quiet Hours prevents Assistant Relay from sending out broadcast commands
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <input
                        id="qh-enabled"
                        name="form-input push_notifications"
                        type="radio"
                        defaultChecked={settings.quietHours.enabled}
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        onChange={e => {
                          sendRequest({ 'quietHours.enabled': true });
                        }}
                      />
                      <label htmlFor="h-enabled" className="ml-3">
                        <span className="block text-sm leading-5 font-medium text-gray-700">
                          Enabled
                        </span>
                      </label>
                    </div>
                    <div className="mt-4 flex items-center">
                      <input
                        id="qh-disabled"
                        name="form-input push_notifications"
                        type="radio"
                        defaultChecked={!settings.quietHours.enabled}
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        onChange={e => {
                          sendRequest({ 'quietHours.enabled': false });
                        }}
                      />
                      <label htmlFor="qh-disabled" className="ml-3">
                        <span className="block text-sm leading-5 font-medium text-gray-700">
                          Disabled
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="max-w-lg pt-5">
                  <p className="text-sm leading-5 text-gray-500">
                    Quiet Hours prevents Assistant Relay from sending out broadcast commands
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <TimePicker />
                      <label htmlFor="h-enabled" className="ml-3">
                        <span className="block text-sm leading-5 font-medium text-gray-700">
                          Enabled
                        </span>
                      </label>
                    </div>
                    <div className="mt-4 flex items-center">
                      <input
                        id="qh-disabled"
                        name="form-input push_notifications"
                        type="radio"
                        defaultChecked={!settings.quietHours.enabled}
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        onChange={e => {
                          sendRequest({ 'quietHours.enabled': false });
                        }}
                      />
                      <label htmlFor="qh-disabled" className="ml-3">
                        <span className="block text-sm leading-5 font-medium text-gray-700">
                          Disabled
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-5">
          <div role="group" aria-labelledby="label-notifications">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
              <div>
                <div
                  className="text-base leading-6 font-medium text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700"
                  id="label-notifications"
                >
                  Conversation Language
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="max-w-lg">
                  <p className="text-sm leading-5 text-gray-500">
                    Change the{' '}
                    <a
                      href="https://support.google.com/googlenest/answer/7550584?hl=en"
                      target="_blank"
                    >
                      language
                    </a>{' '}
                    of the Google Assistant instance
                  </p>
                  <div className="mt-4">
                    <div className="mt-1 rounded-md shadow-sm">
                      <select
                        id="country"
                        className="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        defaultValue={settings.language}
                        onChange={e => {
                          sendRequest({ 'conversation.lang': e.target.value });
                        }}
                      >
                        <option value="de-DE">German (Germany)</option>
                        <option value="en-AU">English (Australia)</option>
                        <option value="en-CA">English (Canada)</option>
                        <option value="en-GB">English (United Kingdom)</option>
                        <option value="en-IN">English (India)</option>
                        <option value="en-US">English (United States)</option>
                        <option value="fr-CA">French (Canada)</option>
                        <option value="fr-FR">French (France)</option>
                        <option value="it-IT">Italian (Italy)</option>
                        <option value="ja-JP">Japanese (Japan)</option>
                        <option value="es-ES">Spanish (Spain)</option>
                        <option value="es-MX">Spanish (Mexico)</option>
                        <option value="ko-KR">Korean (South Korea)</option>
                        <option value="pt-BR">Portuguese (Brazil)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default withAuth(Settings);
