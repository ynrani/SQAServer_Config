<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<title>SmartQA | Server Deployment Page</title>
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
									<span class="panel-title">Server Deployment Details</span>
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
									<div>
										<div>
											<input type="hidden" id="wildFlyServiceName"
												name="wildFlyServiceName">
											<input type="hidden" id="wildFlyServiceStatus"
												name="wildFlyServiceStatus">
											<button type="button" class="pull-right btn  btn-success"
												style="margin-top: -6px;" id="startWildFlyService"
												onclick="startWildFlyService();">Start WildFly
												Server</button>
											<button type="button" class="pull-right btn  btn-success"
												style="margin-top: -6px;" id="stopWildFlyService"
												onclick="stopWildFlyService();">Stop WildFly Server</button>

										</div>

										<div class="col-md-12 form-group">
											<div id="maintableID" class="col-md-12 form-group">
												<div id="tableID">

													<table id="tableclud"
														class="table table-hover table-striped table-bordered">
														<thead>
															<tr>
																<th>Server Name</th>
																<th>File Name</th>
																<th>Action</th>
															</tr>
														</thead>
														<tbody id="tablecludbody">
														</tbody>
													</table>

												</div>
											</div>
										</div>

									</div>

								</div>
								<div class="panel-footer"></div>
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
		
		function FetchServiceName() {
			let serverName = $("#serverName").val();
			let serviceName = "";
			$.ajax({
				type : "GET",
				dataType : "text",
				url : "/SmartQAServer/fetchWildFlyServiceName?serverName="+ serverName,
				async : false,
				success : function(data) {
					serviceName = data;		
				}
			});
			
			$("#wildFlyServiceName").val(serviceName);
			
		}
		
		function FetchServiceStatus() {
			let serverName = $("#serverName").val();
			let serviceName = $("#wildFlyServiceName").val();
			let serviceStatus = "";
			
			$.ajax({
				type : "GET",
				dataType : "text",
				url : "/SmartQAServer/FetchServiceStatus?serverName="+ serverName+ "&serviceName="+serviceName,
				async : false,
				success : function(data) {
					serviceStatus = data;		
				}
			});
			
			$("#wildFlyServiceStatus").val(serviceStatus);
			
			if(serviceStatus=="Started"){
				$("#startWildFlyService").attr("disabled", "disabled");
				$("#stopWildFlyService").removeAttr("disabled");
			}else{
				$("#startWildFlyService").removeAttr("disabled");
				$("#stopWildFlyService").attr("disabled", "disabled");
			}
			
		}

		function FetchServerDetails() {
			FetchServiceName();
			FetchServiceStatus();
			
			let serverName = $("#serverName").val();
			let appServerData;

			$.ajax({
				type : "GET",
				dataType : "json",
				url : "/SmartQAServer/fetchWildFlyServerDetails?serverName="
						+ serverName,
				async : false,
				success : function(data) {
					appServerData = data;
				}
			});

			createCludTable(serverName, appServerData);

		}

		function createCludTable(serverName, appServerData) {
			$("#tablecludbody").empty();
			for (let i = 0; i < appServerData.length; i++) {

				let tr = "<tr>";

				let td1 = "<td>" + serverName + "</td>";
				let td2 = "<td>" + appServerData[i] + "</td>";
				let td3 = "";
				if (appServerData[i].includes(".failed")
						|| appServerData[i].includes(".undeployed")
						|| appServerData[i].includes(".isDeploying")) {
					td3 = "<td><a class='btn btn-danger' id='' "
						+ "href='./deleteUnDeployedFile?fileName="
						+ appServerData[i] + "'>Build</a></td>";

				}else{				
					td3 = "<td></td>";
				}
				

				let tr1 = "</tr>";
				$("#tablecludbody").append(tr + td1 + td2 + td3 + tr1);

			}

		}
		
		function startWildFlyService(){
			let serverName = $("#serverName").val();
			let serviceName = $("#wildFlyServiceName").val();
			
			let status;

			$.ajax({
				type : "GET",
				dataType : "json",
				url : "/SmartQAServer/startWildFlyService?serverName="
						+ serverName + "&serviceName="+ serviceName,
				async : false,
				success : function(data) {
					status = data;
				}
			});
			
			
		}
		
		function stopWildFlyService(){
			let serverName = $("#serverName").val();
			let serviceName = $("#wildFlyServiceName").val();
			
			let status;

			$.ajax({
				type : "GET",
				dataType : "json",
				url : "/SmartQAServer/stopWildFlyService?serverName="
						+ serverName + "&serviceName="+ serviceName,
				async : false,
				success : function(data) {
					status = data;
				}
			});
			
			
		}
	</script>
</body>
</html>
