import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useMenu from '../hook/useMenu';
import { useEffect, useState } from "react";

const Chart = () => {
    const [menu] = useMenu();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Process the menu data to create chart data
        const data = menu.reduce((acc, item) => {
            // Check if the subject category already exists
            const existingCategory = acc.find(entry => entry.subjectCategory === item.subjectCategory);

            if (existingCategory) {
                // Update the existing category with new application fee
                existingCategory.totalFees += item.applicationFees;
                existingCategory.count += 1;
            } else {
                // Add new category
                acc.push({
                    subjectCategory: item.subjectCategory,
                    totalFees: item.applicationFees,
                    count: 1,
                });
            }
            return acc;
        }, []);

        // Calculate the average fees for each category
        const formattedData = data.map(entry => ({
            ...entry,
            averageFees: entry.totalFees / entry.count,
        }));

        setChartData(formattedData);
    }, [menu]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-bold text-center mb-8">Application Fees by Subject Category</h2>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="subjectCategory" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="averageFees" fill="#8884d8" name="Average Fees" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;
