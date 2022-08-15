
function LoadingInit() {
    return (
    <div class="d-flex justify-content-center" 
      style={{
        position: "fixed", top: "0", 
        bottom: "0", left: "0", right: "0", 
        }}>
      <div class="spinner-border" role="status"
        style={{  
          position: 'absolute', width: '200px', 
          height: '150px', top:'0', bottom:'0', 
          color:'#ffc107a6', left:'0',
          right: '0', margin: 'auto', 
        }}>
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    );
  }
  
  export default LoadingInit;
  