
function LoadingInit() {
  return (
    <div className="d-flex justify-content-center"
      style={{
        position: "fixed", top: "0",
        bottom: "0", left: "0", right: "0",
      }}>

      <div className="spinner-border" role="status"
        style={{
          position: 'absolute', width: '100px',
          height: '100px', top: '0', bottom: '0',
          color: '#ffc107a6', left: '0', fontWeight: 'bolder',
          right: '0', margin: 'auto',
        }}>

        <span className="visually-hidden">Loading...</span>

      </div>

    </div>
  );
}

export default LoadingInit;
