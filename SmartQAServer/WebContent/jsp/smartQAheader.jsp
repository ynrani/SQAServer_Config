<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>



<ul class="x-navigation x-navigation-horizontal">
	<li><img src="images/logo.png" style="width: 65px; height: 50px;" /></li>
	<li class="xn-openable"><a id="smartQAHome" href="./smartQAHome"><span
			class="fa fa-television"></span>Home</a></li>
	<li class="xn-openable"><a id="smartQAHome"
		href="./smartQAServerUserDetails"><span class="fa fa-television"></span>Server
			User Details</a></li>
	<li class="xn-openable"><a id="smartQAHome"
		href="./smartQAServerConfig"><span class="fa fa-television"></span>Server
			Config</a></li>
	<li class="xn-openable"><a id="smartQAHome"
		href="./smartQAServerPropertyConfig"><span
			class="fa fa-television"></span>Server Property Config</a></li>
	<li class="xn-openable"><a id="smartQAHome"
		href="./smartQAServerDeployConfig"><span class="fa fa-television"></span>Server
			Deploy Config</a></li>


	<li class="xn-icon-button pull-right"><c:if
			test="${pageContext.request.userPrincipal.name != null}">
			<a href="#" class="mb-control" data-box="#mb-signout"><i
				id="logoutlink" class="fa fa-sign-out"></i></a>
		</c:if></li>


</ul>


<!-- MESSAGE BOX-->
<script>
function logout(url){
	var logoutUrl = url;
	window.location.href = logoutUrl;
}
</script>
<div class="message-box animated fadeIn" data-sound="alert"
	id="mb-signout" style="text-align: -webkit-left;">
	<div class="mb-container">
		<div class="mb-middle">
			<div class="mb-title">
				<span class="fa fa-sign-out"></span> Log <strong>Out</strong> ?
			</div>
			<div class="mb-content">
				<p>Are you sure you want to log out?</p>
				<p>Press No if you want to continue work. Press Yes to logout
					current user.</p>
			</div>
			<div class="mb-footer">
				<div class="pull-right">
					<button class="btn btn-success btn-lg"
						onclick="logout(${pageContext.request.contextPath}/);">Yes</button>
					<button class="btn btn-default btn-lg mb-control-close">No</button>

				</div>
			</div>
		</div>
	</div>
</div>
<!-- END MESSAGE BOX-->

<div id="ajaxloader" class="modal" style="display: none">
	<div class="center">
		<img alt="" src="images/loader.gif" />
	</div>
</div>

