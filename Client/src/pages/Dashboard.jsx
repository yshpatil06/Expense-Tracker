import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Health", "Entertainment", "Other"];

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", category: "Other", date: "", note: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchExpenses = async () => {
    try {
      const { data } = await API.get("/expenses");
      setExpenses(data);
    } catch {
      setError("Failed to load expenses");
    }
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post("/expenses", form);
      setForm({ title: "", amount: "", category: "Other", date: "", note: "" });
      fetchExpenses();
    } catch {
      setError("Failed to add expense");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch {
      setError("Failed to delete");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Expense Tracker</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hi, {user?.name}</span>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600">Logout</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <p className="text-gray-500 text-sm">Total Spent</p>
          <p className="text-3xl font-bold text-red-500">₹{total.toFixed(2)}</p>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
            <input className="border px-3 py-2 rounded-lg col-span-2" type="text" placeholder="Title"
              value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <input className="border px-3 py-2 rounded-lg" type="number" placeholder="Amount"
              value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
            <select className="border px-3 py-2 rounded-lg" value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <input className="border px-3 py-2 rounded-lg" type="date"
              value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            <input className="border px-3 py-2 rounded-lg" type="text" placeholder="Note (optional)"
              value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
            <button className="col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" type="submit">
              Add Expense
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">All Expenses</h2>
          {expenses.length === 0 ? (
            <p className="text-gray-400 text-center py-6">No expenses yet. Add one above!</p>
          ) : (
            <ul className="space-y-3">
              {expenses.map(exp => (
                <li key={exp._id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">{exp.title}</p>
                    <p className="text-xs text-gray-400">{exp.category} • {new Date(exp.date).toLocaleDateString()}</p>
                    {exp.note && <p className="text-xs text-gray-400">{exp.note}</p>}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-red-500">₹{exp.amount}</span>
                    <button onClick={() => handleDelete(exp._id)} className="text-red-400 hover:text-red-600 text-sm">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}