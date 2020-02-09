function deleteSel(url,from){
	
	$("#myModal").modal('show');
	$('#from').html(from).fadeIn();
	$('#url').attr('id', url);
	$(".del").click(function(){
		window.location.href = $(".del").attr("id");
	});
}  


	function loadAjax(){
	  $("#ajaxloader").show();
	}  


 

//Left Nav Highlight function
function menu_highlight(targetItem){
	var targetItemObj= $('#'+targetItem);
	targetItemObj.addClass('active');
}
function menu_highlight_top(targetItem){
	var targetItemObj= $('#'+targetItem);
	targetItemObj.addClass('active');
}

function collapse_in(targetItem){
	var targetItemObj= $('#'+targetItem);
	targetItemObj.addClass('collapse in');
}

function active_li(targetItem){
	var targetItemObj= $('#'+targetItem);
	targetItemObj.addClass('active');
}



function createUser(){
	var formObj = $("#qbpUserDtlDTOForm");
	var buttonObj = formObj.find('.btn-info');
	 

	//form validation rules
	formObj.validate({
		 errorClass: "has-error",
	     validClass: "has-success",
	     rules: {
	   	
	    	 userId:{
				required:true
			} 
	     },
	     
	     submitHandler: function(form) {
	    	  
	    	 form.submit();
	     },
	});
}

function submitPopCancelApplication(btn){
	document.location.href="./qbpDeleteApp?id="+btn;
}
function confirmation_dialogYNCancelApplication(reqId,title,msg,w,popType,caption1,caption2){
	var objPop = $("#popup"), popTitle = $('#popTitle'), objOverLay = $("#popupOverlay"), objContnt = $("#popup_content");
	var popW= (w)? w : 500;
	objContnt.html('');
	popTitle.html(title);
	objContnt.html(msg);
	objPop.css({'width': popW+'px'});

	if (popType == 'YesNo'){
		var yesCaption = 'Yes';
		var noCaption = 'No';
		if (caption1 != null && caption1 != undefined && caption1 != '') {
			yesCaption = caption1;
		}
		if (caption2 != null && caption2 != undefined && caption2 != '') {
			noCaption = caption2;
		}
		objContnt.append('<div class="ynpopup_button buttonsAll8"><input type="button" value="'+yesCaption+'" id="'+reqId+'" class="btn-popup" onclick="submitPopCancelApplication(this.id);"/><input type="button" class="btn-popup" value="'+noCaption+'" onclick="hidePopup(\'popup\',\'popupOverlay\')"/></div>');
	}
	 
	// Don't change button id "btn_action". Event is bind with this id
	objPop.center().show();
	objOverLay.show();	
}


/*Login validation*/

function qbpUserLoginValidation(){
	var formObj = $("#loginForm");
	var buttonObj = formObj.find('.btn-primary');
	//It expands all the Panels to see the errors
 
	//form validation rules
	formObj.validate({
		rules: {
		 
		 
		},
		messages: {
			 
		 
		},
		submitHandler: function(form) {
			loadAjax();
			form.submit();
		},
		invalidHandler: function(form, validator){
			//error_invalidHandler(buttonObj);
		},
		onfocusout: function(element, event){
			removeError(buttonObj);
		}
	});
}

/*Validation Starts*/

function qbpAppsDtlDTOFormValidation(){
	var formObj = $("#qbpAppsDtlDTOForm");
	var buttonObj = formObj.find('.btn-info');
	//It expands all the Panels to see the errors
 
	 var utf8 = /([\x00-\x7F]|([\xC2-\xDF]|\xE0[\xA0-\xBF]|\xED[\x80-\x9F]|(|[\xE1-\xEC]|[\xEE-\xEF]|\xF0[\x90-\xBF]|\xF4[\x80-\x8F]|[\xF1-\xF3][\x80-\xBF])[\x80-\xBF])[\x80-\xBF])*/g;


		$.validator.addMethod("appDesc",function(value,element){
			return this.optional(element) || utf8.test(value); 
		},"Username are 3-15 characters");

		
	//form validation rules
	formObj.validate({
		rules: {
			
			appId:{
				required: true,
		 		maxlength:30
			},
			appNme:{
				required: true,
				maxlength:50
			},
			appDesc:{
				required: true,
				maxlength:50
			},
			appDevSpoc:{
				required: true,
		 		maxlength:50
			},
			appDevSpocEmail:{
				required: true,
				email: true,
				minlength:8,
				maxlength:50
			},
			appDevSpocPh:{
				required: true,
				minlength:8,
				maxlength:20
			},
			appTestSpoc:{
				required: true,
				maxlength:50
			},
			appTestSpocEmail:{
				required: true,
				email: true,
				minlength:8,
				maxlength:50
			},
			appTestSpocPh:{
				required: true,
				minlength:8,
				maxlength:20
			},
			appEnvSpoc:{
				required: true,
				maxlength:50
			},
			appEnvSpocEmail:{
				required: true,
				email: true,
				minlength:8,
				maxlength:50
			},
			appEnvSpocPh:{
				required: true,
				minlength:8,
				maxlength:20
			},
 			appGrpEmail:{
				email: true,
				minlength:8,
				maxlength:50
			},
			appPlf1:{
				required: true,
				maxlength:50
			},
			appPlf2:{
				required: true,
				maxlength:50
			},
			appPlf3:{
				required: true,
				maxlength:50
			},
			appScmBy:{
				required: true,
				maxlength:100
			},
			appBldBy:{
				required: true,
				maxlength:100
			},
			appDepyBy:{
				required: true,
				maxlength:100
			},
			appEnvSuptBy:{
				required: true,
				maxlength:100
			}
		},
		messages: {
			appDevSpocEmail:{
				maxlength:'Email Cannot be more than 50 characters',
				email:'You have entered an invalid Email.  The acceptable value is sample@example.com'
			},
			appDevSpocPh:{
				maxlength:'Phone cannot be more than 20 digits.',
				minlength:'Phone cannot be less than 8 digits.',
				number:'Enter a valid phone number'
			},
			appTestSpocEmail:{
				maxlength:'Email Cannot be more than 50 characters',
				email:'You have entered an invalid Email.  The acceptable value is sample@example.com'
			},
			appTestSpocPh:{
				maxlength:'Phone cannot be more than 20 digits.',
				minlength:'Phone cannot be less than 8 digits.',
				number:'Enter a valid phone number'
			},
			appEnvSpocEmail:{
				maxlength:'Email Cannot be more than 50 characters',
				email:'You have entered an invalid Email.  The acceptable value is sample@example.com'
			},
			appEnvSpocPh:{
				maxlength:'Phone cannot be more than 20 digits.',
				minlength:'Phone cannot be less than 8 digits.',
				number:'Enter a valid phone number'
			},
			appGrpEmail:{
				maxlength:'Email Cannot be more than 50 characters',
				email:'Valid email id ex: sample@example.com'
			}
		},
		submitHandler: function(form) {
			loadAjax();
			form.submit();
			
		},
		invalidHandler: function(form, validator){
			//error_invalidHandler(buttonObj);
		},
		onfocusout: function(element, event){
			removeError(buttonObj);
		}
	});
}



function qbpUserDtlDTOFormValidation(){
	var formObj = $("#qbpUserDtlDTOForm");
	var buttonObj = formObj.find('.btn-info');
	//It expands all the Panels to see the errors
 
	//form validation rules
	formObj.validate({
		rules: {
			
			userId:{
				required: true,
				minlength:4,
		 		maxlength:30
			},
			userName:{
				required: true,
				maxlength:50
			},
			passWord:{
				required: true,
				maxlength:50
			},
			 userEmail:{
				required: true,
				email: true,
				minlength:8,
				maxlength:50
			},
			userPh:{
		 		required: true,
				minlength:8,
				maxlength:20
			},
			userType:{
				required: true
  			},
			userAccess:{
				required: true
  			}, 
			userSts:{
				required: true
 			}
		},
		messages: {
			userId:{
				maxlength:'User ID cannot be more than 30 characters',
				minlength:'User ID cannot be less than 4 characters'
			},
			userName:{
				maxlength:'User Name Cannot be more than 50 characters',
				minlength:'User Name Cannot be less than 4 characters'
			},
			passWord:{
				maxlength:'Password cannot be more than 20 characters',
				minlength:'Password cannot be less than 4 characters'
			},
			userEmail:{
				maxlength:'User Email cannot be more than 50 characters',
				email:'You have entered an invalid Email.  The acceptable value is sample@example.com'
			},
			userPh:{
				maxlength:'User Phone cannot be more than 20 digits.',
				minlength:'User Phone cannot be less than 8 digits.',
				number:'Enter a valid phone number'
			} 
		},
		errorPlacement: function(error, element) 
        {
            if ( element.is(":radio") ) 
            {
                error.appendTo( element.parents('.radio') );
            }
            else 
            { // This is the default behavior 
                error.insertAfter( element );
            }
         },
		submitHandler: function(form) {
			loadAjax();
			form.submit();
		},
		invalidHandler: function(form, validator){
			//error_invalidHandler(buttonObj);
		},
		onfocusout: function(element, event){
			removeError(buttonObj);
		}
	});
}





/*fha*/


function qbpEnvDtlDTOFormValidation(){
	var formObj = $("#qbpEnvDtlDTOForm");
	var buttonObj = formObj.find('.btn-info');
	//It expands all the Panels to see the errors
 
	//form validation rules
	formObj.validate({
		rules: {
 
			envId:{
				required: true,
				maxlength:50 	
			},
			appId:{
				required: true
			},
			envName:{
				required: true,
				maxlength:50
			},
			envDesc:{
				required: true,
				maxlength:50
			},
			envSpoc:{
				required: true,
				maxlength:50
			},
			envSpocEmail:{
				required: true,
				email: true,
				minlength:8,
				maxlength:50
  			}, 
  			envSpocPh:{
  				required: true,
				minlength:8,
				maxlength:20
 			},
 			envPurpose:{
				required: true,
				maxlength:50
			},
			envAppVer:{
				required: true,
				maxlength:50
			} 
		},
		messages: {
			envId:{
				maxlength:'ID cannot be more than 30 characters',
				minlength:'ID cannot be less than 4 characters'
			},
			 
			envSpocEmail:{
				maxlength:'Email Cannot be more than 50 characters',
				email:'You have entered an invalid Email.  The acceptable value is sample@example.com'
			},
			envSpocPh:{
				maxlength:'Phone cannot be more than 20 digits.',
				minlength:'Phone cannot be less than 8 digits.',
				number:'Enter a valid phone number'
			}  
		},
		submitHandler: function(form) {
			loadAjax();
			form.submit();
		},
		invalidHandler: function(form, validator){
			//error_invalidHandler(buttonObj);
		},
		onfocusout: function(element, event){
			removeError(buttonObj);
		}
	});
}


function qbpBookEnvFormValidation(){
	var formObj = $("#qbpBookEnvForm");
	var buttonObj = formObj.find('.btn-info');
	//It expands all the Panels to see the errors
 
	//form validation rules
	formObj.validate({
		rules: {
 
			 
			bookReqtEmail:{
				required: true,
				email: true,
				minlength:8,
				maxlength:50
  			}, 
  			bookReqtPh:{
  				required: true,
  				minlength:8,
				maxlength:20
 			} 
		},
		messages: {
			 
			bookReqtEmail:{
				maxlength:'Email Cannot be more than 50 characters',
				email:'You have entered an invalid Email.  The acceptable value is sample@example.com'
			},
			bookReqtPh:{
				maxlength:'Phone cannot be more than 20 digits.',
				minlength:'Phone cannot be less than 8 digits.',
				number:'Enter a valid phone number'
			}  
		},
		submitHandler: function(form) {
			loadAjax();
			form.submit();
		},
		invalidHandler: function(form, validator){
			//error_invalidHandler(buttonObj);
		},
		onfocusout: function(element, event){
			removeError(buttonObj);
		}
	});
}

function qbpBusDatesUploadFormValidation(){
	var formObj = $("#qbpBusDatesUploadForm");
	var buttonObj = formObj.find('.validate');
	//It expands all the Panels to see the errors
 
	//form validation rules
	formObj.validate({
		rules: {
			file:{
  				required: true
 			} 
		} ,
		submitHandler: function(form) {
			loadAjax();
			form.submit();
		},
		invalidHandler: function(form, validator){
			//error_invalidHandler(buttonObj);
		},
		onfocusout: function(element, event){
			removeError(buttonObj);
		}
	});
}



function qbpAppAllocValidation(){
	var formObj = $("#qbpUserAppAccessDTOForm");
	var buttonObj = formObj.find('.btn-info');
	//It expands all the Panels to see the errors
 
	//form validation rules
	formObj.validate({
		rules: {
  			appId:{
				required: true
  			}, 
  			userAccess:{
  				required: true
  			} 
		},
		messages: {
 			 
		},
		submitHandler: function(form) {
			loadAjax();
			form.submit();
		},
		invalidHandler: function(form, validator){
			//error_invalidHandler(buttonObj);
		},
		onfocusout: function(element, event){
			removeError(buttonObj);
		}
	});
}




// Invalid handler for validation
function error_invalidHandler(btnObj,msg,pos){
	if(pos!="bottom" && !(btnObj.parents('.popup').length)){
		$("html, body").animate({ scrollTop: 0 }, "fast");
	}
	removeError(btnObj);
	var message = (msg) ? msg : messages.promtMsg.error_msg.bodytext;
	var msgPlacement = btnObj.closest('.rghtCol');		
	if(btnObj.parents('.popup').length){
		msgPlacement = btnObj.parents('.popup').find('form:eq(0)');
	}
	if(pos && pos=="bottom"){
		msgPlacement = btnObj.parent();
		msgPlacement.append("<div class='failureBox alert alert-box alert-box_1 radius'><span>"+message+"</span><a class='close' href='javascript:;'>x</a></div>");
	}
	else{
		msgPlacement.prepend("<div class='failureBox alert alert-box radius'><span>"+message+"</span><a class='close' href='javascript:;'>x</a></div>");
	}
	closeMsgListner();
 
}


//Remove message handler for validation
function removeError(btnObj){
	
	var msgPlacement = btnObj.closest('.rghtCol');		
	if(btnObj.parents('.popup').length){
		msgPlacement = btnObj.parents('.popup').find('form:eq(0)');
	}
	
	msgPlacement.find('.successBox').remove();
	msgPlacement.find('.failureBox').remove();
}


function closeMsgListner(){
	$(".alert-box .close").bind('click',function(){
		$(this).closest('div').fadeOut('100',function(){
			$(this).remove();
		});
	});
}





//Code Phone Val Starts

function validatePhone(phoneNo) {
    var a = document.getElementById(phoneNo).value;
    //var filter = /^[0-9-+]+$/; + and -
    var filter = /^[-,+]*[0-9][-,+0-9]*$/;
    
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}
// Ends



/* *********************************************************/

//Generic Add row and delete row implementation starts
function addNewRowItem(target,mandateField,nested,serURL,delFromDBLnk,delItemType,noOfRecAllowed,targetContnr,delFromDB_YN){
	var targetCls = target ? target : 'addRow' ;
	$("tbody").delegate("."+targetCls,"click",
		function(){
			var targetContnr = $(this).parents('tbody').attr('class');
			var delRow = 'delRow_'+targetContnr;
			var el = $(this);
			var countrField = el.attr('id')+"_hidden";
			var td_txtbox = el.parent().parent().find('td').find('input[type="text"],input[type="file"],input[type="button"],input[type="submit"],textarea,select');
			var td_dateTxtbox = el.parent().parent().find('td').find('input[type="text"].datepicker,input[type="text"].pastDatepicker,input[type="text"].futureDatepicker,input[type="text"].startDatepicker,input[type="text"].endDatepicker,input[type="text"].birthDatepicker,input[type="text"].monthpicker');
			var td_rdo = el.parent().parent().find('td').find('input[type="radio"]');
			var td_hiddenbox = el.parent().parent().find('td').find('input[type="hidden"]');
			var txtbx_countr = 0;
			var txtbx_array;
			var txtbx_arrayLen = 0;
			if (mandateField){
				txtbx_array = el.parent().parent().find('td').find('input[type="text"]:visible,input[type="file"]:visible,input[type="button"]:visible,input[type="submit"]:visible,textarea:visible,select:visible').filter('.'+mandateField);
				txtbx_arrayLen = (txtbx_array.length == 1) ? 1 : ((txtbx_array.length == 2) ? 2 : txtbx_array.length);
				$.each(txtbx_array,function(i,txtbx){
					if ($.trim($(txtbx).val()) !=''){
						txtbx_countr+=1;
					}
					$(txtbx).bind('focus',function(){
						$(this).removeClass('errorClass');
					});
				});
			}
			if (txtbx_arrayLen == txtbx_countr){
				var jsCountr = 0;
				jsCountr = ($('#'+countrField).val()) ? parseInt($('#'+countrField).val()) : jsCountr;

				jsCountr+=1;

				var noOfAddedRows = el.closest('tbody.'+targetContnr).find("tr:visible").length;

				if(noOfRecAllowed != noOfAddedRows){

					// Destroy existing datepicker
					if (td_dateTxtbox) td_dateTxtbox.datepicker('destroy');

					// Destroy existing placeholder
					//td_txtbox.placeholder('destroy');

					// Destroy existing autocomplete
					if ($(td_txtbox[0]).data('uiAutocomplete')) {
						$(td_txtbox[0]).autocomplete("destroy");
					}

					el.closest('tr').clone(true).insertAfter(el.closest('tbody.'+targetContnr).find('tr:last'));
					// Clear error message after adding a row
					if (td_txtbox.parent().find('label.error')){
						td_txtbox.removeClass('errorClass');
						td_txtbox.parent().find('label.error').remove();
					}	
					
					// Original Row Manupulation
					var originalRow = el.closest('tbody.'+targetContnr).find('tr:last').closest('tr');
					var orgRow_td_txtbox = originalRow.find('td').find('input[type="text"],input[type="file"],input[type="button"],input[type="submit"],textarea,select');
					var orgRow_td_dateTxtbox = originalRow.find('td').find('input[type="text"].datepicker,input[type="text"].pastDatepicker,input[type="text"].futureDatepicker,input[type="text"].startDatepicker,input[type="text"].endDatepicker,input[type="text"].birthDatepicker,input[type="text"].monthpicker');
					var orgRow_td_rdo = originalRow.find('td').find('input[type="radio"]');
					var orgRow_td_hiddenbox = originalRow.find('td').find('input[type="hidden"]');
										
					$.each(orgRow_td_txtbox,function(i,txtbx){
						var id = $(txtbx).attr('id').split('.');
						var newID = id[0].split('[');
						var txtbxId = newID[0]+'['+jsCountr+'].'+id[1];
						$(txtbx).removeAttr('name id').attr({'name':txtbxId,'id':txtbxId});
					});

					$.each(orgRow_td_hiddenbox,function(i,txtbxhidden){
						var id = $(txtbxhidden).attr('id').split('.');
						var newID = id[0].split('[');
						var txtbxId = newID[0]+'['+jsCountr+'].'+id[1];
						$(txtbxhidden).removeAttr('name id').attr({'name':txtbxId,'id':txtbxId});
					});

					$.each(orgRow_td_dateTxtbox,function(i,date){
						var id = $(date).attr('id').split('.');
						var newID = id[0].split('[');
						var txtbxId = newID[0]+'['+jsCountr+'].'+id[1];
						$(date).attr({'name':txtbxId,'id':txtbxId});
					});
					orgRow_td_txtbox.filter('input:not(:button)').val('');
					originalRow.find('td').find('label.item').html('');
					// Ends
					
					el.removeClass(targetCls+' icon-add mRght20 agapAdd').addClass(delRow+' mRght5 icon-delete agapRemove').off('click');
					el.html('Delete');
					$(".agapRemove").css({ 'background-color' : '#F44336', 'border-color' : '#F44336' });
					if(td_rdo.length){
						td_rdo.removeAttr('name checked').prop({'name':'radio_other_'+targetContnr+'_'+jsCountr});
						el.parent().parent().find('td').find('input[type="radio"]:eq(1)').click();
					}

				 

					if (countrField){
						$('#'+countrField).val(jsCountr);
					}
				}
				else{
					confirmation_dialog1('Alert','Only '+noOfRecAllowed+' rows are allowed','400','Ok');
				}
			}
			else{
				if(nested == 'nested') confirmation_dialogWithinPop(messages.promtMsg.addRow_msg.title,messages.promtMsg.addRow_msg.bodytext,'400','Ok');
				else confirmation_dialog1(messages.promtMsg.addRow_msg.title,messages.promtMsg.addRow_msg.bodytext,'400','Ok');

				if (txtbx_array){
					$.each(txtbx_array,function(i,txtbx){
						if ($.trim($(txtbx).val()) ==''){
							$(txtbx).addClass('errorClass');
						}
					});
				}
			}
			$('tbody.'+targetContnr).delegate('.'+delRow,'click',function(){
				var objDelete = $(this).parent().parent();
				if(nested == 'nested'){
					confirmation_dialogWithinPop(messages.promtMsg.txt_delete.title,messages.promtMsg.txt_delete.bodytext,'400','YesNo');
					confmWithinPop_deleteItem(objDelete);
				}
				else{
					confirmation_dialog1(messages.promtMsg.txt_delete.title,messages.promtMsg.txt_delete.bodytext,'400','YesNo');
					itemDeleteAction(objDelete);
				}
			});
			$('#smgBtn_ok').bind('click',function(){
				hidePopup('popup','popupOverlay');
			});
			$(window).trigger('addRowTrigger',[targetContnr]);
		});
		initDBDeleteRow(serURL,delFromDBLnk,delItemType,nested,targetContnr,delFromDB_YN);
}

function initDBDeleteRow(serverUrl,delFromDBLnk,delItemType,nested,targetContnr,delFromDB_YN) {
	$("tbody").delegate('.'+delFromDBLnk,'click',function(){
		var objDelete = $(this).closest('tr');

		if(nested=="nested"){
			confirmation_dialogWithinPop(messages.promtMsg.txt_delete.title,messages.promtMsg.txt_delete.bodytext,'400','YesNo');
		}
		else{
			confirmation_dialog1(messages.promtMsg.txt_delete.title,messages.promtMsg.txt_delete.bodytext,'400','YesNo');
		}
		deleteRowItem_fromDatabase(objDelete,serverUrl,delItemType,nested,targetContnr,delFromDB_YN);
	});
}

function deleteRowItem_fromDatabase(deleteObj,serverUrl,delItemType,nested,targetContnr,delFromDB_YN){
	var btnAction = $('#btn_action');
	if (nested=="nested"){
		btnAction = $('#btnAction_nestedConfm');
	}

	btnAction.bind('click',function(){
		var curRowId = $(deleteObj).attr('id');
		if(delFromDB_YN){
			if ((delFromDB_YN).toLowerCase() =='yes' || (delFromDB_YN).toLowerCase() =='y'){
				deleteObj.remove();
				hidePopup('popup','popupOverlay');
				$(window).trigger('deleteRowTrigger');
			}
		}
		else{
			$.ajaxSetup({cache:false});
			$.ajax({
				url: serverUrl + '?id='+curRowId+'&itemType='+delItemType,
				//dataType: 'json',
				success:function(serverResp)
				{
					var serverRespSplit = serverResp=='true' || serverResp == true ? serverResp : serverResp.split('?');

					if ((serverResp == 'true' || serverResp == true)){

					}

					if ((serverResp == 'true' || serverResp == true) || (serverRespSplit[1] && serverRespSplit[0]== 'true'))
					{
						deleteObj.remove();
						$(window).trigger('deleteRowTrigger');

						if(nested=="nested"){
							confirmation_dialogWithinPop('Alert',"Data deleted successfully.",'400','Ok');
						}
						else{
							confirmation_dialog1('Alert',"Data deleted successfully.",'400','Ok');
							$('#smgBtn_ok').bind('click',function(){
								hidePopup('popup','popupOverlay');
							});
						}
						if(delItemType =="PCG"){
							afetrDeleteFromPopup();
						}

						if(targetContnr){
							$("#"+targetContnr).html('');
							$("#"+targetContnr).append(serverRespSplit[1]);
						}
					}
					else
					{
						if(curRowId=='0000'){

							deleteObj.remove();
							$(window).trigger('deleteRowTrigger');

							if(nested=="nested"){
								confirmation_dialogWithinPop('Alert',"Data deleted successfully.",'400','Ok');
							}
							else{
								confirmation_dialog1('Alert',"Data deleted successfully.",'400','Ok');
								$('#smgBtn_ok').bind('click',function(){
									hidePopup('popup','popupOverlay');
								});
							}
							if(delItemType =="PCG"){
								afetrDeleteFromPopup();
							}

							if(targetContnr){
								$("#"+targetContnr).html('');
								$("#"+targetContnr).append(serverRespSplit[1]);
							}

						}
						else{
							if(nested=="nested") {
								confirmation_dialogWithinPop('Error',"Data deletion failed.",'400','Ok');
							}
							else{
								confirmation_dialog1('Error',"Data deletion failed.",'400','Ok');
							}
							$('#smgBtn_ok').bind('click',function(){
								hidePopup('popup','popupOverlay');
							});
						}

					}
				},
				error: function(jqXHR, serverResp, errorThrown)
				{
					if(nested=="nested") {
						confirmation_dialogWithinPop('Error',"Data deletion failed. System Error occurred. Please re-try after some time.",'400','Ok');
					}
					else{
						confirmation_dialog1('Error',"Data deletion failed. System Error occurred. Please re-try after some time.",'400','Ok');
					}
					$('#smgBtn_ok').bind('click',function(){
						hidePopup('popup','popupOverlay');
					});
				}
			});
		}
	});
}
//Generic Add row and delete row implementation ends

function confirmation_dialog1(title,msg,w,popType,caption1,caption2,data){
	var objPop = $("#popup"), popTitle = $('#popTitle'), objOverLay = $("#popupOverlay"), objContnt = $("#popup_content");
	var popW= (w)? w : 500;

	objContnt.html('');
	popTitle.html(title);
	objContnt.html(msg);
	objPop.css({'width': popW+'px'});

	if (popType == 'OkCancel'){
		objContnt.append('<div class="popup_button"><input type="button" value="OK" class="mRght5" /><input type="button" value="Cancel" onclick="hidePopup(\'popup\',\'popupOverlay\')"/></div>');
	}
	else if (popType == 'YesNo'){
		var yesCaption = 'Yes';
		var noCaption = 'No';
		if (caption1 != null && caption1 != undefined && caption1 != '') {
			yesCaption = caption1;
		}
		if (caption2 != null && caption2 != undefined && caption2 != '') {
			noCaption = caption2;
		}
		objContnt.append('<div class="ynpopup_button buttonsAll8"><input type="button" value="'+yesCaption+'" id="btn_action" class="mRght5" /><input type="button" value="'+noCaption+'" onclick="hidePopup(\'popup\',\'popupOverlay\')"/></div>');
	}
	else if (popType == 'Ok'){
		objContnt.append('<div class="popup_button buttonsAll8"><input type="button" value="OK" id="smgBtn_ok" onclick="hidePopup(\'popup\',\'popupOverlay\');"/></div>');

	}
	 
	// Don't change button id "btn_action". Event is bind with this id
	objPop.center().show();
	objOverLay.show();
	
	
}


function confirmation_dialog(title,msg,w,popType,caption1,caption2,data){
	var objPop = $("#popup"), popTitle = $('#popTitle'), objOverLay = $("#popupOverlay"), objContnt = $("#popup_content");
	var popW= (w)? w : 500;

	objContnt.html('');
	popTitle.html(title);
	objContnt.html(msg);
	objPop.css({'width': popW+'px'});

	if (popType == 'OkCancel'){
		objContnt.append('<div class="popup_button"><input type="button" value="OK" class="mRght5" /><input type="button" value="Cancel" onclick="hidePopup(\'popup\',\'popupOverlay\')"/></div>');
	}
	else if (popType == 'YesNo'){
		var yesCaption = 'Yes';
		var noCaption = 'No';
		if (caption1 != null && caption1 != undefined && caption1 != '') {
			yesCaption = caption1;
		}
		if (caption2 != null && caption2 != undefined && caption2 != '') {
			noCaption = caption2;
		}
		objContnt.append('<div class="ynpopup_button buttonsAll8"><input type="button" value="'+yesCaption+'" id="btn_action" class="mRght5" /><input type="button" value="'+noCaption+'" onclick="hidePopup(\'popup\',\'popupOverlay\')"/></div>');
	}
	else if (popType == 'Ok'){
		objContnt.append('<div class="popup_button buttonsAll8"><input type="button" value="OK" name="'+data+'" id="smgBtn_ok" onclick="hidePopup(\'popup\',\'popupOverlay\');redirctMRboard(this);"/></div>');

	}
	 
	// Don't change button id "btn_action". Event is bind with this id
	objPop.center().show();
	objOverLay.show();
	
	
}







var messages={
		tooltip:{
			MOA:{
				title: "abc",
				bodytext: "Memorandum Of Association"
			},
			AOA:{
				title: "abc",
				bodytext: "Articles Of Association"
			},
			COI:{
				title: "abc",
				bodytext: "Certificate Of Incorporation"
			},
			COCB:{
				title: "abc",
				bodytext: "Certificate Of Commencement of Business"
			},
			POA:{
				title: "abc",
				bodytext: "Power Of Attorney"
			},
			MAT:{
				title: "abc",
				bodytext: "Minimum Alternate Tax"
			},
			COD:{
				title: "abc",
				bodytext: "Commercial Operations Date"
			},
			DIN:{
				title: "abc",
				bodytext: "Director Identification Number"
			},
			saveAsDraft:{
				title: "abc",
				bodytext: "It allows you to save the data without validating the mandatory fields."
			},
			effectiveRate:{
				title: "Effective Rate",
				bodytext: "Effective Rate = Base Rate + Spread + Revised Tenor Premium."
			},
			pwdPolicy:{
				title: "Password Policy",
				bodytext: "<div style='width:400px'>Seshadri's password policy is as under:<br/><ol class=\"orderList\"><li>Passwords shall have a minimum length of 8 characters.</li><li>Strong passwords having a combination of One Alphabet, One Numeral and one special characters should be used.</li><li>The system should force a new user to change the password at first logon and on reset of password.</li><li>Password history should be maintained.</li><li>Passwords should be masked while keying-in.</li><li>On change of password, it should be entered twice to confirm the correctness of password and to prevent from being locked out of the system.</li></ol></div>"
			},
			withRM:{
				title: "abc",
				bodytext: "<b>With RM</b> | This document is with RM for verification."
			},
			inProgress:{
				title: "abc",
				bodytext: "<b>In Progress</b> | More information is required to complete this row item."
			},
			inProgressReport:{
				title: "title",
				bodytext: "<b>In Progress</b> | More information is required to complete the report."
			},
			completed:{
				title: "abc",
				bodytext: "<b>Completed</b> | Required information is filled. You can still modify if required."
			},
			completedNoModi:{
				title: "title",
				bodytext: "<b>Completed</b> | Modification not allowed."
			},
			inputDefroze:{
				title: "abc",
				bodytext: "You are modifying past data. Modifying this will create new revision."
			},
			highlightTxt:{
				title: "abc",
				bodytext: "Data in this column is modified and this label shows the current revision of the data."
			},
			sourcePromoFund:{
				title: "abc",
				bodytext: "<div style='width:300px'>Sources of Promoter's funds to be specified ,e.g details of assets , investments to be liquidated; incase of investments from Associates - thier Cash Accruals to be examined over the project implementation period with reference to past performance, current trends, debt servicing requirements / CAPEX , cash flow comfort and other requirements</div>"
			},
			internalAccu:{
				title: "abc",
				bodytext: "<div style='width:300px'>Internal accurals : (Details relating to availability/ adequacy of surplus to be commented upon)</div>"
			},
			cics:{
				title: "abc",
				bodytext: "<div style='width:300px'>Credit Information Companies</div>"
			},
			EpcAssessment:{
				title:"abc",
				bodytext:"<div style='width:300px'>In case of EPC Contractors/  Construction industry detailed assessment in respect of Guarantees issued for  Bid bond, Mobilization, <br/>Performance, Retention, Other BGs be provided</div>"
			},
			SundryCreditorHelp:{
				title:"Sundry Creditor Help",
				bodytext:"Total of <em>Sundry Creditors Import</em> and <em>Sundry Creditors Domestic</em><br/>should be equal to total of <em>Sundry Creditors (Trade-Without LC)</em><br/>and <em>Sundry Creditors (Trade-Under LC)</em>."
			},
			tmpltAmt:{
				title:"Amount",
				bodytext:"[Amount] This field is required. Max 6 digits & 2 decimals allowed."
			},
			tmpltYr:{
				title:"Year",
				bodytext:"[Year] This field is required. Max 2 digits & 2 decimals allowed."
			},
			tmpltMnth:{
				title:"Month",
				bodytext:"[Month] This field is required. Max 2 digits allowed."
			},
			tmpltDay:{
				title:"Day",
				bodytext:"[Day] This field is required. Max 3 digits allowed."
			},
			tmpltSlct:{
				title:"Select",
				bodytext:"[Select] Please select an option."
			},
			tmpltMultiSlct:{
				title:"Multi Select",
				bodytext:"[Multi Select] Please select one or more options."
			},
			tmpltRequired50:{
				title:"Required Field",
				bodytext:"[Required Field] This field is required. Max 50 characters allowed."
			},
			tmpltRating:{
				title:"Rating",
				bodytext:"[Rating] This field is required. Max 8 characters allowed."
			},
			tmpltIntrnlRating:{
				title:"Internal Rating",
				bodytext:"[Internal Rating] This field is required. Max 2 digits & 0 decimals allowed."
			},
			tmpltRatio:{
				title:"Ratio",
				bodytext:"[Ratio] This field is required. Max 2 digits & 2 decimals allowed."
			},
			tmpltScore:{
				title:"Score",
				bodytext:"[Score] This field is required. Max 2 digits & 2 decimals allowed."
			},
			tmpltPurpose:{
				title:"Purpose",
				bodytext:"[Purpose] This field is required. Max 100 characters allowed."
			},
			tmpltPrcnt:{
				title:"Percentage",
				bodytext:"[Percentage] This field is required. Max 2 digits & 2 decimals allowed."
			},
			tmpltDate:{
				title:"Date",
				bodytext:"[Date] This field is required. Please enter correct date."
			},
			tmpltUnit:{
				title:"Unit",
				bodytext:"[Unit] This field is required. Max 3 digits allowed."
			},
			requiredRdoFld:{
				title:"Required Field",
				bodytext:"[Required Field] This field is required. Select a radio button"
			}
		}, //Ends ToolTip
		response: {
			forgotPwdFail: {
				title: "Forgot Password",
				bodytext: "Your 'User ID' and 'Date of Birth' does not match."
			},
			forgotPwdSuccess: {
				title: "Forgot Password",
				bodytext: "Your password has been reset and sent to your registered email ID."
			},
			changePwdFail_oldPwd: {
				title: "Change Password",
				bodytext: "Your Old Password is incorrect. or New Password does not match."
			},
			changePwdFail_newPwd: {
				title: "Change Password",
				bodytext: "New Password does not match."
			},
			changePwdFail_newPwdRule: {
				title: "Change Password",
				bodytext: "New Password does not follow password policy."
			},
			changePwdSuccess: {
				title: "Change Password",
				bodytext: "Your password has been changed."
			},
			teamHasMembers: {
				title: "Team Can Not Be Deleted",
				bodytext: "This team has members mapped to it; so it can not be deleted. Please unmap all the members from the team before deleting it."
			}
		},
		promtMsg: {
			txt_delete: {
				title: "Delete Confirmation",
				bodytext: "Are you sure you want to Delete this item?"
			},
			addRow_msg: {
				title: "Alert",
				bodytext: "Please fill the current row fields before adding a row."
			},
			addField_msg: {
				title: "Alert",
				bodytext: "Please fill the highlighted field."
			},
			error_msg: {
				title: "abc",
				bodytext: "Information is not saved. Please complete the mandatory fields before saving."
			},
			successSave_msg: {
				title: "abc",
				bodytext: "Information saved successfully."
			},
			meetingAgenda_msg: {
				title: "Please Confirm",
				bodytext: "Once Regular Item Agenda is generated you will not be able to add more regular items. Only table items can be added. Would you like to generate Regular Agenda?"
			},
			meetingTbleAgenda_msg: {
				title: "Please Confirm",
				bodytext: "Would you like to generate Table Agenda?"
			},
			nonSpecialChar: {
				title: "Alert",
				msg: "Speacial characters are not allowed & removed."
			}
		}
	}





 
function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}