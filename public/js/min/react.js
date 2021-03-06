var AxisControl = React.createClass({
  render: function() {
    return (
      <li>
        <a href="#">
          <i className="fa fa-envelope fa-fw"></i>
        </a>
      </li>
    );
  }
});

var BackgroundControl = React.createClass({
  render: function() {
    return (
      <li className="dropdown">
      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
    aria-expanded="false">
      <i className="fa fa-user fa-fw"></i>
      <span className="caret"></span></a>
    <ul className="dropdown-menu">
      <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li role="separator" class="divider"></li>
      <li><a href="#">Separated link</a></li>
    </ul>
    </li>
    );
  }
});

var MainMenu = React.createClass({
  getInitialState: function() {
    if (localStorage.getItem(enableAxis).length) {
      if (localStorage.getItem(enableAxis)) {
        AxisControlStatus = 'enabled';
      }
    }
    return {};
  },

  render: function(){
    return (
      <ul className="nav navbar-nav navbar-right">
        <AxisControl />
        <BackgroundControl />
      </ul>
    );
  }
});
React.render(<MainMenu />, document.getElementById('navbar-main'));