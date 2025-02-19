"use client";
import EmptyState from "@/components/shared/EmptyState";
import Spinner from "@/components/shared/Spinner";
import { Mail, Trash, Eye, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  date: string;
  status: string;
  body: string;
}

export default function MessageManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/message");
        const data = await response.json();
        setMessages(data?.body);
      } catch (error) {
        console.error("Error fetching message:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const openModal = async (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);

    if (message.status !== "Read") {
      setUpdatingId(message._id);
      try {
        const response = await fetch(`/api/message/${message._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Read" }),
        });

        if (!response.ok) throw new Error("Failed to update status");

        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === message._id ? { ...msg, status: "Read" } : msg
          )
        );
      } catch (error) {
        console.error("Error updating status:", error);
      } finally {
        setUpdatingId(null);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  const handleDelete = async (messageId: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    setDeletingId(messageId);
    try {
      const response = await fetch(`/api/message/${messageId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete message");

      setMessages((prev) => prev.filter((message) => message._id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) return <Spinner />;

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
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Subject</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {messages.map((message) => (
              <tr key={message._id}>
                <td className="px-6 py-4">{message.name}</td>
                <td className="px-6 py-4">{message.email}</td>
                <td className="px-6 py-4">{message.subject}</td>
                <td className="px-6 py-4">{new Date(message?.date).toLocaleString()}</td>
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
                  <button
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => openModal(message)}
                    disabled={updatingId === message._id}
                  >
                    {updatingId === message._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(message._id)}
                    disabled={deletingId === message._id}
                  >
                    {deletingId === message._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash className="h-5 w-5" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">{selectedMessage.subject}</h2>
            <p>
              <strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})
            </p>
            <p>
              <strong>Date:</strong> {new Date(selectedMessage.date).toLocaleString()}
            </p>
            <p className="mt-4">{selectedMessage.body}</p>

            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {
        messages.length === 0 && !isLoading && (
          <EmptyState/>
        )
      }
    </div>
  );
}
