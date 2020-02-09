<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<title>SmartQA | Main Page</title>
<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
<meta name="description" content="">
<meta name="author" content="">

<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" type="text/css"
	href="assets/css/bootstrap/bootstrap.min.css" />

<link rel="stylesheet" type="text/css"
	href="assets/css/theme-default.css" />
<!-- FONTAWESOME STYLES-->
<link href="font-awesome/css/font-awesome.css" rel="stylesheet" />
<!-- GOOGLE FONTS-->
<link href="font-awesome/css/fontsgoogleapis.css" rel='stylesheet'
	type='text/css' />
<!-- chat bot styles and scripts -->

<link rel="stylesheet" type="text/css" href="bot/custom.css" />
</head>

<body style="padding-top: 0px; background-color: #ffffff;">
	<div class="page-container page-navigation-top">
		<!-- PAGE CONTENT -->
		<div class="page-content">

			<header>
				<div id="headerdiv" style="display: block;">
					<jsp:include page="smartQAheader.jsp"></jsp:include>
				</div>
			</header>
			<br />

			<div>
			
			<div>
			
			<img src="images/bg-images/bg1.jpg" style="width: 100%; height: 100%;"/>
			</div>


				<jsp:include page="/bot/Minerva.jsp"></jsp:include>

			</div>
			<footer>
				<div id="footerdiv" style="display: block;">
					<jsp:include page="footer.jsp"></jsp:include>
				</div>
			</footer>

		</div>
	</div>





	<!-- ******CHAT WINDOW****** -->

	<jsp:include page="/bot/chat.jsp"></jsp:include>

	<!-- ******END OF CHAT WINDOW****** -->


	<script type="text/javascript" src="js/Speech.js"></script>
	<script type="text/javascript" src="js/responsivevoice.js"></script>

	<!-- START SCRIPTS -->
	<!-- START PLUGINS -->
	<script type="text/javascript"
		src="assets/js/plugins/jquery/jquery.min.js"></script>
	<script type="text/javascript"
		src="assets/js/plugins/jquery/jquery-ui.min.js"></script>
	<script type="text/javascript"
		src="assets/js/plugins/bootstrap/bootstrap.min.js"></script>
	<!-- END PLUGINS -->

	<!-- THIS PAGE PLUGINS -->
	<script type="text/javascript"
		src="assets/js/plugins/icheck/icheck.min.js"></script>
	<script type="text/javascript"
		src="assets/js/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js"></script>
	<!-- END PAGE PLUGINS -->

	<!-- START TEMPLATE -->
	<script type="text/javascript" src="assets/js/settings.js"></script>

	<script type="text/javascript" src="assets/js/plugins.js"></script>
	<script type="text/javascript" src="assets/js/actions.js"></script>

	<!-- END TEMPLATE -->

	<script type="text/javascript" src="bot/chat.js"></script>
	<!-- END SCRIPTS -->



</body>
</html>
