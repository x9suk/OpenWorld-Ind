'use client';

const recentContributions = [
  { id: 'CON-001', type: 'Monument', user: 'Rahul Sharma', status: 'Pending', date: '2026-06-12' },
  { id: 'CON-002', type: 'Food Entry', user: 'Priya Patel', status: 'Approved', date: '2026-06-11' },
  { id: 'CON-003', type: 'Festival', user: 'Amit Singh', status: 'Pending', date: '2026-06-10' },
  { id: 'CON-004', type: 'Photo', user: 'Ananya Gupta', status: 'Rejected', date: '2026-06-09' },
  { id: 'CON-005', type: 'City Info', user: 'Vikram Joshi', status: 'Approved', date: '2026-06-08' },
];

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  Approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

const quickActions = [
  { label: 'Add State', icon: 'states', href: '/admin/states/new', color: 'from-blue-500 to-blue-600' },
  { label: 'Add Monument', icon: 'monuments', href: '/admin/monuments/new', color: 'from-amber-500 to-amber-600' },
  { label: 'Add Food', icon: 'foods', href: '/admin/foods/new', color: 'from-green-500 to-green-600' },
  { label: 'Add Festival', icon: 'festivals', href: '/admin/festivals/new', color: 'from-purple-500 to-purple-600' },
];

const actionIcons: Record<string, React.ReactNode> = {
  states: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  monuments: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  foods: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  festivals: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
};

const stats = [
  { label: 'Total States', value: '28', sub: 'Across India', icon: 'states' },
  { label: 'Total Monuments', value: '25+', sub: 'UNESCO &更多', icon: 'monuments' },
  { label: 'Total Foods', value: '30+', sub: 'Regional cuisines', icon: 'foods' },
  { label: 'Total Users', value: '--', sub: 'Registered', icon: 'users' },
  { label: 'Pending Contributions', value: '--', sub: 'Awaiting review', icon: 'contributions' },
];

const statIcons: Record<string, React.ReactNode> = {
  states: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  monuments: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  foods: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  contributions: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
};

function StatCard({ label, value, sub, icon }: { label: string; value: string; sub: string; icon: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{sub}</p>
        </div>
        <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
          {statIcons[icon]}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, Admin. Here is what is happening with OpenWorld India.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Contributions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left px-5 py-3 font-medium text-slate-500 dark:text-slate-400">ID</th>
                  <th className="text-left px-5 py-3 font-medium text-slate-500 dark:text-slate-400">Type</th>
                  <th className="text-left px-5 py-3 font-medium text-slate-500 dark:text-slate-400">User</th>
                  <th className="text-left px-5 py-3 font-medium text-slate-500 dark:text-slate-400">Status</th>
                  <th className="text-left px-5 py-3 font-medium text-slate-500 dark:text-slate-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentContributions.map((c) => (
                  <tr key={c.id} className="border-b border-gray-100 dark:border-slate-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{c.id}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{c.type}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{c.user}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Activity Chart</h2>
          </div>
          <div className="p-5 flex items-center justify-center h-64">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 dark:text-slate-600 mx-auto mb-3"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Activity Chart - Coming Soon</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Interactive charts will be available in the next update.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${action.color} text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all`}
            >
              <div className="p-2 rounded-lg bg-white/20">
                {actionIcons[action.icon]}
              </div>
              <span className="font-medium">{action.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
