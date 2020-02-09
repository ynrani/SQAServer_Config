<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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

<body>

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
								<span class="panel-title">Server User Details</span>

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
										<input type="button" id="loggedInUsers" name="loggedInUsers"
											class="btn btn-success" value="Fetch Logged in Users"
											onclick="FetchLoggedInUsers();" />
									</div>
								</div>
								<div class="col-md-12 form-group">
									<div id="maintableID" class="col-md-12 form-group">
										<div id="tableID">

											<table id="tableclud"
												class="table table-hover table-striped table-bordered">
												<thead>
													<tr>
														<th>Server Name</th>
														<th>User Name</th>
														<th>Session Name</th>
														<th>Session ID</th>
														<th>Connection Status</th>
														<th>Idle Time</th>
														<th>Login Time</th>
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
							<div class="panel-footer">
								
							</div>
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


function FetchLoggedInUsers(){
	
	var serverName = $("#serverName").val();
	var userData;
	
	  $.ajax({
          type : "GET",
          dataType: "json",
          url : "/SmartQAServer/getServerLoggedInUserDetails?serverName="+serverName,
          async: false,
          success : function(data) {
        	  userData = data;
          }
      });
	   
	  createCludTable(userData);  
	
}

function createCludTable(userData){
	$("#tablecludbody").empty();
	for(var i=0;i<userData.length;i++){
		
		var tr = "<tr>";

		var td1 = "<td>"+ userData[i].serverName + "</td>";
		var td2 = "<td>"+ userData[i].userName + "</td>";
		var td3 = "<td>"+ userData[i].sessionName + "</td>";
		var td4 = "<td>"+ userData[i].sessionID + "</td>";
		var td5 = "<td>"+ userData[i].status + "</td>";
		var td6 = "<td>"+ userData[i].idleTime + "</td>";
		var td7 = "<td>"+ userData[i].LogonTime + "</td>";
		var td8 = "<td><a class='btn btn-danger' id='forceLogoff' "
			+ "href='./forceLogOffServerUser?serverName="
			+ userData[i].serverName + "&sessionID=" +userData[i].sessionID + "'>Force Logoff</a></td>";
		
		var tr1 = "</tr>";
		$("#tablecludbody").append(
				tr + td1 + td2 + td3 + td4 + td5 + td6 + td7 + td8 + tr1);
		
	}
		
}



</script>

</body>
</html>
