import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CardGradientsDark from '@site/src/components/CardGradientsDark'
import Layout from '@theme/Layout'



function Card({ title }) {
  return (
    <CardGradientsDark>
      <div className="card font-bold text-xl mb-2 max-w-sm rounded overflow-hidden shadow-lg p-4">{title}</div>
    </CardGradientsDark>

  );
}

function App() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);  
  const [data3, setData3] = useState([]);  
  const [data4, setData4] = useState([]);  
  const [data5, setData5] = useState([]);  
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState([]);
  const [data9, setData9] = useState([]);
  const [data10, setData10] = useState([]);
  




  useEffect(() => {
    // Replace with your actual API URLs
    fetch("https://fluentblogs.com/scrap/cnn.json")
      .then((response) => response.json())
      .then((data) => setData1(data));
    fetch("https://fluentblogs.com/scrap/bbc.json")
      .then((response) => response.json())
      .then((data) => setData2(data));
    fetch("https://fluentblogs.com/scrap/cnbc.json")
      .then((response) => response.json())
      .then((data) => setData3(data));

    fetch("https://fluentblogs.com/scrap/mc.json")
      .then((response) => response.json())
      .then((data) => setData4(data));

       fetch("https://fluentblogs.com/scrap/et.json")
      .then((response) => response.json())
      .then((data) => setData5(data));

  }, []);

  return (
    <Layout>


    <div className="container mx-auto p-4">
      <Tabs>
        <TabList>
          <Tab>CNN</Tab>
          <Tab>BBC</Tab>          
          <Tab>CNBC</Tab>          
          <Tab>MoneyControl</Tab>         
           <Tab>Economic TImes</Tab>

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

        <TabPanel>
          <div className="grid grid-cols-3 gap-4">
            {data4.map((item) => (
              <Card title={item} key={item} />
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-3 gap-4">
            {data5.map((item) => (
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