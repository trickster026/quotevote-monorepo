class TrendingSongs extends React.Component {
  render() {
    var border = {
        border: '1px solid black'
    };
    return (
        <div className="col-md-6" style={style}>
            <h2>Trending Songs</h2>
            <ol>
                <li>Song1</li>
                <li>Song2</li>
                <li>Song3</li>
                <li>Song4</li>
                <li>Song5</li>
            </ol>
        </div>
    );
  }
}