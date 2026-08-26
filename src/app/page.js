"use client";
import React, { useState, useEffect, useMemo } from 'react';

// SVG Icon Components for seamless single-file UI styling
const Icons = {
  LayoutDashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  FolderKanban: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/></svg>
  ),
  CheckSquare: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
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
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Sparkles: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.28 1.28L3 12l5.8 1.9a2 2 0 0 1 1.28 1.28L12 21l1.9-5.8a2 2 0 0 1 1.28-1.28L21 12l-5.8-1.9a2 2 0 0 1-1.28-1.28Z"/></svg>
  ),
  TrendingUp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  ),
  RefreshCw: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>
  )
};

const initialProjects = [
  {
    id: 'proj-1',
    name: 'DevFlow Engine',
    category: 'Full Stack',
    status: 'In Progress',
    progress: 72,
    dueDate: '2026-09-15',
    tasksCount: 14,
    completedTasksCount: 10,
    description: 'REST API & frontend dashboard for automated developer workflow monitoring.',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    priority: 'High'
  },
  {
    id: 'proj-2',
    name: 'AI Code Review Bot',
    category: 'AI / Automation',
    status: 'In Progress',
    progress: 45,
    dueDate: '2026-09-28',
    tasksCount: 8,
    completedTasksCount: 3,
    description: 'Automated GitHub pull request analyzer powered by LLM summaries.',
    techStack: ['Python', 'FastAPI', 'OpenAI'],
    priority: 'Medium'
  },
  {
    id: 'proj-3',
    name: 'Component UI Design System',
    category: 'Frontend Design',
    status: 'Completed',
    progress: 100,
    dueDate: '2026-08-20',
    tasksCount: 20,
    completedTasksCount: 20,
    description: 'Accessible Tailwind CSS design system and reusable UI components.',
    techStack: ['Tailwind CSS', 'React', 'Storybook'],
    priority: 'Low'
  },
  {
    id: 'proj-4',
    name: 'Database Migration Suite',
    category: 'Infrastructure',
    status: 'Pending',
    progress: 15,
    dueDate: '2026-10-05',
    tasksCount: 6,
    completedTasksCount: 1,
    description: 'Zero-downtime database schema migration scripts and verification tools.',
    techStack: ['PostgreSQL', 'Docker', 'Go'],
    priority: 'High'
  }
];

const initialTasks = [
  {
    id: 'task-101',
    projectId: 'proj-1',
    projectName: 'DevFlow Engine',
    title: 'Implement JWT authentication & refresh tokens',
    status: 'Completed',
    priority: 'High',
    assignee: 'Alex Rivera',
    dueDate: 'Today'
  },
  {
    id: 'task-102',
    projectId: 'proj-1',
    projectName: 'DevFlow Engine',
    title: 'Design user productivity analytics cards',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Alex Rivera',
    dueDate: 'Tomorrow'
  },
  {
    id: 'task-103',
    projectId: 'proj-2',
    projectName: 'AI Code Review Bot',
    title: 'Connect FastAPI endpoint with OpenAI API key pool',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Alex Rivera',
    dueDate: 'Aug 30'
  },
  {
    id: 'task-104',
    projectId: 'proj-3',
    projectName: 'Component UI Design System',
    title: 'Publish accessibility audit compliance report',
    status: 'Completed',
    priority: 'Low',
    assignee: 'Alex Rivera',
    dueDate: 'Aug 22'
  },
  {
    id: 'task-105',
    projectId: 'proj-4',
    projectName: 'Database Migration Suite',
    title: 'Set up staging environment replication',
    status: 'Pending',
    priority: 'Medium',
    assignee: 'Alex Rivera',
    dueDate: 'Sep 02'
  }
];

const userProfile = {
  name: 'Alex Rivera',
  role: 'Full Stack Engineering Intern',
  company: 'Innovation Hacks',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  stats: {
    totalCommits: 342,
    activeStreakDays: 14,
    productivityScore: '94%',
    hoursLogged: 128
  },
  skills: ['React.js', 'Next.js', 'Node.js', 'Tailwind CSS', 'TypeScript', 'PostgreSQL']
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  
  // Dashboard view states: Loading & Empty Simulation controls
  const [isLoading, setIsLoading] = useState(false);
  const [forceEmptyState, setForceEmptyState] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modal State for Adding New Item
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('task'); // 'task' or 'project'
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskProject, setNewTaskProject] = useState(initialProjects[0].id);
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  // Simulate API dynamic reloading
  const triggerLoadingState = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  };

  const filteredProjects = useMemo(() => {
    if (forceEmptyState) return [];
    return projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || p.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [projects, searchQuery, statusFilter, priorityFilter, forceEmptyState]);

  const filteredTasks = useMemo(() => {
    if (forceEmptyState) return [];
    return tasks.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.projectName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, forceEmptyState]);

  // Overall statistics counters
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
      title: newTaskTitle,
      status: 'In Progress',
      priority: newTaskPriority,
      assignee: userProfile.name,
      dueDate: 'Soon'
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col md:flex-row">
      
      {/* MOBILE HEADER BAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-orange-100/90 border-b border-orange-200/80">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-500 rounded-lg text-white shadow-sm">
            <Icons.Sparkles />
          </div>
          <span className="font-bold text-lg tracking-tight text-orange-950">
            DevPulse UI
          </span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md hover:bg-orange-200/60 text-slate-700 hover:text-slate-900"
        >
          {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION - PEACH THEME */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-orange-50/90 border-r border-orange-200/80 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static flex flex-col justify-between
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Logo Header */}
          <div className="hidden md:flex items-center space-x-3 p-6 border-b border-orange-200/60">
            <div className="p-2 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl text-white shadow-md shadow-orange-500/20">
              <Icons.Sparkles />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-slate-900">
                DevPulse
              </h1>
              <p className="text-xs text-orange-800/70 font-medium">Task 1 · Frontend Dashboard</p>
            </div>
          </div>

          {/* Navigation Wayfinding */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                activeTab === 'dashboard' 
                  ? 'bg-orange-200/70 text-orange-950 border border-orange-300/80 shadow-sm' 
                  : 'text-slate-600 hover:bg-orange-100/70 hover:text-slate-900'
              }`}
            >
              <Icons.LayoutDashboard />
              <span>Dashboard View</span>
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                activeTab === 'projects' 
                  ? 'bg-orange-200/70 text-orange-950 border border-orange-300/80 shadow-sm' 
                  : 'text-slate-600 hover:bg-orange-100/70 hover:text-slate-900'
              }`}
            >
              <Icons.FolderKanban />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('tasks'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                activeTab === 'tasks' 
                  ? 'bg-orange-200/70 text-orange-950 border border-orange-300/80 shadow-sm' 
                  : 'text-slate-600 hover:bg-orange-100/70 hover:text-slate-900'
              }`}
            >
              <Icons.CheckSquare />
              <span>Tasks & Issues ({tasks.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                activeTab === 'profile' 
                  ? 'bg-orange-200/70 text-orange-950 border border-orange-300/80 shadow-sm' 
                  : 'text-slate-600 hover:bg-orange-100/70 hover:text-slate-900'
              }`}
            >
              <Icons.User />
              <span>Developer Profile</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Widget: Internship Tag */}
        <div className="p-4 m-4 bg-orange-100/60 rounded-xl border border-orange-200/70">
          <div className="flex items-center space-x-2 text-xs font-semibold text-orange-800 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Innovation Hacks</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Full Stack Internship Task 1: Responsive Developer Dashboard
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE - WHITISH BACKGROUND */}
      <main className="flex-1 overflow-y-auto min-h-screen flex flex-col bg-slate-50">
        
        {/* TOP TOOLBAR & ACTION HEADER */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-sm">
          
          {/* Dynamic Search Bar */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icons.Search />
            </span>
            <input
              type="text"
              placeholder="Search projects, tasks, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100/80 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Interactive State Simulation Controls */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={triggerLoadingState}
              disabled={isLoading}
              title="Simulate API data fetching skeleton state"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all shadow-sm"
            >
              <Icons.RefreshCw />
              <span>{isLoading ? 'Loading...' : 'Simulate Loading'}</span>
            </button>

            <button
              onClick={() => setForceEmptyState(!forceEmptyState)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all shadow-sm ${
                forceEmptyState 
                  ? 'bg-amber-100 border-amber-300 text-amber-900' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{forceEmptyState ? 'Reset View' : 'Toggle Empty State'}</span>
            </button>

            <button
              onClick={() => { setModalType('task'); setIsModalOpen(true); }}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/20 transition-all whitespace-nowrap"
            >
              <Icons.Plus />
              <span>New Task</span>
            </button>
          </div>
        </header>

        {/* PAGE CONTENT WRAPPER */}
        <div className="p-6 max-w-7xl w-full mx-auto space-y-8 flex-1">
          
          {/* TOP METRICS & PRODUCTIVITY INDICATORS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Metric 1: Total Projects */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-orange-200 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Projects</span>
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <Icons.FolderKanban />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-slate-900">{projects.length}</span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center">
                  <Icons.TrendingUp />
                  <span className="ml-1">+2 this month</span>
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            {/* Metric 2: Completed Tasks */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-orange-200 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Task Completion</span>
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                  <Icons.CheckCircle2 />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-slate-900">{completedTasksCount}/{totalTasksCount}</span>
                <span className="text-xs text-slate-500 font-medium">({overallTaskProgress}%)</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${overallTaskProgress}%` }}></div>
              </div>
            </div>

            {/* Metric 3: Productivity Score */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-orange-200 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Productivity Score</span>
                <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
                  <Icons.Sparkles />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-slate-900">{userProfile.stats.productivityScore}</span>
                <span className="text-xs text-cyan-600 font-semibold">High Efficiency</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full" style={{ width: userProfile.stats.productivityScore }}></div>
              </div>
            </div>

            {/* Metric 4: Coding Streak */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-orange-200 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Streak</span>
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                  <Icons.Clock />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-slate-900">{userProfile.stats.activeStreakDays} Days</span>
                <span className="text-xs text-amber-600 font-semibold">Daily Commits</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full" style={{ width: '85%' }}></div>
              </div>
            </div>

          </section>

          {/* SEARCH & FILTER CONTROLS BAR */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            
            <div className="flex items-center space-x-2 text-slate-600 text-sm font-semibold">
              <Icons.Filter />
              <span>Filters:</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-xs text-slate-500 font-medium">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold px-3 py-1.5 text-slate-700 focus:outline-none focus:border-orange-400"
                >
                  <option value="All">All Statuses</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              {/* Priority Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-xs text-slate-500 font-medium">Priority:</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold px-3 py-1.5 text-slate-700 focus:outline-none focus:border-orange-400"
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {(statusFilter !== 'All' || priorityFilter !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setStatusFilter('All');
                    setPriorityFilter('All');
                    setSearchQuery('');
                  }}
                  className="text-xs text-orange-600 hover:text-orange-700 font-semibold underline underline-offset-2 ml-2"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* DYNAMIC VIEW CONTAINER */}
          {isLoading ? (
            /* LOADING SKELETON STATE */
            <div className="space-y-4">
              <div className="text-xs text-slate-400 font-semibold tracking-wide uppercase">Simulating Dynamic Fetch...</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="bg-white border border-slate-200 rounded-2xl p-6 animate-pulse space-y-4 shadow-sm">
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-3 bg-slate-100 rounded w-3/4"></div>
                    <div className="h-8 bg-slate-100 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* VIEW 1: MAIN DASHBOARD & PROJECTS OVERVIEW */}
              {(activeTab === 'dashboard' || activeTab === 'projects') && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                      <Icons.FolderKanban />
                      <span>Projects Overview</span>
                    </h2>
                    <span className="text-xs text-slate-500 font-medium">
                      Showing {filteredProjects.length} of {projects.length} Projects
                    </span>
                  </div>

                  {filteredProjects.length === 0 ? (
                    /* EMPTY STATE */
                    <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-12 text-center space-y-3 shadow-sm">
                      <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-orange-500">
                        <Icons.AlertCircle />
                      </div>
                      <h3 className="text-base font-bold text-slate-800">No Projects Found</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        No projects matched your search criteria or active filters. Try clearing your filters or creating a new item.
                      </p>
                      <button
                        onClick={() => { setStatusFilter('All'); setPriorityFilter('All'); setSearchQuery(''); setForceEmptyState(false); }}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    /* PROJECTS GRID */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {filteredProjects.map(project => (
                        <div 
                          key={project.id} 
                          className="bg-white border border-slate-200/80 hover:border-orange-300 rounded-2xl p-6 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200/80 inline-block mb-2">
                                  {project.category}
                                </span>
                                <h3 className="text-base font-bold text-slate-900 transition-colors">
                                  {project.name}
                                </h3>
                              </div>
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                project.status === 'Completed' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                  : project.status === 'In Progress' 
                                  ? 'bg-orange-50 text-orange-700 border border-orange-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {project.status}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                              {project.description}
                            </p>

                            {/* Tech stack tags */}
                            <div className="flex flex-wrap gap-1.5 mb-6">
                              {project.techStack.map((tech, idx) => (
                                <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-medium">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Project Progress indicator */}
                          <div className="space-y-2 pt-4 border-t border-slate-100">
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span className="text-slate-500">Progress</span>
                              <span className="text-slate-800">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ${
                                  project.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-orange-400 to-amber-500'
                                }`}
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                              <span>Tasks: {project.completedTasksCount}/{project.tasksCount} done</span>
                              <span>Due {project.dueDate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* VIEW 2: TASKS & ISSUES LIST */}
              {(activeTab === 'dashboard' || activeTab === 'tasks') && (
                <section className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                      <Icons.CheckSquare />
                      <span>Task Management Checklist</span>
                    </h2>
                    <span className="text-xs text-slate-500 font-medium">
                      Showing {filteredTasks.length} of {tasks.length} Tasks
                    </span>
                  </div>

                  {filteredTasks.length === 0 ? (
                    <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-8 text-center space-y-2 shadow-sm">
                      <p className="text-xs text-slate-500">No tasks matching current view filters.</p>
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-sm overflow-hidden">
                      {filteredTasks.map(task => (
                        <div 
                          key={task.id} 
                          className="p-4 flex items-center justify-between hover:bg-orange-50/30 transition-colors gap-4"
                        >
                          <div className="flex items-center space-x-3.5 min-w-0">
                            <button
                              onClick={() => toggleTaskStatus(task.id)}
                              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                                task.status === 'Completed' 
                                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                                  : 'border-slate-300 bg-white hover:border-orange-400'
                              }`}
                            >
                              {task.status === 'Completed' && <Icons.CheckCircle2 />}
                            </button>
                            
                            <div className="min-w-0">
                              <p className={`text-sm font-medium truncate ${
                                task.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-800'
                              }`}>
                                {task.title}
                              </p>
                              <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                                <span className="text-orange-600 font-semibold">{task.projectName}</span>
                                <span>•</span>
                                <span>Due {task.dueDate}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 shrink-0">
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              task.priority === 'High' 
                                ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                                : task.priority === 'Medium'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                              {task.priority} Priority
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* VIEW 3: DEVELOPER PROFILE CARD */}
              {activeTab === 'profile' && (
                <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
                  {/* Profile Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 border-b border-slate-100 pb-8">
                    <img 
                      src={userProfile.avatar} 
                      alt={userProfile.name}
                      className="w-20 h-20 rounded-2xl object-cover ring-2 ring-orange-200 shadow-md"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-extrabold text-slate-900">{userProfile.name}</h2>
                        <span className="bg-orange-100 text-orange-800 text-xs px-2.5 py-0.5 rounded-full border border-orange-200 font-semibold">
                          Intern
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{userProfile.role} • <span className="text-slate-900 font-medium">{userProfile.company}</span></p>
                      <p className="text-xs text-slate-400">Task 1 Frontend Development Submission</p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tech Stack & Competencies</h3>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dev Activity Grid Mock */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Task Execution Summary</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                        <div className="text-xs text-slate-500">Commits Made</div>
                        <div className="text-lg font-bold text-slate-900 mt-1">{userProfile.stats.totalCommits}</div>
                      </div>
                      <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                        <div className="text-xs text-slate-500">Hours Logged</div>
                        <div className="text-lg font-bold text-slate-900 mt-1">{userProfile.stats.hoursLogged} hrs</div>
                      </div>
                      <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                        <div className="text-xs text-slate-500">Task Completion</div>
                        <div className="text-lg font-bold text-emerald-600 mt-1">{overallTaskProgress}%</div>
                      </div>
                      <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                        <div className="text-xs text-slate-500">Current Streak</div>
                        <div className="text-lg font-bold text-amber-600 mt-1">{userProfile.stats.activeStreakDays} Days</div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}

        </div>
      </main>

      {/* MODAL DIALOG: ADD NEW TASK */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900">Create New Developer Task</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <Icons.X />
              </button>
            </div>

            <form onSubmit={handleAddNewTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Task Description / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Refactor React component hooks"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-orange-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Associated Project</label>
                <select
                  value={newTaskProject}
                  onChange={(e) => setNewTaskProject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-orange-400 focus:bg-white"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Priority Level</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-orange-400 focus:bg-white"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-500/20"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}