import React, { useEffect } from "react";
import { Helmet } from 'react-helmet-async';

export const SamplePage2: React.FC = () => {
  const componentName = "Sample Page 2";
  useEffect(() => {
    // DOM が準備完了後に実行される処理
    console.log("DOM is ready Sample Page 2");
  });
  return (
    <>
      <Helmet>
        <title>{componentName}</title>
      </Helmet>
      <h3>Sample Page 2</h3>
    </>

  );
}