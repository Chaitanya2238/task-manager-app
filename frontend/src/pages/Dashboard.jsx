import { useState, useEffect } from 'react';
import { LogOut, Plus, Trash2, CheckCircle, Circle, Clock } from 'lucide-react';
import API from '../api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Safe parsing of userInfo
  const getUserInfo = () => {
    try {
      return JSON.parse(localStorage.getItem('userInfo') || '{}');
    } catch (e) {
      return {};
    }
  };
  
  const userInfo = getUserInfo();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setError('');
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please ensure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const { data } = await API.post('/tasks', { title, description });
      setTasks([...tasks, data]);
      setTitle('');
      setDescription('');
    } catch (err) {
      alert('Failed to create task. Check if server is running.');
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'To Do' ? 'In Progress' : currentStatus === 'In Progress' ? 'Completed' : 'To Do';
    try {
      const { data } = await API.put(`/tasks/${id}`, { status: nextStatus });
      setTasks(tasks.map(t => t.id === id ? data : t));
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium hidden sm:inline">
              Welcome, {userInfo?.name || 'User'}
            </span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full p-4 sm:p-6 flex-grow">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Create Task Form */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="text-blue-600" /> Add New Task
          </h2>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <input 
              type="text" 
              placeholder="Task title..." 
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea 
              placeholder="Description (optional)" 
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create Task
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Tasks</h2>
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
              No tasks yet. Start by creating one above!
            </div>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition">
                <div className="flex items-start gap-4 flex-grow">
                  <button 
                    onClick={() => handleUpdateStatus(task.id, task.status)}
                    className={`mt-1 transition ${task.status === 'Completed' ? 'text-green-500' : 'text-gray-400 hover:text-blue-500'}`}
                  >
                    {task.status === 'Completed' ? <CheckCircle size={24} /> : task.status === 'In Progress' ? <Clock className="text-orange-400" size={24} /> : <Circle size={24} />}
                  </button>
                  <div>
                    <h3 className={`font-semibold text-lg ${task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{task.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                        task.status === 'In Progress' ? 'bg-orange-100 text-orange-700' : 
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-gray-300 hover:text-red-500 p-2 transition sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
