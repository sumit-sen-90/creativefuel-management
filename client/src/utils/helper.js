export const helper = {
  rowColor: (value) => {
    let color =
      value === "Node Js" ? "#FFFF33" : value === "PHP" ? "#66FF99" : "#FFAE42";
    return color;
  },
  formateDate: (date) => {
    const dateObject = new Date(date);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

   
    let formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      dateObject
    );
   
    return formattedDate;
  },
};
