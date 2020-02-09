<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<title>SmartQA | Server Config Page</title>
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

<link rel="stylesheet" href="assets/css/new/angular-material.min.css">
<script src="assets/js/new/angular.min.js"></script>
<script src="assets/js/new/angular-animate.min.js"></script>
<script src="assets/js/new/angular-aria.min.js"></script>
<script src="assets/js/new/angular-messages.min.js"></script>
<script src="assets/js/new/angular-material.min.js"></script>

<link rel="stylesheet" type="text/css" href="bot/custom.css" />

<script>
	angular.module('firstApplication', [ 'ngMaterial' ]).controller(
			'inputController', inputController);

	function inputController($scope) {
		$scope.project = {
			comments : 'Comments',
		};

	}
</script>
</head>



<body data-ng-app="firstApplication">

	<div id="inputContainer" class="inputDemo"
		data-ng-controller="inputController as ctrl" data-ng-cloak>
		<!-- START PAGE CONTAINER -->
		<div class="page-container page-navigation-top">
			<!-- PAGE CONTENT -->
			<div class="page-content">
				<!-- START X-NAVIGATION VERTICAL -->
				<jsp:include page="smartQAheader.jsp"></jsp:include>
				<!-- END X-NAVIGATION VERTICAL -->

				<!-- PAGE CONTENT WRAPPER -->
				<div class="page-content-wrap"
					style="margin-top: 75px; margin-bottom: 75px;">
					<div class="row">
						<!-- Panel 1 Start  -->
						<div class="col-md-10" style="margin-left: 126px;">


							<div id="server" class="panel panel-default"
								style="border-radius: 5px;">
								<div class="panel-heading ui-draggable-handle"
									style="border-radius: 5px;">
									<span class="panel-title">Server Config Details</span>
									<button type="button" class="pull-right btn  btn-primary"
										style="margin-top: -6px;" id="addNew" onclick="loadAjax();">Add
										Server Details</button>
								</div>
								<div class="panel-body " style="border-radius: 5px;">
									<div class="col-md-12">
										<div class="col-md-3 form-group"></div>
										<div class="col-md-6 form-group">
											<select class="form-control select" data-live-search="true"
												name="serverName" id="serverName">
												<option value="">- Select -</option>
												<c:forEach items="${serverNames}" var="serverName">
													<option value="${serverName}">${serverName}</option>
												</c:forEach>
											</select>
										</div>
										<div class="col-md-3 form-group">
											<input type="button" id="serverConfigDetails"
												name="serverConfigDetails" class="btn btn-success"
												value="Fetch Server Details" onclick="FetchServerDetails();" />
										</div>

										<hr>
										<br />
									</div>
									<div class="col-md-12 form-group">
										<div id="maindivID" class="col-md-12 form-group"
											style="display: none;">

											<div class="col-md-12">
												<div class="col-md-4 form-group">
													<md-input-container class="md-block">
													<label>Host Name</label> <input id="hostName"
														name="hostName" /> </md-input-container>
												</div>
												<div class="col-md-4 form-group">
													<md-input-container class="md-block">
													<label>IP Address</label> <input id="ipAddress"
														name="ipAddress" /> </md-input-container>
												</div>
												<div class="col-md-4 form-group">
													<md-input-container class="md-block">
													<label>Server Type</label> <input id="serverType"
														name="serverType" /> </md-input-container>
												</div>
											</div>
											<div class="col-md-12">
												<div class="col-md-6 form-group">
													<md-input-container class="md-block">
													<label>Application URL</label> <input id="appURL"
														name="appURL" /> </md-input-container>
												</div>
												<div class="col-md-6 form-group">
													<md-input-container class="md-block">
													<label>Jenkins URL</label> <input id="jenkinsURL"
														name="jenkinsURL" /> </md-input-container>
												</div>
											</div>
											<div class="col-md-12 form-group">
												
												<div class="col-md-8 form-group">
													<md-input-container class="md-block"> <label>WildFly
													Application Server Path</label> <input id="wildflyAppServerPath"
													name="wildflyAppServerPath" /> </md-input-container>
												</div>
												<div class="col-md-4 form-group">
													<md-input-container class="md-block">
													<label>WildFly StartUp Service Name</label> <input id="wildflyStartupServiceName"
														name="wildflyStartupServiceName" /> </md-input-container>
												</div>
											</div>
											<div class="col-md-12 form-group">
												<md-input-container class="md-block"> <label>Tomcat
													Application Server Path</label> <input id="tomcatAppServerPath"
													name="tomcatAppServerPath" /> </md-input-container>

											</div>
											<div class="col-md-12 form-group">
												<md-input-container class="md-block"> <label>Jenkins
													Path</label> <input id="jenkinsPath" name="jenkinsPath" /> </md-input-container>

											</div>
											<div class="col-md-12 form-group">
												<md-input-container class="md-block"> <label>Properties
													Folder Path</label> <input id="propFolderPath"
													name="propFolderPath" /> </md-input-container>

											</div>
										</div>


									</div>
								</div>
								<div class="panel-footer">
									<button type="button" class="pull-right btn  btn-primary"
										style="margin-top: -6px;" id="Update" onclick="loadAjax();">Update
										Server Details</button>
								</div>
							</div>
							<!-- Panel 1 End  -->
						</div>
					</div>
					<!-- END PAGE CONTENT WRAPPER -->

					<footer>
						<jsp:include page="smartQAfooter.jsp"></jsp:include>
					</footer>
				</div>
				<!-- END PAGE CONTENT -->

				<jsp:include page="/bot/Minerva.jsp"></jsp:include>
			</div>
			<!-- END PAGE CONTAINER -->
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

	<script type="text/javascript">
			$(document).ready(function() {
				

			});

			function FetchServerDetails() {

				var serverName = $("#serverName").val();
				var serverDtls;
				
				  $.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "/SmartQAServer/getServerConfigDetails?serverName="+serverName,
			          async: false,
			          success : function(data) {
			        	  serverDtls = data;
			          }
			      });
				   
				  populateServerDetails(serverDtls);  

			}

			function populateServerDetails(serverDtls) {
				if(null!=serverDtls){
					
					
					$("#hostName").val(serverDtls.hostName);
					$("#ipAddress").val(serverDtls.ipAddress);
					$("#serverType").val(serverDtls.serverType);
					$("#appURL").val(serverDtls.appURL);
					$("#jenkinsURL").val(serverDtls.jenkinsURL);
					$("#wildflyAppServerPath").val(serverDtls.wildflyAppServerPath);
					$("#wildflyStartupServiceName").val(serverDtls.wildflyStartupServiceName);
					$("#tomcatAppServerPath").val(serverDtls.tomcatAppServerPath);
					$("#jenkinsPath").val(serverDtls.jenkinsPath);
					$("#propFolderPath").val(serverDtls.propFolderPath);
					
					$("#maindivID").show();
					$("#maindivID").refresh();
					
				}
				
				

			}

			function ForceLogOff() {

				alert("logoff success");
			}
		</script>
</body>
</html>
