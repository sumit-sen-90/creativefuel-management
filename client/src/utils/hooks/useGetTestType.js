
import { useEffect, useState } from "react";
import { getAllTestType } from "../functions/testType";
export const useGetTestType =  () => {
    const [testTypeData, setTestTypeData] = useState([]);
  
    const [error, setError] = useState(null);
    useEffect(() => {
      getTestTypeData();
    }, []);
    async function getTestTypeData() {
      try {
        const data = await getAllTestType(setError);
        if (data?.success) {
          
          setTestTypeData(data?.data);
        } else {
          setError(data?.message);
        }
      } catch (error) {
        console.log(error);
        setError("Something went wrong!");
      }
    }
  
    return {
      testTypeData,
      setTestTypeData,
      error,
      setError,
    };
  };
  