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
var data;
var spBotDataMap;
var minervaLogCount;


$(document).ready(function() {
	
	//console.log(check());
	
	let keywords =["OSP field","From Claim Search what is the OSP field"];
	console.log((new RegExp(keywords.join("|"),"i")));
	
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
	
	
	if (ntrigger=="OFF") {
		$("#notifyID").hide();
		$("#notifyID1").show();
		clearInterval(myVarInterval);
		
	}else{
		$("#notifyID").show();
		$("#notifyID1").hide();
		myVarInterval = setInterval(getLoggerDataMinerva, 5000);
	
	}

});

//$('#minervaImg').attr('src', 'bot/images/MinervaLady.jpg');
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
	
	if (ntrigger=="OFF") {
		clearInterval(myVarInterval);
	}else{
		
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
			
			if(minervaLogCount==undefined){
				
				minervaLogCount = 0;
			}

			if (type == "ERROR") {
				populateAnsData2(data1,id,application,type,log_message);
				logErrorData(application,log_message);
			} else if(type == "WARN"){
				populateAnsData3(data1,id,application,type,log_message);
				logWarnData(application,log_message);
			} else {
				populateAnsData1(data1,id,application,type,log_message);
				logInfoData(application,log_message);
			}
		}
	}

*/}


function clearCount(){
	
	minervaLogCount = 0;
	
	$("#countlabel")[0].textContent = minervaLogCount + " new";
	
	$("#countdiv")[0].textContent = minervaLogCount;
	
	$("#countdiv").hide();
	//$("#countlabeldiv").hide();
	
}

function logErrorData(application,log_message){
	
	minervaLogCount++;
	
	let str = '<a href="#" class="list-group-item">';
	str = str + '<div class="color-box-notifi" style="background-color: red;"></div>';
	str = str + '<i class="fa fa-envelope" aria-hidden="true"></i><span class="contacts-title">' + application + '</span>';
	str = str + '<p>' + log_message + '</p></a>';
	
	$("#contentDiv").prepend(str);
	
	
	$("#countlabel")[0].textContent = minervaLogCount + " new";
	
	$("#countdiv")[0].textContent = minervaLogCount;
	
	$("#countdiv").show();
	$("#countlabeldiv").show();
	
	
	
}

function logInfoData(application,log_message){
	
	minervaLogCount++;
	
	let str = '<a href="#" class="list-group-item">';
	str = str + '<div class="color-box-notifi" style="background-color: blue;"></div>';
	str = str + '<i class="fa fa-envelope" aria-hidden="true"></i><span class="contacts-title">' + application + '</span>';
	str = str + '<p>' + log_message + '</p></a>';
	
	$("#contentDiv").prepend(str);
	
	$("#countlabel")[0].textContent = minervaLogCount + " new";
	
	$("#countdiv")[0].textContent = minervaLogCount;
	
	$("#countdiv").show();
	$("#countlabeldiv").show();
		
		
	}


function logWarnData(application,log_message){
	
	minervaLogCount++;
	
	let str = '<a href="#" class="list-group-item">';
	str = str + '<div class="color-box-notifi" style="background-color: yellow;"></div>';
	str = str + '<i class="fa fa-envelope" aria-hidden="true"></i><span class="contacts-title">' + application + '</span>';
	str = str + '<p>' + log_message + '</p></a>';
	
	$("#contentDiv").prepend(str);
	
	$("#countlabel")[0].textContent = minervaLogCount + " new";
	
	$("#countdiv")[0].textContent = minervaLogCount;
	
	$("#countdiv").show();
	$("#countlabeldiv").show();
		
		
	}



function logoldData(application,log_message){
	
	let str = '<a href="#" class="list-group-item">';
	str = str + '<div class="color-box-notifi" style="background-color: grey;"></div>';
	str = str + '<i class="fa fa-envelope" aria-hidden="true"></i><span class="contacts-title">' + application + '</span>';
	str = str + '<p>' + log_message + '</p></a>';
	
	$("#contentDiv").prepend(str);
	
}



function updateMinervaLogData(id,application,type,log_message) {

	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/WebServices/updateMinervaLogData?id=" + id +"&application="+ application +"&type="+ type +"&log_message="+ log_message,
		async : false,
		success : function(data) {
		}
	});

}


function setMinervaLogData(application,type,log_message) {

	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/WebServices/setMinervaLogData?type="+ type +"&application="+ application +"&log_message="+ log_message,
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

//Switch for Log Event Notification


$("#notifyID").click(function() {
	
		setMinervaLogData("SmartQA","INFO","Minerva Log Notifications has been turned OFF");

		$("#notifyID").hide();
		$("#notifyID1").show();
		
		setTimeout('clearInterval(myVarInterval)', 10000);
		
		//clearInterval(myVarInterval);
		
		let nTri ="OFF";
		setNotTrigger(nTri);
		
});

$("#notifyID1").click(function() {

	$("#notifyID1").hide();
	$("#notifyID").show();
	
	myVarInterval = setInterval(getLoggerDataMinerva, 5000);
	//wait(5000);
	
	setTimeout('setMinervaLogData("SmartQA","INFO","Minerva Log Notifications has been turned ON")', 5000);
	//setMinervaLogData("Info","Log Notifications has been turned ON");
	
	let nTri ="ON";
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

function  clearConversation(){
	
	let sData = null;

	SetValue(sData);
	
	$conversation.empty();
}


function  speakOut(){
	
	let str = window.getSelection().toString();
	console.log(str);
	responsiveVoice.speak(str);
}


function populateinitialData1(conversationDataIn){
	populateinitialData();
	let tData = conversationDataIn;
	
	let tsepData = tData.split("!#!");
	
	for (let i = 0; i < tsepData.length; i++) {
		
		let tempData = tsepData[i].split("!!");
		
		for (let j = 0; j < tempData.length; j++) {
			
			let tempData1 = tempData[j].split("::");
			if(tempData1[0] == "User"){
				let inData = tempData1[1];
				populateInData(inData);
			}else if(tempData1[0] == "Minerva"){
				let outData = tempData1[1];
				populateAnsData(outData);
				
				let minervaLogData  = outData.split(" : ");
				
				if(minervaLogData.length>0){					
					let application1 = minervaLogData[0];
					let type1 = minervaLogData[1];
					let log_message1 = "";
					for(let i=2;i<minervaLogData.length;i++){
						
						log_message1 = log_message1 +" : "+  minervaLogData[i];
					}
					
					minervaLogCount = 0;
					
					logoldData(application1,log_message1);

				}
				
				
			}
		}
		
	}
	
}



//Function to open chat box
$(".chatButton").click(function() {
    let bottomPosition = $chat.css("bottom");
    if (bottomPosition === "-392px") {
        $chat.animate({ bottom: "0px"}, 250, function() {
            $("#yousay").focus();
        });
    } else {
        $chat.animate({ bottom: "-392px"}, 250);
    }
});


$("#arrowId").click(function() {
    let bottomPosition = $chat.css("bottom");
    if (bottomPosition === "-392px") {
        $chat.animate({ bottom: "0px"}, 250, function() {
            $("#yousay").focus();
            $("#arrowId").removeClass("minimize-arrow-upright").addClass("minimize-arrow-downleft");
        });
    } else {
        $chat.animate({ bottom: "-392px"}, 250);
        $("#arrowId").removeClass("minimize-arrow-downleft").addClass("minimize-arrow-upright");

    }
});


$("#minervaImg").on('dblclick',function () { 
	
	$('#MinervaMainID').hide();
	$('#chat').show();
	$chat.animate({ bottom: "0px"}, 250, function() {
        $("#yousay").focus();
        $("#arrowId").removeClass("minimize-arrow-upright").addClass("minimize-arrow-downleft");
    });
	
});

$("#minervaImg1").on('dblclick',function () { 
	
	$('#MinervaMainID').hide();
	$('#chat').show();
	$chat.animate({ bottom: "0px"}, 250, function() {
        $("#yousay").focus();
        $("#arrowId").removeClass("minimize-arrow-upright").addClass("minimize-arrow-downleft");
    });
	
});




$("#minusID").on('click',function () { 
	
	$('#MinervaMainID').show();
	$('#chat').hide();
	
});




//Function to initialize Bot Map data
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


function populateAnsData(data){

$('<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext">Minerva</div><p class="dataP" >'+ data +'</p></span><div class="time-stamp">'+getCurrentTime()+
'<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'+
'<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'+
'</span></span></span></div><div class="bot-torso bot-torso-server"></div></div>')
  .hide()
  .appendTo($conversation)
  .fadeIn("fast");
	
conversationDataOut = conversationDataOut + "Minerva::" + data;

conversationDataOut = conversationDataOut + "!#!";

SetValue(conversationDataOut);
$conversation.scrollTop($conversation[0].scrollHeight); 
	
}

function populateAnsData1(data,id,application,type,log){

	$('<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext">Minerva</div><p class="dataP" style="color: green;" >'+ data +'</p></span><div class="time-stamp">'+getCurrentTime()+
	'<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'+
	'<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'+
	'</span></span></span></div><div class="bot-torso bot-torso-server"></div></div>')
	  .hide()
	  .appendTo($conversation)
	  .fadeIn("fast");
		
	conversationDataOut = conversationDataOut + "Minerva::" + data;

	conversationDataOut = conversationDataOut + "!#!";

	SetValue(conversationDataOut);
	$conversation.scrollTop($conversation[0].scrollHeight); 
	
	updateMinervaLogData(id,application,type,log);
	
	$("#newmsgID").hide();
	
		
	}

function populateAnsData2(data,id,application,type,log){

	$('<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext">Minerva</div><p class="dataP" style="color: red;" >'+ data +'</p></span><div class="time-stamp">'+getCurrentTime()+
	'<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'+
	'<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'+
	'</span></span></span></div><div class="bot-torso bot-torso-server"></div></div>')
	  .hide()
	  .appendTo($conversation)
	  .fadeIn("fast");
		
	conversationDataOut = conversationDataOut + "Minerva::" + data;

	conversationDataOut = conversationDataOut + "!#!";

	SetValue(conversationDataOut);
	$conversation.scrollTop($conversation[0].scrollHeight); 
	
	updateMinervaLogData(id,application,type,log);
	
	$("#newmsgID").hide();
	
	}


function populateAnsData3(data,id,application,type,log){

	$('<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext">Minerva</div><p class="dataP" style="color: yellow;" >'+ data +'</p></span><div class="time-stamp">'+getCurrentTime()+
	'<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'+
	'<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'+
	'</span></span></span></div><div class="bot-torso bot-torso-server"></div></div>')
	  .hide()
	  .appendTo($conversation)
	  .fadeIn("fast");
		
	conversationDataOut = conversationDataOut + "Minerva::" + data;

	conversationDataOut = conversationDataOut + "!#!";

	SetValue(conversationDataOut);
	$conversation.scrollTop($conversation[0].scrollHeight); 
	
	updateMinervaLogData(id,application,type,log);
	
	$("#newmsgID").hide();
	
	}

function populateinitialData(){

	$('<div class="bot-chatbox-msg-server"><span style="font-size: 11px;" class="dataSpan" ><div class="brandtext"> Minerva</div><p  class="dataP" >I am Minerva your VA, How can i help U</p></span><div class="time-stamp">'+getCurrentTime()+
		'<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'+
		'<img onclick="getFeedback1(this)" class="feedback1" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback2(this)" class="feedback2" src="bot/images/thumbs-down.png">'+
		'</span></span></span></div><div class="bot-torso bot-torso-server"></div></div><div class="optionsDiv"><div class="action">'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'build train\',\'Build a Train\');">Build a Train</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'project list\',\'Project List\');">Project List</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'schedule train\',\'Schedule a Train\');">Schedule a Train</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'execution status train\',\'Execution Status of a Train\');">Execution Status of a Train</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'status Application\',\'Status of an Application\');">Status of an Application</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'clone application\',\'Clone an Application\');">Clone an Application</span></span>'+
		'<span class="action-elem"><span onclick="giveAEAnswer(\'availability environment\',\'Availability Environment\');">Availability Environment</span></span>'+
		'</div></div>')
	  .hide()
	  .appendTo($conversation)
	  .fadeIn("fast");

	//conversationDataOut = conversationDataOut + "Minerva::I am Minerva your VA, How can i help U";

	//conversationDataOut = conversationDataOut + "!#!";

	//SetValue(conversationDataOut);

	$conversation.scrollTop($conversation[0].scrollHeight); 

	}



function giveAEAnswer(input, input1){
	
	populateInData(input1);
	
	giveAnswer(input);
	
	
}

function giveAnswer(input){
	
		let data="";
		
		
		
///////// Start of all the questionarie 
		
		
		//hello 
		if((input.toLowerCase().search(/(\bhi\b|\bhello\b|\bhola\b|\bola\b)/i))>=0){
			
			matchfound = 1;
			data=spBotDataMap["hi"];
			populateAnsData(data); 
		}
		
		//hello 
		if((input.toLowerCase().search(/(\bquerry\b)/i))>=0){
			
			matchfound = 1;
			data=getAllIntentQueriesList();
			populateAnsData(data); 
		}
		

		// how r u

		if (((input.toLowerCase().match(/(?=.*\bhow\b)/)) || (input.toLowerCase().match(/(?=.*\bhw\b)/)))
				&& ((input.toLowerCase().match(/(?=.*\bare\b)/))	|| (input.toLowerCase().match(/(?=.*\br\b)/)))
				&& ((input.toLowerCase().match(/(?=.*\byou\b)/)) || (input.toLowerCase().match(/(?=.*\bu\b)/)))) {
			
			matchfound = 1;
			data = spBotDataMap["hw r u"];
			populateAnsData(data);
		}
		
		//fine
		if (((input.toLowerCase().match(/(?=.*\fine\b)/))) || (input.toLowerCase().match(/(?=.*\bgood\b)/))) {
			
			matchfound = 1;
			data=spBotDataMap["fine"];
			populateAnsData(data); 
		}
		
		
		if ((((input.toLowerCase().match(/(?=.*\bwho\b)/)))
				&& ((input.toLowerCase().match(/(?=.*\bare\b)/))	|| (input.toLowerCase().match(/(?=.*\br\b)/)))
				&& ((input.toLowerCase().match(/(?=.*\byou\b)/)) || (input.toLowerCase().match(/(?=.*\bu\b)/))))
				|| (((input.toLowerCase().match(/(?=.*\bwhat\b)/)) || (input.toLowerCase().match(/(?=.*\bwat\b)/)))
				&& ((input.toLowerCase().match(/(?=.*\bis\b)/)))
				&& ((input.toLowerCase().match(/(?=.*\byour\b)/)) || (input.toLowerCase().match(/(?=.*\bur\b)/)))
				&& ((input.toLowerCase().match(/(?=.*\bname\b)/))))) {
			
			matchfound = 1;
			data=spBotDataMap["who r u"];
			populateAnsData(data); 
		}
		
		if (((input.toLowerCase().match(/(?=.*\bbubble\b)/))&&(input.toLowerCase().match(/(?=.*\banalysis\b)/))) || (input.toLowerCase().match(/(?=.*\bbubblechart\b)/))) {
		
			matchfound = 1;
			let bid= spBotDataMap["bubble analysis"];
			data = "Bubble Analysis Page will be opened shortly";
			populateAnsData(data); 
			document.getElementById(bid).click();
			
		}
		

		if (((input.toLowerCase().match(/(?=.*\bmind\b)/)) && (input.toLowerCase().match(/(?=.*\bmap\b)/)))
			|| (((input.toLowerCase().match(/(?=.*\bmind\b)/)) && (input.toLowerCase().match(/(?=.*\bmap\b)/))) 
					&& (input.toLowerCase().match(/(?=.*\banalysis\b)/)))) {

			matchfound = 1;
			let bid = spBotDataMap["mind map"];
			data = "MindMap Analysis Page will be opened shortly";
			populateAnsData(data); 
			document.getElementById(bid).click();
		}
		
		
		
		//Project filter
		if ((input.toLowerCase().match(/(?=.*\bproject\b)/))&&(input.toLowerCase().match(/(?=.*\bfilter\b)/))){

			matchfound = 1;
			let bid= spBotDataMap["project filter"];
			document.getElementById(bid).click();
		}
		
		//Attribute list	
		if ((input.toLowerCase().match(/(?=.*\battribute\b)/))&&(input.toLowerCase().match(/(?=.*\bfilter\b)/))){
			
			matchfound = 1;
			let bid= spBotDataMap["attribute filter"];
			document.getElementById(bid).click();
		}
		
		//status
/*		if (input.toLowerCase().match(/(?=.*\bstatus\b)/)){

			matchfound = 1;
			let bid= spBotDataMap["status"];
			document.getElementById(bid).click();
		}*/
		
		//passed
		if (input.toLowerCase().match(/(?=.*\bpassed\b)/)){

			matchfound = 1;
			let bid= spBotDataMap["passed"];
			document.getElementById(bid).click();
		}
		
		
		//failed
		if (input.toLowerCase().match(/(?=.*\bfailed\b)/)){
			
			matchfound = 1;
			let bid= spBotDataMap["failed"];
			document.getElementById(bid).click();
		}
		
		
/*		//n/a
		if (((input.toLowerCase().match(/(?=.*\bnot\b)/))&&(input.toLowerCase().match(/(?=.*\bapplicable\b)/)))
				||(input.toLowerCase().match(/(?=.*n\a)/))){

			matchfound = 1;
			let bid= spBotDataMap["n/a"];
			document.getElementById(bid).click();
		}*/
		
		//not completed
		if ((input.toLowerCase().match(/(?=.*\bnot\b)/))&&(input.toLowerCase().match(/(?=.*\bcompleted\b)/))){

			matchfound = 1;
			let bid= spBotDataMap["not completed"];
			document.getElementById(bid).click();
		}
		
		//no run
		if (((input.toLowerCase().match(/(?=.*\bno\b)/))&&(input.toLowerCase().match(/(?=.*\brun\b)/)))
			||((input.toLowerCase().match(/(?=.*\bnot\b)/))&&(input.toLowerCase().match(/(?=.*\bexecuted\b)/)))){

			matchfound = 1;
			let bid= spBotDataMap["no run"];
			document.getElementById(bid).click();
		}
		
		//blocked
		if (input.toLowerCase().match(/(?=.*\bblocked\b)/)){

			matchfound = 1;
			let bid= spBotDataMap["blocked"];
			document.getElementById(bid).click();
		}
		
		
		//Generate Suite
		if ((input.toLowerCase().match(/(?=.*\btestpack\b)/))||(input.toLowerCase().match(/(?=.*\bgenerate suite\b)/))){

			matchfound = 1;
			
			data = 	'<p>Please enter the Suite Name</p>';
			data = data + '<p>Project : <input type="text" id="bsuitName" name="bsuitName" style="color: black;"/></p>';
			data = data + '<p><input type="button" id="bgsuitebutton" value="Generate Suite" class=" btn btn-info "  onclick="botGenerateSuite();"/></p>';
			
			populateAnsData(data);

		}
		
		
		
		if ((input.toLowerCase().match(/(?=.*\bproject\b)/))&&(input.toLowerCase().match(/(?=.*\blist\b)/))){
		
			matchfound = 1;
			
			let bprojectlist = {};
			  
			$.ajax({
		          type : "GET",
		          dataType: "json",
		          url : "/WebServices/getProjectList",
		          async: false,
		          success : function(data) {
		        	  bprojectlist = data;
		          }
		      });

			
			let upList = bprojectlist;
			data = "Projects are: <ul> "
			for(let i=0;i<upList.ProjectsList.length;i++){
				data = data + "<li>"+upList.ProjectsList[i].projectName+"</li>"
			}
			data= data +"</ul>";
			populateAnsData(data);
			
			

		}
		

		
		if ((input.toLowerCase().match(/(?=.*\bbubble\b)/))&&(input.toLowerCase().match(/(?=.*\bdata\b)/))
				&&(input.toLowerCase().match(/(?=.*\bconfiguration\b)/))){		

			matchfound = 1;
			let bid= spBotDataMap["bubble data configuration"];
			document.getElementById(bid).click();
		}
		
		//Zurich Demo start of queries
		
		if (((input.toLowerCase().match(/(?=.*panama)/)) && (input.toLowerCase().match(/(?=.*objective)/)))
				|| ((input.toLowerCase().match(/(?=.*what is objective of panama)/)))) {
	
			matchfound = 1;
			data = "<p>Implement new policy administration foundation leveraging a market leading solution to improve delivery speed and business productivity for US non-bureau lines</p>";
	
			populateAnsData(data);
	
		}
		
		if (((input.toLowerCase().match(/(?=.*panama)/)) && (input.toLowerCase().match(/(?=.*benefit)/)))
				|| ((input.toLowerCase().match(/(?=.*what are the benefits of implementing panama)/)))) {
	
			matchfound = 1;
			data = "<p>Benefits of implementing Panama: </p>";
			data = data + "<p>&nbsp;&nbsp;a. Decommission of Ultra Platform</p>";
			data = data + "<p>&nbsp;&nbsp;b. Increased UW and UA productivity</p>";
			data = data + "<p>&nbsp;&nbsp;&nbsp;&nbsp; i. Faster time to market for new products/changes leading to higher GWP and improved UW results </p>";
			data = data + "<p>&nbsp;&nbsp;&nbsp;&nbsp; ii. Ultra/Ultra Flex modernization cost avoidance</p>";
	
			populateAnsData(data);
	
		}
		
		if (((input.toLowerCase().match(/(?=.*url)/)) && (input.toLowerCase().match(/(?=.*rally)/)))
				|| ((input.toLowerCase().match(/(?=.*what is the url for rally)/)))) {
	
			matchfound = 1;
			data = "<p><a target='_blank'; href='http://www.zurichrally.com/'>www.zurichrally.com</a></p>";
	
			populateAnsData(data);
	
		}
		
		if (((input.toLowerCase().match(/(?=.*url)/)) && (input.toLowerCase().match(/(?=.*alm)/)))
				|| ((input.toLowerCase().match(/(?=.*what is the url for alm)/)))) {
	
			matchfound = 1;
			data = "<p><a target='_blank'; href='http://www.zurichalm.com/'>www.zurichalm.com</a></p>";
	
			populateAnsData(data);
	
		}
		
		if (((input.toLowerCase().match(/(?=.*sla)/)) && (input.toLowerCase().match(/(?=.*defects)/)))
				|| ((input.toLowerCase().match(/(?=.*what is the sla for severity 1 defects)/)))) {
	
			matchfound = 1;
			data = "<p>a. Acknowledgement in 1 hour from defect detection</p>";
			data = data + "<p>b. Resolution less than 8 hours from defect acknowledgement</p>";
	
			populateAnsData(data);
	
		}
		
		if (((input.toLowerCase().match(/(?=.*se iii)/)) && (input.toLowerCase().match(/(?=.*30290)/)))
				|| ((input.toLowerCase().match(/(?=.*what is the scope of case 30290 for se iii)/)))) {
	
			matchfound = 1;
			data = "<p>Scope includes validation Console , Traditional Classic. System default the opportunity flow  to 'Traditional Flow' when opportunity created via the below given scenarios when the</p>";
			data = data + "<p>&nbsp;&nbsp; *  Unsolicited-New opportunity product created via Canada C&R process</p>";
			data = data + "<p>&nbsp;&nbsp; *  Unsolicited-New opportunity product created via US C&R process</p>";
			data = data + "<p>&nbsp;&nbsp; *  Unsolicited-New opportunity product created via NB Matching job for Canada and US Submission</p>";
			data = data + "<p>&nbsp;&nbsp; *  Solicited -New opportunity product created via Opportunity Management - Manage Product</p>";
			data = data + "<p>&nbsp;&nbsp; *  Solicited New – opportunity product created via converting Pipeline Lead (Single or Multiple product conversion)</p>";
			data = data + "<p>&nbsp;&nbsp; *  Solicited New - opportunity product created from Submission Products</p>";
			data = data + "<p>&nbsp;&nbsp; *  Opportunity flow value (Traditional/complex) carried over to Replicated and Cloned opportunity products</p>";
			data = data + "<p>&nbsp;&nbsp; *  System display the below Information section with all applicable fields for Complex Flow and hide for Traditional flow</p>";
			data = data + "<p>&nbsp;&nbsp;&nbsp;&nbsp; *  Complex Section</p>";
			data = data + "<p>&nbsp;&nbsp;&nbsp;&nbsp; *  Show Financials/Hide Financials Link is enabled</p>";
			data = data + "<p>&nbsp;&nbsp; *  User can switch from Complex to Traditional and vice versa and the last saved flow information is preserved</p>";
			
	
			populateAnsData(data);
	
		}
		
		if (((input.toLowerCase().match(/(?=.*decile ws 1a august release)/)))
				|| ((input.toLowerCase().match(/(?=.*how many defects were found during the decile ws 1a august release)/)))) {
	
			matchfound = 1;
			data = "<p>25</p>";
	
			populateAnsData(data);
	
		}
		
		if (((input.toLowerCase().match(/(?=.*url)/)) && (input.toLowerCase().match(/(?=.*uwd)/)))
				|| ((input.toLowerCase().match(/(?=.*what is the url for uwd for sit1 environment)/)))) {
	
			matchfound = 1;
			data = "<p><a target='_blank'; href='https://zurich--sit1.cs14.my.salesforce.com/home/home.jsp' >https://zurich--sit1.cs14.my.salesforce.com/home/home.jsp</p>";
	
			populateAnsData(data);
	
		}
		
		
		/////// allianz
		
		
		/// Insurance Calculator
		if (((input.toLowerCase().match(/(?=.*calculator)/)) && (input.toLowerCase().match(/(?=.*premium)/))&& (input.toLowerCase().match(/(?=.*suggested)/))&& (input.toLowerCase().match(/(?=.*coverage)/)))
				|| ((input.toLowerCase().match(/(?=.*does the calculator show any premium for the suggested coverage)/)))) {
	
			matchfound = 1;
			data = "<p>No. The calculator provides only the suggests the insurance coverage. For premium please use the quoting tool.</p>";
	
			populateAnsData(data);
	
		}
		
		if (((input.toLowerCase().match(/(?=.*calculator)/)) && (input.toLowerCase().match(/(?=.*details)/))&& (input.toLowerCase().match(/(?=.*type)/))&& (input.toLowerCase().match(/(?=.*policy)/))&& (input.toLowerCase().match(/(?=.*purchased)/)))
				|| ((input.toLowerCase().match(/(?=.*does the calculator provide details on type of policy to be purchased)/)))) {
	
			matchfound = 1;
			data = "<p>No. The calculator suggests the coverage needed. The type of policy is user discretion. Having said that, AZL agents can help you make that decision.</p>";
	
			populateAnsData(data);
	
		}
		
		///FIUL
		
		if (((input.toLowerCase().match(/(?=.*features)/)) && (input.toLowerCase().match(/(?=.*fiul)/)))
				|| ((input.toLowerCase().match(/(?=.*what are important features of fiul)/)))) {
	
			matchfound = 1;
			data = "<p>FIUL's objective is to protect your family and provide income for future.</p>";
	
			populateAnsData(data);
	
		}
		
		if (((input.toLowerCase().match(/(?=.*indexed)/)) && (input.toLowerCase().match(/(?=.*interest)/)) && (input.toLowerCase().match(/(?=.*computed)/)))
				|| ((input.toLowerCase().match(/(?=.*how is indexed interest computed)/)))) {
	
			matchfound = 1;
			data = "<p>Based on the choice you made, it can be - Annual point-to-point, Annual Sum, Trigger Method,  Monthly Average or Monthly Sum.</p>";
	
			populateAnsData(data);
	
		}
		
		///Rates Compare
		if (((input.toLowerCase().match(/(?=.*benefits)/)) && (input.toLowerCase().match(/(?=.*periodic)/)) && (input.toLowerCase().match(/(?=.*rate)/)) && (input.toLowerCase().match(/(?=.*comparison)/)))
				|| ((input.toLowerCase().match(/(?=.*what are the benefits of periodic rates comparison)/)))) {
	
			matchfound = 1;
			data = "<p>This will ensure that rates hosted on your site are accurate and ensures a faster issuance of policies originating from you.</p>";
	
			populateAnsData(data);
	
		}
		
		if (((input.toLowerCase().match(/(?=.*mismatches)/)) && (input.toLowerCase().match(/(?=.*do)/)))
				|| ((input.toLowerCase().match(/(?=.*what should i do if there are mismatches)/)))) {
	
			matchfound = 1;
			data = "<p>Please reach out to our Actuaries department to go over the mismatches in detail.</p>";
	
			populateAnsData(data);
	
		}
		
		
		//////allianz
		
		
		
		//Zurich Demo end of queries
	
		
		// start of querries
		if (((input.toLowerCase().match(/(?=.*\btest\b)/))&&(input.toLowerCase().match(/(?=.*\bdesign\b)/))&&(input.toLowerCase().match(/(?=.*\btechniques\b)/)))
		||(input.toLowerCase().match(/(?=.*\bdcot\b)/))
		||(input.toLowerCase().match(/(?=.*\bdtt\b)/))
		||(input.toLowerCase().match(/(?=.*\bWhat is DCoT suitable for\b)/))
		||(input.toLowerCase().match(/(?=.*\bWhat is the required test basis for DTT\b)/))
		||(input.toLowerCase().match(/(?=.*\bFor ECT, what are different suitability checks required for test basis\b)/))){	

				matchfound = 1;
				data = "<p><b>TMAP Test Design techniques</b> The data combination test is a versatile technique for the testing of functionality both at detail level and at overall system level.</p>"
				data = data +"<p><i>For More info :</i> <a target='_blank'; href='data/test design techniques.doc' style='color:blue;'>Test Design techniques</a></p>";

			populateAnsData(data);

		}
		
		if ((input.toLowerCase().match(/(?=.*shift)/))&&(input.toLowerCase().match(/(?=.*left)/))) {
				matchfound = 1;
				data = "<p>The term <b>Shift Left</b> refers to a practice in software development where teams focus on quality, work on prevention instead of detection, and begin testing earlier than ever before.</p>"
				data = data +"<p><i>For More info :</i> <a target='_blank'; href='https://www.ibm.com/developerworks/community/blogs/rqtm/entry/what_is_shift_left_testing?lang=en' style='color:blue;'> https://www.ibm.com/developerworks/community/blogs/rqtm/entry/what_is_shift_left_testing?lang=en</a></p>";

			populateAnsData(data);

		}
		
		if (((input.toLowerCase().match(/(?=.*smartqa)/))&&((input.toLowerCase().match(/(?=.*define)/))||(input.toLowerCase().match(/(?=.*what)/))||(input.toLowerCase().match(/(?=.*tell)/))))||((input.toLowerCase().match(/(?=.*smart qa)/))&&((input.toLowerCase().match(/(?=.*define)/))||(input.toLowerCase().match(/(?=.*what)/))||(input.toLowerCase().match(/(?=.*tell)/))))) {

				matchfound = 1;
				data = "<p><b>Capgemini's Smart QA</b> is an end-to-end ecosystem that explores, evolves and make decisions based on cognitive and analytics capability from your own testing system.</p>"
				data = data +"<p><i>For More info :</i> <a target='_blank'; href='https://www.capgemini.com/testing-services/capgeminis-smart-qa-for-financial-services' style='color:blue;'>https://www.capgemini.com/testing-services/capgeminis-smart-qa-for-financial-services</a></p>";

			populateAnsData(data);

		}
		
		if ((input.toLowerCase().match(/(?=.*itap)/))&&((input.toLowerCase().match(/(?=.*define)/))||(input.toLowerCase().match(/(?=.*what)/))||(input.toLowerCase().match(/(?=.*tell)/)))) {

				matchfound = 1;
				data = "<p><b>Intelligent Test Automation Platform</b> for Financial Services reduce costs and time to market by harnessing simple and smart integration principles to rapidly automate test scenarios and middleware services across the testing lifecycle.</p>"
				data = data +"<p><i>For More info :</i> <a target='_blank'; href='https://www.capgemini.com/testing-services/intelligent-test-automation-platform-for-financial-services' style='color:blue;'>https://www.capgemini.com/testing-services/intelligent-test-automation-platform-for-financial-services</a></p>";

			populateAnsData(data);

		}
		
		
		

		// Questions added 17th May

			if (((input.toLowerCase().match(/(?=.*defect)/)) && (input.toLowerCase().match(/(?=.*leakage)/)))
					|| ((input.toLowerCase().match(/(?=.*what is defect leakage)/)))) {
		
				matchfound = 1;
				data = "<p>6%</p>";
		
				populateAnsData(data);
		
			}
			
			if (((input.toLowerCase().match(/(?=.*time)/)) && (input.toLowerCase().match(/(?=.*execute)/)) && ((input.toLowerCase().match(/(?=.*test case)/)) ||(input.toLowerCase().match(/(?=.*testcase)/))))
					|| ((input.toLowerCase().match(/(?=.*how much time will be required to execute testcases)/)))) {
		
				matchfound = 1;
				data = "<p>43 Minutes</p>";
		
				populateAnsData(data);
		
			}
			if ((((input.toLowerCase().match(/(?=.*env)/)) ||(input.toLowerCase().match(/(?=.*environment)/)))&&(input.toLowerCase().match(/(?=.*status)/)) && (input.toLowerCase().match(/(?=.*dc701)/)))
					|| ((input.toLowerCase().match(/(?=.*what is the env status for DC701)/)))) {
		
				matchfound = 1;
				data = "<p>Booked by prasad Watve till 5th June</p>";
		
				populateAnsData(data);
		
			}

		// End
		
		
		if ((input.toLowerCase().match(/(?=.*insurance)/))||(input.toLowerCase().match(/(?=.*auto insurance)/))
				||(input.toLowerCase().match(/(?=.*life and health insurance)/))||(input.toLowerCase().match(/(?=.*rescission)/))) {

				matchfound = 1;
				data = "<p><b>Insurance</b> is a way of reducing your potential financial loss or hardship. It can help cover the cost of unexpected events such as theft, illness or property damage. Insurance can also provide your loved ones with a financial payment upon your death.</p>"
				data = data +"<p><i>For More info :</i> <p><a target='_blank'; href='data/Insurance Basics.pdf' style='color:blue;'>Insurance Basics</a></p> <p><a target='_blank'; href='data/FundamentalsRiskInsurance.pdf' style='color:blue;'>Fundamentals of Risk & Insurance</a></p> <p><a target='_blank'; href='data/Insurance Fundamentals.pdf' style='color:blue;'>Insurance Fundamentals</a></p></p>";

			populateAnsData(data);

		}
		
		
		let keywords =["DCB claim","What does the DCB claim number represent and/or what purpose does it serve"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>DCB stands for Domestic Claim Batch number. The DCB number is automatically assigned by the system for new claims with a status of Open. This feature is used by Shared Services to locate the claim number. </p>";
				data = data + "<p>The eCSO Policy/Claim Search screens will display claim numbers prior to OneClaim and after OneClaim in a single list.</p>";
				data = data + "<p>The claim numbers for OneClaim (displayed in eCSO) will be the hidden DCB number rather than the actual OneClaim number. And, the hidden DCB number will not allow the user to load it to the status bar for searching, Activity Notes, Financials, etc. In eCSO the DCB number can be identified for the OneClaim – US (Property & Energy) claims as they will begin with 501-509. 509 indicates a Canadian claim and the others are for the US. </p>";
				data = data + "<p>Copy the DCB number obtained from eCSO, and navigate to OneClaim Claim Search page. Change the Search Criteria for Source to DCB in OneClaim. Enter the DCB number and complete the Search. The OneClaim claim number displays.</p>";
			populateAnsData(data);

		}
		
		
		let keywords =["locks a claim","claim remained locked","If a user locks a claim and logs out of OC for the day, how long does the claim remained locked"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>The claim will automatically refresh over night and the lock will be unlocked</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["OSP field","From Claim Search what is the OSP field"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>OSP stands for Outside Service Provider. This information is entered when the claim is initially created. Adjusters may also update the OSP field. Usually, the business determines how that field will be used. (i.e., another carrier's claim number, docket number, etc.).</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["letter swept under in iView","correspondence","If a letter is created from Correspondence Generation, what document type and sub-folder is the letter swept under in iView"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Correspondence/Claim Documents. The doc description field will indicate the letter template used. (e.g. Ack Letter)</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["coverage evaluation","Will an adjuster be able to close a claim file without completing Coverage Evaluation"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>The system does not keep an adjuster from closing the claim if the Coverage Evaluation is not completed. Completing the Coverage Evaluation is a Best Practice and the Quality Assurance Group (QAG) will review that information.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["character limit","notes field","What is the character limit with the notes field"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Unlimited.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["reserves in oneclaim","oneclaim","When an adjuster updates Reserves in OneClaim, does OneClaim automatically create a note to the claim file"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>No, the adjuster is responsible for creating a note indicating why there was a reserve change. However, this information is available in the Transaction History view.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["ok to pay","Ok to Pay", "Will an adjuster still need to create the note, “Ok to Pay” for Shared Services"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Yes. This process has not changed.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["payment/reserve","When a payment/reserve is placed on hold for approval, how is the item routed"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>If the payment/reserve is above adjuster’s autonomy limit, the item is routed to the adjuster’s approver’s worklist in OneClaim. The approver is established on the Approval Hierarchy Manager section within User Maintenance.</p>";
				
			populateAnsData(data);

		}
		
		
		
		let keywords =["What happens if a user selects Yes or No for the question, “Is the Incident related to a catastrophic event"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>The user will only respond to the question when applicable. A Cat Code will be entered in OneClaim within 24 hours of the date of the event. The user can always update the answer from Yes to No or No to Yes. The user cannot go back and make a non selection or No selection if not originally selected.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["global recover services","Subrogation/Recovery","GRS AIR","Can a claim be referred to Subrogation/Recovery? Global Recover Services (GRS AIR) Referral work"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Yes. To refer a claim to subrogation/recovery, click the GRS AIR link and it will open GRS for you.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["VARS","Will P&E use VARS function the same"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Yes. To create a VARS assignment, click the VARS link and it will open VARS for you. </p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["WIRED","Will P&E continue to use WIRED for their case referrals"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Yes. To create a case referral, click the WIRED link and it will open WIRED for you.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["OC reflect","legal matter","When a legal matter is created in LSI, will OC reflect the matter number in the status bar"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>There are no matter numbers in OneClaim. The future enhancement plan is to have the Legal Matter ID# under the Features tab on the Access Claim page. Another future enhancement is to send a work item to the Shared Services Legal Payment Support workbasket indicating the Legal Matter has been closed and final payment can be processed. The workbasket item will contain the Legal Matter ID #.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["case load","How can an adjuster see their entire case load"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Select Menu, Home, and then My Features. The adjuster’s case load displays for claims with a status of Open, New, or Pending.</p>";
				
			populateAnsData(data);

		}
		
		let keywords =["category header","If the worklist has several pages and a user sorts by Category header, does it sort the same way on all pages"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Yes. For example, if a user sorts by claim number, they would be able to select another page and the records would display in claim order. If a user selects a category, it will only show that category on all pages.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["draft status","How long does a note stay in Draft status"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>The Draft note is saved for 48 hours and then OneClaim saves it as Final to the claim file.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =[" property and energy lob","Will Property and Energy LOB use the Notifications Option"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>No.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["notifications option","What is the business function of the Notifications Option"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Team Leaders & Managers can search for System Notifications and work items created by adjusters. They can filter by date and process the items from the filtered search.</p>";
				
			populateAnsData(data);

		}
		
		let keywords =["us personnel","Which ID does OneClaim - US personnel use to access OneClaim"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>The AIG Enterprise ID (Employee ID) and LAN Password.</p>";
				
			populateAnsData(data);

		}
		
		let keywords =["partial payment","What causes a Partial Payment to be in Suspended Status"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>When a user uses the Save button on the Payments page, the payment is assigned a status of Suspended. A suspended claim can be accessed through Transaction History by searching for all. When the item is selected, it will open the payment which can then be processed or deleted.</p>";
				
			populateAnsData(data);

		}
		
		let keywords =["referred to siu","If a claim has been referred to SIU, can an adjuster make an Indemnity payment"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>No. Indemnity payments cannot be made when a claim has been referred to SIU. An adjuster can only issue legal and adjusting payments.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["security is built","What security is built into OneClaim to prevent someone from issuing a payment to themselves"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Anytime a Payee Name and Address are entered as a Standalone Contact (meaning they are not were not located in the Search results) for the payment method or Manual Cheque Draft, the payment is placed on Hold for Manager Approval.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["wire transfer","Will P&E use Wire Transfer and is this the same as Manual Bank Transfer"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Yes. There should be an ACH option for wire transfer (direct deposit) to a specific bank account in production. Adjusters can request claimants be added for direct deposit.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["remote access transaction","What is the Remote Access Transaction checkbox on the Payment page used for"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>It will indicate the payment should be overnight.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["memo phrase","Does the Memo Phrase print on the face of the check"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Yes.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["multiple parties in oneclaim","Can an adjuster process a payment to multiple parties in OneClaim such as the Insured and the Independent Adjuster"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Yes. There are four fields on the Payment page to accommodate this situation.</p>";
				
			populateAnsData(data);

		}
		
		
		
		let keywords =["active or inactive","When searching for a Provider, will OneClaim indicate if the vendor is Active or Inactive"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Yes. The adjuster can search for provider under Create Payments by selecting Search Contact and then selecting Provider. A grid will display similar to what is in eCSO.</p>";
				
			populateAnsData(data);

		}
		
		
		
		let keywords =["ecso","When issuing a Final Payment, will this close the claim file like it does in eCSO"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Depends. If there are no other reserves open, then the claim will close. Otherwise, the adjuster must Mark Off any remaining open reserves.</p>";
				
			populateAnsData(data);

		}
		
		
		
		let keywords =["resolution plan","Will P&E use Resolution Plan"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>No. P&E will not use this option.</p>";
				
			populateAnsData(data);

		}
		
		
		
		let keywords =["transaction history","Where will the check number display in Transaction History"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Both Check Number and ACH Reference Number should be shown in the Bank Ref No. column. Click on the + icon to expand the list.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["void payment","Will adjusters still have the option to Void Payments"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Yes.</p>";
				
			populateAnsData(data);

		}
		
		
		
		let keywords =["complaint checkbox","What purpose does the Complaint checkbox serve"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>P&E will not use this option.</p>";
				
			populateAnsData(data);

		}
		
		
		
		let keywords =["bordereaux","If the claim is a true bordereaux, can the adjuster update the claim and select bordereaux"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Users can use the indicator; however, this is simply a flag only. There is no further rule tied to the indicator.</p>";
				
			populateAnsData(data);

		}
		
		
		
		
		let keywords =["indicator for a manager","What is the purpose of the Yes/No indicator for a manager in User Maintenance"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>The purpose of the indicator is to escalate SLAs to the manager. For example: if an adjuster is assigned a claim and the SLA is three business days, if no action is taken on that claim within 3 days, it will be escalated to the adjuster’s manager. Managers of non-adjusters or staff who do not handle claims can set the indicator to No.</p>";
				
			populateAnsData(data);

		}
		
		
		
		let keywords =["iso status","Why doesn’t an ISO Status display on the status bar for all of my claims"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>There are many reasons including:</p>";
				data = data + "<p>The Handling Office is not currently included in the ISO feed.</p>";
				data = data + "<p>The Handling Office was added to the feed, but the claim was abstracted prior to it being included.</p>";
				data = data + "<p><b>NOTE:	</b>When adding an existing Handling Office to DCB. Include a couple of years of prior data so the users can view ISO status results immediately.</p>";
				data = data + "<p>The claim is eliminated from the feed for issues including:</p>";
				data = data + "<p>Claim, Symbol, or Abstract status is M (Mistake) or N (Notice-Only)</p>";
				data = data + "<p>Branch Code is 347 (Parsippany, NJ Expense) or 704 (iClaim Expense Policy)</p>";
				data = data + "<p>Policy No is 999999999</p>";
				data = data + "<p>ISSCO is 100 (American Int Adj Co Delaware).</p>";
			populateAnsData(data);

		}
		
		
		
		let keywords =["pie status","ire status","For what reasons might a claim to error out (PIE or IRE status)?"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Reasons include:</p>";
				data = data +  "<p>A Policy, Module and/or ASCO are not numeric.</p>";
				data = data + "<p>Policy Type Code, or Loss State or Insured Address (Address, City, State, Zip Code) are spaces or low values.</p>";
				data = data + "<p>Loss Date is not numeric or out of range.</p>";
				data = data + "<p>Claimant Name or Claimant Address (Address, City, State, Zip Code) are spaces or low values.</p>";
				data = data + "<p>Coverage Type Code or Loss Type Code is spaces or low values.</p>";
				data = data + "<p>If any of below words/chars are present in Insured / Claimant First Name, Last Name, Address, City, State, Zip Code:  ? , -, _,. , N/A, UKN, NA, UK, UNKN, UNK, NONE, SAME, UNKNOWN, NOT KNWN, NOT   KNOWN, NOT-KNOWN.</p>";
				data = data + "<p>If the MJC belongs to: 014, 114, 214, 314, 514, 714, 815, 837, 838, 840, 863, 887, 915, 937, 938, 940, 963, or 987 and the Property Description field are spaces or low-values.</p>";
				data = data + "<p>If the MJC belongs to 007, 008, 009, 802, 803, 804, 902, 903, 904 and the Vehicle/Model/Year field equals zero or the Auto/Vehicle/Make field or the Auto/VIN number field equals spaces or low values.</p>";
				
			populateAnsData(data);

		}
		
		
		
		let keywords =["rwm","rnm","return with match","return no match","Why don’t I get a RWM (Return With Match) or RNM (Return No Match) ISO status immediately upon abstraction"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>There is no ISO processing on Saturdays and Sundays. There is no delay in the daily processing of the ISO return files.  There is this not any Match/Error file found in the server before the DCB ISO job starts processing.  As a result, the job runs with empty input files for that day. During the next day’s run the DCB ISO job picks and processes two sets of Match/Error files together introducing a day’s delay in the processing of the previous day’s files. If this situation occurs during a Friday night cycle, then the processing of Friday’s files are delayed 3 days.</p>";
				
			populateAnsData(data);

		}
		
		
		
		
		let keywords =["iso status hanging","Why is my claim’s ISO status hanging in YES for more than 3 days"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Reason included:</p>";
				data = data + "<p>After creating the claim, the user entered the claim information directly into the ISO URL and, as a result, this caused an over ride of the DCB to ISO feed information being used.</p>";
				data = data + "<p>A system issue prevented the updated ISO information from making its way back to DCB.  Report this issue to ISG if this happened so that it may be addressed.</p>";
			populateAnsData(data);

		}
		
		
		
		
		let keywords =["match summary populate ","Why don’t all of the fields in the ISO Indexing/Inquiry Match Summary populate with information"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>The time frame and matching criteria differ between ISO Indexing and Inquiry Match Summary. Reasons include:</p>";
				data = data + "<p>Is based on all data in DCB for the entire time we’ve been electronically sending information to ISO (9+ years).</p>";
				data = data + "<p>Determines matches based on all require data including:</p>";
				data = data + "<p>Policy Type </p>";
				data = data + "<p>Date of Loss </p>";
				data = data + "<p>Location of Loss State</p>";
				data = data + "<p>Insured Name & Address</p>";
				data = data + "<p>Claimant Name & Address</p>";
				data = data + "<p>Coverage Type</p>";
				data = data + "<p>Loss Type</p>";
			populateAnsData(data);

		}
		
		
		
		
		let keywords =["any years of claim history","How many years of claim history are in ISO"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>ISO Claim Search contains a five year history – except for WC and VIN which are not limited to the last 5 years. Users can do individual searches on each of the following criteria to determine matches: </p>";
				data = data + "<p>Similar Name with a similar DOB</p>";
				data = data + "<p>SSN</p>";
				data = data + "<p>Driver’s License</p>";
				data = data + "<p>License Plate</p>";
				data = data + "<p>Phone Numbers</p>";
				data = data + "<p>VIN </p>";
			populateAnsData(data);

		}
		
		
		
		
		let keywords =["construction defect checkbox","When do I use the Construction Defect checkbox"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Use the Construction Defect checkbox when setting up a Construction Defect claim.  Once the Case Setup process is completed the claim will automatically transfer to the Construction Defect Unit.</p>";
				
			populateAnsData(data);

		}
		
		
		
		
		
		let keywords =["claims professional","How do I indicate that one of the Claims Professionals will be out of the office for several weeks"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Go to the User Maintenance page. Edit the Claims Professional’s profile to indicate the Absence Begin date and the Absence end date.  This will make the Claims Professional unavailable to receive claims while they are out of the office.</p>";
				
			populateAnsData(data);

		}
		
		
		
		
		let keywords =["client information","What is the Client Information page"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>The Client Handling Office page distributes dedicated/ designated accounts to various handling offices. The information entered on the Client Handling Office page is used to determine if a claim is associated with a dedicated or designated account.</p>";
				
			populateAnsData(data);

		}
		
		
		
		
		let keywords =["assignment page","What is the Dedicated/Designated Assignment page"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>The Dedicated/Designated Assignment page documents assignment to a Claims Professional. </p>";
				
			populateAnsData(data);

		}
		
		
		
		
		let keywords =["dedicated account","What is a Dedicated Account"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>A Dedicated Account is an account assigned to an adjusting team that only handle that one account (JC Penney, Wauwau, etc.).</p>";
				
			populateAnsData(data);

		}
		
		let keywords =["designated account","What is a Designated Account"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>A Designated Account is an account assigned to an adjusting team that handles this account and other accounts as well (Waste Management, Verizon, etc.).</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["workload","Can a Claims Professional’s Workload be changed"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>The Claims Professional’s workload may be changed on the User Maintenance page. See the User Maintenance Quick Reference Card for details.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["automated adjuster","Can I still transfer files now that Automated Adjuster Assignment has taken effect"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Files may be transferred using the File Transfer page.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["unit manager","Will a Unit Manager receive a diary prompt when a new symbol is created"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>A Unit Manager will receive a New Claim Diary prompt when a new symbol is created.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["workload limit","If a Dedicated/Designated has reached their workload limit do they still receive dedicated or designated claims"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>A Claims Professional who has dedicated or designated accounts will continue to receive claims even after they have reached their workload limit.</p>";
				
			populateAnsData(data);

		}
		
		
		let keywords =["accounts reaches their workload limit","If a Claims Professional who does not handle dedicated/designated accounts reaches their workload limit, do they still receive symbols"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>A Claims Professional who does not receive dedicated or designated accounts will not receive additional symbols.  The symbols will go to the next level of Claims Professional. For example if all Fast Track Claims Professionals reach their workload limit the claims would go to a Fast Track BI Claims Professional (exception would be a complex Claims Professional because there is no higher level of Claims Professional).</p>";
				
			populateAnsData(data);

		}
		
		let keywords =["reached their workload limit","How will a Unit Manager know when a Claims Professional has reached their workload limit"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>The Unit Manager will receive an Exceeds Workload Limit diary prompt instead of a New Claim diary prompt</p>";
				
			populateAnsData(data);

		}
		
		let keywords =["account is not a dedicated ","If an account is not a dedicated or designated account how does it get assigned"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>An account that is not a dedicated or designated account is assigned using the State Office, Model Symbol Load and the Coverage claim tables.</p>";
				
			populateAnsData(data);

		}
		
		let keywords =["client information page","When should I use the Client Information page"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Use the Client Information page when a dedicated or designated account is assigned to a Handling Office.</p>";
				
			populateAnsData(data);

		}
		
		let keywords =["designated assignment page","When should I use the Dedicated/Designated Assignment page"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>Use the Dedicated/Designated Assignment page when there is a change of Claims Professional for the dedicated/designated account.</p>";
				
			populateAnsData(data);

		}
		
		let keywords =["assigned as a dedicated","What happens if no one is assigned as a Dedicated/Designated Claims Professional when a claim is setup"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;
				data = "<p>An automatic Activity Note is created stating “No dedicated/designated Claims Professional exists for this department”.</p>";
				
			populateAnsData(data);

		}
		

		// end of querries
		
		
		//Discover Client
		
		if ((input.toLowerCase().match(/(?=.*\bright Credit Card\b)/))&&(input.toLowerCase().match(/(?=.*\bconsumers\b)/))){	

				matchfound = 1;
				data = "<p>You can refer the Discover website  <p><a target='_blank'; href='https://www.discover.com/' style='color:blue;'>https://www.discover.com/</a></p>";
				data = data + "<p>There are various Credit Card Products and each one having a distinct advantage.</p>";
				data = data + "<p>1.	Cash Back Credit Cards</p>";
				data = data + "<p>		a.	Discover it Card - Get cash rewards on every purchase, everyday . No Annual Fee, Earn 5% cash back in rotating categories each quarter like gas stations, restaurants, Amazon.com, wholesale clubs and more, up to the quarterly maximum each time you activate. Plus, unlimited 1% cash back on all other purchases. Only Discover automatically matches all the cash back you earn dollar for dollar at the end of your first year. Only for new cardmembers.</p>";
				data = data + "<p>		b.	NHL Discover it Card - Choose your favorite team from over 30 different card designs. Earn 5% cash back in rotating categories each quarter like gas stations, restaurants, Amazon.com, wholesale clubs and more, up to the quarterly maximum each time you activate.</p>";
				data = data + "<p>		c.	Discover it® Gas and Restaurant card - Get extra rewards when you fill up and eat out. 2% cash back at gas stations and restaurants on up to $1,000 in combined purchases each quarter, automatically.</p>";
				data = data + "<p>			1% cash back on all other purchases. Travel Cards </p>";
				data = data + "<p>2.	Travel Cards - Discover it® Miles - unlimited 1.5x rewards card</p>";
				data = data + "<p>		Automatically earn rewards on every purchase, every day, and then redeem how you like for cash or travel. Unlimited 1.5x Miles on every dollar of every purchase. Your rewards never expire. We'll match all the rewards you've earned at the end of your first year - automatically - with no limit.2 Only for new cardmembers. </p>";
				data = data + "<p>3.	Student Cards </p>";
				data = data + "<p>		a.	Discover it Chrome Card - Get the student card that automatically gives you extra cash rewards on gas and restaurant purchases all year long. 2% cash back at gas stations and restaurants up to $1,000 in combined purchases each quarter, automatically. </p>";
				data = data + "<p>			1% cash back on all other purchases.</p>";
				data = data + "<p>		b.	Discover it® card for students - Get the student card that pays cash rewards in purchase categories that change throughout the year.</p>";
				data = data + "<p>			Earn 5% cash back in rotating categories each quarter like gas stations, restaurants, Amazon.com, wholesale clubs and more, up to the quarterly maximum each time you activate.</p>";
				data = data + "<p>			5% Cashback Calendar. 1% cash back on all other purchases.</p>";
				data = data + "<p>4.	Discover it Secured Credit Card - Can help you build or rebuild credit with responsible use. No annual fee</p>";

			populateAnsData(data);

		}
	
		
		//BCM Quetions
		
		let keywords =["what is bitcoin"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p><b>Bitcoin</b> is a form of digital currency, created and held electronically. Encryption techniques are used to regulate the generation of units of currency and verify the transfer of funds, operating independently of a central bank.</p>';
				populateAnsData(data);

		}
		
		
		let keywords =["what is blockchain technology","blockchain technology"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p>A <b>blockchain</b> is a public ledger of all Bitcoin transactions that have ever been executed. It is constantly growing as "completed" blocks are added to it with a new set of recordings. The blocks are added to the blockchain in a linear, chronological order.</p>';
				populateAnsData(data);

		}
		
		
		let keywords =["what is a distributed ledger","distributed ledger"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p> A distributed ledger (also called shared ledger) is a consensus of replicated, shared, and synchronized digital data geographically spread across multiple sites, countries, or institutions... </p>';
				data = data +'<p>One distributed ledger design is through implementation of a public or private blockchain system.</p>';
				populateAnsData(data);

		}
		
		
		
		let keywords =["what is cloud mining","cloud mining"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p>Cloud Mining is the process of bitcoin mining utilizing a remote datacenter with shared processing power. This type of mining allows users to mine bitcoins or alternative cryptocurrencies without having to manage their own hardware.</p>';
				populateAnsData(data);

		}
		
		
		let keywords =["how will fis be impacted by blockchain technology","fis be impacted"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p> Rather than having a central authority (such as a bank), blockchain uses the network to approve "blocks," or transactions, which are then added to the "chain" of computer code. Cryptography is used to keep transactions secure, and the distributed nature of transaction approval makes the system harder to tamper with.</p>';
				data = data +'<p>The Blockchain technology is fundamentally different than other payment methods because it is distributed, peer to peer, censor-free, and backed by computing power rather than Bank vaults and safety deposit boxes. It routes around the traditional system by only operating on the internet, with no central point of failure. The digital token (i.e Bitcoin) that is awarded to the participants that donate computing power to the network is vital to the health of the network, without it there would be no incentive to keep the blockchain secure. One cannot simply have a Blockchain without a digital token, and expect to keep it secure. Without a digital token, immutability, or distributed computing power, all you’re left with is the world’s worst database.</p>';
				populateAnsData(data);

		}
		
		
		let keywords =["who is the creator of Bitcoin and Blockchain","creator of Bitcoin"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p>Satoshi Nakamoto in 2008 created this currency of bitcoins and Blockchain is the underlying technology supporting bitcoins.</p>';
				populateAnsData(data);

		}
		
		
		let keywords =["what are permissioned and unpermissioned blocks","permissioned and unpermissioned blocks"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p>Bitcoin is an unpermissioned blockchain. Anyone can submit a transaction and take part in validating the network. It’s open to all. This is precisely what has made bitcoin so ground-breaking: it allows the transfer of value to anyone, anywhere in the world that has an internet connection, outside of the control of banks or other payment processors. In ensuring that no one owns the network, you give it to everyone. That’s why the people who use bitcoin trust it. They know a transaction, once executed, is effectively irreversible.</p>';
				data = data +'<p>A permissioned blockchain, by contrast, allows only specified actors (banks, approved individuals, etc) to submit transactions or validate the network. There is a control layer built into it. It’s obvious why banks would want to go down this route. They need to comply with regulation, and using an unpermissioned blockchain would effectively make KYC impossible. It would also make it impossible to reverse transactions.</p>';
				populateAnsData(data);

		}
		
		
/*		let keywords =["does a private blockchain network have all the benefits of a public one","private blockchain network"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p></p>';
				data = data +'<p></p>';
				populateAnsData(data);

		}*/
		
		
		
	// end of BCM questions	
		

		
// Queries of prasad
		
		//let keywords =["hi minerva"];
		if ((input.toLowerCase().match(/(?=.*\bhi\b)/))&&(input.toLowerCase().match(/(?=.*\bminerva\b)/))){	
		//if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'Hello Ajay';
				populateAnsData(data);

		}
		
		
		let keywords =["what's the plan for the day","plan for the day"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p>We are running release 7.1 for Duck Creek</p>';
				data = data +'<p>You need to execute 17 testcases</p>';
				data = data + '<p>Your Environment is DC701</p>';
				populateAnsData(data);

		}
		
		
		let keywords =["ok, how many testcases are automated","testcases are automated"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p>10 out of 17 are automated</p>';
				data = data +'<p>7 are manual</p>';
				populateAnsData(data);

		}
		
		let keywords =["current status","current status of environment","what is the current status of the environment"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p>It is booked by Prasad for execution from 11 am to 2 pm </p>';
				populateAnsData(data);

		}
		
		let keywords =["create a train","ohh, can you create a train for 10 of the automated testcases"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p>Sure at what time</p>';
				populateAnsData(data);

		}
		
		
		let keywords =["lets plan 2:30 pm","2:30 pm"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p>Ok and what should be the train name</p>';
				data = data +'<p>shall we call it as AJDC701_11Jan</p>';
				populateAnsData(data);

		}
		
		let keywords =["sure"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p>Train creation in Progress</p>';
				populateAnsData(data);

		}
		
		let keywords =["how much time will be required for execution","required for execution"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p>Looking at past history 32 minutes will be required</p>';
				populateAnsData(data);

		}
		
		
		let keywords =["thanks minerva"];
		
		if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
				matchfound = 1;

				data = 	'<p>your train is scheduled for 2:30 PM with 10 automated testcases</p>';
				data = data +'<p>Expected end time is 3:02 PM </p>';
				populateAnsData(data);

		}
		
		
		// end of Queries of prasad
		

		
		// North Bridge Questions
		
		if ((input.toLowerCase().match(/(?=.*parent)/))&&(input.toLowerCase().match(/(?=.*holding)/))
				&&(input.toLowerCase().match(/(?=.*company)/))&&(input.toLowerCase().match(/(?=.*northbridge)/))
				&&(input.toLowerCase().match(/(?=.*financial)/))&&(input.toLowerCase().match(/(?=.*corporation)/))){	

				matchfound = 1;

				data = 	'<p>Fairfax Financial Holdings Limited</p>';
				populateAnsData(data);

		}
		if (((input.toLowerCase().match(/(?=.*constituent)/))&&(input.toLowerCase().match(/(?=.*companies)/)))
				&&((input.toLowerCase().match(/(?=.*nbfc)/))||((input.toLowerCase().match(/(?=.*northbridge)/))
						&&(input.toLowerCase().match(/(?=.*financial)/))&&(input.toLowerCase().match(/(?=.*corporation)/))))){	

				matchfound = 1;

				data = 	'<p>Northbridge Insurance, Fedrated Insurance and True Sheild Insurance</p>';
				populateAnsData(data);

		}
		
		if (((input.toLowerCase().match(/(?=.*major)/))&&(input.toLowerCase().match(/(?=.*charities)/))&&(input.toLowerCase().match(/(?=.*associated)/)))
				&&((input.toLowerCase().match(/(?=.*nbfc)/))||((input.toLowerCase().match(/(?=.*northbridge)/))
						&&(input.toLowerCase().match(/(?=.*financial)/))&&(input.toLowerCase().match(/(?=.*corporation)/))))){	

				matchfound = 1;

				data = 	'<p> DAREarts Foundation, Pathways to Education, Tree Canada, United Way of Canada, Sick Kids and Partners for Mental Health</p>';
				populateAnsData(data);

		}
		
		if ((input.toLowerCase().match(/(?=.*northbridge)/))&&(input.toLowerCase().match(/(?=.*social)/))
				&&(input.toLowerCase().match(/(?=.*responsibility)/))&&(input.toLowerCase().match(/(?=.*statement)/))){	

				matchfound = 1;
				data = 	'<p>"We believe that as a company, being successful also means supporting our people, our customers, and our communities."</p>';
				data = data +'<p>"We’re passionate about making a difference in our communities through our social responsibility program, Northbridge Cares."</p>';
				populateAnsData(data);

		}
		if ((input.toLowerCase().match(/(?=.*major)/))&&(input.toLowerCase().match(/(?=.*industry)/))
				&&(input.toLowerCase().match(/(?=.*sector)/))&&(input.toLowerCase().match(/(?=.*northbridge)/))
				&&(input.toLowerCase().match(/(?=.*business)/))&&(input.toLowerCase().match(/(?=.*insurance)/))
				&&(input.toLowerCase().match(/(?=.*caters)/))){	

				matchfound = 1;	
				data = 	'<p>Northbridge Insurance has specialised offerings in the following sctors for business insurance:</p>';
				data = data +'<p>Manufacturing and Resources</p>';
				data = data +'<p>Construction & Contracting</p>';
				data = data +'<p>Consumer & Business Services</p>';
				data = data +'<p>Transportation & Logistics</p>';
				data = data +'<p>Health, Education & Social Services</p>';
				populateAnsData(data);

		}
		
		
		if ((input.toLowerCase().match(/(?=.*northbridge)/))&&(input.toLowerCase().match(/(?=.*insurance)/))
				&&(input.toLowerCase().match(/(?=.*help)/))&&(input.toLowerCase().match(/(?=.*small)/))
				&&(input.toLowerCase().match(/(?=.*business)/))&&(input.toLowerCase().match(/(?=.*Canada)/))){	

				matchfound = 1;

				data = 	'<p>Northbridge Insurance recognies that small business owners put everything into their business.</p>';
				data = data +'<p>Therefore Northbridge offers a dedicated insurance package for small businesses that provides owners with the coverage they need to protect all the things they have worked so hard to build.</p>';
				populateAnsData(data);

		}
		
		if ((input.toLowerCase().match(/(?=.*transportation)/))&&(input.toLowerCase().match(/(?=.*logistics)/))
				&&(input.toLowerCase().match(/(?=.*sector)/))&&(input.toLowerCase().match(/(?=.*important)/))
				&&(input.toLowerCase().match(/(?=.*northbridge)/))&&(input.toLowerCase().match(/(?=.*insurance)/))){	

				matchfound = 1;
				data = 	"<p>Companies in the transportation and logistics industries represent 60% of Canda's trade with the US and contribute $17 billion to Canada's national gross domestic product (GDP). This sector thus plays a key role in the Canadian economy.</p>";
				data = data +"<p>Northbridge offers broad solutions to provide insurance coverage for this critical industry sector:</p>";
				data = data +"<p>Owned or leased tractor trailers</p>";
				data = data +"<p>Truck transportation operations</p>";
				data = data +"<p>Marine cargo</p>";
				data = data +"<p>Motor truck cargo</p>";
				data = data +"<p>Warehousing and storage facilities</p>";
				data = data +"<p>Transportation terminals</p>";
				data = data +"<p>Customer property in storage</p>";
				data = data +"<p>Specialized machinery and equipment</p>";
				populateAnsData(data);

		}
		
		if (((input.toLowerCase().match(/(?=.*northbridge)/))&&(input.toLowerCase().match(/(?=.*insurance)/))&&(input.toLowerCase().match(/(?=.*personal)/))&&(input.toLowerCase().match(/(?=.*insurance)/)))||(input.toLowerCase().match(/(?=.*What are Northbridge Insurance's major offering in Personal Insurance)/))){	
		
				matchfound = 1;				
				data = 	'<p>Home</p>';
				data = data +'<p>Auto</p>';
				data = data +'<p>Seasonal Properties</p>';
				data = data +'<p>Recreational Vehicles</p>';
				data = data +'<p>Personal Choice Package (Home / Auto insurance combined)</p>';
				populateAnsData(data);

		}
		
		
		//End of North Bridge questions 
		
		

		// Questions added 31st May

			if (((input.toLowerCase().match(/(?=.*policy)/)) && (input.toLowerCase().match(/(?=.*administration)/)))&& ((input.toLowerCase().match(/(?=.*auto)/)) && (input.toLowerCase().match(/(?=.*owners)/)))
					|| ((input.toLowerCase().match(/(?=.*what is the policy administration system used by auto owners)/)))) {
		
				matchfound = 1;
				data = "<p>Duck Creek</p>";
		
				populateAnsData(data);
		
			}
			
			if (((input.toLowerCase().match(/(?=.*auto)/)) && (input.toLowerCase().match(/(?=.*owners)/)))&& ((input.toLowerCase().match(/(?=.*headquarters)/)))
					|| ((input.toLowerCase().match(/(?=.*where is auto owners headquarters at)/)))) {
		
				matchfound = 1;
				data = "<p>Lansing MICHIGAN</p>";
		
				populateAnsData(data);
		
			}
			
			if (((input.toLowerCase().match(/(?=.*certify)/)) && (input.toLowerCase().match(/(?=.*deployment)/)))
					|| ((input.toLowerCase().match(/(?=.*what should we do to certify any deployment)/)))) {
		
				matchfound = 1;
				data = "<p>Run Smoke Test</p>";
		
				populateAnsData(data);
		
			}
			
			if (((input.toLowerCase().match(/(?=.*product)/)) && (input.toLowerCase().match(/(?=.*duck)/))
					&& (input.toLowerCase().match(/(?=.*creek)/))&& (input.toLowerCase().match(/(?=.*auto)/))&& (input.toLowerCase().match(/(?=.*owners)/)))
					|| ((input.toLowerCase().match(/(?=.*what product is being deployed into duck creek for auto owners)/)))) {
		
				matchfound = 1;
				data = "<p>Workers Compensation</p>";
		
				populateAnsData(data);
		
			}
			
			
			if (((input.toLowerCase().match(/(?=.*tool)/)) && (input.toLowerCase().match(/(?=.*smart)/))
					&& (input.toLowerCase().match(/(?=.*browser)/))&& (input.toLowerCase().match(/(?=.*compatibility)/))&& (input.toLowerCase().match(/(?=.*testing)/)))
					|| ((input.toLowerCase().match(/(?=.*what tool is used by smart qa to perform browser compatibility testing )/)))) {
		
				matchfound = 1;
				data = "<p>OPTIK</p>";
		
				populateAnsData(data);
		
			}
		// End of Questions added 31st May
		
		
		
		
		//Start of questions 
		
		
		if (((input.toLowerCase().match(/(?=.*ltq)/))&&(input.toLowerCase().match(/(?=.*environment)/)))||(input.toLowerCase().match(/(?=.*Is ltq environment up today)/))){	
			
			matchfound = 1;				
			data = 	'<p>Yes. The LTQ environment is up  today as per the daily check done at 8 AM EST. The environment has been up for the past 4 out of 5 days.</p>';
			populateAnsData(data);

		}
		
		
		if ((((input.toLowerCase().match(/(?=.*ods)/))&&(input.toLowerCase().match(/(?=.*application)/)))
				||((input.toLowerCase().match(/(?=.*compas)/))&&(input.toLowerCase().match(/(?=.*release 2)/))))
				||(input.toLowerCase().match(/(?=.*how many high or critical defects are open in ods application for compas release 2)/))){	
			
			matchfound = 1;				
			data = 	'<p>There are 3 High and 1 Open critical defects in ODS application for ComPAS Release 2</p>';
			populateAnsData(data);

		}
		

		if ((((input.toLowerCase().match(/(?=.*smoke)/))&&(input.toLowerCase().match(/(?=.*test)/)))
				||((input.toLowerCase().match(/(?=.*compas)/))&&(input.toLowerCase().match(/(?=.*lti)/))&&(input.toLowerCase().match(/(?=.*environment)/))))
				||(input.toLowerCase().match(/(?=.*run the smoke test suite in compas lti environment)/))){	
			
			matchfound = 1;				
			data = 	'<p>Absolutely. Running smoke test.... Smoke Test Passed... </p>';
			populateAnsData(data);

		}
		
		
		if (((input.toLowerCase().match(/(?=.*edr)/))
				||(input.toLowerCase().match(/(?=.*sit 1)/)))
				||(input.toLowerCase().match(/(?=.*what is cycle 1 edr in compas Release 2 sit 1 testing)/))){	
			
			matchfound = 1;				
			data = 	'<p>The Error Discovery Rate of Release 2 SIT 1 is 12%, which is under the desired threshold of 15%. The Error Discovery Rate for Prime defects is 9%, which is above the desired threshold of 7% </p>';
			populateAnsData(data);

		}
		
		if ((((input.toLowerCase().match(/(?=.*code)/))&&(input.toLowerCase().match(/(?=.*coverage)/)))
				||((input.toLowerCase().match(/(?=.*guidewire)/))&&(input.toLowerCase().match(/(?=.*application)/))))
				||(input.toLowerCase().match(/(?=.*how many high and critical bugs were identified during Code Coverage check during the last deployment of guidewire application)/))){	
			
			matchfound = 1;				
			data = 	'<p>As per the CORE tool report, there were 3 high bugs identified and corrected before the last implementation on Tuesday at 2 PM.</p>';
			populateAnsData(data);

		}
		
		if ((((input.toLowerCase().match(/(?=.*standup)/)))
				||((input.toLowerCase().match(/(?=.*oracle)/))&&(input.toLowerCase().match(/(?=.*environment)/))))
				||(input.toLowerCase().match(/(?=.*how much does it take to standup an oracle environment)/))){	
			
			matchfound = 1;				
			data = 	'<p>The ETA to standup an Oracle environment with size less than 50GB is approximately 2 weeks and the cost will be approximately $5000. The Point of Contacts are Adam Aanvi and Sharon Powers.</p>';
			populateAnsData(data);

		}
		
		if ((((input.toLowerCase().match(/(?=.*soap)/))&&(input.toLowerCase().match(/(?=.*ui)/))&&(input.toLowerCase().match(/(?=.*automation)/))))
				||(input.toLowerCase().match(/(?=.*provide a list of projects that uses soap ui automation)/))){	
			
			matchfound = 1;				
			data = 	'<p>List of projects that uses soap UI are, ComPAS Release 2, Red Eagle and Spectrum.</p>';
			populateAnsData(data);

		}
		
		
		
		
		//End of questions 
		
		
///////// End of all the questionarie 

		
		if ((input.toLowerCase().match(/(?=.*status)/))&&(input.toLowerCase().match(/(?=.*application)/))){	

				matchfound = 1;
				
				let bapplist = {};
				$("#chatajaxloader").show();
				$.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "/WebServices/getListOfApplications",
			          async: false,
			          success : function(data) {
			        	  bapplist = data;
			          }
			      });

				
				let upList = bapplist;
				
				if((upList.applications)!=undefined){
					
					data = 	'<p><b>Status of Application: </b></p>';
					
					data = 	data + '<p>Please select the Application Name:</p>';
					
					data = data + "<p>Application Name: <select class='select bappname' id='bappname'  style='color: black;'>";
					for(let i=0;i<upList.applications.length;i++){
						data = data + "<option value='"+upList.applications[i].applicationName+"'>"+upList.applications[i].applicationName+"</option>";
					}
					data = data + "</select></p>";
					
					
					data = data + '<p><input type="button" id="bchkstatsbutton" value="Check Status" class=" btn btn-info "  onclick="botchkstats();"/></p>';
					
				}else{
					
					data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Applications</p>";
				}
				
				
				$("#chatajaxloader").hide();
			populateAnsData(data);

		}
				
		if((input.toLowerCase().match(/(?=.*train)/))&&((input.toLowerCase().match(/(?=.*build)/))||(input.toLowerCase().match(/(?=.*execute)/)))){
			matchfound = 1;
				
			let bprojectlist = {};
				$("#chatajaxloader").show();  
				$.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "/WebServices/getProjectList",
			          async: false,
			          success : function(data) {
			        	  bprojectlist = data;
			          }
			      });

				
				let upList = bprojectlist;
				
			if((upList.ProjectsList)!=undefined){
				
				data = 	'<p><b>Build a Train: </b></p>';
				
				data = data + '<p>Please select the Project Name:</p>';
				
				data = data + '<p>Project Name: <select class="select bprojlist" id="bprojlist" style="color: black;">';
				for(let i=0;i<upList.ProjectsList.length;i++){
					data = data + "<option value='"+upList.ProjectsList[i].projectName+"'>"+upList.ProjectsList[i].projectName+"</option>";
				}
				data = data + '</select></p>';
				
				
				data = data + '<p><input type="button" id="bgettrainlist" value="Select" class=" btn btn-info "  onclick="getTrainList();"/></p>';
				
			}else{
				
				data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Projects</p>";
			}


			$("#chatajaxloader").hide();
				populateAnsData(data);
			
		}
		
		
		if((input.toLowerCase().match(/(?=.*train)/))&&(input.toLowerCase().match(/(?=.*schedule)/))){

				matchfound = 1;
				
				let bprojectlist = {};
				$("#chatajaxloader").show();  
				$.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "/WebServices/getProjectList",
			          async: false,
			          success : function(data) {
			        	  bprojectlist = data;
			          }
			      });

				
				let upList = bprojectlist;
				
				if((upList.ProjectsList)!=undefined){
					
					data = 	'<p><b>Schedule a Train: </b></p>';
					
					data = 	data + '<p>Please select the Project Name:</p>';
					
					data = data + "<p>Project Name: <select class='select bprojlist1' id='bprojlist1'  style='color: black;'>";
					for(let i=0;i<upList.ProjectsList.length;i++){
						data = data + "<option value='"+upList.ProjectsList[i].projectName+"'>"+upList.ProjectsList[i].projectName+"</option>";
					}
					data = data + "</select></p>";
					
					
					data = data + '<p><input type="button" id="bgettrainlist1" value="Select" class=" btn btn-info "  onclick="getTrainList1();"/></p>';
					
				}else{
					
					data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Projects</p>";
				}

				
				$("#chatajaxloader").hide();
				populateAnsData(data);
				

		}
		
		
		
		if((input.toLowerCase().match(/(?=.*execution)/))&&(input.toLowerCase().match(/(?=.*status)/))&&(input.toLowerCase().match(/(?=.*train)/))){
		
				matchfound = 1;
				
				let bprojectlist = {};
				$("#chatajaxloader").show();  
				$.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "/WebServices/getProjectList",
			          async: false,
			          success : function(data) {
			        	  bprojectlist = data;
			          }
			      });

				
				let upList = bprojectlist;
				
				if((upList.ProjectsList)!=undefined){
					
					data = 	'<p><b>Execution Status of a Train: </b></p>';
					
					data = 	data + '<p>Please select the Project Name:</p>';
					
					data = data + "<p>Project Name: <select class='select bprojlist2' id='bprojlist2'  style='color: black;'> ";
					for(let i=0;i<upList.ProjectsList.length;i++){
						data = data + "<option value='"+upList.ProjectsList[i].projectName+"'>"+upList.ProjectsList[i].projectName+"</option>";
					}
					data = data + "</select></p>";
					
					
					data = data + '<p><input type="button" id="bgettrainlist2" value="Select" class=" btn btn-info "  onclick="getTrainList2();"/></p>';
					
				}else{
					
					data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Projects</p>";
				}				

				
				$("#chatajaxloader").hide();
				populateAnsData(data);
				

		}
		
		
		if((input.toLowerCase().match(/(?=.*clone)/))&&(input.toLowerCase().match(/(?=.*application)/))){

				matchfound = 1;
				
				
				let bapplist = {};
				$("#chatajaxloader").show();  
				$.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "/WebServices/getListOfApplications",
			          async: false,
			          success : function(data) {
			        	  bapplist = data;
			          }
			      });

				
				let upList = bapplist;
				
				if((upList.applications)!=undefined){
					
					data = 	'<p><b>Clone an Application: </b></p>';
					
					data = data + '<p>Please select the Application Name:</p>';
					
					data = data + "<p>Application Name: <select class='select bapplistid' id='bapplistid'  style='color: black;'>";
					for(let i=0;i<upList.applications.length;i++){
						data = data + "<option value='"+upList.applications[i].applicationName+"'>"+upList.applications[i].applicationName+"</option>";
					}
					data = data + "</select></p>";
					
					data = data + "<p>Enter new clone application name: <input type='text' class='bappcloneid' id='bappcloneid' name='bappcloneid' style='color: black;'/></p>";
					
					data = data + '<p><input type="button" id="bcloneApp" value="Clone" class=" btn btn-info "  onclick="cloneApp();"/></p>';
					
				}else{
					
					data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Applications</p>";
				}


				$("#chatajaxloader").hide();
				populateAnsData(data);
				

		}
		
		
/*		if((input.toLowerCase().match(/(?=.*availability)/))&&(input.toLowerCase().match(/(?=.*environment)/))){

				matchfound = 1;
				
				
				let bapplist = {};
				  
				$.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "/WebServices/getListOfApplications",
			          async: false,
			          success : function(data) {
			        	  bapplist = data;
			          }
			      });

				
				let upList = bapplist;
				
				

				data = 	'<p>Please select the Application Name:</p>';
				
				data = data + "<p>Application Name: <select class='select bappname1' id='bappname1'  style='color: black;'>";
				for(let i=0;i<upList.applications.length;i++){
					data = data + "<option value='"+upList.applications[i].applicationName+"'>"+upList.applications[i].applicationName+"</option>";
				}
				data = data + "</select></p>";
				data = data + "<p>Start Date: <input type='date' class='botappStrtDate' id='botappStrtDate' name='botappStrtDate' style='color: black; line-height: 10px; !important'/></p>";
				data = data + "<p>End Date: <input type='date' class='botappEndDate' id='botappEndDate' name='botappEndDate' style='color: black; line-height: 10px; !important'/></p>";
				
				data = data + '<p><input type="button" id="bchkstatsbutton" value="Check Status" class=" btn btn-info "  onclick="botchkAvail();"/></p>';
				
			
			populateAnsData(data);

		}*/
		
		
		if((input.toLowerCase().match(/(?=.*availability)/))&&(input.toLowerCase().match(/(?=.*environment)/))){

			matchfound = 1;
			
			
			let bapplist = {};
			$("#chatajaxloader").show();  
			$.ajax({
		          type : "GET",
		          dataType: "json",
		          url : "/WebServices/getAllApplicationsFromCalendarPage",
		          async: false,
		          success : function(data) {
		        	  bapplist = data;
		          }
		      });

			
			let upList = bapplist;
			
			if((upList.applications)!=undefined){
				
				data = 	'<p><b>Availability of an Environment: </b></p>';
				
				data = data + '<p>Please select the Application Name:</p>';
				
				data = data + "<p>Application Name: <select class='select bappname1' id='bappname1'  style='color: black;'>";
				for(let i=0;i<upList.applications.length;i++){
					data = data + "<option value='"+upList.applications[i].applicationName+"'>"+upList.applications[i].applicationName+"</option>";
				}
				data = data + "</select></p>";
				data = data + "<p>Start Date: <input type='date' class='botappStrtDate' id='botappStrtDate' name='botappStrtDate' style='color: black; line-height: 10px; !important'/></p>";
				data = data + "<p>End Date: <input type='date' class='botappEndDate' id='botappEndDate' name='botappEndDate' style='color: black; line-height: 10px; !important'/></p>";
				
				data = data + '<p><input type="button" id="bchkstatsbutton" value="Check Status" class=" btn btn-info "  onclick="botchkAvail();"/></p>';
				
			}else{
				
				data = "<p>Sorry, there was some connection issue, couldn't fetch you the list of Applications</p>";
			}
			

			$("#chatajaxloader").hide();
		populateAnsData(data);

	}
		
		
		
		////////////////////////////////
		
		
		if (((input.toLowerCase().match(/(?=.*scenario)/))&&(input.toLowerCase().match(/(?=.*northbridge)/)))||((input.toLowerCase().match(/(?=.*which scenarios were given by northbridge for process validation)/)))){	
			matchfound = 1;
			data = 	'<p>Northbridge suggested 3 scenarios for Process Validation:</p>';
			data = data + "<p>Scenario 1: Test Case 11531 - Validation of Operating Name</p>";
			data = data + "<p>Scenario 2: Test Case 27909 - Validation of the exception flow when HAUW declines the exception (UW assistant)</p>";
			data = data + "<p>Scenario 3: User Story 47856 - Renewal creation and effective dates</p>";
			populateAnsData(data);	
		}
		
		if (((input.toLowerCase().match(/(?=.*scenario 1)/)))||((input.toLowerCase().match(/(?=.*what is scenario 1)/)))){	
			matchfound = 1;
			data = 	'<p>Scenario 1 i.e. Test Case 11531 - Validation of Operating Name, deals with the field level validations (unit  testing) of the "Operating Name" field on "Customer Information" screen</p>';
			populateAnsData(data);
				
		}
		
		if (((input.toLowerCase().match(/(?=.*scenario 2)/)))||((input.toLowerCase().match(/(?=.*what is scenario 2)/)))){	
			matchfound = 1;
			data = 	'<p>Scenario 2 i.e. "Test Case 27909 - Validation of the exception flow when HAUW declines the exception (UW assistant)" validates that for a quote having "US Revenue" as the type of operation:</p>';
			data = data + "<p>	Agent is not able to view premium</p>";
			data = data + '<p>	Agent is not able to "Bind / Issue" the quote and needs to refer to UW</p>';
			data = data + "<p>	UW is able to view the premium of referred policy</p>";
			data = data + "<p>	UW can Approve or Decline the referred policy. UW can also refer the quote further to HA</p>";
			
			populateAnsData(data);
			
		}
		
		if (((input.toLowerCase().match(/(?=.*scenario 3)/)))||((input.toLowerCase().match(/(?=.*what is scenario 3)/)))){	
			matchfound = 1;
			data = 	'<p>Scenario 3 i.e. "User Story 47856 - Renewal creation and effective dates" is a user story for the Renewal functionality. The user story outlines:</p>';
			data = data + "<p>	Behavior of the system based of on the status of the policy and endorsements</p>";
			data = data + "<p>	Business rules related to Effective & Expiry dates, locations on the policy (added during new business & subsequent endorsements) using a sample scenario</p>";
				
			populateAnsData(data);
		}
		
		
		
		
		
		////////
		if (((input.toLowerCase().match(/(?=.*scenario 1)/))&&(input.toLowerCase().match(/(?=.*multibrowser)/)))||((input.toLowerCase().match(/(?=.*execute scenario 1 multibrowser test case)/)))){	
			matchfound = 1;
			let job = "OPTIKScenario1";
			executeJobs(job);
		}
		
		if (((input.toLowerCase().match(/(?=.*scenario 1)/))&&(input.toLowerCase().match(/(?=.*unit)/)))||((input.toLowerCase().match(/(?=.*execute scenario 1 unit test case)/)))){	
			matchfound = 1;
			let job = "CafeNextScenario1";
			executeJobs(job);
		}
		
		if (((input.toLowerCase().match(/(?=.*scenario 2)/))&&(input.toLowerCase().match(/(?=.*unit)/)))||((input.toLowerCase().match(/(?=.*execute scenario 2 test case)/)))){	
			matchfound = 1;
			let job = "CafeNextScenario2";
			executeJobs(job);
		}
		
		if (((input.toLowerCase().match(/(?=.*scenario 3)/))&&(input.toLowerCase().match(/(?=.*unit)/)))||((input.toLowerCase().match(/(?=.*execute scenario 3 test case)/)))){	
			matchfound = 1;
			let job = "CafeNextScenario3";
			executeJobs(job);
		}
		
		
		if (((input.toLowerCase().match(/(?=.*optik)/))&&(input.toLowerCase().match(/(?=.*team)/))&&(input.toLowerCase().match(/(?=.*city)/)))){	
			matchfound = 1;
			let job = "job1";
			buildTeamCityJob(job);
		}
		
		
		if (((input.toLowerCase().match(/(?=.*selenium)/))&&(input.toLowerCase().match(/(?=.*team)/))&&(input.toLowerCase().match(/(?=.*city)/)))){	
			matchfound = 1;
			let job = "job2";
			buildTeamCityJob(job);
		}
		
		////Farmers RFP Orals Demo Start
		
		if (((input.toLowerCase().match(/(?=.*major)/))&&(input.toLowerCase().match(/(?=.*minor)/))&&(input.toLowerCase().match(/(?=.*transactions)/)))){	
			matchfound = 1;
			data = '<p><b>EXPRESS TRANSACTIONS IN DETAILS:</b></p>';
			data = data +'<p>For testing purpose, we need to check two major aspects:</p>';
			data = data + 'Input: To enter data, interact and navigate the system</p>';	
			data = data + '<p>Output: To check the response of the system based on the above input</p>';
			data = data + '<p>In PLA, the inputs have been categorized as transaction and transaction can be classified as below:</p>';
			data = data + "<p><img  src='bot/images/MajorTransac.PNG' style='width: 245px;'></p>";
			data = data + "<p><img  src='bot/images/MinorTransac.PNG' style='width: 245px;'></p>";			
			populateAnsData(data);
		}
		
		
		if (((input.toLowerCase().match(/(?=.*pla)/))&&(input.toLowerCase().match(/(?=.*auto)/))&&(input.toLowerCase().match(/(?=.*express)/)))){	
			matchfound = 1;
			data = '<p><b>PLA - Auto Express:</b></p>';
			data = data +'<p>Farmers PLA, Express is the online interface through which agent processes transactions like New Business and various servicing for these policies. </p>';
			data = data + '<p>New Business transactions processed through Express 1 where a new Household number and a new policy number is generated. Also, a particular Household can have multiple policies. If the customer requires further changes in his existing Household, then Express 3 comes into play.</p>';	
			populateAnsData(data);
		}
		
		
		if (((input.toLowerCase().match(/(?=.*antique)/))&&(input.toLowerCase().match(/(?=.*policy)/)))){	
			matchfound = 1;
			data = '<p><b>Auto (Antique) policy:</b></p>';
			data = data +'<p>Auto policies are rated by Farmers New Auto or Mid Century or Farmers Smart Plan Auto. Antique Auto policies are rated by Farmers. Based on the rating companies the screens in Personal Line Application (PLA) will differ.  Antique policies need to be manufactured 30 years in advance. While testing these do not use valid VIN numbers. Any alphanumeric combination of 17 digits that is not a valid VIN number will work for testing purposes.</p>';
			populateAnsData(data);
		}
		
		if (((input.toLowerCase().match(/(?=.*rating)/))&&(input.toLowerCase().match(/(?=.*company)/))&&(input.toLowerCase().match(/(?=.*code)/)))){	
			matchfound = 1;
			data = '<p><b>Rating Company Code:</b></p>';
			data = data +'<p>Farmers PLA have different rating company code for different product types to classify, like K is rating company code for FSPA policies.</p>';
			populateAnsData(data);
		}
		
		if (((input.toLowerCase().match(/(?=.*retro)/))&&(input.toLowerCase().match(/(?=.*transactions)/)))){	
			matchfound = 1;
			data = '<p><b>Retro Transactions:</b></p>';
			data = data +'<p>A retroactive transaction is defined as a transaction whose effective date is less than the effective date of the most recent job history record. For example if we create a NB and force renew that policy as a second transaction. So any transaction performed before the renewal end date is knows as retroactive transactions.</p>';
			data = data + '<p>New Business transactions processed through Express 1 where a new Household number and a new policy number is generated. Also, a particular Household can have multiple policies. If the customer requires further changes in his existing Household, then Express 3 comes into play.</p>';	
			populateAnsData(data);
		}
		
		if (((input.toLowerCase().match(/(?=.*annual)/))&&(input.toLowerCase().match(/(?=.*semi)/))&&(input.toLowerCase().match(/(?=.*auto)/))&&(input.toLowerCase().match(/(?=.*product)/))&&(input.toLowerCase().match(/(?=.*rewrite)/)))){	
			matchfound = 1;
			data = '<p>Insurance premiums are usually charged annually or semiannually depending on the length of policy as well. Through express we can make both annual and semiannual policy depending on the state condition. Some states only offer 6 months policy length and some states may not allow semiannual for contracts. This also means annual policy gets discounts after 12 months, while semiannual policies get the discount sooner after 6 months from inception date of the policy.</p>';
			data = data + '<p>Product Rewrite- Rewriting the policy technique is a tactic that insurers have used to change the basic terms and certain basic changes in policy. It is different from renewal, in this policy is effectively being rewritten while renewal of the policy means same policy is being extended.</p>';	
			populateAnsData(data);
		}
		
		if (((input.toLowerCase().match(/(?=.*360)/))&&(input.toLowerCase().match(/(?=.*value)/)))){	
			matchfound = 1;
			data = '<p><b>360Value:</b></p>';
			data = data +'<p>360Value replacement cost estimates account for all material and labor costs needed to rebuild a particular structure, down to the screws and nails. This is true component-based property replacement estimation.</p>';
			data = data + '<p>360Value helps companies maintain insurance-to-value throughout the life of the policy. Replacement costs can be estimated during quoting and underwriting, updated for renewals, and recalculated periodically as part of a portfolio ITV analysis. Estimates can be calculated through the web-based user interface, web service integrations, or batch analysis.</p>';
			data = data + '<p>All 360Value replacement cost estimates are based on:</p>';
			data = data + '<p>	A true component-based methodology that accounts for all labor and material costs</p>';
			data = data + '<p>	The industry’s most detailed and reliable building cost information</p>';
			data = data + '<p>	A proven cost-modeling methodology that generates reliable estimates with minimal information</p>';
			data = data + '<p>	Localization of results down to the five-digit ZIP Code level</p>';

			populateAnsData(data);
		}
		
		
		if (((input.toLowerCase().match(/(?=.*discount)/))&&(input.toLowerCase().match(/(?=.*dollar)/))&&(input.toLowerCase().match(/(?=.*savings)/)))){	
			matchfound = 1;
			data = '<p><b>Full Term Discount Dollar Savings:</b></p>';
			data = data +'<p>The discount dollar savings will be the policy level premium savings associated with all discounts combined. So the premium savings associated with each discount applied to the policy will be calculated. This does not get calculated if policy is subjected to minimum premium guidelines.</p>';
			data = data + '<p></p>';	
			populateAnsData(data);
		}
		
		
		if (((input.toLowerCase().match(/(?=.*annual)/))&&(input.toLowerCase().match(/(?=.*total)/))&&(input.toLowerCase().match(/(?=.*premium)/)))){	
			matchfound = 1;
			data = '<p><b>Annual Total Premium:</b></p>';
			data = data + "<p>An annual premium is defined as the amount that someone is required to pay each year in order to keep his or her insurance policy active. If the insured person does not pay the premium amount by the policy's specified due date, the policy is cancelled. Some insurance companies offer a grace period after the due date, and if the premium is paid in this time frame, the policy is reinstated. Many companies allow customers to split the annual premium into monthly or quarterly installments for a fee. For example, if the annual premium is $1,200, the customer may pay $100 each month or $300 each quarter, plus any applicable fees.</p>";	
			populateAnsData(data);
		}
		
		
		////Farmers RFP Orals Demo End
		
		
		
		if(matchfound == 0){
			
			let dataArr = ["I am still learning. Please provide more information", "Sorry, what was that?", "What was that?", "I missed that.", "Sorry, I didn't get that", "I missed what you said. Say it again?", "I didn't get that.", "Say that again?", "Can you say that again?", "One more time?", "Sorry, can you say that again?", "I didn't get that. Can you say it again?", "Sorry, could you say that again?"];
	    
	         // randomly selects an index from the arr
	        let randomNumber = Math.floor(Math.random()*dataArr.length); 

	         let tData = dataArr[randomNumber]; 
			
			populateAnsData(tData);
			
			gInput = input;
		let gdata = '<p>Do you want me to search on <b><a id="botgooglesearchid" onclick="botGoogleSearch();" style="cursor: pointer;">Google</a></b></p>';

		populateAnsData(gdata);
	
}


		

}







function executeJobs(job){
	
	let bJobExecStatus = "";
	  $.ajax({
        type : "GET",
        dataType: "text",
        url : "/SmartQA/executeScriptJob?jobName="+job,
        async: false,
        success : function(data) {
        	bJobExecStatus = data;
        }
    });
	  data = "<p>Job Execution Started on Jenkins...</p>";
		data = data + "<p>Here is the Job URL: <a id='botexecjobUrl' href='http://in-pnq-coe37:8080/jenkins/job/"+bJobExecStatus+"/' target='_blank'> http://in-pnq-coe37:8080/jenkins/job/"+bJobExecStatus+"/ </a></p>";		

	  populateAnsData(data);

}


function buildTeamCityJob(job){
	
	let bJobExecStatus = "";
	  $.ajax({
        type : "GET",
        dataType: "text",
        url : "/SmartQA/buildTeamCityJob?jobName="+job,
        async: false,
        success : function(data) {
        	bJobExecStatus = data;
        }
    });
	  
	  data = "<p>Job Execution Started on Team City...</p>";
		data = data + "<p>Here is the Job URL: <a id='botTCjobUrl' href='http://in-pnq-coe37:8089/viewType.html?buildTypeId="+bJobExecStatus+"/' target='_blank'> http://in-pnq-coe37:8089/viewType.html?buildTypeId="+bJobExecStatus+"/ </a></p>";		

	  populateAnsData(data);

}







function botGoogleSearch(){
	//location.href='http://www.google.com/search?q=' + encodeURIComponent(gInput);
	
	
	window.open('http://www.google.com/search?q=' + encodeURIComponent(gInput),'_blank');
}
function botchkstats(){
	
	
	let len = $('.bappname').length;
	let inx = len-1;
	let appNam = $('.bappname')[inx].value;
	
	//let appNam = document.getElementById("bappname").value;
	
	
	let bappstatus = "";
	//loadAjax();
	  $.ajax({
        type : "GET",
        dataType: "text",
        url : "/WebServices/getStatusFromAppName?appName="+appNam,
        async: false,
        success : function(data) {
        	//$("#ajaxloader").hide();
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
	
	//let selbproj = $('#bprojlist').val();
	
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
	
	//let selbproj = $('#bprojlist').val();
	
	let len = $('.btrainlistid').length;
	let inx = len-1;
	let selbtrain = $('.btrainlistid')[inx].value;
	
	//let selbtrain = $('#btrainlistid').val();
	
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
	
	//let selbproj = $('#bprojlist1').val();
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
		
		
		data = data + "<p>Date: <input type='date' class='botSchDate' id='botSchDate' name='botSchDate' style='color: black;'/></p>";
		data = data + "<p>Time: <input type='time' class='botTime'  id='botTime' name='botTime' style='color: black;'/></p>";
		data = data + "<p><input type='button' id='btrainschebutton' value='Schedule' class='btn btn-info' onclick='botScheduleTrain();'/></p>";
		
		populateAnsData(data);
	
}



function botScheduleTrain(){
	
	let len = $('.bprojlist1').length;
	let inx = len-1;
	let selbproj = $('.bprojlist1')[inx].value;
	
	//let selbproj = $('#bprojlist1').val();
	
	let len = $('.btrainlistid1').length;
	let inx = len-1;
	let selbtrain = $('.btrainlistid1')[inx].value;
	
	//let selbtrain = $('#btrainlistid1').val();
	
	let len = $('.botSchDate').length;
	let inx = len-1;
	let selbotSchDate = $('.botSchDate')[inx].value;
	
	//let selbotSchDate = $('#botSchDate').val();
	
	let darr = selbotSchDate.split("-");
	//let d = new Date(selbotSchDate);
	let formateDate =  darr[1]+"/"+darr[2]+"/"+darr[0];
	
	let len = $('.botTime').length;
	let inx = len-1;
	let selbotTime = $('.botTime')[inx].value;
	
	//let selbotTime = $('#botTime').val();
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
		let d = new Date();
		let n = d.toTimeString();
		
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
	
	//let selbproj = $('#bprojlist2').val();
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
	
	//let selbproj = $('#bprojlist2').val();
	
	let len = $('.btrainlistid2').length;
	let inx = len-1;
	let selbtrain = $('.btrainlistid2')[inx].value;
	
	//let selbtrain = $('#btrainlistid2').val();
	
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
	
	//let selbapp = $('#bapplistid').val();
	
	let len = $('.bappcloneid').length;
	let inx = len-1;
	let selbappclone = $('.bappcloneid')[inx].value;
	
	//let selbappclone = $('#bappcloneid').val();
	
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
		if(bobj.info!=undefined){
			data = data + "<p><b>Info:</b> "+ bobj.info +"</p>";
		}
		if(bobj.error!=undefined){
			data = data + "<p><b>Error:</b> "+ bobj.error +"</p>";
		}

		populateAnsData(data);
	
	
	
}



function botchkAvail(){
	
	let len = $('.bappname1').length;
	let inx = len-1;
	let selbapp = $('.bappname1')[inx].value;
	
	//let selbapp = $('#bappname1').val();
	
	let len = $('.botappStrtDate').length;
	let inx = len-1;
	let selbstrtDate = $('.botappStrtDate')[inx].value;
	
	//let selbstrtDate = $('#botappStrtDate').val();
	
	let dstrtarr = selbstrtDate.split("-");
	//let d = new Date(selbotSchDate);
	let formatBStrtDate =  dstrtarr[2]+"/"+dstrtarr[1]+"/"+dstrtarr[0];
	
	let len = $('.botappEndDate').length;
	let inx = len-1;
	let selbendDate = $('.botappEndDate')[inx].value;
	
	//let selbendDate = $('#botappEndDate').val();
	
	let dendarr = selbendDate.split("-");
	//let d = new Date(selbotSchDate);
	let formatBEndDate =  dendarr[2]+"/"+dendarr[1]+"/"+dendarr[0];
	
	let bobj;
	let bObjMap ={};
	 $.ajax({
        type : "GET",
        dataType: "json",
        url : "/WebServices/checkAppAndEnvAvailability?appName="+selbapp+"&startDate="+formatBStrtDate+"&endDate="+formatBEndDate,
        async: false,
        success : function(data) {
       	 bobj = data;
        }
    });
	 bObjMap = bobj; 
		let data = "<p> Availability of application in given period of time:</p>";
		data = data + "<p><b>Application Name:</b> "+ selbapp +" <ul>";
		$.each( bObjMap, function(index,value){
			data = data + "<li><p><b>Date:</b> "+ index +"</p></li>";
			data = data + "<li><p><b>Availability Status:</b> "+ value +"</p></li>";
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

function populateInData(input){
    let conversation = $(".conversation");
   //$("<div class='message-row text-right'><span class=''><div class='human text-left'>" + input + "</div></span></div>").hide().appendTo($conversation).fadeIn("fast");
   
   
   $('<div class="bot-chatbox-msg-user"><span>'+input+'</span><div class="time-stamp">'+getCurrentTime()+'</div><div class="bot-torso bot-torso-user"></div></div>').hide().appendTo($conversation).fadeIn("fast");
   
   conversationDataOut = conversationDataOut + "User::" + input;
  
   conversationDataOut = conversationDataOut + "!!";
   
   $conversation.scrollTop($conversation[0].scrollHeight);
	
}

function getinput(key){
	 if(key == 13 && ($("#yousay").val()!="") && ($("#yousay").val()!=" ")) {
	       input = $("#yousay").val();
	       if($("#yousay").val()==""){
	    	   input = spbotval;
	       }
	        $("#yousay").val("");
	        for(let i=0;i<5;i++){
	      
	 	        $("#yousay").attr("placeholder","Thinking");
	 	        $("#yousay").attr("placeholder","Thinking.");
	 	        $("#yousay").attr("placeholder","Thinking..");
	 	        $("#yousay").attr("placeholder","Thinking...");
	        }
	        
	        $("#yousay").attr("placeholder","Say something...");

	        populateInData(input);
	        //doTalk(input);
	        intializeSPBotDataMap();
	        //intializeSPDataMap();
	        matchfound = 0;
	        
	        setTimeout('giveAnswer(input)', 2000);
	    }

}

$('#yousay').keypress(function (e) {
    let key = e.which;

	    	getinput(key);

});





function startDictation1() {
	
	if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
	let recognition = new webkitSpeechRecognition();

	recognition.continuous = false;
	recognition.interimResults = false;

	recognition.lang = "en-US";
	recognition.start();

  recognition.onstart = function() { 

  }
  recognition.onresult = function(event) {
	  
	  document.getElementById('transcript').value = event.results[0][0].transcript;
	  
	  console.log(event.results[0][0].transcript);
	recognition.stop();
	spbotval = document.getElementById('transcript').value;
	getinput(13);
	
  };
  recognition.onerror = function(event) { 
	  
	  
  }
  recognition.onend = function() { }
  
}
	
}


function loadAjax(){
	  $("#ajaxloader").show();
	} 



function botGenerateSuite(){
	
	let suitName = document.getElementById("bsuitName").value;
	document.getElementById("bubbleSuitName").value = suitName;

	let bid= spBotDataMap["suite"];
	document.getElementById(bid).click();
	
	data ="Test Suite : "+suitName+" has been created successfully";
	
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
	let data=""
	$.ajax({
	type : "GET",
	url : "/SmartQA/getMinervaModuleStatus",
	async : false,
	success : function(resultData) {
		if(resultData){
			$("#MinervaMainID").css("display", "block");
		}
	}
});
}  

