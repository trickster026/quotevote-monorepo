class ArtistInfo extends React.Component {
  render() {
    return (
        <div className="col-md-6">
            <div className="row">
                <div className="col-md-6">
                    <img src="http://lorempixel.com/400/200" width="200px" height="200px" />
                    <br />
                    <br />
                    <button className="btn btn-success">Follow</button>
                </div>
                <div className="col-md-6">
                    <h2>Kendrick Lamar</h2>
                    <h3>Score:#</h3>
                    <h3>Up:#</h3>
                    <h3>Down:#</h3>
                    <h3>Followers:#</h3>
                </div>
            </div>
        </div>
    );
  }
}