class TopUsers extends React.Component {
    render() {
        var border = {
            border: '1px solid black'
        };
        return (
            <div className="col-md-6" style={style}>
                <h2>Top Users</h2>
                <ol>
                    <li>Username1</li>
                    <li>Username2</li>
                    <li>Username3</li>
                    <li>Username4</li>
                    <li>Username5</li>
                </ol>
            </div>
        );
    }
    }