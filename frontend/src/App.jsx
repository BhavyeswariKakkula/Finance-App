import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
  });

  const [expenses, setExpenses] = useState([]);
   const [search, setSearch] = useState("");

  // Input change
  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  // Get all expenses
  const getExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  // Add expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Button Clicked");


    try {
      await axios.post("http://localhost:5000/api/expenses", expense);

      alert("Expense Added Successfully");

      setExpense({
        title: "",
        amount: "",
        type: "income",
        category: "",
        date: "",
      });

      getExpenses();
    } catch (err) {
  console.log("Error:", err);
  console.log("Response:", err.response);
  console.log("Data:", err.response?.data);
  alert("Something went wrong");
}
  };
  const deleteExpense = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    getExpenses();
  } catch (err) {
    console.log(err);
  }
};
const totalIncome = expenses
  .filter((item) => item.type === "income")
  .reduce((total, item) => total + item.amount, 0);

const totalExpense = expenses
  .filter((item) => item.type === "expense")
  .reduce((total, item) => total + item.amount, 0);

const balance = totalIncome - totalExpense;

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <div className="summary">
  <h3>Total Income: ₹{totalIncome}</h3>
  <h3>Total Expense: ₹{totalExpense}</h3>
  <h3>Balance: ₹{balance}</h3>
</div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={expense.title}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
        />

        <select
          name="type"
          value={expense.type}
          onChange={handleChange}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={expense.category}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
        />

        <button type="submit">Add Expense</button>
      </form>
      <input
      type="text"
  placeholder="Search by title..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>  

      <h2>Expense List</h2>

{expenses.length === 0 ? (
  <p>No Expenses Found</p>
) : (
  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Category</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {expenses
          .filter((expense) =>
            expense.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((expense) => (
            <tr key={expense._id}>
              <td>{expense.title}</td>
              <td>{expense.amount}</td>
              <td>{expense.type}</td>
              <td>{expense.category}</td>
              <td>{expense.date.slice(0, 10)}</td>
              <td>
                <button onClick={() => deleteExpense(expense._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)}
</div>
  );
}

export default App;


