'use client';
import React, { useState, useMemo, useEffect } from 'react';

const Icons = {
  LayoutDashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  FolderKanban: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 2-2 2v13a2 2 0 0 0 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/></svg>
  ),
  CheckSquare: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Plus: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Filter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  CheckCircle2: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  AlertCircle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  X: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Sparkles: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.28 1.28L3 12l5.8 1.9a2 2 0 0 1 1.28 1.28L12 21l1.9-5.8a2 2 0 0 1 1.28-1.28L21 12l-5.8-1.9a2 2 0 0 1-1.28-1.28Z"/></svg>
  ),
  TrendingUp: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  ),
  RefreshCw: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  LogOut: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
  ),
  ChevronUp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
  ),
  BookOpen: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  PieChartIcon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
  ),
  Activity: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  )
};

const initialProjects = [
  {
    id: 'proj-1',
    name: 'DevFlow Engine',
    category: 'Full Stack',
    status: 'In Progress',
    progress: 78,
    dueDate: '2026-09-15',
    month: 'Jun',
    tasksCount: 14,
    completedTasksCount: 11,
    description: 'REST API & analytics dashboard for automated developer workflow monitoring.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    priority: 'High'
  },
  {
    id: 'proj-2',
    name: 'AI Code Review Bot',
    category: 'AI / ML',
    status: 'In Progress',
    progress: 52,
    dueDate: '2026-09-28',
    month: 'Jul',
    tasksCount: 10,
    completedTasksCount: 5,
    description: 'Automated GitHub pull request analyzer powered by LLM summaries & security audits.',
    techStack: ['Python', 'FastAPI', 'OpenAI', 'Docker'],
    priority: 'High'
  },
  {
    id: 'proj-3',
    name: 'Component UI Design System',
    category: 'Frontend Design',
    status: 'Completed',
    progress: 100,
    dueDate: '2026-08-20',
    month: 'Jul',
    tasksCount: 20,
    completedTasksCount: 20,
    description: 'Accessible Tailwind CSS design system and reusable glassmorphism UI components.',
    techStack: ['Tailwind CSS', 'React', 'TypeScript', 'Storybook'],
    priority: 'Medium'
  },
  {
    id: 'proj-4',
    name: 'Database Migration Suite',
    category: 'Infrastructure',
    status: 'Pending',
    progress: 25,
    dueDate: '2026-10-05',
    month: 'Aug',
    tasksCount: 8,
    completedTasksCount: 2,
    description: 'Zero-downtime database schema migration scripts and verification tools.',
    techStack: ['PostgreSQL', 'Docker', 'Go', 'Redis'],
    priority: 'High'
  },
  {
    id: 'proj-5',
    name: 'Real-Time Telemetry Monitor',
    category: 'Cloud DevOps',
    status: 'In Progress',
    progress: 64,
    dueDate: '2026-10-18',
    month: 'Aug',
    tasksCount: 12,
    completedTasksCount: 8,
    description: 'Distributed microservice performance metrics logger and Prometheus scraper dashboard.',
    techStack: ['Next.js', 'Prometheus', 'Grafana', 'Node.js'],
    priority: 'Medium'
  },
  {
    id: 'proj-6',
    name: 'Mobile DevPulse Companion',
    category: 'Mobile Application',
    status: 'Completed',
    progress: 100,
    dueDate: '2026-11-01',
    month: 'Sep',
    tasksCount: 15,
    completedTasksCount: 15,
    description: 'Cross-platform mobile application for real-time task notifications and pull request tracking.',
    techStack: ['React Native', 'Expo', 'GraphQL', 'Tailwind'],
    priority: 'Low'
  },
  {
    id: 'proj-7',
    name: 'Cybersecurity Threat Analyzer',
    category: 'Security',
    status: 'In Progress',
    progress: 40,
    dueDate: '2026-10-25',
    month: 'Sep',
    tasksCount: 9,
    completedTasksCount: 4,
    description: 'Automated dependency vulnerability scanner and secret leak prevention scanner.',
    techStack: ['Python', 'Rust', 'Linux', 'Security Scanner'],
    priority: 'High'
  }
];

const initialTasks = [
  {
    id: 'task-101',
    projectId: 'proj-1',
    projectName: 'DevFlow Engine',
    title: 'Implement JWT authentication & refresh token rotation',
    status: 'Completed',
    priority: 'High',
    assignee: 'Palak',
    dueDate: 'Today'
  },
  {
    id: 'task-102',
    projectId: 'proj-1',
    projectName: 'DevFlow Engine',
    title: 'Design user productivity analytics charts & KPI cards',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Palak',
    dueDate: 'Tomorrow'
  },
  {
    id: 'task-103',
    projectId: 'proj-2',
    projectName: 'AI Code Review Bot',
    title: 'Connect FastAPI endpoint with OpenAI API key pool',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Palak',
    dueDate: 'Aug 30'
  },
  {
    id: 'task-104',
    projectId: 'proj-3',
    projectName: 'Component UI Design System',
    title: 'Publish WCAG accessibility audit compliance report',
    status: 'Completed',
    priority: 'Low',
    assignee: 'Palak',
    dueDate: 'Aug 22'
  },
  {
    id: 'task-105',
    projectId: 'proj-4',
    projectName: 'Database Migration Suite',
    title: 'Set up staging PostgreSQL environment replication',
    status: 'Pending',
    priority: 'Medium',
    assignee: 'Palak',
    dueDate: 'Sep 02'
  },
  {
    id: 'task-106',
    projectId: 'proj-5',
    projectName: 'Real-Time Telemetry Monitor',
    title: 'Configure WebSocket server connection for live CPU/RAM metrics',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Palak',
    dueDate: 'Sep 05'
  },
  {
    id: 'task-107',
    projectId: 'proj-7',
    projectName: 'Cybersecurity Threat Analyzer',
    title: 'Audit npm & PyPI dependency vulnerabilities in CI pipeline',
    status: 'Pending',
    priority: 'High',
    assignee: 'Palak',
    dueDate: 'Sep 08'
  }
];

function InteractiveProjectsLineChart({ projects }) {
  const [hoveredPointIndex, setHoveredPointIndex] = useState(null);

  const timelineData = useMemo(() => {
    const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    let runningTotal = 0;
    let runningCompleted = 0;

    return months.map(m => {
      const monthProjects = projects.filter(p => p.month === m);
      const newlyCreated = monthProjects.length;
      const newlyCompleted = monthProjects.filter(p => p.status === 'Completed').length;

      runningTotal += newlyCreated;
      runningCompleted += newlyCompleted;

      return {
        month: m,
        total: runningTotal,
        completed: runningCompleted,
        createdInMonth: monthProjects
      };
    });
  }, [projects]);

  const width = 500;
  const height = 220;
  const padding = 40;
  const maxVal = Math.max(...timelineData.map(d => d.total), 8);

  const getX = (index) => padding + (index * (width - 2 * padding)) / (timelineData.length - 1);
  const getY = (val) => height - padding - (val * (height - 2 * padding)) / maxVal;

  const totalPointsPath = timelineData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.total)}`).join(' ');
  const completedPointsPath = timelineData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.completed)}`).join(' ');

  const activeData = hoveredPointIndex !== null ? timelineData[hoveredPointIndex] : null;

  return (
    <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 relative z-10">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Icons.Activity />
            </span>
            Projects Velocity Timeline
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Hover over nodes to inspect month-by-month project details
          </p>
        </div>

        <div className="flex items-center space-x-4 text-xs font-semibold">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50"></span>
            <span className="text-indigo-300">Total ({projects.length})</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"></span>
            <span className="text-emerald-300">Completed ({projects.filter(p=>p.status==='Completed').length})</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-56">
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="totalLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="completedLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding + ratio * (height - 2 * padding);
            return (
              <line 
                key={i} 
                x1={padding} 
                y1={y} 
                x2={width - padding} 
                y2={y} 
                stroke="#1e293b" 
                strokeDasharray="4 4" 
              />
            );
          })}

          <path d={totalPointsPath} fill="none" stroke="url(#totalLineGrad)" strokeWidth="3.5" strokeLinecap="round" />
          <path d={completedPointsPath} fill="none" stroke="url(#completedLineGrad)" strokeWidth="3.5" strokeLinecap="round" />

          {timelineData.map((d, i) => {
            const x = getX(i);
            const yTotal = getY(d.total);
            const yComp = getY(d.completed);
            const isHovered = hoveredPointIndex === i;

            return (
              <g key={i} onMouseEnter={() => setHoveredPointIndex(i)} className="cursor-pointer">
                {isHovered && (
                  <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
                )}
                <circle cx={x} cy={yTotal} r={isHovered ? 7 : 5} fill="#6366f1" stroke="#0f172a" strokeWidth="2" className="transition-all duration-200" />
                <circle cx={x} cy={yComp} r={isHovered ? 7 : 5} fill="#10b981" stroke="#0f172a" strokeWidth="2" className="transition-all duration-200" />
                <text x={x} y={height - 12} textAnchor="middle" fill={isHovered ? '#6366f1' : '#94a3b8'} fontSize="11" fontWeight={isHovered ? "bold" : "normal"}>
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/80 min-h-[90px]">
        {activeData ? (
          <div className="space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-indigo-400 uppercase tracking-wider">
                Timeline Point: {activeData.month} Milestone
              </span>
              <span className="text-slate-300 font-semibold">
                Total: <strong className="text-indigo-400">{activeData.total}</strong> | Completed: <strong className="text-emerald-400">{activeData.completed}</strong>
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {activeData.createdInMonth.length > 0 ? (
                activeData.createdInMonth.map(p => (
                  <div key={p.id} className="flex items-center space-x-2 px-3 py-1.5 bg-slate-950/90 border border-indigo-500/30 rounded-xl text-xs">
                    <span className={`w-2 h-2 rounded-full ${p.status === 'Completed' ? 'bg-emerald-400' : 'bg-indigo-400'}`}></span>
                    <span className="font-bold text-white">{p.name}</span>
                    <span className="text-[10px] text-slate-400">({p.category})</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No new project created in {activeData.month}, accumulated score tracked.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 text-xs py-2">
            👈 Hover over any node on the line graph to highlight associated projects.
          </div>
        )}
      </div>
    </div>
  );
}

function InteractiveTasksPieChart({ tasks }) {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  const taskMetrics = useMemo(() => {
    const completed = tasks.filter(t => t.status === 'Completed');
    const inProgress = tasks.filter(t => t.status === 'In Progress');
    const pending = tasks.filter(t => t.status === 'Pending');

    return [
      { key: 'Completed', label: 'Completed', count: completed.length, color: '#10b981', items: completed },
      { key: 'In Progress', label: 'In Progress', count: inProgress.length, color: '#6366f1', items: inProgress },
      { key: 'Pending', label: 'Pending', count: pending.length, color: '#f59e0b', items: pending }
    ];
  }, [tasks]);

  const totalTasksCount = tasks.length;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;

  const activeSliceData = hoveredSlice ? taskMetrics.find(m => m.key === hoveredSlice) : null;

  return (
    <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300">
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <span className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                <Icons.PieChartIcon />
              </span>
              Tasks Breakdown Chart
            </h3>
            <p className="text-xs text-slate-400 mt-1">Hover over pie slices to reveal assigned task lists</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-2">
          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r={radius} fill="none" stroke="#1e293b" strokeWidth="18" />

              {totalTasksCount > 0 && taskMetrics.map((item) => {
                const fraction = item.count / totalTasksCount;
                const strokeDasharray = `${fraction * circumference} ${circumference}`;
                const strokeDashoffset = -cumulativeOffset;
                cumulativeOffset += fraction * circumference;
                const isHovered = hoveredSlice === item.key;

                return (
                  <circle
                    key={item.key}
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={isHovered ? 24 : 18}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredSlice(item.key)}
                  />
                );
              })}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-2xl font-extrabold text-white">
                {hoveredSlice ? activeSliceData?.count : totalTasksCount}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                {hoveredSlice ? activeSliceData?.label : 'Total Tasks'}
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            {taskMetrics.map(item => (
              <div 
                key={item.key}
                onMouseEnter={() => setHoveredSlice(item.key)}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  hoveredSlice === item.key 
                    ? 'bg-slate-800 border-indigo-500/50 shadow-md' 
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-xs font-bold text-slate-200">{item.label}</span>
                </div>
                <div className="text-xs font-extrabold text-white">
                  {item.count} <span className="text-[10px] text-slate-400">({totalTasksCount ? Math.round((item.count/totalTasksCount)*100) : 0}%)</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/80 min-h-[90px]">
        {activeSliceData ? (
          <div className="space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold uppercase tracking-wider" style={{ color: activeSliceData.color }}>
                {activeSliceData.label} Tasks ({activeSliceData.items.length})
              </span>
              <span className="text-slate-400 text-[11px]">Hover Inspection</span>
            </div>

            <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
              {activeSliceData.items.map(t => (
                <div key={t.id} className="p-2 bg-slate-950/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-100 truncate pr-2">{t.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 shrink-0">
                    {t.projectName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 text-xs py-2">
            🍰 Hover over any slice on the pie chart to inspect tasks.
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  const [userProfile, setUserProfile] = useState({
    name: 'Palak',
    email: 'palak@innovationhacks.io',
    role: 'Full Stack Engineering Intern',
    company: 'Innovation Hacks',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    stats: {
      totalCommits: 384,
      activeStreakDays: 16,
      productivityScore: '96%',
      hoursLogged: 142
    },
    skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'PostgreSQL', 'Python', 'FastAPI']
  });

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskProject, setNewTaskProject] = useState(initialProjects[0].id);
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  const [newProjName, setNewProjName] = useState('');
  const [newProjCategory, setNewProjCategory] = useState('Full Stack');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjPriority, setNewProjPriority] = useState('Medium');

  const [settingsForm, setSettingsForm] = useState({ ...userProfile });

  const triggerLoadingState = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || p.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [projects, searchQuery, statusFilter, priorityFilter]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.projectName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;
  const overallTaskProgress = totalTasksCount ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const toggleTaskStatus = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'Completed' ? 'In Progress' : 'Completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleAddNewTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const proj = projects.find(p => p.id === newTaskProject);
    const newTask = {
      id: `task-${Date.now()}`,
      projectId: newTaskProject,
      projectName: proj ? proj.name : 'General Task',
      title: newTaskTitle.trim(),
      status: 'In Progress',
      priority: newTaskPriority,
      assignee: userProfile.name,
      dueDate: 'Soon'
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setIsCreateTaskModalOpen(false);
  };

  const handleAddNewProject = (e) => {
    e.preventDefault();
    if (!newProjName.trim()) return;
    const techArray = newProjTech.trim() ? newProjTech.split(',').map(t => t.trim()) : ['React', 'Node.js'];
    const newProject = {
      id: `proj-${Date.now()}`,
      name: newProjName.trim(),
      category: newProjCategory,
      status: 'In Progress',
      progress: 0,
      dueDate: '2026-12-01',
      month: 'Sep',
      tasksCount: 0,
      completedTasksCount: 0,
      description: newProjDesc.trim() || 'New high-priority development project.',
      techStack: techArray,
      priority: newProjPriority
    };
    setProjects([newProject, ...projects]);
    setNewProjName('');
    setNewProjDesc('');
    setNewProjTech('');
    setIsCreateProjectModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    setProfileDropdownOpen(false);
    setIsLoggedIn(false);
    setAuthMode('login');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'signup' && authName.trim()) {
      setUserProfile(prev => ({
        ...prev,
        name: authName.trim(),
        email: authEmail || 'user@devpulse.io'
      }));
    } else if (authEmail) {
      setUserProfile(prev => ({
        ...prev,
        email: authEmail
      }));
    }
    setIsLoggedIn(true);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setUserProfile({ ...settingsForm });
    setIsSettingsModalOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl text-white shadow-xl shadow-indigo-500/25 ring-1 ring-white/20 mb-1">
              <Icons.Sparkles />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              {authMode === 'login' ? 'Welcome Back to DevPulse' : 'Create Your DevPulse Account'}
            </h1>
            <p className="text-xs text-slate-400">
              {authMode === 'login' ? 'Enter credentials to access workspace' : 'Join Innovation Hacks Developer OS'}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Palak"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email</label>
              <input
                type="email"
                required
                placeholder="palak@innovationhacks.io"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all duration-200 mt-2 active:scale-98"
            >
              {authMode === 'login' ? 'Sign In to Dashboard' : 'Create Free Account'}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800/80">
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              {authMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col md:flex-row selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Keyframes for Book Opening & Cascading Stagger Animations */}
      <style>{`
        @keyframes bookOpenAnim {
          0% {
            opacity: 0;
            transform: perspective(1000px) rotateY(-40deg) translateY(30px) scale(0.92);
            transform-origin: left center;
          }
          100% {
            opacity: 1;
            transform: perspective(1000px) rotateY(0deg) translateY(0) scale(1);
            transform-origin: left center;
          }
        }

        @keyframes taskCascadeAnim {
          0% {
            opacity: 0;
            transform: translateX(-24px) translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes scrollSectionFade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .project-book-card {
          animation: bookOpenAnim 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          perspective: 1200px;
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
        }

        .project-book-card:hover {
          transform: perspective(1200px) rotateY(-8deg) translateY(-8px) scale(1.02);
          box-shadow: -15px 20px 30px -10px rgba(99, 102, 241, 0.25);
        }

        .task-item-stagger {
          animation: taskCascadeAnim 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .section-scroll-anim {
          animation: scrollSectionFade 0.6s ease-out forwards;
        }
      `}</style>

      {/* MOBILE TOP HEADER BAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-lg text-white shadow-lg shadow-indigo-500/20">
            <Icons.Sparkles />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">DevPulse OS</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800/80 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static flex flex-col justify-between
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          <div className="hidden md:flex items-center space-x-3 p-6 border-b border-slate-800/80">
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 rounded-xl text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <Icons.Sparkles />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                DevPulse
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">v2.0</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">Developer Intelligence OS</p>
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-indigo-600/20 to-violet-600/10 text-indigo-300 border border-indigo-500/30 shadow-md shadow-indigo-500/5' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Icons.LayoutDashboard />
              <span>Dashboard View</span>
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'projects' 
                  ? 'bg-gradient-to-r from-indigo-600/20 to-violet-600/10 text-indigo-300 border border-indigo-500/30 shadow-md shadow-indigo-500/5' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icons.FolderKanban />
                <span>Projects Portfolio</span>
              </div>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300 border border-slate-700">{projects.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('tasks'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'tasks' 
                  ? 'bg-gradient-to-r from-indigo-600/20 to-violet-600/10 text-indigo-300 border border-indigo-500/30 shadow-md shadow-indigo-500/5' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icons.CheckSquare />
                <span>Tasks & Issues</span>
              </div>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300 border border-slate-700">{tasks.length}</span>
            </button>
          </nav>
        </div>

        {/* PROFILE BUTTON & POPOVER MENU */}
        <div className="p-4 border-t border-slate-800/80 relative">
          {profileDropdownOpen && (
            <div className="absolute bottom-20 left-4 right-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="p-3 border-b border-slate-800 text-left">
                <p className="text-xs font-bold text-white truncate">{userProfile.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{userProfile.email}</p>
              </div>

              <button
                onClick={() => { setActiveTab('profile'); setProfileDropdownOpen(false); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Icons.User />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => { setSettingsForm({ ...userProfile }); setIsSettingsModalOpen(true); setProfileDropdownOpen(false); }}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Icons.Settings />
                <span>Settings</span>
              </button>

              <button
                onClick={() => { setProfileDropdownOpen(false); setIsLogoutModalOpen(true); }}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <Icons.LogOut />
                <span>Log Out</span>
              </button>
            </div>
          )}

          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="w-full flex items-center justify-between p-2.5 bg-slate-950/70 border border-slate-800/90 hover:border-indigo-500/40 rounded-2xl transition-all duration-200 group text-left"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <div className="relative">
                <img src={userProfile.avatar} alt={userProfile.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/40" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900"></span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate group-hover:text-indigo-300 transition-colors">{userProfile.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{userProfile.role}</p>
              </div>
            </div>
            <div className="text-slate-500 group-hover:text-slate-300 transition-colors">
              <Icons.ChevronUp />
            </div>
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 overflow-y-auto min-h-screen flex flex-col bg-slate-950 scroll-smooth">
        
        {/* TOP TOOLBAR */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Icons.Search />
            </span>
            <input
              type="text"
              placeholder="Search projects, tasks, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-3 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={triggerLoadingState}
              disabled={isLoading}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800/80 transition-all shadow-sm"
            >
              <Icons.RefreshCw />
              <span>{isLoading ? 'Loading...' : 'Refresh API'}</span>
            </button>

            <button
              onClick={() => setIsCreateProjectModalOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
            >
              <Icons.Plus />
              <span>New Project</span>
            </button>

            <button
              onClick={() => setIsCreateTaskModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all whitespace-nowrap"
            >
              <Icons.Plus />
              <span>New Task</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE CONTENT AREA WITH SCROLL ANIMATIONS */}
        <div className="p-6 max-w-7xl w-full mx-auto space-y-8 flex-1">
          
          {/* METRICS KPI CARDS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 section-scroll-anim">
            <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 hover:border-indigo-500/40 transition-all duration-300 shadow-lg group">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">Active Projects</span>
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                  <Icons.FolderKanban />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-white">{projects.length}</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <Icons.TrendingUp />
                  <span className="ml-1">+3 this month</span>
                </span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300 shadow-lg group">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">Task Completion</span>
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                  <Icons.CheckCircle2 />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-white">{completedTasksCount}/{totalTasksCount}</span>
                <span className="text-xs text-slate-400 font-medium">({overallTaskProgress}%)</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 hover:border-cyan-500/40 transition-all duration-300 shadow-lg group">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">Productivity Index</span>
                <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                  <Icons.Sparkles />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-white">{userProfile.stats.productivityScore}</span>
                <span className="text-xs text-cyan-400 font-semibold">Optimal Rate</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 hover:border-amber-500/40 transition-all duration-300 shadow-lg group">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">Commit Streak</span>
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <Icons.Clock />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-white">{userProfile.stats.activeStreakDays} Days</span>
                <span className="text-xs text-amber-400 font-semibold">Active Streak</span>
              </div>
            </div>
          </section>

          {/* FILTER CONTROLS BAR */}
          <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 section-scroll-anim">
            <div className="flex items-center space-x-2 text-slate-400 text-sm font-semibold">
              <Icons.Filter />
              <span>Filters & Controls:</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2">
                <label className="text-xs text-slate-400 font-medium">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold px-3 py-1.5 text-slate-200"
                >
                  <option value="All">All Statuses</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs text-slate-400 font-medium">Priority:</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold px-3 py-1.5 text-slate-200"
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* PROJECTS SECTION WITH BOOK-OPENING ANIMATION CARDS */}
          {(activeTab === 'dashboard' || activeTab === 'projects') && (
            <section className="space-y-6 section-scroll-anim">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                  <Icons.FolderKanban />
                  <span>Projects Portfolio ({filteredProjects.length})</span>
                </h2>
                <span className="text-xs text-indigo-400 font-semibold flex items-center gap-1.5">
                  <Icons.BookOpen />
                  Interactive 3D Book Fold View
                </span>
              </div>

              {/* Interactive Line Chart directly inside Projects section */}
              <InteractiveProjectsLineChart projects={projects} />

              {/* 3D BOOK OPENING PROJECT CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {filteredProjects.map((project, index) => (
                  <div 
                    key={project.id} 
                    className="project-book-card bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group shadow-xl"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    {/* Decorative Book Spine Edge Effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-600 group-hover:w-2.5 transition-all duration-300"></div>

                    <div className="pl-2">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block mb-2">
                            {project.category}
                          </span>
                          <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                            {project.name}
                          </h3>
                        </div>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                          project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.techStack.map((tech, idx) => (
                          <span key={idx} className="text-[11px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pl-2 space-y-2 pt-4 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-slate-200">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-violet-500'}`} style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TASKS & ISSUES SECTION WITH ONE-BY-ONE CASCADING ANIMATION */}
          {(activeTab === 'dashboard' || activeTab === 'tasks') && (
            <section className="space-y-6 pt-4 section-scroll-anim">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                  <Icons.CheckSquare />
                  <span>Tasks Management Checklist ({filteredTasks.length})</span>
                </h2>
                <span className="text-xs text-cyan-400 font-semibold">One-by-One Staggered View</span>
              </div>

              {/* Interactive Pie Chart directly inside Tasks section */}
              <InteractiveTasksPieChart tasks={tasks} />

              {/* ONE-BY-ONE CASCADING TASK LIST */}
              <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl divide-y divide-slate-800/80 overflow-hidden shadow-lg">
                {filteredTasks.map((task, index) => (
                  <div 
                    key={task.id} 
                    className="task-item-stagger p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors gap-4"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          task.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-700 bg-slate-900'
                        }`}
                      >
                        {task.status === 'Completed' && <Icons.CheckCircle2 />}
                      </button>
                      <div className="min-w-0">
                        <p className={`text-sm font-medium truncate ${task.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-100'}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                          <span className="text-indigo-400 font-semibold">{task.projectName}</span>
                          <span>•</span>
                          <span>Due {task.dueDate}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      task.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {task.priority} Priority
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'profile' && (
            <section className="bg-slate-900/60 border border-slate-800/90 rounded-3xl p-8 space-y-8 shadow-xl section-scroll-anim">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 border-b border-slate-800 pb-8">
                <img src={userProfile.avatar} alt={userProfile.name} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-500/30" />
                <div className="space-y-1.5 text-center sm:text-left">
                  <h2 className="text-2xl font-extrabold text-white">{userProfile.name}</h2>
                  <p className="text-sm text-slate-300">{userProfile.email}</p>
                  <p className="text-xs text-slate-400">{userProfile.role} • {userProfile.company}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tech Stack & Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill, idx) => (
                    <span key={idx} className="px-3.5 py-1.5 bg-slate-800 rounded-xl text-xs font-semibold text-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

        </div>
      </main>

      {/* LOGOUT CONFIRMATION MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-500/20">
              <Icons.AlertCircle />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Log Out Confirmation</h3>
              <p className="text-xs text-slate-400">Are you sure you want to log out of DevPulse OS?</p>
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <button onClick={() => setIsLogoutModalOpen(false)} className="w-1/2 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700">
                Cancel
              </button>
              <button onClick={handleLogoutConfirm} className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-rose-600/20">
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white">Developer Settings</h3>
              <button onClick={() => setIsSettingsModalOpen(false)} className="text-slate-400 hover:text-white">
                <Icons.X />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={settingsForm.name}
                  onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button type="button" onClick={() => setIsSettingsModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/25">
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TASK MODAL */}
      {isCreateTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Create New Task</h3>
              <button onClick={() => setIsCreateTaskModalOpen(false)} className="text-slate-400 hover:text-white">
                <Icons.X />
              </button>
            </div>

            <form onSubmit={handleAddNewTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement OAuth2 login provider"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project</label>
                <select
                  value={newTaskProject}
                  onChange={(e) => setNewTaskProject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setIsCreateTaskModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/25">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      {isCreateProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Create New Project</h3>
              <button onClick={() => setIsCreateProjectModalOpen(false)} className="text-slate-400 hover:text-white">
                <Icons.X />
              </button>
            </div>

            <form onSubmit={handleAddNewProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Cache Manager"
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full Stack"
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={newProjPriority}
                    onChange={(e) => setNewProjPriority(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows="2"
                  placeholder="Brief summary of architecture & goals..."
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies (Comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Redis, Go, Docker"
                  value={newProjTech}
                  onChange={(e) => setNewProjTech(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setIsCreateProjectModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/25">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}