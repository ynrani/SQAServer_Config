var $conversation = $(".conversation");
var $chat = $("#chat");
var responseDelay = 0;
var custid;
var input;
var spbotval;
var insession = "no";
var tempselbproj = "";
var matchfound = 0;
var conversationDataIn = "";
var conversationDataOut = "";
var myVarInterval;

var minervaLogCount;

$(document).ready(function() {
	MinervaModuleStatus();

	$('#minervaMID').draggable();
	$('#minervaImg').resizable();
	$('#minervaMID1').draggable();
	$('#minervaImg1').resizable();

	let tdata = "";
	$.ajax({
		type : "GET",
		dataType : "text",
		url : "/WebServices/GetConversationDataFromSession",
		async : false,
		success : function(resultData) {
			tdata = resultData;
		}
	});
	conversationDataIn = tdata;
	if (conversationDataIn == "" || conversationDataIn == null) {
		populateinitialData();
	} else {
		populateinitialData1(conversationDataIn);
	}

	let ntrigger = "";
	$.ajax({
		type : "GET",
		dataType : "text",
		url : "/WebServices/getNotifiationTrigger",
		async : false,
		success : function(resultData) {
			ntrigger = resultData;
		}
	});

	if (ntrigger == "OFF") {
		$("#notifyID").hide();
		$("#notifyID1").show();
		clearInterval(myVarInterval);

	} else {
		$("#notifyID").show();
		$("#notifyID1").hide();
		myVarInterval = setInterval(getLoggerDataMinerva, 5000);

	}

});

// $('#minervaImg').attr('src', 'bot/images/MinervaLady.jpg');
// Logger Data Minerva

function getLoggerDataMinerva() {/*

	let ntrigger = "";
	$.ajax({
		type : "GET",
		dataType : "text",
		url : "/WebServices/getNotifiationTrigger",
		async : false,
		success : function(resultData) {
			ntrigger = resultData;
		}
	});

	if (ntrigger == "OFF") {
		clearInterval(myVarInterval);
	} else {

		let minervaLoggerDataList = {};

		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getRecentMinervaLogData",
			async : false,
			success : function(data) {
				minervaLoggerDataList = data;
			}
		});

		let dataList = minervaLoggerDataList;

		for (let i = 0; i < dataList.length; i++) {

			let id = dataList[i].Id;
			let application = dataList[i].application;
			let type = dataList[i].type;
			let log_message = dataList[i].log_message;

			let data1 = application + " : " + type + " : " + log_message;

			if ($("#minervaMID").is(":visible")) {

				$("#newmsgID").show();
			}

			if (minervaLogCount == undefined) {

				minervaLogCount = 0;
			}

			if (type == "ERROR") {
				populateAnsData2(data1, id, application, type, log_message);
				logErrorData(application, log_message);
			} else if (type == "WARN") {
				populateAnsData3(data1, id, application, type, log_message);
				logWarnData(application, log_message);
			} else {
				populateAnsData1(data1, id, application, type, log_message);
				logInfoData(application, log_message);
			}
		}
	}

*/}

function clearCount() {

	minervaLogCount = 0;

	$("#countlabel")[0].textContent = minervaLogCount + " new";

	$("#countdiv")[0].textContent = minervaLogCount;

	$("#countdiv").hide();
	// $("#countlabeldiv").hide();

}

function logErrorData(application, log_message) {

	minervaLogCount++;

	let str = '<a href="#" class="list-group-item">';
	str = str
			+ '<div class="color-box-notifi" style="background-color: red;"></div>';
	str = str
			+ '<i class="fa fa-envelope" aria-hidden="true"></i><span class="contacts-title">'
			+ application + '</span>';
	str = str + '<p>' + log_message + '</p></a>';

	$("#contentDiv").prepend(str);

	$("#countlabel")[0].textContent = minervaLogCount + " new";

	$("#countdiv")[0].textContent = minervaLogCount;

	$("#countdiv").show();
	$("#countlabeldiv").show();

}

function logInfoData(application, log_message) {

	minervaLogCount++;

	let str = '<a href="#" class="list-group-item">';
	str = str
			+ '<div class="color-box-notifi" style="background-color: blue;"></div>';
	str = str
			+ '<i class="fa fa-envelope" aria-hidden="true"></i><span class="contacts-title">'
			+ application + '</span>';
	str = str + '<p>' + log_message + '</p></a>';

	$("#contentDiv").prepend(str);

	$("#countlabel")[0].textContent = minervaLogCount + " new";

	$("#countdiv")[0].textContent = minervaLogCount;

	$("#countdiv").show();
	$("#countlabeldiv").show();

}

function logWarnData(application, log_message) {

	minervaLogCount++;

	let str = '<a href="#" class="list-group-item">';
	str = str
			+ '<div class="color-box-notifi" style="background-color: yellow;"></div>';
	str = str
			+ '<i class="fa fa-envelope" aria-hidden="true"></i><span class="contacts-title">'
			+ application + '</span>';
	str = str + '<p>' + log_message + '</p></a>';

	$("#contentDiv").prepend(str);

	$("#countlabel")[0].textContent = minervaLogCount + " new";

	$("#countdiv")[0].textContent = minervaLogCount;

	$("#countdiv").show();
	$("#countlabeldiv").show();

}

function logoldData(application, log_message) {

	let str = '<a href="#" class="list-group-item">';
	str = str
			+ '<div class="color-box-notifi" style="background-color: grey;"></div>';
	str = str
			+ '<i class="fa fa-envelope" aria-hidden="true"></i><span class="contacts-title">'
			+ application + '</span>';
	str = str + '<p>' + log_message + '</p></a>';

	$("#contentDiv").prepend(str);

}

function updateMinervaLogData(id, application, type, log_message) {

	$
			.ajax({
				type : "GET",
				dataType : "json",
				url : "/WebServices/updateMinervaLogData?id=" + id
						+ "&application=" + application + "&type=" + type
						+ "&log_message=" + log_message,
				async : false,
				success : function(data) {
				}
			});

}

function setMinervaLogData(application, type, log_message) {

	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/WebServices/setMinervaLogData?type=" + type + "&application="
				+ application + "&log_message=" + log_message,
		async : false,
		success : function(data) {
		}
	});

}

function setNotTrigger(nTri) {
	$.ajax({
		url : "/WebServices/setNotifiationTrigger",
		type : 'GET',
		async : false,
		data : {
			sNotTri : nTri
		},
		success : function(response) {
		}
	});
}

// Switch for Log Event Notification

$("#notifyID").click(
		function() {

			setMinervaLogData("SmartQA", "INFO",
					"Minerva Log Notifications has been turned OFF");

			$("#notifyID").hide();
			$("#notifyID1").show();

			setTimeout('clearInterval(myVarInterval)', 10000);

			// clearInterval(myVarInterval);

			let nTri = "OFF";
			setNotTrigger(nTri);

		});

$("#notifyID1")
		.click(
				function() {

					$("#notifyID1").hide();
					$("#notifyID").show();

					myVarInterval = setInterval(getLoggerDataMinerva, 5000);
					// wait(5000);

					setTimeout(
							'setMinervaLogData("SmartQA","INFO","Minerva Log Notifications has been turned ON")',
							5000);
					// setMinervaLogData("Info","Log Notifications has been turned ON");

					let nTri = "ON";
					setNotTrigger(nTri);

				});

//

// Function to set Conversation Data in Session

function SetValue(tConData) {
	$.ajax({
		url : "/WebServices/SetConversationDataInSession",
		type : 'GET',
		async : false,
		data : {
			sConvData : tConData
		},
		success : function(response) {
		}
	});
}

$("#refreshID").click(function() {

	if ($("#minervaMID").is(":visible")) {

		$("#minervaMID").hide();
		$("#minervaMID1").show();
	} else if ($("#minervaMID1").is(":visible")) {

		$("#minervaMID1").hide();
		$("#minervaMID").show();
	}

});

function clearConversation() {

	let sData = null;

	SetValue(sData);

	$conversation.empty();
}

function speakOut() {

	let str = window.getSelection().toString();
	console.log(str);
	responsiveVoice.speak(str);
}

function populateinitialData1(conversationDataIn) {
	populateinitialData();
	let tData = conversationDataIn;

	let tsepData = tData.split("!#!");

	for (let i = 0; i < tsepData.length; i++) {

		let tempData = tsepData[i].split("!!");

		for (let j = 0; j < tempData.length; j++) {

			let tempData1 = tempData[j].split("::");
			if (tempData1[0] == "User") {
				let inData = tempData1[1];
				populateInData(inData);
			} else if (tempData1[0] == "Minerva") {
				let outData = tempData1[1];
				populateAnsData(outData);

				let minervaLogData = outData.split(" : ");

				if (minervaLogData.length > 0) {
					let application1 = minervaLogData[0];
					let type1 = minervaLogData[1];
					let log_message1 = "";
					for (let i = 2; i < minervaLogData.length; i++) {

						log_message1 = log_message1 + " : " + minervaLogData[i];
					}

					minervaLogCount = 0;

					logoldData(application1, log_message1);

				}

			}
		}

	}

}

// Function to open chat box
$(".chatButton").click(function() {
	let bottomPosition = $chat.css("bottom");
	if (bottomPosition === "-392px") {
		$chat.animate({
			bottom : "0px"
		}, 250, function() {
			$("#yousay").focus();
		});
	} else {
		$chat.animate({
			bottom : "-392px"
		}, 250);
	}
});

$("#arrowId").click(
		function() {
			let bottomPosition = $chat.css("bottom");
			if (bottomPosition === "-392px") {
				$chat.animate({
					bottom : "0px"
				}, 250, function() {
					$("#yousay").focus();
					$("#arrowId").removeClass("minimize-arrow-upright")
							.addClass("minimize-arrow-downleft");
				});
			} else {
				$chat.animate({
					bottom : "-392px"
				}, 250);
				$("#arrowId").removeClass("minimize-arrow-downleft").addClass(
						"minimize-arrow-upright");

			}
		});

$("#minervaImg").on(
		'dblclick',
		function() {

			$('#MinervaMainID').hide();
			$('#chat').show();
			$chat.animate({
				bottom : "0px"
			}, 250, function() {
				$("#yousay").focus();
				$("#arrowId").removeClass("minimize-arrow-upright").addClass(
						"minimize-arrow-downleft");
			});

		});

$("#minervaImg1").on(
		'dblclick',
		function() {

			$('#MinervaMainID').hide();
			$('#chat').show();
			$chat.animate({
				bottom : "0px"
			}, 250, function() {
				$("#yousay").focus();
				$("#arrowId").removeClass("minimize-arrow-upright").addClass(
						"minimize-arrow-downleft");
			});

		});

$("#minusID").on('click', function() {

	$('#MinervaMainID').show();
	$('#chat').hide();

});

// Function to initialize Bot Map data
function intializeSPBotDataMap() {
	spBotDataMap = {};

	spBotDataMap["hi"] = "Hello Friend";
	spBotDataMap["hw r u"] = "fine, hw r u";
	spBotDataMap["fine"] = "How can i help U";
	spBotDataMap["who r u"] = "I am Minerva your VA, How can i help U";
	spBotDataMap["top 10 testcases"] = "Top 10 test cases are";
	spBotDataMap["bubble analysis"] = "myBubble";
	spBotDataMap["mind map"] = "myMindmap";
	spBotDataMap["bubble data configuration"] = "myConfiguration";
	spBotDataMap["status"] = "Status";
	spBotDataMap["defect"] = "Defect";
	spBotDataMap["release"] = "Release";
	spBotDataMap["domain"] = "Requirement";
	spBotDataMap["requirement"] = "Combined View";
	spBotDataMap["combined view"] = "Combined View";
	spBotDataMap["logout"] = "logoutlink";
	spBotDataMap["project filter"] = "popoverid1";
	spBotDataMap["attribute filter"] = "popoverid2";
	spBotDataMap["passed"] = "Passed";
	spBotDataMap["n/a"] = "N/A";
	spBotDataMap["failed"] = "Failed";
	spBotDataMap["cot completed"] = "Not Completed";
	spBotDataMap["no run"] = "No Run";
	spBotDataMap["blocked"] = "Blocked";
	spBotDataMap["0"] = "0";
	spBotDataMap["1"] = "1";
	spBotDataMap["2"] = "2";
	spBotDataMap["suite"] = "bubbleGenerateSuite";

}

function populateAnsData(data) {

	$(
			'<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext">Minerva</div><p class="dataP" >'
					+ data
					+ '</p></span><div class="time-stamp">'
					+ getCurrentTime()
					+ '<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'
					+ '<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'
					+ '</span></span></span></div><div class="bot-torso bot-torso-server"></div></div>')
			.hide().appendTo($conversation).fadeIn("fast");

	conversationDataOut = conversationDataOut + "Minerva::" + data;

	conversationDataOut = conversationDataOut + "!#!";

	SetValue(conversationDataOut);
	$conversation.scrollTop($conversation[0].scrollHeight);

}

function populateAnsData1(data, id, application, type, log) {

	$(
			'<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext">Minerva</div><p class="dataP" style="color: green;" >'
					+ data
					+ '</p></span><div class="time-stamp">'
					+ getCurrentTime()
					+ '<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'
					+ '<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'
					+ '</span></span></span></div><div class="bot-torso bot-torso-server"></div></div>')
			.hide().appendTo($conversation).fadeIn("fast");

	conversationDataOut = conversationDataOut + "Minerva::" + data;

	conversationDataOut = conversationDataOut + "!#!";

	SetValue(conversationDataOut);
	$conversation.scrollTop($conversation[0].scrollHeight);

	updateMinervaLogData(id, application, type, log);

	$("#newmsgID").hide();

}

function populateAnsData2(data, id, application, type, log) {

	$(
			'<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext">Minerva</div><p class="dataP" style="color: red;" >'
					+ data
					+ '</p></span><div class="time-stamp">'
					+ getCurrentTime()
					+ '<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'
					+ '<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'
					+ '</span></span></span></div><div class="bot-torso bot-torso-server"></div></div>')
			.hide().appendTo($conversation).fadeIn("fast");

	conversationDataOut = conversationDataOut + "Minerva::" + data;

	conversationDataOut = conversationDataOut + "!#!";

	SetValue(conversationDataOut);
	$conversation.scrollTop($conversation[0].scrollHeight);

	updateMinervaLogData(id, application, type, log);

	$("#newmsgID").hide();

}

function populateAnsData3(data, id, application, type, log) {

	$(
			'<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext">Minerva</div><p class="dataP" style="color: yellow;" >'
					+ data
					+ '</p></span><div class="time-stamp">'
					+ getCurrentTime()
					+ '<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'
					+ '<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'
					+ '</span></span></span></div><div class="bot-torso bot-torso-server"></div></div>')
			.hide().appendTo($conversation).fadeIn("fast");

	conversationDataOut = conversationDataOut + "Minerva::" + data;

	conversationDataOut = conversationDataOut + "!#!";

	SetValue(conversationDataOut);
	$conversation.scrollTop($conversation[0].scrollHeight);

	updateMinervaLogData(id, application, type, log);

	$("#newmsgID").hide();

}

function populateinitialData() {

	$(
			'<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext"> Minerva</div><p  class="dataP" >I am Minerva your VA, How can i help U</p></span><div class="time-stamp">'
					+ getCurrentTime()
					+ '<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'
					+ '<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'
					+ '</span></span></span></div><div class="bot-torso bot-torso-server"></div></div><div class="optionsDiv"><div class="action">'
					+ '<span class="action-elem"><span onclick="giveAEAnswer(\'build train\',\'Build a Train\');">Build a Train</span></span>'
					+ '<span class="action-elem"><span onclick="giveAEAnswer(\'project list\',\'Project List\');">Project List</span></span>'
					+ '<span class="action-elem"><span onclick="giveAEAnswer(\'schedule train\',\'Schedule a Train\');">Schedule a Train</span></span>'
					+ '<span class="action-elem"><span onclick="giveAEAnswer(\'execution status train\',\'Execution Status of a Train\');">Execution Status of a Train</span></span>'
					+ '<span class="action-elem"><span onclick="giveAEAnswer(\'status Application\',\'Status of an Application\');">Status of an Application</span></span>'
					+ '<span class="action-elem"><span onclick="giveAEAnswer(\'clone application\',\'Clone an Application\');">Clone an Application</span></span>'
					+ '<span class="action-elem"><span onclick="giveAEAnswer(\'availability environment\',\'Availability Environment\');">Availability Environment</span></span>'
					+ '</div></div>').hide().appendTo($conversation).fadeIn(
			"fast");

	// conversationDataOut = conversationDataOut + "Minerva::I am Minerva your
	// VA, How can i help U";

	// conversationDataOut = conversationDataOut + "!#!";

	// SetValue(conversationDataOut);

	$conversation.scrollTop($conversation[0].scrollHeight);

}

function giveAEAnswer(input, input1) {

	populateInData(input1);

	giveAns(input);

}

function giveAns(input){
	
let matchedIntent = getMatchedIntent(input);
	
	console.log("matched Intent : "+ matchedIntent);
	
	
	if(null!=matchedIntent){
		
		giveAnswer(matchedIntent);
		
	}else{
		
		finalgoogleresponse();
	}

	
}

function giveAnswer(matchedIntent) {

	let data = "";

	if (matchedIntent == "Hello") {

		matchfound = 1;
		data = spBotDataMap["hi"];
		populateAnsData(data);
	} else if (matchedIntent == "HowAreYou") {

		matchfound = 1;
		data = spBotDataMap["hw r u"];
		populateAnsData(data);
	} else if (matchedIntent == "Fine") {
		matchfound = 1;
		data = spBotDataMap["fine"];
		populateAnsData(data);
	} else if (matchedIntent == "WhoAreYou") {

		matchfound = 1;
		data = spBotDataMap["who r u"];
		populateAnsData(data);
	} else if (matchedIntent == "BubbleAnalysis") {

		matchfound = 1;
		let bid = spBotDataMap["bubble analysis"];
		data = "Bubble Analysis Page will be opened shortly";
		populateAnsData(data);
		document.getElementById(bid).click();

	} else if (matchedIntent == "MindMap") {

		matchfound = 1;
		let bid = spBotDataMap["mind map"];
		data = "MindMap Analysis Page will be opened shortly";
		populateAnsData(data);
		document.getElementById(bid).click();
	} else if (matchedIntent == "ProjectFilter") {

		matchfound = 1;
		let bid = spBotDataMap["project filter"];
		document.getElementById(bid).click();
	} else if (matchedIntent == "AttributeFilter") {

		matchfound = 1;
		let bid = spBotDataMap["attribute filter"];
		document.getElementById(bid).click();
	} else if (matchedIntent == "GenerateSuite") {

		matchfound = 1;

		data = '<p>Please enter the Suite Name</p>';
		data = data
				+ '<p>Project : <input type="text" id="bsuitName" name="bsuitName" style="color: black;"/></p>';
		data = data
				+ '<p><input type="button" id="bgsuitebutton" value="Generate Suite" class=" btn btn-info "  onclick="botGenerateSuite();"/></p>';

		populateAnsData(data);

	} else if (matchedIntent == "ProjectList") {

		matchfound = 1;

		let bprojectlist = {};

		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getProjectList",
			async : false,
			success : function(data) {
				bprojectlist = data;
			}
		});

		let upList = bprojectlist;
		data = "Projects are: <ul> "
		for (let i = 0; i < upList.ProjectsList.length; i++) {
			data = data + "<li>" + upList.ProjectsList[i].projectName + "</li>"
		}
		data = data + "</ul>";
		populateAnsData(data);

	} else if (matchedIntent == "BubbleDataConfig") {

		matchfound = 1;
		let bid = spBotDataMap["bubble data configuration"];
		document.getElementById(bid).click();
	} else if (matchedIntent == "PanamaObjective") {

		matchfound = 1;
		data = "<p>Implement new policy administration foundation leveraging a market leading solution to improve delivery speed and business productivity for US non-bureau lines</p>";

		populateAnsData(data);

	} else if (matchedIntent == "PanamaBenefit") {

		matchfound = 1;
		data = "<p>Benefits of implementing Panama: </p>";
		data = data + "<p>&nbsp;&nbsp;a. Decommission of Ultra Platform</p>";
		data = data + "<p>&nbsp;&nbsp;b. Increased UW and UA productivity</p>";
		data = data
				+ "<p>&nbsp;&nbsp;&nbsp;&nbsp; i. Faster time to market for new products/changes leading to higher GWP and improved UW results </p>";
		data = data
				+ "<p>&nbsp;&nbsp;&nbsp;&nbsp; ii. Ultra/Ultra Flex modernization cost avoidance</p>";

		populateAnsData(data);

	} else if (matchedIntent == "UrlRallyZurich") {

		matchfound = 1;
		data = "<p><a target='_blank'; href='http://www.zurichrally.com/'>www.zurichrally.com</a></p>";

		populateAnsData(data);

	} else if (matchedIntent == "UrlALMZurich") {

		matchfound = 1;
		data = "<p><a target='_blank'; href='http://www.zurichalm.com/'>www.zurichalm.com</a></p>";

		populateAnsData(data);

	} else if (matchedIntent == "SLADefects") {

		matchfound = 1;
		data = "<p>a. Acknowledgement in 1 hour from defect detection</p>";
		data = data
				+ "<p>b. Resolution less than 8 hours from defect acknowledgement</p>";

		populateAnsData(data);

	} else if (matchedIntent == "se30290") {

		matchfound = 1;
		data = "<p>Scope includes validation Console , Traditional Classic. System default the opportunity flow  to 'Traditional Flow' when opportunity created via the below given scenarios when the</p>";
		data = data
				+ "<p>&nbsp;&nbsp; *  Unsolicited-New opportunity product created via Canada C&R process</p>";
		data = data
				+ "<p>&nbsp;&nbsp; *  Unsolicited-New opportunity product created via US C&R process</p>";
		data = data
				+ "<p>&nbsp;&nbsp; *  Unsolicited-New opportunity product created via NB Matching job for Canada and US Submission</p>";
		data = data
				+ "<p>&nbsp;&nbsp; *  Solicited -New opportunity product created via Opportunity Management - Manage Product</p>";
		data = data
				+ "<p>&nbsp;&nbsp; *  Solicited New – opportunity product created via converting Pipeline Lead (Single or Multiple product conversion)</p>";
		data = data
				+ "<p>&nbsp;&nbsp; *  Solicited New - opportunity product created from Submission Products</p>";
		data = data
				+ "<p>&nbsp;&nbsp; *  Opportunity flow value (Traditional/complex) carried over to Replicated and Cloned opportunity products</p>";
		data = data
				+ "<p>&nbsp;&nbsp; *  System display the below Information section with all applicable fields for Complex Flow and hide for Traditional flow</p>";
		data = data + "<p>&nbsp;&nbsp;&nbsp;&nbsp; *  Complex Section</p>";
		data = data
				+ "<p>&nbsp;&nbsp;&nbsp;&nbsp; *  Show Financials/Hide Financials Link is enabled</p>";
		data = data
				+ "<p>&nbsp;&nbsp; *  User can switch from Complex to Traditional and vice versa and the last saved flow information is preserved</p>";

		populateAnsData(data);

	} else if (matchedIntent == "Decilews1aAugustRelease") {

		matchfound = 1;
		data = "<p>25</p>";

		populateAnsData(data);

	} else if (matchedIntent == "UrlUWDZurich") {
		matchfound = 1;
		data = "<p><a target='_blank'; href='https://zurich--sit1.cs14.my.salesforce.com/home/home.jsp' >https://zurich--sit1.cs14.my.salesforce.com/home/home.jsp</p>";

		populateAnsData(data);

	} else if (matchedIntent == "TestDesignTechniques") {

		matchfound = 1;
		data = "<p><b>TMAP Test Design techniques</b> The data combination test is a versatile technique for the testing of functionality both at detail level and at overall system level.</p>"
		data = data
				+ "<p><i>For More info :</i> <a target='_blank'; href='data/test design techniques.doc' style='color:blue;'>Test Design techniques</a></p>";

		populateAnsData(data);

	} else if (matchedIntent == "ShiftLeft") {
		matchfound = 1;
		data = "<p>The term <b>Shift Left</b> refers to a practice in software development where teams focus on quality, work on prevention instead of detection, and begin testing earlier than ever before.</p>"
		data = data
				+ "<p><i>For More info :</i> <a target='_blank'; href='https://www.ibm.com/developerworks/community/blogs/rqtm/entry/what_is_shift_left_testing?lang=en' style='color:blue;'> https://www.ibm.com/developerworks/community/blogs/rqtm/entry/what_is_shift_left_testing?lang=en</a></p>";

		populateAnsData(data);

	} else if (matchedIntent == "SmartQA") {
		matchfound = 1;
		data = "<p><b>Capgemini's Smart QA</b> is an end-to-end ecosystem that explores, evolves and make decisions based on cognitive and analytics capability from your own testing system.</p>"
		data = data
				+ "<p><i>For More info :</i> <a target='_blank'; href='https://www.capgemini.com/testing-services/capgeminis-smart-qa-for-financial-services' style='color:blue;'>https://www.capgemini.com/testing-services/capgeminis-smart-qa-for-financial-services</a></p>";

		populateAnsData(data);

	} else if (matchedIntent == "iTAP") {
		matchfound = 1;
		data = "<p><b>Intelligent Test Automation Platform</b> for Financial Services reduce costs and time to market by harnessing simple and smart integration principles to rapidly automate test scenarios and middleware services across the testing lifecycle.</p>"
		data = data
				+ "<p><i>For More info :</i> <a target='_blank'; href='https://www.capgemini.com/testing-services/intelligent-test-automation-platform-for-financial-services' style='color:blue;'>https://www.capgemini.com/testing-services/intelligent-test-automation-platform-for-financial-services</a></p>";

		populateAnsData(data);

	} else if (matchedIntent == "Insurance") {

		matchfound = 1;
		data = "<p><b>Insurance</b> is a way of reducing your potential financial loss or hardship. It can help cover the cost of unexpected events such as theft, illness or property damage. Insurance can also provide your loved ones with a financial payment upon your death.</p>"
		data = data
				+ "<p><i>For More info :</i> <p><a target='_blank'; href='data/Insurance Basics.pdf' style='color:blue;'>Insurance Basics</a></p> <p><a target='_blank'; href='data/FundamentalsRiskInsurance.pdf' style='color:blue;'>Fundamentals of Risk & Insurance</a></p> <p><a target='_blank'; href='data/Insurance Fundamentals.pdf' style='color:blue;'>Insurance Fundamentals</a></p></p>";

		populateAnsData(data);

	} else if (matchedIntent == "ApplicationStatus") {

		matchfound = 1;

		let bapplist = {};
		$("#chatajaxloader").show();
		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getListOfApplications",
			async : false,
			success : function(data) {
				bapplist = data;
			}
		});

		let upList = bapplist;

		if ((upList.applications) != undefined) {

			data = '<p><b>Status of Application: </b></p>';

			data = data + '<p>Please select the Application Name:</p>';

			data = data
					+ "<p>Application Name: <select class='select bappname' id='bappname'  style='color: black;'>";
			for (let i = 0; i < upList.applications.length; i++) {
				data = data + "<option value='"
						+ upList.applications[i].applicationName + "'>"
						+ upList.applications[i].applicationName + "</option>";
			}
			data = data + "</select></p>";

			data = data
					+ '<p><input type="button" id="bchkstatsbutton" value="Check Status" class=" btn btn-info "  onclick="botchkstats();"/></p>';

		} else {

			data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Applications</p>";
		}

		$("#chatajaxloader").hide();
		populateAnsData(data);

	} else if (matchedIntent == "BuildTrain") {
		matchfound = 1;

		let bprojectlist = {};
		$("#chatajaxloader").show();
		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getProjectList",
			async : false,
			success : function(data) {
				bprojectlist = data;
			}
		});

		let upList = bprojectlist;

		if ((upList.ProjectsList) != undefined) {

			data = '<p><b>Build a Train: </b></p>';

			data = data + '<p>Please select the Project Name:</p>';

			data = data
					+ '<p>Project Name: <select class="select bprojlist" id="bprojlist" style="color: black;">';
			for (let i = 0; i < upList.ProjectsList.length; i++) {
				data = data + "<option value='"
						+ upList.ProjectsList[i].projectName + "'>"
						+ upList.ProjectsList[i].projectName + "</option>";
			}
			data = data + '</select></p>';

			data = data
					+ '<p><input type="button" id="bgettrainlist" value="Select" class=" btn btn-info "  onclick="getTrainList();"/></p>';

		} else {

			data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Projects</p>";
		}

		$("#chatajaxloader").hide();
		populateAnsData(data);

	} else if (matchedIntent == "ScheduleTrain") {

		matchfound = 1;

		let bprojectlist = {};
		$("#chatajaxloader").show();
		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getProjectList",
			async : false,
			success : function(data) {
				bprojectlist = data;
			}
		});

		let upList = bprojectlist;

		if ((upList.ProjectsList) != undefined) {

			data = '<p><b>Schedule a Train: </b></p>';

			data = data + '<p>Please select the Project Name:</p>';

			data = data
					+ "<p>Project Name: <select class='select bprojlist1' id='bprojlist1'  style='color: black;'>";
			for (let i = 0; i < upList.ProjectsList.length; i++) {
				data = data + "<option value='"
						+ upList.ProjectsList[i].projectName + "'>"
						+ upList.ProjectsList[i].projectName + "</option>";
			}
			data = data + "</select></p>";

			data = data
					+ '<p><input type="button" id="bgettrainlist1" value="Select" class=" btn btn-info "  onclick="getTrainList1();"/></p>';

		} else {

			data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Projects</p>";
		}

		$("#chatajaxloader").hide();
		populateAnsData(data);

	} else if (matchedIntent == "ExecutionStatusTrain") {

		matchfound = 1;

		let bprojectlist = {};
		$("#chatajaxloader").show();
		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getProjectList",
			async : false,
			success : function(data) {
				bprojectlist = data;
			}
		});

		let upList = bprojectlist;

		if ((upList.ProjectsList) != undefined) {

			data = '<p><b>Execution Status of a Train: </b></p>';

			data = data + '<p>Please select the Project Name:</p>';

			data = data
					+ "<p>Project Name: <select class='select bprojlist2' id='bprojlist2'  style='color: black;'> ";
			for (let i = 0; i < upList.ProjectsList.length; i++) {
				data = data + "<option value='"
						+ upList.ProjectsList[i].projectName + "'>"
						+ upList.ProjectsList[i].projectName + "</option>";
			}
			data = data + "</select></p>";

			data = data
					+ '<p><input type="button" id="bgettrainlist2" value="Select" class=" btn btn-info "  onclick="getTrainList2();"/></p>';

		} else {

			data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Projects</p>";
		}

		$("#chatajaxloader").hide();
		populateAnsData(data);

	} else if (matchedIntent == "CloneApplication") {

		matchfound = 1;

		let bapplist = {};
		$("#chatajaxloader").show();
		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getListOfApplications",
			async : false,
			success : function(data) {
				bapplist = data;
			}
		});

		let upList = bapplist;

		if ((upList.applications) != undefined) {

			data = '<p><b>Clone an Application: </b></p>';

			data = data + '<p>Please select the Application Name:</p>';

			data = data
					+ "<p>Application Name: <select class='select bapplistid' id='bapplistid'  style='color: black;'>";
			for (let i = 0; i < upList.applications.length; i++) {
				data = data + "<option value='"
						+ upList.applications[i].applicationName + "'>"
						+ upList.applications[i].applicationName + "</option>";
			}
			data = data + "</select></p>";

			data = data
					+ "<p>Enter new clone application name: <input type='text' class='bappcloneid' id='bappcloneid' name='bappcloneid' style='color: black;'/></p>";

			data = data
					+ '<p><input type="button" id="bcloneApp" value="Clone" class=" btn btn-info "  onclick="cloneApp();"/></p>';

		} else {

			data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Applications</p>";
		}

		$("#chatajaxloader").hide();
		populateAnsData(data);

	} else if (matchedIntent == "EnvironmentAvailability") {

		matchfound = 1;

		let bapplist = {};
		$("#chatajaxloader").show();
		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getAllApplicationsFromCalendarPage",
			async : false,
			success : function(data) {
				bapplist = data;
			}
		});

		let upList = bapplist;

		if ((upList.applications) != undefined) {

			data = '<p><b>Availability of an Environment: </b></p>';

			data = data + '<p>Please select the Application Name:</p>';

			data = data
					+ "<p>Application Name: <select class='select bappname1' id='bappname1'  style='color: black;'>";
			for (let i = 0; i < upList.applications.length; i++) {
				data = data + "<option value='"
						+ upList.applications[i].applicationName + "'>"
						+ upList.applications[i].applicationName + "</option>";
			}
			data = data + "</select></p>";
			data = data
					+ "<p>Start Date: <input type='date' class='botappStrtDate' id='botappStrtDate' name='botappStrtDate' style='color: black; line-height: 10px; !important'/></p>";
			data = data
					+ "<p>End Date: <input type='date' class='botappEndDate' id='botappEndDate' name='botappEndDate' style='color: black; line-height: 10px; !important'/></p>";

			data = data
					+ '<p><input type="button" id="bchkstatsbutton" value="Check Status" class=" btn btn-info "  onclick="botchkAvail();"/></p>';

		} else {

			data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Applications</p>";
		}

		$("#chatajaxloader").hide();
		populateAnsData(data);

	}

	if (matchfound == 0) {

		let dataArr = [ "I am still learning. Please provide more information",
				"Sorry, what was that?", "What was that?", "I missed that.",
				"Sorry, I didn't get that",
				"I missed what you said. Say it again?", "I didn't get that.",
				"Say that again?", "Can you say that again?", "One more time?",
				"Sorry, can you say that again?",
				"I didn't get that. Can you say it again?",
				"Sorry, could you say that again?" ];

		// randomly selects an index from the arr
		let randomNumber = Math.floor(Math.random() * dataArr.length);

		let tData = dataArr[randomNumber];

		populateAnsData(tData);

		gInput = input;
		let gdata = '<p>Do you want me to search on <b><a id="botgooglesearchid" onclick="botGoogleSearch();" style="cursor: pointer;">Google</a></b></p>';

		populateAnsData(gdata);

	}

}


function finalgoogleresponse(){
	
	
	let dataArr = [ "I am still learning. Please provide more information",
		"Sorry, what was that?", "What was that?", "I missed that.",
		"Sorry, I didn't get that",
		"I missed what you said. Say it again?", "I didn't get that.",
		"Say that again?", "Can you say that again?", "One more time?",
		"Sorry, can you say that again?",
		"I didn't get that. Can you say it again?",
		"Sorry, could you say that again?" ];

// randomly selects an index from the arr
let randomNumber = Math.floor(Math.random() * dataArr.length);

let tData = dataArr[randomNumber];

populateAnsData(tData);

gInput = input;
let gdata = '<p>Do you want me to search on <b><a id="botgooglesearchid" onclick="botGoogleSearch();" style="cursor: pointer;">Google</a></b></p>';

populateAnsData(gdata);
}

function botGoogleSearch() {
	// location.href='http://www.google.com/search?q=' +
	// encodeURIComponent(gInput);

	window.open('http://www.google.com/search?q=' + encodeURIComponent(gInput),
			'_blank');
}
function botchkstats() {

	let len = $('.bappname').length;
	let inx = len - 1;
	let appNam = $('.bappname')[inx].value;

	// let appNam = document.getElementById("bappname").value;

	let bappstatus = "";
	// loadAjax();
	$.ajax({
		type : "GET",
		dataType : "text",
		url : "/WebServices/getStatusFromAppName?appName=" + appNam,
		async : false,
		success : function(data) {
			// $("#ajaxloader").hide();
			bappstatus = data;
		}
	});

	let bappstatusobj = JSON.parse(bappstatus);

	let data = "Application status for " + appNam + " is : "
			+ bappstatusobj[0].Status;

	populateAnsData(data);

	document.getElementById("bchkstatsbutton").disabled = true;

}

function getTrainList() {
	let len = $('.bprojlist').length;
	let inx = len - 1;
	let selbproj = $('.bprojlist')[inx].value;

	// let selbproj = $('#bprojlist').val();

	let btrainlist = {};
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/WebServices/getTrainListByProject?selectedProjectName="
				+ selbproj,
		async : false,
		success : function(data) {
			btrainlist = data;
		}
	});

	let data = '<p>Please select the Train Name :</p>';

	data = data
			+ "<p>Train Name: <select class='select btrainlistid' id='btrainlistid'  style='color: black;'>";
	for (let i = 0; i < btrainlist.TrainList.length; i++) {
		data = data + "<option value='" + btrainlist.TrainList[i].trainName
				+ "'>" + btrainlist.TrainList[i].trainName + "</option>";
	}
	data = data + "</select></p>";

	data = data
			+ '<p><input type="button" id="btrainbutton" value="Execute" class=" btn btn-info "  onclick="botexecuteTrain();"/></p>';

	populateAnsData(data);

}

function botexecuteTrain() {
	let len = $('.bprojlist').length;
	let inx = len - 1;
	let selbproj = $('.bprojlist')[inx].value;

	// let selbproj = $('#bprojlist').val();

	let len = $('.btrainlistid').length;
	let inx = len - 1;
	let selbtrain = $('.btrainlistid')[inx].value;

	// let selbtrain = $('#btrainlistid').val();

	let bobj;
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/WebServices/buildTrainNow?trainName=" + selbtrain
				+ "&projectName=" + selbproj,
		async : false,
		success : function(data) {
			bobj = data;
		}
	});

	setTimeout(
			function() {
				let d = new Date();
				let n = d.toTimeString();

				let data = "<p>Train has been executed for the " + selbproj
						+ " project with Train name as: " + selbtrain + " at "
						+ n + "</p>";

				data = data + "<p> Execution Details : </p>";
				data = data + "<p>Jenkins Path: <a id='botjenUrl' href=' "
						+ bobj.jenkinPath + "' target='_blank'> "
						+ bobj.jenkinPath + "</a></p>";
				data = data + "<p>Job Status: " + bobj.status + "</p>";
				data = data
						+ "<p> The cross browser execution status can be checked in the below link : </p>";
				data = data
						+ "<p>Cross Browser URL: <a id='botcrsbwsrUrl' href='http://in-pnq-coe19:8081/OPTIK/' target='_blank'> http://in-pnq-coe19:8081/OPTIK/ </a></p>";

				populateAnsData(data);

				document.getElementById("btrainbutton").disabled = true;

			}, 10);

}

function getTrainList1() {

	let len = $('.bprojlist1').length;
	let inx = len - 1;
	let selbproj = $('.bprojlist1')[inx].value;

	// let selbproj = $('#bprojlist1').val();
	let btrainlist = {};
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/WebServices/getTrainListByProject?selectedProjectName="
				+ selbproj,
		async : false,
		success : function(data) {
			btrainlist = data;
		}
	});

	let data = '<p>Please select the Train Name :</p>';

	data = data
			+ "<p>Train Name: <select class='select btrainlistid1' id='btrainlistid1'  style='color: black;'>";
	for (let i = 0; i < btrainlist.TrainList.length; i++) {
		data = data + "<option value='" + btrainlist.TrainList[i].trainName
				+ "'>" + btrainlist.TrainList[i].trainName + "</option>";
	}
	data = data + "</select></p>";

	data = data
			+ "<p>Date: <input type='date' class='botSchDate' id='botSchDate' name='botSchDate' style='color: black;'/></p>";
	data = data
			+ "<p>Time: <input type='time' class='botTime'  id='botTime' name='botTime' style='color: black;'/></p>";
	data = data
			+ "<p><input type='button' id='btrainschebutton' value='Schedule' class='btn btn-info' onclick='botScheduleTrain();'/></p>";

	populateAnsData(data);

}

function botScheduleTrain() {

	let len = $('.bprojlist1').length;
	let inx = len - 1;
	let selbproj = $('.bprojlist1')[inx].value;

	// let selbproj = $('#bprojlist1').val();

	let len = $('.btrainlistid1').length;
	let inx = len - 1;
	let selbtrain = $('.btrainlistid1')[inx].value;

	// let selbtrain = $('#btrainlistid1').val();

	let len = $('.botSchDate').length;
	let inx = len - 1;
	let selbotSchDate = $('.botSchDate')[inx].value;

	// let selbotSchDate = $('#botSchDate').val();

	let darr = selbotSchDate.split("-");
	// let d = new Date(selbotSchDate);
	let formateDate = darr[1] + "/" + darr[2] + "/" + darr[0];

	let len = $('.botTime').length;
	let inx = len - 1;
	let selbotTime = $('.botTime')[inx].value;

	// let selbotTime = $('#botTime').val();
	let tarr = selbotTime.split(":");
	let selbothour = tarr[0];
	let selbotmin = tarr[1];

	let bobj;
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/WebServices/buildSheduleTrain?sheduleTrainName=" + selbtrain
				+ "&sheduleProjectName=" + selbproj + "&min=" + selbotmin
				+ "&hr=" + selbothour + "&date=" + formateDate,
		async : false,
		success : function(data) {
			bobj = data;
		}
	});

	setTimeout(function() {
		let d = new Date();
		let n = d.toTimeString();

		let data = "<p>Train has been scheduled for execution on "
				+ selbotSchDate + " at " + selbothour + " hours " + selbotmin
				+ " minutes</p>";

		data = data + "<p> Scheduled Execution Details : </p>";
		data = data + "<p><b>Project Name:</b> " + selbproj + "</p>";
		data = data + "<p><b>Train Name:</b> " + selbtrain + "</p>";
		data = data + "<p><b>Jenkins Path:</b> <a id='botschjenUrl' href=' "
				+ bobj.jenkinPath + "' target='_blank'> " + bobj.jenkinPath
				+ "</a></p>";
		data = data + "<p><b>Job Status:</b> " + bobj.status + "</p>";

		populateAnsData(data);

		document.getElementById("btrainbutton").disabled = true;

	}, 10);

}

function getTrainList2() {

	let len = $('.bprojlist2').length;
	let inx = len - 1;
	let selbproj = $('.bprojlist2')[inx].value;

	// let selbproj = $('#bprojlist2').val();
	let btrainlist = {};
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/WebServices/getTrainListByProject?selectedProjectName="
				+ selbproj,
		async : false,
		success : function(data) {
			btrainlist = data;
		}
	});

	let data = '<p>Please select the Train Name :</p>';

	data = data
			+ "<p>Train Name: <select class='select btrainlistid2' id='btrainlistid2'  style='color: black;'>";
	for (let i = 0; i < btrainlist.TrainList.length; i++) {
		data = data + "<option value='" + btrainlist.TrainList[i].trainName
				+ "'>" + btrainlist.TrainList[i].trainName + "</option>";
	}
	data = data + "</select></p>";

	data = data
			+ '<p><input type="button" id="btrainbutton2" value="Execute" class=" btn btn-info "  onclick="botExecutionStatus();"/></p>';

	populateAnsData(data);

}

function botExecutionStatus() {

	let len = $('.bprojlist2').length;
	let inx = len - 1;
	let selbproj = $('.bprojlist2')[inx].value;

	// let selbproj = $('#bprojlist2').val();

	let len = $('.btrainlistid2').length;
	let inx = len - 1;
	let selbtrain = $('.btrainlistid2')[inx].value;

	// let selbtrain = $('#btrainlistid2').val();

	let bobj;
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/WebServices/executionStatusOfTrain?trainName=" + selbtrain
				+ "&projectName=" + selbproj,
		async : false,
		success : function(data) {
			bobj = data;
		}
	});

	let data = "<p>Execution Status details: <ul> ";
	for (let i = 0; i < bobj.length; i++) {
		data = data + "<p><li><ul>";
		data = data + "<li><b>Job Name</b>: " + bobj[i].jobName + "</li>";
		data = data + "<li><b>Status</b>: " + bobj[i].Status + "</li>";
		data = data + "</ul></li></p>";
	}
	data = data + "</ul></p>";
	populateAnsData(data);

}

function cloneApp() {

	let len = $('.bapplistid').length;
	let inx = len - 1;
	let selbapp = $('.bapplistid')[inx].value;

	// let selbapp = $('#bapplistid').val();

	let len = $('.bappcloneid').length;
	let inx = len - 1;
	let selbappclone = $('.bappcloneid')[inx].value;

	// let selbappclone = $('#bappcloneid').val();

	let bobj;
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/WebServices/createClone?appName=" + selbapp + "&appNewName="
				+ selbappclone,
		async : false,
		success : function(data) {
			bobj = data;
		}
	});
	let data = "<p> Clone Creation details:</p>";
	data = data + "<p><b>Result:</b> " + bobj.result + "</p>";
	if (bobj.info != undefined) {
		data = data + "<p><b>Info:</b> " + bobj.info + "</p>";
	}
	if (bobj.error != undefined) {
		data = data + "<p><b>Error:</b> " + bobj.error + "</p>";
	}

	populateAnsData(data);

}

function botchkAvail() {

	let len = $('.bappname1').length;
	let inx = len - 1;
	let selbapp = $('.bappname1')[inx].value;

	// let selbapp = $('#bappname1').val();

	let len = $('.botappStrtDate').length;
	let inx = len - 1;
	let selbstrtDate = $('.botappStrtDate')[inx].value;

	// let selbstrtDate = $('#botappStrtDate').val();

	let dstrtarr = selbstrtDate.split("-");
	// let d = new Date(selbotSchDate);
	let formatBStrtDate = dstrtarr[2] + "/" + dstrtarr[1] + "/" + dstrtarr[0];

	let len = $('.botappEndDate').length;
	let inx = len - 1;
	let selbendDate = $('.botappEndDate')[inx].value;

	// let selbendDate = $('#botappEndDate').val();

	let dendarr = selbendDate.split("-");
	// let d = new Date(selbotSchDate);
	let formatBEndDate = dendarr[2] + "/" + dendarr[1] + "/" + dendarr[0];

	let bobj;
	let bObjMap = {};
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/WebServices/checkAppAndEnvAvailability?appName=" + selbapp
				+ "&startDate=" + formatBStrtDate + "&endDate="
				+ formatBEndDate,
		async : false,
		success : function(data) {
			bobj = data;
		}
	});
	bObjMap = bobj;
	let data = "<p> Availability of application in given period of time:</p>";
	data = data + "<p><b>Application Name:</b> " + selbapp + " <ul>";
	$.each(bObjMap, function(index, value) {
		data = data + "<li><p><b>Date:</b> " + index + "</p></li>";
		data = data + "<li><p><b>Availability Status:</b> " + value
				+ "</p></li>";
	});
	data = data + "</ul></p>";

	populateAnsData(data);

}

function getUniqueArr(arr) {
	let uniqueArr = [];
	$.each(arr, function(i, el) {
		if ($.inArray(el, uniqueArr) === -1)
			uniqueArr.push(el);
	});

	return uniqueArr;

}

//

function populateInData(input) {
	let conversation = $(".conversation");
	// $("<div class='message-row text-right'><span class=''><div class='human
	// text-left'>" + input +
	// "</div></span></div>").hide().appendTo($conversation).fadeIn("fast");

	$(
			'<div class="bot-chatbox-msg-user"><span>'
					+ input
					+ '</span><div class="time-stamp">'
					+ getCurrentTime()
					+ '</div><div class="bot-torso bot-torso-user"></div></div>')
			.hide().appendTo($conversation).fadeIn("fast");

	conversationDataOut = conversationDataOut + "User::" + input;

	conversationDataOut = conversationDataOut + "!!";

	$conversation.scrollTop($conversation[0].scrollHeight);

}

function getinput(key) {
	if (key == 13 && ($("#yousay").val() != "") && ($("#yousay").val() != " ")) {
		input = $("#yousay").val();
		if ($("#yousay").val() == "") {
			input = spbotval;
		}
		$("#yousay").val("");
		for (let i = 0; i < 5; i++) {

			$("#yousay").attr("placeholder", "Thinking");
			$("#yousay").attr("placeholder", "Thinking.");
			$("#yousay").attr("placeholder", "Thinking..");
			$("#yousay").attr("placeholder", "Thinking...");
		}

		$("#yousay").attr("placeholder", "Say something...");

		populateInData(input);
		// doTalk(input);
		intializeSPBotDataMap();
		// intializeSPDataMap();
		matchfound = 0;

		setTimeout('giveAns(input)', 2000);
	}

}

$('#yousay').keypress(function(e) {
	let key = e.which;

	getinput(key);

});

function startDictation1() {
	

		  

	if (window.hasOwnProperty('webkitSpeechRecognition')) {

		let recognition = new webkitSpeechRecognition();

		recognition.continuous = false;
		recognition.interimResults = false;

		recognition.lang = "en-US";
		recognition.start();

		recognition.onresult = function(e) {
			document.getElementById('transcript').value = e.results[0][0].transcript;
			recognition.stop();
			spbotval = document.getElementById('transcript').value;
			getinput(13);

		};

		recognition.onerror = function(e) {
			recognition.stop();
		}

	}
}

function loadAjax() {
	$("#ajaxloader").show();
}

function botGenerateSuite() {

	let suitName = document.getElementById("bsuitName").value;
	document.getElementById("bubbleSuitName").value = suitName;

	let bid = spBotDataMap["suite"];
	document.getElementById(bid).click();

	data = "Test Suite : " + suitName + " has been created successfully";

	populateAnsData(data);

	document.getElementById("bgsuitebutton").disabled = true;
}

function getCurrentTime() {
	let date = new Date();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	let strTime = hours + ':' + minutes + ' ' + ampm;

	return strTime;
}

function getFeedback1() {

	let data = $(this).closest('span.dataSpan').text();
}

function getFeedback2() {

	let data = $(this).closest('span.dataSpan').text();
}

function MinervaModuleStatus() {
	let data = ""
	$.ajax({
		type : "GET",
		url : "/SmartQA/getMinervaModuleStatus",
		async : false,
		success : function(resultData) {
			if (resultData) {
				$("#MinervaMainID").css("display", "block");
			}
		}
	});
}
