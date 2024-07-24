import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

export default function Dashboard() {
    const [absenteeismData, setAbsenteeismData] = useState({
        labels: [],
        datasets: [{ label: 'Absenteeism Rate', data: [], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }],
    });
   
    const [recruitmentTimeData, setRecruitmentTimeData] = useState({
        labels: [],
        datasets: [{ label: 'Average Recruitment Time (days)', data: [], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }],
    });
    const [overtimeData, setOvertimeData] = useState({
        labels: [],
        datasets: [{ label: 'Overtime Hours', data: [], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }],
    });
    const [salaryData, setSalaryData] = useState({
        labels: [],
        datasets: [{ label: 'Salary by Department', data: [], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }],
    });
    const [loading, setLoading] = useState(true);

    const name = localStorage.getItem("nom");
    const lastname = localStorage.getItem("lastname");
    const userName = name + ' ' + lastname + '!';

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch absenteeism rate by department
                const absencesResponse = await axios.get('http://localhost:5000/api/absences');
                const annualAbsenteeismRate = absencesResponse.data;

                // Transform data for Bar chart
                const labels = Object.keys(annualAbsenteeismRate);
                const data = labels.map(departmentId => {
                    const rates = Object.values(annualAbsenteeismRate[departmentId]);
                    return rates.length > 0 ? rates[0] : 0;
                });

                setAbsenteeismData({
                    labels: labels.map(id => `Department ${id}`),
                    datasets: [{
                        label: 'Absenteeism Rate',
                        data: data,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    }],
                });

                // Fetch recruitment time by department
                const recruitmentResponse = await axios.get('http://localhost:5000/api/recruitments');
                const recruitment = recruitmentResponse.data;

                setRecruitmentTimeData({
                    labels: Object.keys(recruitment).map(id => `Department ${id}`),
                    datasets: [{
                        label: 'Average Recruitment Time (days)',
                        data: Object.values(recruitment),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    }],
                });

                // Fetch overtime by department
                const overtimeResponse = await axios.get('http://localhost:5000/api/overtime/total-hours');
                const overtime = overtimeResponse.data;

                setOvertimeData({
                    labels: Object.keys(overtime).map(id => `Department ${id}`),
                    datasets: [{
                        label: 'Overtime Hours',
                        data: Object.values(overtime),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    }],
                });

                // Fetch salary by department
                const salaryResponse = await axios.get('http://localhost:5000/api/salaries/total-by-department');
                const salaries = salaryResponse.data;

                setSalaryData({
                    labels: Object.keys(salaries).map(id => `Department ${id}`),
                    datasets: [{
                        label: 'Salary by Department',
                        data: Object.values(salaries),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    }],
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-gray-300 p-6 text-black">
                <h1 className="text-2xl font-bold">Welcome, {userName}</h1>
            </div>
            <div className="flex flex-wrap p-6 space-x-6">
                <div className="bg-white shadow-md p-4 flex-1">
                    <h2 className="text-xl font-bold mb-4">Absenteeism Rate by Department</h2>
                    <Bar data={absenteeismData} />
                </div>
                <div className="bg-white shadow-md p-4 flex-1">
                    <h2 className="text-xl font-bold mb-4">Average Recruitment Time by Department</h2>
                    <Line data={recruitmentTimeData} />
                </div>
            </div>
            <div className="flex flex-wrap p-6 space-x-6">
                <div className="bg-white shadow-md p-4 flex-1">
                    <h2 className="text-xl font-bold mb-4">Overtime Hours by Department</h2>
                    <Pie data={overtimeData} />
                </div>
                <div className="bg-white shadow-md p-4 flex-1">
                    <h2 className="text-xl font-bold mb-4">Salary by Department</h2>
                    <Bar data={salaryData} />
                </div>
            </div>
        </div>
    );
}
