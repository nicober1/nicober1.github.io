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

function App() {
  const [activeTab, setActiveTab] = useState("cnn");
  const [data, setData] = useState({
    cnn: [],
    bbc: [],
  });

  useEffect(() => {
    // Replace with your actual API URLs
    fetch("https://fluentblogs.com/scrap/cnn.json")
      .then((response) => response.json())
      .then((data) => setData((prevData) => ({ ...prevData, cnn: data })));
    fetch("https://fluentblogs.com/scrap/bbc.json")
      .then((response) => response.json())
      .then((data) => setData((prevData) => ({ ...prevData, bbc: data })));
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
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`tab-btn ${activeTab === "cnn" ? "active" : ""}`}
            onClick={() => handleTabClick("cnn")}
          >
            CNN
          </button>
          <button
            className={`tab-btn ${activeTab === "bbc" ? "active" : ""}`}
            onClick={() => handleTabClick("bbc")}
          >
            BBC
          </button>
        </div>

        {renderTabContent()}
      </div>
      <style jsx>{`
        .tab-btn {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          border: none;
          background-color: transparent;
          color: #333;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .tab-btn.active {
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </Layout>
  );
}

export default App;
