import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalProposals, settotalProposals] = useState(0);
  const [totalAccepts, settotalAccepts] = useState(0);
  const [billing, setBilling] = useState(0);
  const [profit, setProfit] = useState(0);

  const dailyData = Array.from({ length: 23 }, (_, i) => ({
    day: i + 1,
    value: (i * 600) + Math.random() * 1000
  }));

  const monthlyData = [
    { month: 'Dez/23', value: 12500 },
    { month: 'Jan/24', value: 12340 },
    { month: 'Fev/24', value: 13500 },
    { month: 'Mar/24', value: 13200 },
    { month: 'Abr/24', value: 9800 },
    { month: 'Mai/24', value: 7600 },
    { month: 'Jun/24', value: 14200 },
    { month: 'Jul/24', value: 10500 },
    { month: 'Ago/24', value: 11800 },
    { month: 'Set/24', value: 9500 },
    { month: 'Out/24', value: 5200 },
    { month: 'Nov/24', value: dailyData[dailyData.length - 1].value }
  ];
  
  const proposalData = [
    { month: 'Jan', propostas: 230, aceites: 123 },
    { month: 'Fev', propostas: 274, aceites: 105 },
    { month: 'Mar', propostas: 240, aceites: 95 },
    { month: 'Abr', propostas: 180, aceites: 85 },
    { month: 'Mai', propostas: 160, aceites: 90 },
    { month: 'Jun', propostas: 290, aceites: 110 },
    { month: 'Jul', propostas: 190, aceites: 95 },
    { month: 'Ago', propostas: 210, aceites: 100 },
    { month: 'Set', propostas: 170, aceites: 85 },
    { month: 'Out', propostas: 130, aceites: 70 },
    { month: 'Nov', propostas: 200, aceites: 95 },
    { month: 'Dez', propostas: 250, aceites: 115 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    settotalProposals(proposalData.reduce((acc, { propostas }) => acc + propostas, 0));
    settotalAccepts(proposalData.reduce((acc, { aceites }) => acc + aceites, 0));
    setBilling(monthlyData.reduce((acc, { value }) => acc + value, 0));
  }, []);
  
  useEffect(() => {
    setProfit(billing * 0.03);
    console.log("updated2");
  }, [billing]);
    

  return (
    <>
    <Header />
    <Loading show={loading} />
    <div className="dashboard">
      {/* Summary Cards Row */}
      <div className="summary-cards">
        <div className="card-dash">
          <div className="card-dash-content">
            <div className="metric">
              <p className="metric-label">Faturamento Anual</p>
              <p className="metric-value blue">R${billing.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="card-dash">
          <div className="card-dash-content">
            <div className="metric">
              <p className="metric-label">Lucro</p>
              <p className="metric-value green">R${profit.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Faturamento Mensal */}
        <div className="card-dash">
          <div className="card-dash-header">
            <h2 className="card-dash-title">Faturamento Mensal</h2>
          </div>
          <div className="card-dash-content">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis dataKey="month" type="category" axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Faturamento']}
                  />
                  <Bar dataKey="value" fill="#2196F3" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Propostas/Aceites */}
        <div className="card-dash">
          <div className="card-dash-header">
            <div className="proposals-header">
              <h2 className="card-dash-title">Propostas/Aceites</h2>
              <div className="proposals-stats">
                <div className="stat">
                  <p className="stat-label green">Aceites</p>
                  <p className="stat-value">{totalAccepts}</p>
                </div>
                <div className="stat">
                  <p className="stat-label blue">Propostas</p>
                  <p className="stat-value">{totalProposals}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-dash-content">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={proposalData}>
                  <XAxis dataKey="month" axisLine={true} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="propostas" fill="#2196F3" stackId="a" name="Propostas" />
                  <Bar dataKey="aceites" fill="#4CAF50" stackId="a" name="Aceites" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Faturamento Diário */}
        <div className="card-dash full-width">
          <div className="card-dash-header">
            <h2 className="card-dash-title">Faturamento Diário</h2>
          </div>
          <div className="card-dash-content">
            <div className="chart-container daily">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="day"
                    axisLine={true}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Faturamento']}
                    labelFormatter={(label) => `Dia ${label}`}
                  />
                  <Line 
                    type="monotone"
                    dataKey="value"
                    stroke="#2196F3"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone"
                    dataKey={() => 3000}
                    stroke="#ccc"
                    strokeDasharray="5 5"
                    strokeWidth={1}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;