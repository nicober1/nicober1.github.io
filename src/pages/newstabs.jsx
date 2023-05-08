import React, { useState, useEffect } from "react";
import CardGradientsDark from "@site/src/components/CardGradientsDark";
import Layout from "@theme/Layout";

function Card({ title }) {
  return (
    <CardGradientsDark>
      <div className="card font-bold text-xl mb-2 max-w-sm rounded overflow-hidden shadow-lg p-4">
        {title}
      </div>
    </CardGradientsDark>
  );
}

function TabButton({ label, isActive, onClick }) {
  return (
    <button
      className={`tab-btn ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("cnn");
  const [data, setData] = useState({
    cnn: [],
    bbc: [],
    cnbc: [],    
    goal: [],    
    aljazeera: [],   
    economictimes: [],
    guardian: [],
    hindu: [],
    moneycontrol: [],
    nbc: [],
    nytimes: [],
    reuters: [],
    skynews: [],
    timesofindia: [],
    wsj: [],



  });

  useEffect(() => {
    const fetchData = async (url, tab) => {
      const response = await fetch(url);
      const data = await response.json();
      setData((prevData) => ({ ...prevData, [tab]: data }));
    };

    const fetchAllData = async () => {
      await Promise.all([
        fetchData("https://fluentblogs.com/scrap/cnn.json", "cnn"),
        fetchData("https://fluentblogs.com/scrap/bbc.json", "bbc"),
        fetchData("https://fluentblogs.com/scrap/cnbc.json", "cnbc"),
        fetchData("https://fluentblogs.com/scrap/goal.json", "goal"),     
        fetchData("https://fluentblogs.com/scrap/aljazeera.json", "aljazeera"),
        fetchData("https://fluentblogs.com/scrap/economictimes.json", "economictimes"),
        fetchData("https://fluentblogs.com/scrap/guardian.json", "guardian"),
        fetchData("https://fluentblogs.com/scrap/hindu.json", "hindu"),
        fetchData("https://fluentblogs.com/scrap/moneycontrol.json", "moneycontrol"),
        fetchData("https://fluentblogs.com/scrap/nbc.json", "nbc"),
        fetchData("https://fluentblogs.com/scrap/nytimes.json", "nytimes"),
        fetchData("https://fluentblogs.com/scrap/reuters.json", "reuters"),
        fetchData("https://fluentblogs.com/scrap/skynews.json", "skynews"),
        fetchData("https://fluentblogs.com/scrap/timesofindia.json", "timesofindia"),
        fetchData("https://fluentblogs.com/scrap/wsj.json", "wsj"),


      ]);
    };

    fetchAllData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    const currentData = data[activeTab];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentData.map((item) => (
          <Card title={item} key={item} />
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-center mb-4">
          <div className="tabs">
            <TabButton
              label="CNN"
              isActive={activeTab === "cnn"}
              onClick={() => handleTabClick("cnn")}
            />
            <TabButton
              label="BBC"
              isActive={activeTab === "bbc"}
              onClick={() => handleTabClick("bbc")}
            />
            <TabButton
              label="CNBC"
              isActive={activeTab === "cnbc"}
              onClick={() => handleTabClick("cnbc")}
            />
            <TabButton
              label="GOAL"
              isActive={activeTab === "goal"}
              onClick={() => handleTabClick("goal")}
            />
            <TabButton
              label="GUARDIAN"
              isActive={activeTab === "guardian"}
              onClick={() => handleTabClick("guardian")}
            />
            <TabButton
              label="REUTERS"
              isActive={activeTab === "reuters"}
              onClick={() => handleTabClick("reuters")}
            />
            <TabButton
              label="SKYNEWS"
              isActive={activeTab === "skynews"}
              onClick={() => handleTabClick("skynews")}
            />
            <TabButton
              label="NYTIMES"
              isActive={activeTab === "nytimes"}
              onClick={() => handleTabClick("nytimes")}
            />
            <TabButton
              label="WSJ"
              isActive={activeTab === "wsj"}
              onClick={() => handleTabClick("wsj")}
            />
            <TabButton
              label="TIMESOFINDIA"
              isActive={activeTab === "timesofindia"}
              onClick={() => handleTabClick("timesofindia")}
            />
            <TabButton
              label="NBC"
              isActive={activeTab === "nbc"}
              onClick={() => handleTabClick("nbc")}
            />
            <TabButton
              label="MONEYCONTROL"
              isActive={activeTab === "moneycontrol"}
              onClick={() => handleTabClick("moneycontrol")}
            />
            <TabButton
              label="HINDU"
              isActive={activeTab === "hindu"}
              onClick={() => handleTabClick("hindu")}
            />
            <TabButton
              label="ECONOMICTIMES"
              isActive={activeTab === "economictimes"}
              onClick={() => handleTabClick("economictimes")}
            />
            <TabButton
              label="ALJAZEERA"
              isActive={activeTab === "aljazeera"}
              onClick={() => handleTabClick("aljazeera")}
            />
           

          </div>
        </div>

        {renderTabContent()}
      </div>

      <style jsx>{`
        .tabs {
          display: flex;
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
        }

        .tab-btn.active {
          color: black;
          background-color: white;
        }
      `}</style>
    </Layout>
  );
}

export default App;
