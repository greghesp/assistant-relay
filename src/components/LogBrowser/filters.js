function Filters({ searchText, rowCount, logOrder, logLevel, serviceLevel }) {
  return (
    <div className="mb-5 flex space-x-4">
      <div className="max-w-lg flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          Rows
        </span>
        <select
          id="rows"
          defaultValue="10"
          className="flex-1 form-select block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          onChange={e => {
            rowCount(e.target.value);
          }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
      </div>
      <div className="max-w-lg flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          Order
        </span>
        <select
          id="order"
          defaultValue="desc"
          className="flex-1 form-select block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          onChange={e => {
            logOrder(e.target.value);
          }}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <div className="max-w-lg flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          Level
        </span>
        <select
          id="level"
          defaultValue="all"
          className="flex-1 form-select block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          onChange={e => {
            logLevel(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
        </select>
      </div>
      <div className="max-w-lg flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          Service
        </span>
        <select
          id="service"
          defaultValue="all"
          className="flex-1 form-select block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          onChange={e => {
            serviceLevel(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="server">Server</option>
          <option value="assistant">Assistant</option>
          <option value="web">Web</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
