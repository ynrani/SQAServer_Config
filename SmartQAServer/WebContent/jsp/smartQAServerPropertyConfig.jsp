<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<title>SmartQA | Server Property Config Page</title>
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
							<form:form id="serverPropertyFileDetailsDTOForm"
								name="serverPropertyFileDetailsDTOForm"
								action="${pageContext.request.contextPath}/SavePropertyFileDetails"
								method="POST" modelAttribute="serverPropertyFileDetailsDTO">
								<div id="server" class="panel panel-default"
									style="border-radius: 5px;">
									<div class="panel-heading ui-draggable-handle"
										style="border-radius: 5px;">
										<span class="panel-title">Server Property Details</span>
									</div>
									<div class="panel-body " style="border-radius: 5px;">
										<div class="col-md-12">
											<div class="col-md-3 form-group"></div>
											<label class="control-label">Select Server:</label>
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
												<input type="button" id="serverPropertyFiles"
													name="serverPropertyFiles" class="btn btn-success"
													value="Fetch Property Files"
													onclick="FetchPropertyFiles();" />
											</div>

											<hr>
											<br />
										</div>

										<div class="col-md-12" id="propertyFileDiv">
											<div class="col-md-3 form-group"></div>
											<label class="control-label">Select Property File:</label>
											<div class="col-md-6 form-group">
												<select class="prop form-control" data-live-search="true"
													name="propFileName" id="propFileName">
													<option value="">- Select -</option>
												</select>
											</div>
											<div class="col-md-3 form-group">
												<input type="button" id="serverPropertyDetails"
													name="serverPropertyDetails" class="btn btn-success"
													value="Fetch Server Details"
													onclick="FetchPropertyDetails();" />
											</div>

											<hr>
											<br />
										</div>

										<!-- Panel 1 -->
										<div id="PropertyDtl"
											style="height: 400px; width: 100%; padding: 10px; overflow: scroll;">
											<table id="PropTbl" class="table table-hover table-striped">
												<thead>
													<tr>
														<th style="width: 10%;">ID</th>
														<th>Key</th>
														<th>Value</th>
													</tr>
												</thead>
												<tbody id="Property_body">
												</tbody>
											</table>
										</div>


									</div>
									<div class="panel-footer">
										<div class="btn-group pull-right">
											<input type="submit" class="btn btn-primary  pull-right"
												type="submit" id="save" value="Save"
												style="margin-right: 640px; left: 150px; width: 200px; margin-top: -6px;" />
										</div>
									</div>
								</div>
							</form:form>
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

		function FetchPropertyDetails(){
			let propName = $(".prop option:selected").val();

				$("#Property_body").empty();
				let index = 0;
				$.ajax({
					url : 'getPropDetails?propName='+ propName,
					type : 'GET', 
					async : false,
					success : function(data) {
							let list = data.serverPropertyFileDTO;
							if(list.length>0){
								for(let i=0; i<list.length; i++){ 
							 		  index++;
							   	  	  let element = list[i];
							   	  	  let tr = "<tr>";         
									  let td1 = "<td height='50px'>"+ index + "</td>";
									  let td2 = "<td align='left'><input class='form-control' style='width: 100%;border:none;' readonly='true' spellcheck='false'  contenteditable='true'  value='"+element.key+"' name='serverPropertyFileDTO["+i+"].key'   id='key1'/></td>";
							          let td3 = "<td align='left'><input class='form-control' style='width: 100%;border:none;' spellcheck='false'  contenteditable='true'  value='"+element.value+"' name='serverPropertyFileDTO["+i+"].value'  id='value1'/></td>" ;
									  let endTr = "</tr>";
									  $("#PropTbl").append(tr+ td1+td2+td3+endTr);
							 		}	 
							}else{
								let tr = "<tr>";    
								 let td1 = "<td height='50px' colspan='9' style='align: center;' align='center'><h2>No elements found</h2></td>";
								 let endTr = "</tr>";
								$("#PropTbl").append(tr+td1+endTr);
							}
							$("#PropertyDtl").show();
					}
				});
			
		}

		$(document).ready(function() {
			
			$("#PropertyDtl").hide();
			$("#propertyFileDiv").hide();
			
		});


		function FetchPropertyFiles(){
			
			let serverName = $("#serverName").val();
			$.ajax({
				url : 'getPropertyFiles?serverName=' + serverName,
				type : 'GET',
				async : false,
				success : function(data) {
					$("#propFileName").empty();
					$("#propFileName").append('<option value="">- Select -</option>');
					for (let i = 0; i < data.length; i++) {
						$("#propFileName").append($('<option/>').text(data[i]));
					}
				}

			});
			
			$("#propertyFileDiv").show();
			$("#PropertyDtl").hide();
			
		}
	</script>
</body>
</html>
