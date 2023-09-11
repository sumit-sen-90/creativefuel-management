import { useEffect, useState } from "react";

import { getAllTest } from "../functions/test";
export const useFetchAllTest = () => {
    const [showSpinner, setShowSpiner] = useState(false);
    const [testData, setTestData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
      getTestData();
    }, []);
    async function getTestData() {
      try {
        const data = await getAllTest(setError, setIsLoading);
        if (data?.success) {
          setTestData(data?.data);
        } else {
          setError(data?.message);
        }
      } catch (error) {
        console.log(error);
        setError("Something went wrong!");
      }
    }
  
    return {
      testData,
      setTestData,
      showSpinner,
      setShowSpiner,
      error,
      setError,
      isLoading,
      setIsLoading,
    };
  };