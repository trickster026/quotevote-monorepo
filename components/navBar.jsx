class NavBar extends React.Component {
            render() {
                return (
                    <div class="container">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapsible">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand" href="#">HHSB</a>
                        </div>

                        <div class="navbar-collapse collapse" id="navbar-collapsible">

                            <ul class="nav navbar-nav navbar-left">
                                <li><a href="#">ScoreBoard</a></li>
                                <li><a href="#">Sign In</a></li>
                            </ul>

                            <form class="navbar-form navbar-right ">
                                <div class="form-group">
                                    <div class="input-group">
                                        <input type="text" class="form-control">
                                        <span class="input-group-btn">
                                            <button on-click="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                );
            }
            }