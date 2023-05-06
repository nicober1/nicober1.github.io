import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CardGradientsDark from '@site/src/components/CardGradientsDark'
import Layout from '@theme/Layout'



function Card({ title }) {
  return (
    <CardGradientsDark>
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
      <div className="card font-bold text-xl mb-2">{title}</div>
    </div>
    </CardGradientsDark>

  );
}

function App() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);  
  const [data3, setData3] = useState([]);


  useEffect(() => {
    // Replace with your actual API URLs
    fetch("https://fluentblogs.com/scrap/cnn.json")
      .then((response) => response.json())
      .then((data) => setData1(data));

      fetch("https://fluentblogs.com/scrap/cnbc.json")
      .then((response) => response.json())
      .then((data) => setData3(data));

    fetch("https://fluentblogs.com/scrap/bbc.json")
      .then((response) => response.json())
      .then((data) => setData2(data));
  }, []);

  return (
    <Layout>


    <div className="container mx-auto p-4">
      <Tabs>
        <TabList>
          <Tab>CNN</Tab>
          <Tab>BBC</Tab>          
          <Tab>CNBC</Tab>

        </TabList>

        <TabPanel>
          <div className="grid grid-cols-3 gap-4">
            {data1.map((item) => (
              <Card title={item} key={item} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-3 gap-4">
            {data2.map((item) => (
              <Card title={item} key={item} />
            ))}
          </div>
        </TabPanel>

         <TabPanel>
          <div className="grid grid-cols-3 gap-4">
            {data3.map((item) => (
              <Card title={item} key={item} />
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
        </Layout>

  );
}

export default App;