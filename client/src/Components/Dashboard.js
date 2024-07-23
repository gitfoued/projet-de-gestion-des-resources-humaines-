import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2'; // Assuming you are using chart.js for charts
import 'chart.js/auto';

export default function Dashboard() {
    const name=localStorage.getItem("nom")
    const lastname=localStorage.getItem("lastname")
    const userName=name+' '+lastname + '!';
    const absenteeismData = {
        labels: ['Department A', 'Department B', 'Department C'],
        datasets: [
            {
                label: 'Absenteeism Rate',
                data: [5, 10, 7],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const productivityData = {
        labels: ['Department A', 'Department B', 'Department C'],
        datasets: [
            {
                label: 'Productivity',
                data: [75, 85, 80],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const recruitmentTimeData = {
        labels: ['Department A', 'Department B', 'Department C'],
        datasets: [
            {
                label: 'Average Recruitment Time (days)',
                data: [30, 45, 25],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const overtimeData = {
        labels: ['Department A', 'Department B', 'Department C'],
        datasets: [
            {
                label: 'Overtime Hours',
                data: [20, 25, 15],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const turnoverData = {
        labels: ['Department A', 'Department B', 'Department C'],
        datasets: [
            {
                label: 'Staff Turnover',
                data: [10, 15, 12],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-gray-300 p-6 text-black">
                <h1 className="text-2xl font-bold">Welcome, {userName}</h1>
            </div>
            <div className="flex flex-1 p-6 space-x-6">
                <div className="bg-white shadow-md p-4 flex-1">
                    <h2 className="text-xl font-bold mb-4">Absenteeism Rate by Department</h2>
                    <Bar data={absenteeismData} />
                </div>
                <div className="bg-white shadow-md p-4 flex-1">
                    <h2 className="text-xl font-bold mb-4">Productivity by Department</h2>
                    <Bar data={productivityData} />
                </div>
            </div>
            <div className="flex flex-1 p-6 space-x-6">
                <div className="bg-white shadow-md p-4 flex-1">
                    <h2 className="text-xl font-bold mb-4">Average Recruitment Time by Department</h2>
                    <Line data={recruitmentTimeData} />
                </div>
                <div className="bg-white shadow-md p-4 flex-1">
                    <h2 className="text-xl font-bold mb-4">Overtime Hours by Department</h2>
                    <Pie data={overtimeData} />
                </div>
            </div>
            <div className="flex flex-1 p-2 space-x-6">
                <div className="bg-white shadow-md p-4 flex-1">
                    <h2 className="text-xl font-bold mb-4">Staff Turnover by Department</h2>
                    <Bar data={turnoverData} />
                </div>
            </div>
        </div>
    );
}
