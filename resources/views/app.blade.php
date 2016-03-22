<!doctype html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <title>3dcraft</title>
  <link href='/css/app.css' rel='stylesheet'>
  <link href='/css/bootstrap.min.css' rel='stylesheet'/>
</head>
<body>
@include('layout.navigation')
<div class='container'>
  @yield('content')
  @include('layout.footer')
</div> <!-- end of container -->
<script src='//code.jquery.com/jquery.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js'></script>
{{--<script src='{{ URL::asset('/js/min/all.js') }}'></script>--}}
</body>
</html>