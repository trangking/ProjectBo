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
                borderRadius: 10,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: "#ffffff",
                  font: {
                    size: 14,
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "#ffffff",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: "#ffffff",
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
              },
            },
          },
        });
      }
    };

    createSummaryChart();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center p-8">
      {/* Back Button */}
      <Link to="/MenuAdmin" className="w-full max-w-3xl mb-8">
        <Button
          type="link"
          className="flex items-center justify-center space-x-2 text-cyan-500 border border-cyan-500 hover:bg-cyan-500 hover:text-gray-900 transition-all duration-300 py-2 px-6 rounded-full shadow-lg hover:shadow-cyan-500/50"
        >
          <ArrowLeftOutlined className="text-lg" />
          <span className="font-bold">ย้อนกลับ</span>
        </Button>
      </Link>

      {/* Card Section */}
      <div className="bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-3xl border border-gray-700 relative overflow-hidden">
        {/* Title and Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-cyan-500 mb-2">
            สรุปยอดอาการซึมเศร้าของนักเรียน
          </h1>
          <p className="text-gray-400">
            แสดงข้อมูลอาการซึมเศร้าของนักเรียนแต่ละระดับตามจำนวนนักเรียนที่ตรวจพบ
          </p>
        </div>

        {/* Chart Container */}
        <div className="relative bg-gray-900 p-6 rounded-2xl shadow-lg border border-cyan-500 transition-transform transform hover:scale-105 hover:shadow-2xl">
          {/* Pulsing border effect */}
          <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500 opacity-20 animate-pulse"></div>
          <canvas ref={chartRef} id="summaryChart" className="w-full h-72"></canvas>
        </div>
      </div>
    </div>
  );
}
