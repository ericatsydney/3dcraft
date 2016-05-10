<!doctype html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <title>3dcraft</title>
  <link href='/css/app.css' rel='stylesheet'>
  <link href='/css/bootstrap.min.css' rel='stylesheet'/>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css">
</head>
<body>
@include('layout.navigation')
<div id='container'>
  @yield('content')
</div> <!-- end of container -->
{{--@include('layout.footer')--}}
<script src='//code.jquery.com/jquery.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js'></script>
<script src='/js/OrbitControls.js'></script>
<script src='/js/STLLoader.js'></script>
<script src='/js/min/all.js'></script>
</body>
</html>