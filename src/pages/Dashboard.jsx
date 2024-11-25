import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';
import api from '../services/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalProposals, settotalProposals] = useState(0);
  const [totalAccepts, settotalAccepts] = useState(0);
  const [billing, setBilling] = useState(0);
  const [profit, setProfit] = useState(0);
  const [profitTarget, setProfitTarget] = useState(0);
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [proposalData, setProposalData] = useState([]);
  
  /*
    TODOs for improvement:
    - Dinamic year/month for API requests
    - Dinamic profit target for API requests
  */

  const monthMap = {
    january: 'Jan',
    february: 'Fev',
    march: 'Mar',
    april: 'Abr',
    may: 'Mai',
    june: 'Jun',
    july: 'Jul',
    august: 'Ago',
    september: 'Set',
    october: 'Out',
    november: 'Nov',
    december: 'Dez',
  };

  //Request data from API
  useEffect(() => {
    //Proposal data
    const fetchProposalData = async () => {
      try {
        const response = await api.get('/propostas/aceite/2024');
        const transformedData = transformApiProposalResponse(response.data);
        setProposalData(transformedData);
      } catch (err) {
        console.log('Failed to fetch proposals data');
      } finally {
        setLoading(false);
      }
    };

    //Monthly data
    const fetchMonthlyData = async () => {
      try {
        const response = await api.get('/propostas/faturamento/2024');
        const transformedData = transformApiMonthlyResponse(response.data);
        setMonthlyData(transformedData);
      } catch (err) {
        console.log('Failed to fetch monthly data');
      } finally {
        setLoading(false);
      }
    };

    //Daily data
    const fetchDailyData = async () => {
      try {
        const response = await api.get('/propostas/faturamento-diario/11/2024');
        const transformedData = transformApiDailyResponse(response.data);
        setDailyData(transformedData);
      } catch (err) {
        console.log('Failed to fetch daily data');
      } finally {
        setLoading(false);
      }
    };

    //Profit target
    const fetchProfitTargetData = async () => {
      try {
        const response = await api.get('/lucros/1');
        setProfitTarget(response.data.lucro);
      } catch (err) {
        console.log('Failed to fetch daily data');
      } finally {
        setLoading(false);
      }
    };

    fetchProposalData();
    fetchMonthlyData();
    fetchDailyData();
    fetchProfitTargetData();
  }, []);

  //Calculate static fields
  useEffect(() => {
    settotalProposals(proposalData.reduce((acc, { propostas }) => acc + propostas, 0));
    settotalAccepts(proposalData.reduce((acc, { aceites }) => acc + aceites, 0));
    setBilling(monthlyData.reduce((acc, { value }) => acc + value, 0));
  }, [proposalData, monthlyData]);
  useEffect(() => {
    setProfit(billing * 0.05);
  }, [billing]);

  // Transform function for Proposal API
  const transformApiProposalResponse = (apiData) => {
    return Object.entries(apiData).map(([month, [propostas, aceites]]) => ({
      month: monthMap[month],
      propostas,
      aceites,
    }));
  };

  // Transform function for Monthly API
  const transformApiMonthlyResponse = (apiData) => {
    return Object.entries(apiData).map(([month, value]) => ({
      month: monthMap[month],
      value,
    }));
  };

  // Transform function for Daily API
  const transformApiDailyResponse = (apiData) => {
    return Object.entries(apiData).map(([day, value]) => ({
      day: day.trim(2),
      value,
    }));
  };

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
                    dataKey={() => profitTarget}
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