class PublicNewsFeed extends React.Component {
  render() {
    var border = {
        border: '1px solid black'
    };
    return (
        <div className="col-md-12" style={style}>
            <h2>Plublic News Feed</h2>
            <ul>
                <li>NEW SONG: Kanye West - Can't Tell Me Nothing</li>
                <li>Vote Event: 'lyric string here' was voted up/down by username[link to song]</li>
            </ul>
        </div>
    );
  }
}