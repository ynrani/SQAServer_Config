<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<title>iTAP | Access Denied</title>

<!-- FONTAWESOME STYLES-->
<link href="font-awesome/css/font-awesome.css" rel="stylesheet" />
<!-- GOOGLE FONTS-->
<link href="font-awesome/css/fontsgoogleapis.css" rel='stylesheet'
	type='text/css' />

<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
<link href="css/bootstrap.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css"
	href="assets/css/theme-default.css" />
<link rel="stylesheet" type="text/css"
	href="assets/css/fontawesome/font-awesome.min.css" />


<!-- START - chat bot styles and scripts -->
<link rel="stylesheet" type="text/css" href="bot/custom.css" />

<!-- END - chat bot styles and scripts -->


<!-- START SPEECH  -->
<script type="text/javascript" src="js/Speech.js"></script>
<script type="text/javascript" src="js/responsivevoice.js"></script>
<!-- END SPEECH -->

<link rel="stylesheet" href="assets/css/new/angular-material.min.css">
<script src="assets/js/new/angular.min.js"></script>
<script src="assets/js/new/angular-animate.min.js"></script>
<script src="assets/js/new/angular-aria.min.js"></script>
<script src="assets/js/new/angular-messages.min.js"></script>
<script src="assets/js/new/angular-material.min.js"></script>

<style type="text/css">
.blink_me {
	animation: blinker 1s linear infinite;
}

@
keyframes blinker { 50% {
	opacity: 0;
}
}
</style>


</head>
<body>
	<div id="inputContainer" class="inputDemo" >

		<div class="page-container page-navigation-top">

			<div class="page-content" style="background-color: #f0f0f0;">

				<jsp:include page="smartQAheader.jsp"></jsp:include>

				<div class="page-content-wrap"
					style="margin-top: 75px; margin-bottom: 75px;">

					<h1
						style="text-align: center; color: red; font-family: serif; font-size: 400%;"
						class="blink_me">Access Denied</h1>
					<h2
						style="text-align: center; color: black; font-family: serif; font-size: 100%;">You
						are not authorized to access this page, please go to home screen
						or login again with authorized user-id</h2>
					<div style="margin-top: 24px; margin-left: 643px;">
						<a href="./smartQAHome" type="submit" class=" btn  btn-success"
							style="margin-top: -6px;" id="executeBtn">Home</a> <a href="./"
							type="submit" class=" btn  btn-success" style="margin-top: -6px;"
							id="executeBtn">Login</a>
					</div>
					<footer>
						<jsp:include page="smartQAfooter.jsp"></jsp:include>
					</footer>

				</div>
			</div>
		</div>


	</div>




	<script src="js/jquery.js"></script>
	<script src="js/multiselect.js"></script>
	<script src="js/defect.js"></script>
	<script src="js/jqBootstrapValidation.js"></script>
	<script src="js/contact_me.js"></script>
	<!-- 	<script src="js/agency.js"></script> -->
	<script src="js/classie.js"></script>
	<!-- START PRELOADS -->
	<audio id="audio-alert" src="assets/audio/alert.mp3" preload="auto"></audio>
	<audio id="audio-fail" src="assets/audio/fail.mp3" preload="auto"></audio>
	<!-- END PRELOADS -->

	<!-- START SCRIPTS -->
	<!-- START PLUGINS -->
	<!-- <script type="text/javascript" src="assets/js/plugins/jquery/jquery.min.js"></script> -->
	<script type="text/javascript"
		src="assets/js/plugins/jquery/jquery-ui.min.js"></script>
	<script type="text/javascript"
		src="assets/js/plugins/bootstrap/bootstrap.min.js"></script>
	<!-- END PLUGINS -->

	<!-- START THIS PAGE PLUGINS-->
	<script type="text/javascript"
		src="assets/js/plugins/icheck/icheck.min.js"></script>
	<script type="text/javascript"
		src="assets/js/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js"></script>
	<script type="text/javascript"
		src="assets/js/plugins/scrolltotop/scrolltopcontrol.js"></script>
	<script type="text/javascript"
		src="assets/js/plugins/bootstrap/bootstrap-datepicker.js"></script>
	<script type="text/javascript"
		src="assets/js/plugins/bootstrap/bootstrap-select.js"></script>

	<!-- END THIS PAGE PLUGINS-->

	<!-- START TEMPLATE -->
	<script type="text/javascript" src="assets/js/settings.js"></script>
	<script type="text/javascript" src="assets/js/plugins.js"></script>
	<script type="text/javascript" src="assets/js/actions.js"></script>

	<!-- END TEMPLATE -->
	<script type="text/javascript" src="bot/chat.js"></script>

	<!-- END SCRIPTS -->







</body>
</html>

