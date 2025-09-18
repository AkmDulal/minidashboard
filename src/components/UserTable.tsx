"use client";

import { motion } from "framer-motion";
import { User } from "@/types";

interface UserTableProps {
  users: User[];
  onRowClick: (user: User) => void;
}

export default function UserTable({ users, onRowClick }: UserTableProps) {
  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Company
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                className="cursor-pointer transition-colors hover:bg-gray-50"
                onClick={() => onRowClick(user)}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {user.company.name}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
