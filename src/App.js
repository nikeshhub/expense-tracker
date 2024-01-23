import React, { useState } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function App() {
  const [weeklyIncome, setWeeklyIncome] = useState("");
  const [expenses, setExpenses] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savings, setSavings] = useState(0);

  const calculateExpenses = (day, value) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [day]: value,
    }));
  };

  const calculate = () => {
    const income = weeklyIncome;
    const dailyExpenses = Object.values(expenses).map((value) =>
      parseFloat(value)
    );
    console.log(dailyExpenses);
    const total = dailyExpenses.reduce((acc, value) => acc + value, 0);

    setTotalExpenses(total);
    setSavings(income - total);
  };

  const chartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Expenses",
        data: Object.values(expenses),

        backgroundColor: "#1890ff",
        borderColor: "black",
        fill: "true",
        tension: 0.5,
      },
    ],
  };
  console.log(chartData);

  const chartOptions = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ padding: "8px" }}>
      <h1>Expense Tracker</h1>
      <div className="App">
        <div className="input">
          <label htmlFor="weeklyIncome">
            <span
              style={{
                fontWeight: "bold",
                fontSize: "19px",
              }}
            >
              Weekly Income:
            </span>
            <br />
          </label>
          <input
            type="number"
            id="weeklyIncome"
            placeholder="Enter weekly income"
            value={weeklyIncome}
            onChange={(e) => setWeeklyIncome(e.target.value)}
          />

          <h2>Expenses</h2>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Expense</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(expenses).map((day) => (
                <tr key={day}>
                  <td>{day}</td>
                  <td>
                    <input
                      type="number"
                      value={expenses[day]}
                      onChange={(e) => calculateExpenses(day, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={calculate}>Calculate</button>
        </div>

        <div className="summary">
          <h1>Dashboard</h1>
          <div className="cards">
            <div className="expenses">
              <p>
                Total Expenses: <br />
                <br />
                Rs.{totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="savings">
              <p>
                Savings: <br />
                <br /> Rs.{savings.toFixed(2)} <br />
              </p>
            </div>
            <div className="status">
              <p>
                Status: <br /> <br />
                {savings > 0 ? (
                  <span>Profit</span>
                ) : savings === 0 ? (
                  <span>Neutral</span>
                ) : (
                  <span>Loss</span>
                )}
              </p>
            </div>
          </div>

          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default App;
