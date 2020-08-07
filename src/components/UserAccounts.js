function UserAccounts({ accounts, deleteUser }) {
  if (accounts.length <= 0)
    return (
      <div className="pt-5">
        <p className="text-center">No users</p>
      </div>
    );

  return (
    <div className="flex pt-5 overflow-x-auto min-w-full">
      <table className="min-w-full">
        {accounts.map((u, i) => {
          return (
            <tbody className="bg-white divide-y divide-gray-200" key={i}>
              <tr>
                <td className="px-6 py-4 break-words text-sm text-gray-900">{u}</td>
                <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                  <button onClick={() => deleteUser(u)} className="text-red-600 hover:text-red-900">
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
export default UserAccounts;
