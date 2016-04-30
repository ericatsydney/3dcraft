<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>3dcraft</title>
  <link href="/css/app.css" rel="stylesheet">
  <link href="/css/bootstrap.min.css" rel="stylesheet"/>
</head>
<body>
@include("layout.navigation")
<div id="container">
  @yield("content")
</div> <!-- end of container -->
<div id="myDiv"></div>
{{--@include("layout.footer")--}}
<script src="//code.jquery.com/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js"></script>
<script src="/js/OrbitControls.js"></script>
<script src="/js/STLLoader.js"></script>
<script src="/js/min/all.js"></script>
<script src="https://fb.me/react-0.13.3.js"></script>
<script src="https://fb.me/JSXTransformer-0.13.3.js"></script>
{{--<script src="/js/min/react.js"></script>--}}
<script type="text/jsx">
  var HelloWorld = React.createClass({
    render: function(){
      return (
          <div className="panel panel-primary">
            Control Panel
          </div>
      );
    }
  });
  React.render(<HelloWorld />, document.getElementById('myDiv'));
</script>
</body>
</html>