import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../components/ReportModal.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a14ef5"];

const ReportsModal = ({ data, onClose }) => {
  const transformedData = Object.entries(data).map(([word, count]) => ({
    word,
    count,
  }));

  return (
    <div className="report-modal">
      <div className="report-modal-content">
        <h2>Top 5 Words in Blogs</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={transformedData}
              dataKey="count"
              nameKey="word"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {transformedData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ReportsModal;
