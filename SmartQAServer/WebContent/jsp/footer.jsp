<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<section class="contact_us " id="contact">
	<div class="contact_bg">
		<div class="row">
			<div class="container text-center">
				<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 " style="">
					<div class="footerLogo img-responsive" style="margin-top: 6px;">
						<a href="#" class="footer-anchor-tag"> <img class="cgLogo"
							src="images/cg.png" alt="Not Found">
						</a>
					</div>
				</div>
				<div class="contact_content">
					<div class="col-md-2 col-sm-2 col-xs-2 col-lg-2 ">
						<div>
							<span class="text-left text-bold colFollowpercent-span-one">Follow
								us on</span> <span class="text-left text-bold "> <a href="#"
								class="footer-anchor-tag"> <img
									class="colFollowpercent-image" src="images/linkedin.png"></a>
							</span> <span class="text-left text-bold colFollowpercent-image">
								<a href="#" class="footer-anchor-tag"> <img
									class="colFollowpercent-image" src="images/twitter.png"></a>
							</span> <span class="text-left text-bold colFollowpercent-image">
								<a href="#" class="footer-anchor-tag"> <img
									class="colFollowpercent-image" src="images/facebook.png"></a>
							</span>
						</div>
					</div>
					<div class="colRights">
						<div class="text-right colRights-div-one">
							<div>Capgemini 2017. All rights reserved</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>


<!-- Popup start -->
<div id="myModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title">Delete Confirmation</h4>
			</div>
			<div class="modal-body">
				<p>Are you sure, Do you want to delete ?</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success" data-dismiss="modal">Cancel</button>
				<button type="button" class="btn btn-danger del" id="url"
					data-dismiss="modal" onclick="loadAjax();">Delete</button>
			</div>
		</div>
	</div>
</div>
<!-- PopUp End  -->