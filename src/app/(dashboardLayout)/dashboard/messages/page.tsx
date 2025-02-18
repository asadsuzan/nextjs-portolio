import { Mail, Trash, Eye } from "lucide-react";

export default function MessageManagement() {
  // Temporary message data
  const messages = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subject: "Collaboration Inquiry",
      date: "2024-03-15",
      status: "Unread",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Project Proposal",
      date: "2024-03-14",
      status: "Read",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Message Management</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="h-5 w-5" />
          <span>{messages.length} Messages</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {messages.map((message) => (
              <tr key={message.id}>
                <td className="px-6 py-4">{message.name}</td>
                <td className="px-6 py-4">{message.email}</td>
                <td className="px-6 py-4">{message.subject}</td>
                <td className="px-6 py-4">{message.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      message.status === "Unread"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}