class RecommendedSongs extends React.Component {
  render() {
    var border = {
        border: '1px solid black'
    };
    return (
        <div className="col-md-6" style={style}>
                <h2>Recommended Songs</h2>
                <ol>
                    <li>Hit'em Up - 2pac</li>
                    <li>who Shot Ya - Notorious BIG</li>
                    ...
                </ol>
        </div>
    );
  }
}