import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetchHistoricalData = async () => {
  const { data } = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  return data;
};

const LineChart: React.FC = () => {
  const { data, isLoading, error } = useQuery(
    "historicalData",
    fetchHistoricalData
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  const chartData = {
    labels: Object.keys(data.cases),
    datasets: [
      {
        label: "Cases",
        data: Object.values(data.cases),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: "Deaths",
        data: Object.values(data.deaths),
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
      {
        label: "Recovered",
        data: Object.values(data.recovered),
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "COVID-19 Historical Data",
      },
    },
    scales: {
      x: {
        ticks: {},
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative h-80 sm:h-96 md:h-[400px] lg:h-[500px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
