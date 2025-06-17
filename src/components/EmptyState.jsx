import { Link } from 'react-router-dom';

export function Empty() {
  return (
    <div className="text-center text-gray-500 dark:text-gray-400 p-6 flex flex-col items-center justify-center">
      <p className="mb-4">No data to display.</p>
      <Link
        to="ticket/new"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-[25px] transition"
      >
        + Create Ticket
      </Link>
    </div>
  );
}
