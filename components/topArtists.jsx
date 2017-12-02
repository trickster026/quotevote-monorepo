class TopArtists extends React.Component {
  render() {
    var border = {
        border: '1px solid black'
    };
    return (
        <div className="col-md-4" style={style}>
            <h2>Top Artists</h2>
            <ol>
                <li>Artist1</li>
                <li>Artist2</li>
                <li>Artist3</li>
                <li>Artist4</li>
                <li>Artist5</li>
            </ol>
        </div>
    );
  }
}




