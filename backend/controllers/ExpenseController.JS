const Expense = require("../models/Expense");

// Add Expense
const addExpense = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const expense = new Expense(req.body);
    const savedExpense = await expense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    console.error("Add Expense Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get Expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};