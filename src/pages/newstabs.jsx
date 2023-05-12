import React, {useState, useEffect} from 'react'
import CardGradientsDark from '@site/src/components/CardGradientsDark'
import Layout from '@theme/Layout'

function Card({title}) {
  return (
    <CardGradientsDark>
      <div className='card mb-2 max-w-sm overflow-hidden rounded p-4 text-xl font-bold shadow-lg'>{title}</div>
    </CardGradientsDark>
  )
}

function TabButton({label, isActive, onClick}) {
  return (
    <button className={`tab-btn ${isActive ? 'active' : ''}`} onClick={onClick}>
      {label}
    </button>
  )
}

const tabData = {
  cnn: 'https://fluentblogs.com/scrap/cnn.json',
  bbc: 'https://fluentblogs.com/scrap/bbc.json',
  cnbc: 'https://fluentblogs.com/scrap/cnbc.json',
  goal: 'https://fluentblogs.com/scrap/goal.json',
  aljazeera: 'https://fluentblogs.com/scrap/aljazeera.json',
  economictimes: 'https://fluentblogs.com/scrap/economictimes.json',
  guardian: 'https://fluentblogs.com/scrap/guardian.json',
  hindu: 'https://fluentblogs.com/scrap/hindu.json',
  moneycontrol: 'https://fluentblogs.com/scrap/moneycontrol.json',
  nbc: 'https://fluentblogs.com/scrap/nbc.json',
  nytimes: 'https://fluentblogs.com/scrap/nytimes.json',
  reuters: 'https://fluentblogs.com/scrap/reuters.json',
  skynews: 'https://fluentblogs.com/scrap/skynews.json',
  timesofindia: 'https://fluentblogs.com/scrap/timesofindia.json',
  wsj: 'https://fluentblogs.com/scrap/wsj.json',
  wikinews: 'https://fluentblogs.com/scrap/wikinews.json',
  bbc_sports: 'https://fluentblogs.com/scrap/sportsbbc.json',
  livemint: 'https://fluentblogs.com/scrap/livemint.json',
}

export default function App() {
  const [activeTab, setActiveTab] = useState('cnn')
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async (url, tab) => {
      const response = await fetch(url)
      const data = await response.json()
      setData((prevData) => ({...prevData, [tab]: data}))
    }

    const fetchAllData = async () => {
      await Promise.all(Object.entries(tabData).map(([tab, url]) => fetchData(url, tab)))
    }

    fetchAllData()
  }, [])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const renderTabButtons = () => {
    return Object.entries(tabData).map(([tab, url]) => (
      <TabButton key={tab} label={tab.toUpperCase()} isActive={activeTab === tab} onClick={() => handleTabClick(tab)} />
    ))
  }

  const renderTabContent = () => {
    const currentData = data[activeTab]

    return (
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {currentData && currentData.map((item) => <Card title={item} key={item} />)}
      </div>
    )
  }

  return (
    <Layout>
      <div className='container mx-auto p-4'>
        <div className='mb-4 flex justify-center'>
          <div className='tabs'>{renderTabButtons()}</div>
        </div>

        {renderTabContent()}
      </div>

      <style jsx>{`
        .tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tab-btn {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          border: none;
          background-color: black;
          color: white;
          transition: all 0.3s ease;
          cursor: pointer;
          margin: 0.5rem;
        }

        .tab-btn.active {
          color: black;
          background-color: white;
        }
      `}</style>
    </Layout>
  )
}
