<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<title>SmartQA | Login</title>
<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">

<link rel="stylesheet" href="assets/css/new/angular-material.min.css">
<script src="assets/js/new/angular.min.js"></script>
<script src="assets/js/new/angular-animate.min.js"></script>
<script src="assets/js/new/angular-aria.min.js"></script>
<script src="assets/js/new/angular-messages.min.js"></script>
<script src="assets/js/new/angular-material.min.js"></script>

<!-- BOOTSTRAP STYLES-->
<link rel="stylesheet" type="text/css" id="theme"
	href="assets/css/theme-default.css" />
<style type="text/css">
div.vertical-line {
	width: 0px; /* Use only border style */
	height: 100%;
	float: left;
	border: 1px inset; /* This is default border style for <hr> tag */
}

hr.style13 {
	height: 10px;
	border: 0;
	box-shadow: 0 10px 10px -10px #8c8b8b inset;
}

hr.style14 {
	border: 0;
	height: 2px;
	background-image: -webkit-linear-gradient(left, #f0f0f0, #085690, #f0f0f0);
	background-image: -moz-linear-gradient(left, #f0f0f0, #085690, #f0f0f0);
	background-image: -ms-linear-gradient(left, #f0f0f0, #085690, #f0f0f0);
	background-image: -o-linear-gradient(left, #f0f0f0, #085690, #f0f0f0);
}
</style>
<script language="javascript">
         angular
            .module('firstApplication', ['ngMaterial'])
            .controller('inputController', inputController);

         function inputController ($scope) {
           $scope.project = {
              comments: 'Comments',    
           };
         }                 
      </script>
</head>
<body data-ng-app="firstApplication"
	style="background-color: #FFFFFF; background: url('./images/bg-images/bg2.jpg') no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;">
	<div class="container" ng-controller="inputController as ctrl" ng-cloak>
		<div class="row"
			style="border-radius: 5px; width: 36%; margin-top: 150px;">
			<div class="col-md-2" style="margin-top: 35px;">
				<img style="margin-left: -120px; margin-top: 51px; width: 170px;"
					src="images/Capgemini.gif" />
			</div>
			<div class="vertical-line"
				style="height: 45px; margin-top: 85px; margin-left: 5px;"></div>
			<div class="col-md-2" style="margin-top: 35px;">
				<img style="margin-top: 51px;" src="images/logo.png" />
			</div>
			<div class="col-md-2" style="margin-top: 48px; margin-left: -13px;">
				<img style="margin-top: 37px; width: 151px;"
					src="images/Picture3.png" />
			</div>
		</div>

		<div class="col-md-12 " style="margin-left: -127px;">

			<div
				style="margin-left: 8px; padding-left: 10px; padding-right: 10px; margin-top: 23px;"
				class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">

				<div class="panel-body"
					style="background-color: white; border-radius: 5px;">
					<h2 style="color: #085690; font-weight: 600;" class="text-center">LOGIN</h2>
					<form:form id="loginForm" name="loginForm"
						action="${pageContext.request.contextPath}/smartQAlogin"
						method="post" autocomplete="on">
						<hr class="style14" />
						<h5 style="color: #DC1928;">
							<% if(request.getParameter("auth")!=null && request.getParameter("auth").equals("fail")){
								    	out.println("Authentication Failed");
										 }		
										  else if(request.getParameter("logout")!=null && request.getParameter("logout").equals("true")){
												out.println("Logout Successfully");
										 }
										  else if(request.getParameter("session")!=null && request.getParameter("session").equals("expired")){
												out.println("Session Expired");
										 }else if(request.getParameter("session")!=null && request.getParameter("session").equals("alreadyLogged")){
												out.println("User Already Logged In");
										 }else if(request.getParameter("session")!=null && request.getParameter("session").equals("invalid")){
												out.println("Session has been invalidated");
										 }else if(request.getParameter("disabled")!=null && request.getParameter("disabled").equals("yes")){
												out.println("User Access has been disabled, please contact Administrator");
										 }
										%>
						</h5>
						<br />

						<md-input-container class="md-block"> <label
							style="color: rgb(42, 108, 158);">User Name</label> <input
							style="border-color: rgba(42, 108, 158, 0.71);" required
							name="userid" /> </md-input-container>
						<md-input-container class="md-block"> <label
							style="color: rgb(42, 108, 158);">Password</label> <input
							style="border-color: rgba(42, 108, 158, 0.71);" required
							type="password" name="password" /> </md-input-container>

						<div class="form-group pull-left" style="margin-top: 15px;">
							<a href="#">Forgot Password</a>
						</div>


						<div class="form-group pull-right" style="margin-top: 8px;">
							<input type="submit" value="Login Now" class="btn btn-primary" />
						</div>

						<input type="hidden" name="${_csrf.parameterName}"
							value="${_csrf.token}" />
					</form:form>
				</div>
			</div>
		</div>

	</div>

	<script type="text/javascript"
		src="assets/js/plugins/jquery/jquery.min.js"></script>
	<script type="text/javascript"
		src="assets/js/plugins/jquery/jquery-ui.min.js"></script>
	<script type="text/javascript"
		src="assets/js/plugins/bootstrap/bootstrap.min.js"></script>

	<script type="text/javascript"> 
  
 window.history.forward();
	function noBack()
	{
		window.history.forward();
	}
	 
	$(document).ready(function() {
		$("#ajaxloader").hide();
	} );
	 
	
</script>
</body>
</html>
