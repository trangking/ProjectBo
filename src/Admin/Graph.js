import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js"; // Import registerables
import { fetchDataByPointRange } from "../firebase/firebase";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function Graph() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Reference for storing the chart instance

  useEffect(() => {
    // Register all Chart.js components
    Chart.register(...registerables);

    const createSummaryChart = async () => {
      const summaryData = await fetchDataByPointRange(); // Fetch your data

      // Prepare data for chart
      const labels = [];
      const dataPoints = [];
      const colors = [];

      Object.keys(summaryData).forEach((levelKey) => {
        const level = summaryData[levelKey];
        labels.push(level.levelInfo.text);
        dataPoints.push(level.count);
        colors.push(level.levelInfo.color);
      });

      // Destroy previous chart instance if it exists to avoid the "Canvas in use" error
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create chart only if canvas exists
      if (chartRef.current) {
        chartInstance.current = new Chart(chartRef.current, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "จำนวนของนักเรียนในแต่ละอาการ",
                data: dataPoints,
                backgroundColor: colors,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    };

    createSummaryChart();
  }, []);

  return (
    <>
      {/* Enhanced Back Button */}
      <Link to="/MenuAdmin" className="w-full flex justify-center">
        <Button
          type="link"

          className="flex items-center justify-center space-x-2 text-cyan-500 border border-cyan-500 hover:bg-cyan-500 hover:text-gray-900 transition-colors duration-300 py-2 px-4 rounded-xl shadow-lg hover:shadow-cyan-500/50"
        >
          <ArrowLeftOutlined className="text-lg" />
          <span className="font-bold">ย้อนกลับ</span>
        </Button>
      </Link>

      {/* Rest of the UI */}
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-xl relative border border-gray-700">
          <h1 className="text-4xl font-extrabold text-cyan-500 text-center mb-4">
            สรุปยอดอาการซึมเศร้าของนักเรียน
          </h1>
          <p className="text-gray-400 text-center mb-6">
            สรุปข้อมูลอาการซึมเศร้าของนักเรียนแต่ละระดับตามจำนวนนักเรียนที่ตรวจพบ
          </p>

          {/* Glowing border around the chart */}
          <div className="relative p-2 rounded-xl bg-gray-900 shadow-lg">
            <div className="absolute top-0 left-0 w-full h-full rounded-xl border border-cyan-500 opacity-50 animate-pulse"></div>
            <canvas
              ref={chartRef}
              id="summaryChart"
              className="w-full h-64"
            ></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
