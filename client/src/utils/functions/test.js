import { constants } from "../constant";

export const createTest = async (setError, setShowErrorModal, data) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const res = await fetch(constants.create_test_url, requestOptions);
    const jsonData = await res?.json();
    if (!jsonData?.success) {
      setShowErrorModal(true);
      setError(jsonData?.message);
    }
    return jsonData?.success;
  } catch (error) {
    console.log(error);
    setError("Something went wrong!");
  }
};
export const updateTest = async (setError, setShowErrorModal, data, id) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const res = await fetch(
      `${constants.update_test_url}${id}`,
      requestOptions
    );
    const jsonData = await res?.json();
    if (!jsonData?.success) {
      setShowErrorModal(true);
      setError(jsonData?.message);
    }
    return jsonData?.success;
  } catch (error) {
    console.log(error);
    setError("Something went wrong!");
  }
};
export const getTest = async (setError, id) => {
  try {
    const res = await fetch(`${constants.get_test_url}${id}`);
    const jsonData = await res?.json();
 
    return jsonData;
  } catch (error) {
    console.log(error);
    setError("Something went wrong!");
  }
};

export const getAllTest = async (setError, setIsLoading) => {
  try {
    const data = await fetch(constants.get_all_test_url);
    const jsonData = await data?.json();
    setIsLoading(false);

    if (!jsonData?.success) {
      setError(jsonData?.message);
    }
    return jsonData;
  } catch (error) {
    console.log(error);
    setError("Something went wrong!");
  }
};

export const deleteTest = async (id, setError) => {
  try {
    const data = await fetch(`${constants.delte_tes_url}${id}`, {
      method: "DELETE",
    });
    const jsonData = await data?.json();

    return jsonData;
  } catch (error) {
    console.log(error);
    setError("Something went wrong!");
  }
};
