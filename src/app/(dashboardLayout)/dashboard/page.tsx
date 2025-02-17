// app/dashboard/page.tsx
import {

  Folder,
  BookOpen,
  Mail,


  Users,
} from "lucide-react";
export default function DashboardPage() {
  // Temporary stats data
  const stats = [
    { name: "Total Projects", value: "12", change: "+2.5%", icon: Folder },
    { name: "Total Blog Posts", value: "24", change: "+10%", icon: BookOpen },
    { name: "New Messages", value: "5", change: "+2", icon: Mail },
    { name: "Active Users", value: "3", icon: Users },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  {stat.change && (
                    <span className="text-sm text-green-600">
                      {stat.change}
                    </span>
                  )}
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium">New project created</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm">
              View
            </button>
          </div>
          {/* Add more activity items */}
        </div>
      </div>
    </div>
  );
}