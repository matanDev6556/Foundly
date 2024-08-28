import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import LastInvestmentsChart from '../../../components/admin/home/LastInvestmentChart';
import { formatTargetAmount } from '../../../utils/functions';

interface DashboardData {
  newUsers: number;
  newCompanies: number;
  newInvestors: number;
  totalInvestments: number;
  averageInvestment: number;
}

interface StatisticalDashboardProps {
  data: DashboardData;
  investments: any[];
}

export const StatisticalDashboard: React.FC<StatisticalDashboardProps> = ({
  data,
  investments,
}) => {
  const chartData = [
    { name: 'New Users', value: data.newUsers },
    { name: 'New Companies', value: data.newCompanies },
    { name: 'New Investors', value: data.newInvestors },
  ];

  return (
    <div style={{ width: '100%', marginBottom: 20 }}>
      <div style={{ height: 400, marginBottom: 20 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#d0ebea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: 20,
        }}
      >
        <div>
          Total Investments: ${formatTargetAmount(data.totalInvestments)}
        </div>
        <div>
          Average Investment: ${formatTargetAmount(data.averageInvestment)}
        </div>
      </div>

      <LastInvestmentsChart investments={investments} />
    </div>
  );
};
