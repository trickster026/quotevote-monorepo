class Welcome extends React.Component {
  render() {
    var border = {
        border: '1px solid black'
    };
    return (
        <div className="col-md-8" style={style}> 
            <h2>Welcome to HHSB</h2>
            <p>Here you can vote on hip hop songs.....</p>
        </div>
    );
  }
}