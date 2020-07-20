import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { post } from '../helpers/api';
import path from 'path';

function ChangePassword({ keys, deleteKey }) {
  return (
    <div className="flex pt-5 overflow-x-auto min-w-full">
      <table className="min-w-full">
        {keys.map((k, i) => {
          return (
            <tbody className="bg-white divide-y divide-gray-200" key={i}>
              <tr>
                <td className="px-6 py-4 text-gray-900">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-600 hover:text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"
                      clipRule="evenodd"
                    />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
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
export default ChangePassword;
