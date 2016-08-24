<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>3dcraft</title>
  <link href='/css/app.css' rel='stylesheet'>
  <link href='/css/bootstrap.min.css' rel='stylesheet'/>
  <link rel="stylesheet" href="/css/font-awesome.min.css">
  <link href="/css/app.css" rel="stylesheet">
  <link href="/css/bootstrap.min.css" rel="stylesheet"/>
</head>
<body>
@include("layout.navigation")
<div id="container">
  @yield("content")
  <div id="threeApp"></div>
</div> <!-- end of container -->
{{--@include("layout.footer")--}}
<script src="/js/jquery.js"></script>
<!--script src="/js/OrbitControls.js"></script-->
<script src="/js/min/vendor.js"></script>
<script src="/js/min/all.js"></script>
<script src="/js/bootstrap.min.js"></script>
{{--<script src="https://fb.me/react-0.13.3.js"></script>--}}
{{--<script src="https://fb.me/JSXTransformer-0.13.3.js"></script>--}}
{{--<script type="text/jsx" src="/js/min/react.js"></script>--}}
</body>
</html>
