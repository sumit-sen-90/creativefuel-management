import { constants } from "../constant";
export const getAllTestType = async (setError) => {
  try {
    const data = await fetch(constants.get_all_test_type_url);
    const jsonData = await data?.json();

    return jsonData;
  } catch (error) {
    console.log(error);
    setError("Something went wrong!");
  }
};

export const createTestType = async (
  setError,
  setShowErrorModal,
  setTestTypeData,
  setIsTypeCreation,
  data
) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const fetchedData = await fetch(
      constants.create_test_type_url,
      requestOptions
    );
    const res = await fetchedData?.json();
    if (!res?.success) {
      setShowErrorModal(true);
      setError(res?.message);
    } else {
      let res = await getAllTestType(setError);
      if (!res?.success) {
        setShowErrorModal(true);
        setError(res?.message);
      }
      setIsTypeCreation(false);
      setTestTypeData(res?.data);
    }
  } catch (error) {
    console.log(error);
    setError("Something went wrong!");
  }
};
