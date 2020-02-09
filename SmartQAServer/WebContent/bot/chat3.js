//Initializing all global variables
var input;
var intentQueryMap;
var queryData;
var intentUtteranceMap;
var $conversation = $(".conversation");
var $chat = $("#chat");
var conversationDataIn = "";
var conversationDataOut = "";
var matchfound = 0;
var similarIntentMap;
var myVarInterval;
var minervaLogCount;

$(document).ready(function() {
	MinervaModuleStatus();

	$('#minervaMID').draggable();
	$('#minervaImg').resizable();
	$('#minervaMID1').draggable();
	$('#minervaImg1').resizable();

	intializeIntentQueryMap();
	intializeIntentUtteranceMap();

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
	if (conversationDataIn === "" || conversationDataIn === null) {
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

	if (ntrigger === "OFF") {
		$("#notifyID").hide();
		$("#notifyID1").show();
		clearInterval(myVarInterval);

	} else {
		$("#notifyID").show();
		$("#notifyID1").hide();
		myVarInterval = setInterval(getLoggerDataMinerva, 5000);

	}

});

$("#refreshID").click(function() {

	if ($("#minervaMID").is(":visible")) {

		$("#minervaMID").hide();
		$("#minervaMID1").show();
	} else if ($("#minervaMID1").is(":visible")) {

		$("#minervaMID1").hide();
		$("#minervaMID").show();
	}

});

function setNotTrigger(nTri) {
	$.ajax({
		url : "/WebServices/setNotifiationTrigger",
		type : 'GET',
		async : false,
		data : {
			sNotTri : nTri
		},
		success : function(response) {
			return response;
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
			setNotTrigger("OFF");
		});

$("#notifyID1")
		.click(
				function() {
					$("#notifyID1").hide();
					$("#notifyID").show();
					myVarInterval = setInterval(getLoggerDataMinerva, 5000);
					setTimeout(
							'setMinervaLogData("SmartQA","INFO","Minerva Log Notifications has been turned ON")',
							5000);
					setNotTrigger("ON");
				});

// Function to open chat box
$(".chatButton").click(function() {
	let bottomPosition; 
	bottomPosition = $chat.css("bottom");
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

function clearConversation() {

	clearConvData();

	$conversation.empty();
	
	populateinitialData();
}

//Function to set Conversation Data in Session

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

function clearConvData() {
	$.ajax({
		url : "/WebServices/ClearConversationDataInSession",
		type : 'GET',
		async : false,
		success : function(response) {
		}
	});
}
function speakOut() {

	let str;
	str = window.getSelection().toString();
	responsiveVoice.speak(str);
}

function intializeIntentUtteranceMap() {
	intentUtteranceMap = {};

	// General Queries
	/*intentUtteranceMap["Hello"] = "hi:|:hello:|:hola:|:ola";
	intentUtteranceMap["HowAreYou"] = "how:&:are:&:you:|:how:&:r:&:you:|:how:&:are:&:u:|:how:&:r:&:u:|:hw:&:r:&:u:|:hw:&:are:&:you:|:hw:&:r:&:you:|:hw:&:are:&:u";
	intentUtteranceMap["Fine"] = "fine:|:good:|:great";
	intentUtteranceMap["WhoAreYou"] = "who:&:are:&:you:|:who:&:r:&:you:|:who:&:are:&:u:|:who:&:r:&:u";*/

	// SmartQA General Queries
	/*intentUtteranceMap["TestDesignTechniques"] = "test:&:design:&:techniques:|:dcot:|:dtt:|:What is dcot suitable for:|:What is the required test basis for dtt:|:For ect, what are different suitability checks required for test basis:|:define test design techniques";
	intentUtteranceMap["ShiftLeft"] = "shift:&:left";
	intentUtteranceMap["SmartQA"] = "smartqa";
	intentUtteranceMap["iTAP"] = "itap";*/
	
	//Add a 
	intentUtteranceMap["AddQuestionMinerva"] = "add:&:question:|:add:&:query";
	
	// API Events
	intentUtteranceMap["ProjectList"] = "list:&:project";
	intentUtteranceMap["ApplicationStatus"] = "status:&:application";
	intentUtteranceMap["BuildTrain"] = "build:&:train:|:execute:&:train";
	intentUtteranceMap["ScheduleTrain"] = "schedule:&:train";
	intentUtteranceMap["ExecutionStatusTrain"] = "execution:&:status:&:train:|:status:&:train";
	intentUtteranceMap["CloneApplication"] = "clone:&:application";
	intentUtteranceMap["EnvironmentAvailability"] = "availability:&:environment";
}

// Intents Queries Map
function intializeIntentQueryMap() {
	intentQueryMap = {};

	// General Queries
/*	intentQueryMap["Hello"] = "Hello";
	intentQueryMap["HowAreYou"] = "HowAreYou";
	intentQueryMap["Fine"] = "Fine";
	intentQueryMap["WhoAreYou"] = "WhoAreYou";*/

	// SmartQA General Queries
	/*intentQueryMap["TestDesignTechniques"] = "Define Test Design Techniques";
	intentQueryMap["ShiftLeft"] = "Define Shift Left";
	intentQueryMap["SmartQA"] = "Define SmartQA";
	intentQueryMap["iTAP"] = "Define iTAP";
	intentQueryMap["Insurance"] = "Define Insurance";*/
	

	intentQueryMap["AddQuestionMinerva"] = "Add Question & Answer to Minerva";
		
	// API Events
	intentQueryMap["ProjectList"] = "Provide me list of Projects";
	intentQueryMap["ApplicationStatus"] = "Status of an Application";
	intentQueryMap["BuildTrain"] = "Execute a Train";
	intentQueryMap["ScheduleTrain"] = "Schedule a Train";
	intentQueryMap["ExecutionStatusTrain"] = "Execution status of a Train";
	intentQueryMap["CloneApplication"] = "Clone an Application";
	intentQueryMap["EnvironmentAvailability"] = "Availability of an Environment";

}

function getMatchedIntent(input) {
	let matchedIntent = null;
	let result,matchStr,tempIntentKey;
	
	if(matchedIntent === null){
		
		for (let i1 = 0, keys = Object.keys(intentQueryMap), len = keys.length; i1 < len; i1++) {
			tempIntentKey = keys[i1];
			matchStr = intentUtteranceMap[tempIntentKey];
			result = false;
			if (matchStr.includes(":|:")) {
				let conditions = matchStr.split(":|:");
				for (let i = 0; i < conditions.length; i++) {
					if (conditions[i].includes(":&:")) {
						result = true;
						let subConditions = conditions[i].split(":&:");
						for (let j = 0; j < subConditions.length; j++) {
							if (input.toLowerCase().match(
									"\\b" + subConditions[j] + "\\b")) {
								result = result && true;
							} else {
								result = result && false;
							}
						}
						if (result === true) {
							matchedIntent = tempIntentKey;
						}
					} else {
						if (input.toLowerCase()
								.match("\\b" + conditions[i] + "\\b")) {
							result = result || true;
						} else {
							result = result || false;
						}
						if (result === true) {
							matchedIntent = tempIntentKey;
						}
					}
				}
			} else if (matchStr.includes(":&:")) {
				let Conditions1 = matchStr.split(":&:");
				for (let k = 0; k < Conditions1.length; k++) {

					if (input.toLowerCase().match("\\b" + Conditions1[k] + "\\b")) {
						result = result && true;
					} else {
						result = result && false;
					}
				}
				if (result === true) {
					matchedIntent = tempIntentKey;
				}
			} else {
				if (input.toLowerCase().match("\\b" + matchStr + "\\b")) {
					result = result || true;
				} else {
					result = result || false;
				}
				if (result === true) {
					matchedIntent = tempIntentKey;
				}
			}
		}
	}
	
	return matchedIntent;

}

function provideResponse(input) {
	
	let matchedDataOBJ = getKeywordMatch(input);
	
	if((null!==matchedDataOBJ)){
		getAnswerMinerva(matchedDataOBJ);
	}else{
		
		
		let matchedIntent = getMatchedIntent(input);

		if ((matchedIntent === undefined) || (matchedIntent === null)) {

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

			let gdata = '<p>Do you want me to search on <b><a id="botgooglesearchid" onclick="botGoogleSearch('
					+ input + ');" style="cursor: pointer;">Google</a></b></p>';

			populateAnsData(gdata);

		} else {
			getMatchedIntentResponse(matchedIntent);
		}
		
	}

	
}

function getAllIntentQueriesList() {

	queryData = "";

	for (let i = 0, j = 1, keys = Object.keys(intentQueryMap), len = keys.length; i < len; i++, j++) {

		queryData = queryData + "<p> " + j + ". " + intentQueryMap[keys[i]]
				+ " </p>";
	}

	return queryData;
}

function populateinitialData1(conversationDataIn) {
	populateinitialData();
	let tData = conversationDataIn;

	let tsepData = tData.split("!#!");

	for (let i = 0; i < tsepData.length; i++) {

		let tempData = tsepData[i].split("!!");

		for (let j = 0; j < tempData.length; j++) {

			let tempData1 = tempData[j].split("::");
			if (tempData1[0] === "User") {
				let inData = tempData1[1];
				populateInDataConv(inData);
			} else if (tempData1[0] === "Minerva") {
				let outData = tempData1[1];
				if(outData.includes(" : ")){
					let minervaLogData = outData.split(" : ");

					if (minervaLogData.length > 0) {
						let application1 = minervaLogData[0];
						let log_message1 = "";
						for (let i = 2; i < minervaLogData.length; i++) {

							log_message1 = log_message1 + " : " + minervaLogData[i];
						}
						minervaLogCount = 0;
						logoldData(application1, log_message1);
					}
				}else{
					populateAnsDataConv(outData);
				}

			}
		}
	}
}

/*function populateinitialData() {

	$(
			'<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext"> Minerva</div><p  class="dataP" >I am Minerva your VA, How can i help U</p></span><div class="time-stamp">'
					+ getCurrentTime()
					+ '<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'
					+ '<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'
					+ '</span></span></span></div><div class="bot-torso bot-torso-server"></div></div><div class="optionsDiv"><div class="action">'
					+ '<span class="action-elem"><span onclick="getMatchedIntentResponse(\'BuildTrain\');">Build a Train</span></span>'
					+ '<span class="action-elem"><span onclick="getMatchedIntentResponse(\'ProjectList\');">Project List</span></span>'
					+ '<span class="action-elem"><span onclick="getMatchedIntentResponse(\'ScheduleTrain\');">Schedule a Train</span></span>'
					+ '<span class="action-elem"><span onclick="getMatchedIntentResponse(\'ExecutionStatusTrain\');">Execution Status of a Train</span></span>'
					+ '<span class="action-elem"><span onclick="getMatchedIntentResponse(\'ApplicationStatus\');">Status of an Application</span></span>'
					+ '<span class="action-elem"><span onclick="getMatchedIntentResponse(\'CloneApplication\');">Clone an Application</span></span>'
					+ '<span class="action-elem"><span onclick="getMatchedIntentResponse(\'EnvironmentAvailability\');">Availability Environment</span></span>'
					+ '</div></div>').hide().appendTo($conversation).fadeIn(
			"fast");

	$conversation.scrollTop($conversation[0].scrollHeight);

}*/


function populateinitialData(){

	$('<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext"> Minerva</div><p  class="dataP" >I am Minerva your VA, How can i help U</p></span><div class="time-stamp">'+getCurrentTime()+
		'<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'+
		'<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'+
		'</span></span></span></div><div class="bot-torso bot-torso-server"></div></div><div class="optionsDiv"><div class="action">'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'BuildTrain\',\'Build a Train\');">Build a Train</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'ProjectList\',\'Project List\');">Project List</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'ScheduleTrain\',\'Schedule a Train\');">Schedule a Train</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'ExecutionStatusTrain\',\'Execution Status of a Train\');">Execution Status of a Train</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'ApplicationStatus\',\'Status of an Application\');">Status of an Application</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'CloneApplication\',\'Clone an Application\');">Clone an Application</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'EnvironmentAvailability\',\'Availability Environment\');">Availability Environment</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'AddQuestionMinerva\',\'Add a Question\');">Add a Question</span></span>'+
		'</div></div>')
	  .hide()
	  .appendTo($conversation)
	  .fadeIn("fast");


	$conversation.scrollTop($conversation[0].scrollHeight); 

	}



function giveAEAnswer(input, input1){
	
	populateInData(input1);
	
	getMatchedIntentResponse(input);
	
	
}

function getMatchedIntentResponse(matchedintent1) {

	let data;

	matchfound = 0;
/*	if ((matchedintent1 === ("Hello")) && (matchfound === 0)) {

		matchfound = 1;
		data = "Hello Friend";
		populateAnsData(data);
	}

	if ((matchedintent1 === ("HowAreYou")) && (matchfound === 0)) {

		matchfound = 1;
		data = "fine, hw r u";
		populateAnsData(data);
	}

	if ((matchedintent1 === ("Fine")) && (matchfound === 0)) {

		matchfound = 1;
		data = "How can i help U";
		populateAnsData(data);
	}

	if ((matchedintent1 === ("WhoAreYou")) && (matchfound === 0)) {

		matchfound = 1;
		data = "I am Minerva your VA, How can i help U";
		populateAnsData(data);
	}*/

/*	if ((matchedintent1 === ("TestDesignTechniques")) && (matchfound === 0)) {

		matchfound = 1;
		data = "<p><b>TMAP Test Design techniques</b> The data combination test is a versatile technique for the testing of functionality both at detail level and at overall system level.</p>"
		data = data
				+ "<p><i>For More info :</i> <a target='_blank'; href='data/test design techniques.doc' style='color:blue;'>Test Design techniques</a></p>";
		populateAnsData(data);
	}

	if ((matchedintent1 === ("ShiftLeft")) && (matchfound === 0)) {
		matchfound = 1;
		data = "<p>The term <b>Shift Left</b> refers to a practice in software development where teams focus on quality, work on prevention instead of detection, and begin testing earlier than ever before.</p>"
		data = data
				+ "<p><i>For More info :</i> <a target='_blank'; href='https://www.ibm.com/developerworks/community/blogs/rqtm/entry/what_is_shift_left_testing?lang=en' style='color:blue;'> https://www.ibm.com/developerworks/community/blogs/rqtm/entry/what_is_shift_left_testing?lang=en</a></p>";
		populateAnsData(data);
	}

	if ((matchedintent1 === ("SmartQA")) && (matchfound === 0)) {

		matchfound = 1;
		data = "<p><b>Capgemini's Smart QA</b> is an end-to-end ecosystem that explores, evolves and make decisions based on cognitive and analytics capability from your own testing system.</p>"
		data = data
				+ "<p><i>For More info :</i> <a target='_blank'; href='https://www.capgemini.com/testing-services/capgeminis-smart-qa-for-financial-services' style='color:blue;'>https://www.capgemini.com/testing-services/capgeminis-smart-qa-for-financial-services</a></p>";
		populateAnsData(data);
	}

	if ((matchedintent1 === ("iTAP")) && (matchfound === 0)) {

		matchfound = 1;
		data = "<p><b>Intelligent Test Automation Platform</b> for Financial Services reduce costs and time to market by harnessing simple and smart integration principles to rapidly automate test scenarios and middleware services across the testing lifecycle.</p>"
		data = data
				+ "<p><i>For More info :</i> <a target='_blank'; href='https://www.capgemini.com/testing-services/intelligent-test-automation-platform-for-financial-services' style='color:blue;'>https://www.capgemini.com/testing-services/intelligent-test-automation-platform-for-financial-services</a></p>";
		populateAnsData(data);
	}*/

	
	if ((matchedintent1 === ("AddQuestionMinerva")) && (matchfound === 0)) {

		matchfound = 1;

		data = 	'<p>Enter the query details:</p>';
		
		data = data + "<p>*Intent: <input type='text' class='form-control intentid' id='intentid' name='intentid' style='color: black;'/>";
		data = data + "<span class='help-block'>Unique intent entry based on query</span></p>";
		/*data = data + "<p>Utterence: <input type='text' id='utterenceid' name='utterenceid' style='color: black;'/></p>";*/
		data = data + "<p>*Query: <input type='text' class='form-control queryid' id='queryid' name='queryid' style='color: black;'/></p>";
		data = data + "<p>*Response: <input type='text' class='form-control responseid' id='responseid' name='responseid' style='color: black;'/></p>";
		data = data + "<p>*Keywords: <input type='text' class='form-control keywordid' id='keywordid' name='keywordid' style='color: black;'/>";
		data = data + "<span class='help-block'>Enter possible keywords that can be used to match the intent with query</span></p>";
		data = data + "<p>Link: <input type='text' class='form-control linkid' id='linkid' name='linkid' style='color: black;'/></p>";
		data = data + "<p>Document Path: <input type='text' class='form-control documentid' id='documentid' name='documentid' style='color: black;'/></p>";		
		data = data + '<p><input type="button" id="addQuesbutton" value="Add" class=" btn btn-info "  onclick="botAddQues();"/></p>';
		
		populateAnsData(data);		
	}
	
	if ((matchedintent1 === ("Query")) && (matchfound === 0)) {

		matchfound = 1;
		data = getAllIntentQueriesList();
		populateAnsData(data);		
	}
	
	if ((matchedintent1 === ("ProjectList")) && (matchfound === 0)) {

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

	}

	if ((matchedintent1 === ("ApplicationStatus")) && (matchfound === 0)) {

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
	}

	if ((matchedintent1===("BuildTrain")) && (matchfound === 0)) {

		matchfound = 1;

		let upList;
		$("#chatajaxloader").show();
		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getProjectList",
			async : false,
			success : function(data) {
				upList = data;
			}
		});

		if ((upList.ProjectsList) !== undefined) {

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
	}

	if ((matchedintent1 === ("ScheduleTrain")) && (matchfound === 0)) {

		matchfound = 1;

		let upList;
		$("#chatajaxloader").show();
		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getProjectList",
			async : false,
			success : function(data) {
				upList = data;
			}
		});

		if ((upList.ProjectsList) !== undefined) {

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
	}

	if ((matchedintent1 === ("ExecutionStatusTrain")) && (matchfound === 0)) {
		matchfound = 1;

		let upList;
		$("#chatajaxloader").show();
		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getProjectList",
			async : false,
			success : function(data) {
				upList = data;
			}
		});

		if ((upList.ProjectsList) !== undefined) {

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
	}

	if ((matchedintent1 === ("CloneApplication")) && (matchfound === 0)) {

		matchfound = 1;

		let upList;
		$("#chatajaxloader").show();
		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getListOfApplications",
			async : false,
			success : function(data) {
				upList = data;
			}
		});


		if ((upList.applications) !== undefined) {

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
					+ "<p>Enter new clone application name: <input type='text' class='form-control bappcloneid' id='bappcloneid' name='bappcloneid' style='color: black;'/></p>";

			data = data
					+ '<p><input type="button" id="bcloneApp" value="Clone" class=" btn btn-info "  onclick="cloneApp();"/></p>';

		} else {

			data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Applications</p>";
		}

		$("#chatajaxloader").hide();
		populateAnsData(data);
	}

	if ((matchedintent1 === ("EnvironmentAvailability")) && (matchfound === 0)) {

		matchfound = 1;

		let upList;
		$("#chatajaxloader").show();
		$.ajax({
			type : "GET",
			dataType : "json",
			url : "/WebServices/getAllApplicationsFromCalendarPage",
			async : false,
			success : function(data) {
				upList = data;
			}
		});

		if ((upList.applications) !== undefined) {

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
					+ "<p>Start Date: <input type='date' class='form-control botappStrtDate' id='botappStrtDate' name='botappStrtDate' style='color: black; line-height: 10px; !important'/></p>";
			data = data
					+ "<p>End Date: <input type='date' class='form-control botappEndDate' id='botappEndDate' name='botappEndDate' style='color: black; line-height: 10px; !important'/></p>";

			data = data
					+ '<p><input type="button" id="bchkstatsbutton" value="Check Status" class=" btn btn-info "  onclick="botchkAvail();"/></p>';

		} else {

			data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Applications</p>";
		}

		$("#chatajaxloader").hide();
		populateAnsData(data);
	}

}


function getKeywordMatch(input) {
	let dataOBJ;
	let result;
	let matchedOBJ = null;
	
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/WebServices/getMinervaData",
		async : false,
		success : function(data) {
			dataOBJ = data;
			let matchStr;
			if(matchedOBJ == null){
				for (let i1 = 0, len = dataOBJ.length; i1 < len; i1++) {
					matchStr = dataOBJ[i1].keywords;
					result = false;
					if(matchStr!== undefined){
						if (matchStr.includes(",")) {
							let conditions = matchStr.split(",");
							for (let i = 0; i < conditions.length; i++) {
								if (conditions[i].includes(" ")) {
									result = true;
									let subConditions = conditions[i].split(" ");
									for (let j = 0; j < subConditions.length; j++) {
										if (input.toLowerCase().match(
												"\\b" + subConditions[j] + "\\b")) {
											result = result && true;
										} else {
											result = result && false;
										}
									}
									if (result === true) {
										matchedOBJ =  dataOBJ[i1];
									}
								} else {
									if (input.toLowerCase()
											.match("\\b" + conditions[i] + "\\b")) {
										result = result || true;
									} else {
										result = result || false;
									}
									if (result === true) {
										matchedOBJ = dataOBJ[i1];
									}
								}
							}
						} else if (matchStr.includes(" ")) {
							let Conditions1 = matchStr.split(" ");
							for (let k = 0; k < Conditions1.length; k++) {

								if (input.toLowerCase().match("\\b" + Conditions1[k] + "\\b")) {
									result = result && true;
								} else {
									result = result && false;
								}
							}
							if (result === true) {
								matchedOBJ = dataOBJ[i1];
							}
						} else {
							if (input.toLowerCase().match("\\b" + matchStr + "\\b")) {
								result = result || true;
							} else {
								result = result || false;
							}
							if (result === true) {
								matchedOBJ = dataOBJ[i1];
							}
						}						
					}
				}
				
			
			}
		}

	});
	
	return matchedOBJ;
}

function getAnswerMinerva(matchedDataOBJ) {


	data = '<p>' + matchedDataOBJ.response + '</p>';

	if ((null != matchedDataOBJ.link) && ("" != matchedDataOBJ.link)) {
		data = data + "<p><i>Reference URL:</i> <a href='" + matchedDataOBJ.link
				+ "' target='_blank'>" + matchedDataOBJ.link + "</a></p>";
	}
	if ((null != matchedDataOBJ.document) && ("" != matchedDataOBJ.document)) {
		data = data + "<p><i>Reference Doc:</i> <a target='_blank'; href='"
				+ matchedDataOBJ.document + "' style='color:blue;'>"
				+ matchedDataOBJ.document + "</a></p>";
	}

	populateAnsData(data);
}

function sSimilarity(sa1, sa2) {

	let s1 = sa1.replace(/\s/g, "").toLowerCase();
	let s2 = sa2.replace(/\s/g, "").toLowerCase();

	function intersect(arr1, arr2) {
		let r = [], o = {}, l = arr2.length, i, v;
		for (i = 0; i < l; i++) {
			o[arr2[i]] = true;
		}
		l = arr1.length;
		for (i = 0; i < l; i++) {
			v = arr1[i];
			if (v in o) {
				r.push(v);
			}
		}
		return r;
	}

	let pairs = function(s) {
		let pairs = [];
		for (let i = 0; i < s.length - 1; i++) {
			pairs[i] = s.slice(i, i + 2);
		}
		return pairs;
	}

	let similarity_num = 2 * intersect(pairs(s1), pairs(s2)).length;
	let similarity_den = pairs(s1).length + pairs(s2).length;
	let similarity = similarity_num / similarity_den;
	return similarity;
};

function MinervaModuleStatus() {
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



function getinput(key) {
	if (key === 13 && ($("#yousay").val() !== "")
			&& ($("#yousay").val() !== " ")) {
		input = $("#yousay").val();
		if ($("#yousay").val() === "") {
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

		matchfound = 0;

		setTimeout('provideResponse(input)', 2000);
	}

}

$('#yousay').keypress(function(e) {
	let key = e.which;

	getinput(key);

});

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

function botGoogleSearch(){	
	window.open('http://www.google.com/search?q=' + encodeURIComponent(gInput),'_blank');
}
function botchkstats(){
	let len = $('.bappname').length;
	let inx = len-1;
	let appNam = $('.bappname')[inx].value;
	
	let bappstatus = "";
	loadAjax();
	  $.ajax({
        type : "GET",
        dataType: "text",
        url : "/WebServices/getStatusFromAppName?appName="+appNam,
        async: false,
        success : function(data) {
        	$("#ajaxloader").hide();
        	bappstatus = data;
        }
    });
	  
	  let bappstatusobj = JSON.parse(bappstatus);
		
	  let data ="Application status for "+appNam+" is : "+ bappstatusobj[0].Status;
		
		populateAnsData(data);
		
		document.getElementById("bchkstatsbutton").disabled = true; 
	
	

}


function getTrainList(){
	let len = $('.bprojlist').length;
	let inx = len-1;
	let selbproj = $('.bprojlist')[inx].value;
	
	let btrainlist = {};
	  $.ajax({
          type : "GET",
          dataType: "json",
          url : "/WebServices/getTrainListByProject?selectedProjectName="+selbproj,
          async: false,
          success : function(data) {
        	  btrainlist = data;
          }
      });
	  
	  let data = 	'<p>Please select the Train Name :</p>';
		
		data = data + "<p>Train Name: <select class='select btrainlistid' id='btrainlistid'  style='color: black;'>";
		for(let i=0;i<btrainlist.TrainList.length;i++){
			data = data + "<option value='"+btrainlist.TrainList[i].trainName+"'>"+btrainlist.TrainList[i].trainName+"</option>";
		}
		data = data + "</select></p>";
		
		data = data + '<p><input type="button" id="btrainbutton" value="Execute" class=" btn btn-info "  onclick="botexecuteTrain();"/></p>';

		populateAnsData(data);
	
}


function botexecuteTrain(){
	let len = $('.bprojlist').length;
	let inx = len-1;
	let selbproj = $('.bprojlist')[inx].value;

	len = $('.btrainlistid').length;
	inx = len-1;
	let selbtrain = $('.btrainlistid')[inx].value;

	
	let bobj;
	 $.ajax({
         type : "GET",
         dataType: "json",
         url : "/WebServices/buildTrainNow?trainName="+selbtrain+"&projectName="+selbproj,
         async: false,
         success : function(data) {
        	 bobj = data;
         }
     });

	setTimeout(function(){
		let d = new Date();
		let n = d.toTimeString();
		
		let data ="<p>Train has been executed for the "+selbproj+" project with Train name as: "+selbtrain+" at "+ n +"</p>";
		
		data = data + "<p> Execution Details : </p>";
		data = data + "<p>Jenkins Path: <a id='botjenUrl' href=' "+ bobj.jenkinPath +"' target='_blank'> "+ bobj.jenkinPath +"</a></p>";
		data = data + "<p>Job Status: "+ bobj.status +"</p>";
		data = data + "<p> The cross browser execution status can be checked in the below link : </p>";
		data = data + "<p>Cross Browser URL: <a id='botcrsbwsrUrl' href='http://in-pnq-coe19:8081/OPTIK/' target='_blank'> http://in-pnq-coe19:8081/OPTIK/ </a></p>";		
		
		
		populateAnsData(data);
		
		document.getElementById("btrainbutton").disabled = true; 
	
	}, 10);
	

}

function getTrainList1(){
	
	let len = $('.bprojlist1').length;
	let inx = len-1;
	let selbproj = $('.bprojlist1')[inx].value;
	
	let btrainlist = {};
	  $.ajax({
          type : "GET",
          dataType: "json",
          url : "/WebServices/getTrainListByProject?selectedProjectName="+selbproj,
          async: false,
          success : function(data) {
        	  btrainlist = data;
          }
      });
	  
	  let data = 	'<p>Please select the Train Name :</p>';
		
		data = data + "<p>Train Name: <select class='select btrainlistid1' id='btrainlistid1'  style='color: black;'>";
		for(let i=0;i<btrainlist.TrainList.length;i++){
			data = data + "<option value='"+btrainlist.TrainList[i].trainName+"'>"+btrainlist.TrainList[i].trainName+"</option>";
		}
		data = data + "</select></p>";
		
		
		data = data + "<p>Date: <input type='date' class='form-control botSchDate' id='botSchDate' name='botSchDate' style='color: black;'/></p>";
		data = data + "<p>Time: <input type='time' class='form-control botTime'  id='botTime' name='botTime' style='color: black;'/></p>";
		data = data + "<p><input type='button' id='btrainschebutton' value='Schedule' class='btn btn-info' onclick='botScheduleTrain();'/></p>";
		
		populateAnsData(data);
	
}



function botScheduleTrain(){
	
	let len = $('.bprojlist1').length;
	let inx = len-1;
	let selbproj = $('.bprojlist1')[inx].value;

	
	len = $('.btrainlistid1').length;
	inx = len-1;
	let selbtrain = $('.btrainlistid1')[inx].value;
	
	
	len = $('.botSchDate').length;
	inx = len-1;
	let selbotSchDate = $('.botSchDate')[inx].value;

	
	let darr = selbotSchDate.split("-");
	let formateDate =  darr[1]+"/"+darr[2]+"/"+darr[0];
	
	len = $('.botTime').length;
	inx = len-1;
	let selbotTime = $('.botTime')[inx].value;
	
	let tarr = selbotTime.split(":");
	let selbothour = tarr[0];
	let selbotmin = tarr[1];
	
	let bobj;
	 $.ajax({
         type : "GET",
         dataType: "json",
         url : "/WebServices/buildSheduleTrain?sheduleTrainName="+selbtrain+"&sheduleProjectName="+selbproj+"&min="+selbotmin+"&hr="+selbothour+"&date="+formateDate,
         async: false,
         success : function(data) {
        	 bobj = data;
         }
     });

	setTimeout(function(){	
		let data ="<p>Train has been scheduled for execution on "+ selbotSchDate +" at "+ selbothour +" hours "+ selbotmin +" minutes</p>";
		
		data = data + "<p> Scheduled Execution Details : </p>";
		data = data + "<p><b>Project Name:</b> "+ selbproj +"</p>";
		data = data + "<p><b>Train Name:</b> "+ selbtrain +"</p>";
		data = data + "<p><b>Jenkins Path:</b> <a id='botschjenUrl' href=' "+ bobj.jenkinPath +"' target='_blank'> "+ bobj.jenkinPath +"</a></p>";
		data = data + "<p><b>Job Status:</b> "+ bobj.status +"</p>";
		
		populateAnsData(data);
		
		document.getElementById("btrainbutton").disabled = true; 
	
	}, 10);
	
}



function getTrainList2(){
	
	let len = $('.bprojlist2').length;
	let inx = len-1;
	let selbproj = $('.bprojlist2')[inx].value;
	
	let btrainlist = {};
	  $.ajax({
          type : "GET",
          dataType: "json",
          url : "/WebServices/getTrainListByProject?selectedProjectName="+selbproj,
          async: false,
          success : function(data) {
        	  btrainlist = data;
          }
      });
	  let data = 	'<p>Please select the Train Name :</p>';
	
	data = data + "<p>Train Name: <select class='select btrainlistid2' id='btrainlistid2'  style='color: black;'>";
	for(let i=0;i<btrainlist.TrainList.length;i++){
		data = data + "<option value='"+btrainlist.TrainList[i].trainName+"'>"+btrainlist.TrainList[i].trainName+"</option>";
	}
	data = data + "</select></p>";
	
	data = data + '<p><input type="button" id="btrainbutton2" value="Execute" class=" btn btn-info "  onclick="botExecutionStatus();"/></p>';

	populateAnsData(data);
	
}

function botExecutionStatus(){
	
	let len = $('.bprojlist2').length;
	let inx = len-1;
	let selbproj = $('.bprojlist2')[inx].value;

	len = $('.btrainlistid2').length;
	inx = len-1;
	let selbtrain = $('.btrainlistid2')[inx].value;
	
	let bobj;
	 $.ajax({
        type : "GET",
        dataType: "json",
        url : "/WebServices/executionStatusOfTrain?trainName="+selbtrain+"&projectName="+selbproj ,
        async: false,
        success : function(data) {
       	 bobj = data;
        }
    });
	 let data = "<p>Execution Status details: <ul> ";
		for(let i=0;i<bobj.length;i++){
			data = data + "<p><li><ul>";
			data = data +"<li><b>Job Name</b>: "+bobj[i].jobName+"</li>";
			data = data +"<li><b>Status</b>: "+bobj[i].Status+"</li>";
			data = data +"</ul></li></p>";
		}
		data= data +"</ul></p>";
		populateAnsData(data);
	
}


function cloneApp(){
	
	
	let len = $('.bapplistid').length;
	let inx = len-1;
	let selbapp = $('.bapplistid')[inx].value;
	
	len = $('.bappcloneid').length;
	inx = len-1;
	let selbappclone = $('.bappcloneid')[inx].value;
	
	let bobj;
	 $.ajax({
        type : "GET",
        dataType: "json",
        url : "/WebServices/createClone?appName="+selbapp+"&appNewName="+selbappclone,
        async: false,
        success : function(data) {
       	 bobj = data;
        }
    });
	 let data = "<p> Clone Creation details:</p>";
		data = data + "<p><b>Result:</b> "+ bobj.result +"</p>";
		if(bobj.info!==undefined){
			data = data + "<p><b>Info:</b> "+ bobj.info +"</p>";
		}
		if(bobj.error!==undefined){
			data = data + "<p><b>Error:</b> "+ bobj.error +"</p>";
		}

		populateAnsData(data);
}



function botchkAvail(){
	
	let len = $('.bappname1').length;
	let inx = len-1;
	let selbapp = $('.bappname1')[inx].value;
	
	
	len = $('.botappStrtDate').length;
	inx = len-1;
	let selbstrtDate = $('.botappStrtDate')[inx].value;
	
	
	let dstrtarr = selbstrtDate.split("-");
	let formatBStrtDate =  dstrtarr[2]+"/"+dstrtarr[1]+"/"+dstrtarr[0];
	
	len = $('.botappEndDate').length;
	inx = len-1;
	let selbendDate = $('.botappEndDate')[inx].value;
	
	
	let dendarr = selbendDate.split("-");
	let formatBEndDate =  dendarr[2]+"/"+dendarr[1]+"/"+dendarr[0];
	
	let bObjMap;
	 $.ajax({
        type : "GET",
        dataType: "json",
        url : "/WebServices/checkAppAndEnvAvailability?appName="+selbapp+"&startDate="+formatBStrtDate+"&endDate="+formatBEndDate,
        async: false,
        success : function(data) {
        	bObjMap = data;
        }
    });
		let data = "<p> Availability of application in given period of time:</p>";
		data = data + "<p><b>Application Name:</b> "+ selbapp +" <ul>";
		$.each( bObjMap, function(index,value){
			data = data + "<li><p><b>Date:</b> "+ index +"</p></li>";
			data = data + "<li><p><b>Availability Status:</b> "+ value +"</p></li>";
			});
		data = data + "</ul></p>";

		populateAnsData(data);
	
}


function populateInData(input) {

	$(
			'<div class="bot-chatbox-msg-user"><span>'
					+ input
					+ '</span><div class="time-stamp">'
					+ getCurrentTime()
					+ '</div><div class="bot-torso bot-torso-user"></div></div>')
			.hide().appendTo($conversation).fadeIn("fast");

	let convInData = "User::" + input + "!!";
	SetValue(convInData);
	$conversation.scrollTop($conversation[0].scrollHeight);

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

	let convOutData = "Minerva::" + data + "!#!";
	SetValue(convOutData);
	$conversation.scrollTop($conversation[0].scrollHeight);

}

///Conversation


function populateInDataConv(input){
   $('<div class="bot-chatbox-msg-user"><span>'+input+'</span><div class="time-stamp">'+getCurrentTime()+'</div><div class="bot-torso bot-torso-user"></div></div>').hide().appendTo($conversation).fadeIn("fast");
   $conversation.scrollTop($conversation[0].scrollHeight);
}


function populateAnsDataConv(data){
	$('<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext">Minerva</div><p class="dataP" >'+ data +'</p></span><div class="time-stamp">'+getCurrentTime()+
	'<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'+
	'<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'+
	'</span></span></span></div><div class="bot-torso bot-torso-server"></div></div>')
	  .hide()
	  .appendTo($conversation)
	  .fadeIn("fast");
	$conversation.scrollTop($conversation[0].scrollHeight); 	
}





function getFeedback1() {
	
	$('img.feedback1').closest('img').attr('src','bot/images/thumbs-up-filled.png');
	$('img.feedback2').closest('img').attr('src','bot/images/thumbs-down.png');
	
    let data = $(this).closest('span.dataSpan').text();
}


function getFeedback2() {
	
	$('img.feedback1').closest('img').attr('src','bot/images/thumbs-up.png');
	$('img.feedback2').closest('img').attr('src','bot/images/thumbs-down-filled.png');
	
    let data = $(this).closest('span.dataSpan').text();
}


function botAddQues(){
	
	let len = $('.intentid').length;
	let inx = len-1;
	let intent = $('.intentid')[inx].value;
	
	let len1 = $('.queryid').length;
	let inx1 = len1-1;
	let query = $('.queryid')[inx1].value;
	
	let len2 = $('.responseid').length;
	let inx2 = len2-1;
	let response = $('.responseid')[inx2].value;
	
	let len3 = $('.keywordid').length;
	let inx3 = len3-1;
	let keyword = ($('.keywordid')[inx3].value).toLowerCase();
	
	let len4 = $('.linkid').length;
	let inx4 = len4-1;
	let link = $('.linkid')[inx4].value;
	
	let len5 = $('.documentid').length;
	let inx5 = len5-1;
	let documentpath = $('.documentid')[inx5].value;
	
	if((intent==="")||(query==="")||(response==="")||(keyword==="")){
		
		data="Please enter all the required details";
		
	}else{
		let output;

		$.ajax({
	        type : "GET",
	        dataType: "text",
	        url : "/WebServices/addQnAToMinerva?intent="+intent+"&query="+query+"&response="+response+"&keyword="+keyword+"&link="+link+"&documentpath="+documentpath,
	        async: false,
	        success : function(data) { 	
	        	output = data;
	        }
	    });
		
		if(output==="SUCCESS"){
			data="Question has been added successfully..."
				
		}else{
			data="<p>Inconsistency in the Data provided...</p>"
			//data = data + "<p> Error: "+output+"</p>"
			
		}
		
	}
	
	
	populateAnsData(data);
	
}