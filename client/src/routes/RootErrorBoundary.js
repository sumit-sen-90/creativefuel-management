import styles from "./RootErrorBoundary.module.css";
const RootErrorBoundary = () => {
  // const error = useRouteError();
  return (
    <>
      <div className={styles.error_page}>
        <h1>{/* {error.status} : {error.statusText} */}</h1>
        <h1>404</h1>
        {/* <p>{error.statusText}</p> */}
        <p>Oh no! We couldn’t find it</p>
      </div>
    </>
  );
};

export default RootErrorBoundary;
