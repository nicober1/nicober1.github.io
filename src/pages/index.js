import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";


export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <div>
        <h1 className="uppercase">Fluent Blogs</h1>
      </div>
    </Layout>
  );
}
