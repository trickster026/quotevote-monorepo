class NavBar extends React.Component {
            render() {
                return (
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapsible">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">HHSB</a>
                        </div>

                        <div className="navbar-collapse collapse" id="navbar-collapsible">

                            <ul className="nav navbar-nav navbar-left">
                                <li><a href="#">ScoreBoard</a></li>
                                <li><a href="#">Sign In</a></li>
                            </ul>

                            <form className="navbar-form navbar-right ">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" className="form-control" />
                                        <span className="input-group-btn">
                                            <button className="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                );
            }
            }