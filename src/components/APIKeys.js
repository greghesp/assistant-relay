import { CopyToClipboard } from 'react-copy-to-clipboard';
import UseAnimations from 'react-useanimations';
import copy from 'react-useanimations/lib/copy';

function APIKeys({ keys, deleteKey }) {
  return (
    <div className="flex pt-5 overflow-x-auto min-w-full">
      <table className="min-w-full">
        {keys.map((k, i) => {
          return (
            <tbody className="bg-white divide-y divide-gray-200" key={i}>
              <tr>
                <td className="px-6 py-4 text-gray-900">
                  <CopyToClipboard text={k}>
                    <UseAnimations animation={copy} />
                  </CopyToClipboard>
                </td>
                <td className="px-6 py-4 break-words text-sm text-gray-900">{k}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                  <button onClick={() => deleteKey(k)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
export default APIKeys;
