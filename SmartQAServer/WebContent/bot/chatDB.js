/**
 * 
 * @author Viswanth Suvala
 *
 */

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

$(document).ready(function() {
	let tdata = "";
	$.ajax({
        type: 'GET',
        //dataType: 'json',
        url: "/SmartQA/GetConversationDataFromSession",
        async: false,
        success: function(resultData) {
        	tdata = resultData;
        }
    });
	conversationDataIn = tdata;
	if(conversationDataIn == ""||conversationDataIn == null){
		populateinitialData();
	}else{
		populateinitialData1(conversationDataIn);
	}
	

});


//Function to set Conversation Data in Session

function  SetValue(tConData)
{
   $.ajax({
   url:"/SmartQA/SetConversationDataInSession",
  type:'GET',
  async: false,
  data:{sConvData:tConData},
  success:function(response){}
});
}


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
			}
		}
		
	}
	
}



//Function to open chat box
$(".chatButton").click(function() {
    let bottomPosition = $chat.css("bottom");
    if (bottomPosition === "-397px") {
        $chat.animate({ bottom: "0px"}, 250, function() {
            $("#yousay").focus();
        });
    } else {
        $chat.animate({ bottom: "-397px"}, 250);
    }
});


$("#arrowId").click(function() {
    let bottomPosition = $chat.css("bottom");
    if (bottomPosition === "-397px") {
        $chat.animate({ bottom: "0px"}, 250, function() {
            $("#yousay").focus();
            $("#arrowId").removeClass("minimize-arrow-upright").addClass("minimize-arrow-downleft");
        });
    } else {
        $chat.animate({ bottom: "-397px"}, 250);
        $("#arrowId").removeClass("minimize-arrow-downleft").addClass("minimize-arrow-upright");

    }
});


$("#minervaImg").on('click',function () { 
	
	$('#minervaMID').hide();
	
	
	$('#chat').show();
	$chat.animate({ bottom: "0px"}, 250, function() {
        $("#yousay").focus();
        $("#arrowId").removeClass("minimize-arrow-upright").addClass("minimize-arrow-downleft");
    });
	
});




$("#minusID").on('click',function () { 
	
	$('#minervaMID').show();
	
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

$('<div class="bot-chatbox-msg-server"><span style="font-size: 11px;"><div class="brandtext">Minerva</div>'+ data +'</span><div class="time-stamp">'+getCurrentTime()+
'<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'+
'<img onclick="getFeedback(true,event,5924,this)" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback(false,event,5924,this)" src="bot/images/thumbs-down.png">'+
'</span></span></span></div><div class="bot-torso bot-torso-server"></div></div>')
  .hide()
  .appendTo($conversation)
  .fadeIn("fast");
	
conversationDataOut = conversationDataOut + "Minerva::" + data;

conversationDataOut = conversationDataOut + "!#!";

SetValue(conversationDataOut);
$conversation.scrollTop($conversation[0].scrollHeight); 
	
}

function populateinitialData(){

	$('<div class="bot-chatbox-msg-server"><span style="font-size: 11px;"><div class="brandtext"> Minerva</div>I am Minerva your VA, How can i help U</span><div class="time-stamp">'+getCurrentTime()+
		'<span style="float: right;"><span style="font-size: 8px;">Was this information useful ? <span style="margin-right: -16px;"> &nbsp;'+
		'<img onclick="getFeedback(true,event,5924,this)" src="bot/images/thumbs-up.png"> &nbsp;<img onclick="getFeedback(false,event,5924,this)" src="bot/images/thumbs-down.png">'+
		'</span></span></span></div><div class="bot-torso bot-torso-server"></div></div><div class="optionsDiv"><div class="action">'+
		'<span class="action-elem"><span onclick="giveAnswer(\'build train\');">Build a Train</span></span>'+
		'<span class="action-elem"><span onclick="giveAnswer(\'project list\');">Project List</span></span>'+
		'<span class="action-elem"><span onclick="giveAnswer(\'schedule train\');">Schedule a Train</span></span>'+
		'<span class="action-elem"><span onclick="giveAnswer(\'execution status train\');">Execution Status of a Train</span></span>'+
		'<span class="action-elem"><span onclick="giveAnswer(\'status environment\');">Status of an Environment</span></span>'+
		'<span class="action-elem"><span onclick="giveAnswer(\'clone application\');">Clone an Application</span></span>'+
		'<span class="action-elem"><span onclick="giveAnswer(\'availability environment\');">Availability Environment</span></span>'+
		'</div></div>')
	  .hide()
	  .appendTo($conversation)
	  .fadeIn("fast");

	//conversationDataOut = conversationDataOut + "Minerva::I am Minerva your VA, How can i help U";

	//conversationDataOut = conversationDataOut + "!#!";

	//SetValue(conversationDataOut);

	$conversation.scrollTop($conversation[0].scrollHeight); 

	}

function giveAnswer(input){
	
		let data="";
		
		let keyword="";
		
		keyword = getKeywordMatch(input);
		
		if((null!=keyword)&&(""!=keyword)){
			getAnswerMinerva(keyword);
		}
		

		
		

		
		
		if ((input.toLowerCase().match(/(?=.*add)/))&&(input.toLowerCase().match(/(?=.*question)/))){	

			matchfound = 1;
			

			data = 	'<p>Enter the querry details:</p>';
			
			data = data + "<p>Keyword: <input type='text' class='keywordid' id='keywordid' name='keywordid' style='color: black;'/></p>";
			data = data + "<p>Questions: <input type='text' class='questionid' id='questionid' name='questionid' style='color: black;'/></p>";
			data = data + "<p>Answer: <input type='text' class='answerid' id='answerid' name='answerid' style='color: black;'/></p>";
			data = data + "<p>Link: <input type='text' class='linkid' id='linkid' name='linkid' style='color: black;'/></p>";
			data = data + "<p>Document Path: <input type='text' class='docid' id='docid' name='docid' style='color: black;'/></p>";
			
			data = data + '<p><input type="button" id="addQuesbutton" value="Add" class=" btn btn-info "  onclick="botAddQues();"/></p>';
			
		
		populateAnsData(data);

	}
		
		
		if ((input.toLowerCase().match(/(?=.*status)/))&&(input.toLowerCase().match(/(?=.*environment)/))){	

				matchfound = 1;
				
				let bapplist = {};
				  
				$.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "getListOfApplications",
			          async: false,
			          success : function(data) {
			        	  bapplist = data;
			          }
			      });

				
				let upList = bapplist;
				

				data = 	'<p>Please select the Application Name:</p>';
				
				data = data + "<p>Application Name: <select class='select bappname' id='bappname'  style='color: black;'>";
				for(let i=0;i<upList.length;i++){
					data = data + "<option value='"+upList[i]+"'>"+upList[i]+"</option>";
				}
				data = data + "</select></p>";
				
				
				data = data + '<p><input type="button" id="bchkstatsbutton" value="Check Status" class=" btn btn-info "  onclick="botchkstats();"/></p>';
				
			
			populateAnsData(data);

		}
				
		if((input.toLowerCase().match(/(?=.*train)/))&&((input.toLowerCase().match(/(?=.*build)/))||(input.toLowerCase().match(/(?=.*execute)/)))){
			matchfound = 1;
				
				let bprojectlist = {};
				  
				$.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "/iTAP/getProjectList",
			          async: false,
			          success : function(data) {
			        	  bprojectlist = data;
			          }
			      });

				
				let upList = bprojectlist;
				
				

				data = 	'<p>Please select the Project Name:</p>';
				
				data = data + '<p>Project Name: <select class="select bprojlist" id="bprojlist" style="color: black;">';
				for(let i=0;i<upList.length;i++){
					data = data + "<option value='"+upList[i]+"'>"+upList[i]+"</option>";
				}
				data = data + '</select></p>';
				
				
				data = data + '<p><input type="button" id="bgettrainlist" value="Select" class=" btn btn-info "  onclick="getTrainList();"/></p>';
				
				populateAnsData(data);
			
		}
		
		
		if((input.toLowerCase().match(/(?=.*train)/))&&(input.toLowerCase().match(/(?=.*schedule)/))){

				matchfound = 1;
				
				let bprojectlist = {};
				  
				$.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "/iTAP/getProjectList",
			          async: false,
			          success : function(data) {
			        	  bprojectlist = data;
			          }
			      });

				
				let upList = bprojectlist;
				
				

				data = 	'<p>Please select the Project Name:</p>';
				
				data = data + "<p>Project Name: <select class='select bprojlist1' id='bprojlist1'  style='color: black;'>";
				for(let i=0;i<upList.length;i++){
					data = data + "<option value='"+upList[i]+"'>"+upList[i]+"</option>";
				}
				data = data + "</select></p>";
				
				
				data = data + '<p><input type="button" id="bgettrainlist1" value="Select" class=" btn btn-info "  onclick="getTrainList1();"/></p>';
				
				populateAnsData(data);
				

		}
		
		
		
		if((input.toLowerCase().match(/(?=.*execution)/))&&(input.toLowerCase().match(/(?=.*status)/))&&(input.toLowerCase().match(/(?=.*train)/))){
		
				matchfound = 1;
				
				let bprojectlist = {};
				  
				$.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "/iTAP/getProjectList",
			          async: false,
			          success : function(data) {
			        	  bprojectlist = data;
			          }
			      });

				
				let upList = bprojectlist;
				
				

				data = 	'<p>Please select the Project Name:</p>';
				
				data = data + "<p>Project Name: <select class='select bprojlist2' id='bprojlist2'  style='color: black;' >";
				for(let i=0;i<upList.length;i++){
					data = data + "<option value='"+upList[i]+"'>"+upList[i]+"</option>";
				}
				data = data + "</select></p>";
				
				
				data = data + '<p><input type="button" id="bgettrainlist2" value="Select" class=" btn btn-info "  onclick="getTrainList2();"/></p>';
				
				populateAnsData(data);
				

		}
		
		
		if((input.match(/(?=.*clone)/gi))&&(input.match(/(?=.*application)/gi))){

				matchfound = 1;
				
				
				let bapplist = {};
				  
				$.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "/SmartFoundry/getListOfApplications",
			          async: false,
			          success : function(data) {
			        	  bapplist = data;
			          }
			      });

				
				let upList = bapplist;
				
				

				data = 	'<p>Please select the Application Name:</p>';
				
				data = data + "<p>Application Name: <select class='select bapplistid' id='bapplistid'  style='color: black;'>";
				for(let i=0;i<upList.length;i++){
					data = data + "<option value='"+upList[i]+"'>"+upList[i]+"</option>";
				}
				data = data + "</select></p>";
				
				data = data + "<p>Enter new clone application name: <input type='text' class='bappcloneid' id='bappcloneid' name='bappcloneid' style='color: black;'/></p>";
				
				data = data + '<p><input type="button" id="bcloneApp" value="Clone" class=" btn btn-info "  onclick="cloneApp();"/></p>';
				
				populateAnsData(data);
				

		}
		
		
		if((input.toLowerCase().match(/(?=.*availability)/))&&(input.toLowerCase().match(/(?=.*environment)/))){

				matchfound = 1;
				
				
				let bapplist = {};
				  
				$.ajax({
			          type : "GET",
			          dataType: "json",
			          url : "/SmartFoundry/getListOfApplications",
			          async: false,
			          success : function(data) {
			        	  bapplist = data;
			          }
			      });

				
				let upList = bapplist;
				
				

				data = 	'<p>Please select the Application Name:</p>';
				
				data = data + "<p>Application Name: <select class='select bappname1' id='bappname1'  style='color: black;'>";
				for(let i=0;i<upList.length;i++){
					data = data + "<option value='"+upList[i]+"'>"+upList[i]+"</option>";
				}
				data = data + "</select></p>";
				data = data + "<p>Start Date: <input type='date' class='botappStrtDate' id='botappStrtDate' name='botappStrtDate' style='color: black;'/></p>";
				data = data + "<p>End Date: <input type='date' class='botappEndDate' id='botappEndDate' name='botappEndDate' style='color: black;'/></p>";
				
				data = data + '<p><input type="button" id="bchkstatsbutton" value="Check Status" class=" btn btn-info "  onclick="botchkAvail();"/></p>';
				
			
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
		
		
		
		
		if (((input.toLowerCase().match(/(?=.*optik)/))&&(input.toLowerCase().match(/(?=.*teamcity)/)))){	
			matchfound = 1;
			let job = "job1";
			buildTeamCityJob(job);
		}
		
		
		
		
		
		
		
		
		
		
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


function getKeywordMatch(input) {

	let botDataObj;
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/iTAP/getKeywordMinerva",
		async : false,
		success : function(data) {
			botDataObj = data;
		}
	});
	let keyword = null;

	for (let i = 0; i < botDataObj.length; i++) {

		let res = botDataObj[i].search(',');

		let inx = 0;
		let inx1;

		if (res == -1) {

			let temp = botDataObj[i].split(" ");

			let len = temp.length;

			for (let j = 0; j < len; j++) {

				if (input.toLowerCase().match(temp[j].toLowerCase())) {
					inx++;
					inx1 = len;
				}
			}
		} else {

			let temp1 = botDataObj[i].split(",");

			let len1 = temp1.length;

			for (let k = 0; k < len1; k++) {

				let temp = temp1[k].split(" ");

				let len = temp.length;

				for (let j = 0; j < len; j++) {

					if (input.toLowerCase().match(temp[j].toLowerCase())) {
						inx++;
						inx1 = len;
					}
				}

			}

		}

		if (inx == inx1) {
			matchfound = 1;
			keyword = botDataObj[i];
		}

	}
	return keyword;

}

function getAnswerMinerva(keyword) {

	let botDataObj;
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/iTAP/getAnswerMinerva?inputData=" + keyword,
		async : false,
		success : function(data) {
			botDataObj = data;
		}
	});

	data = '<p>' + botDataObj.answer + '</p>';

	if ((null != botDataObj.link) && ("" != botDataObj.link)) {
		data = data + "<p><i>Reference URL:</i> <a href='" + botDataObj.link
				+ "' target='_blank'>" + botDataObj.link + "</a></p>";
	}
	if ((null != botDataObj.document) && ("" != botDataObj.document)) {
		data = data + "<p><i>Reference Doc:</i> <a target='_blank'; href='"
				+ botDataObj.link + "' style='color:blue;'>"
				+ botDataObj.keyword + "</a></p>";
	}

	populateAnsData(data);
}

function botGoogleSearch(){
	//location.href='http://www.google.com/search?q=' + encodeURIComponent(gInput);
	
	
	window.open('http://www.google.com/search?q=' + encodeURIComponent(gInput),'_blank');
}



function executeJobs(job){
	
	let bJobExecStatus = "";
	  $.ajax({
        type : "GET",
        dataType: "text",
        url : "/iTAP/executeScriptJob?jobName="+job,
        async: false,
        success : function(data) {
        	bJobExecStatus = data;
        }
    });
	  let message = "Script Execution Started... Here is the Job URL: http://in-pnq-coe37:8080/jenkins/job/"+bJobExecStatus+"/";
	  populateAnsData(message);

}






function buildTeamCityJob(job){
	
	let bJobExecStatus = "";
	  $.ajax({
        type : "GET",
        dataType: "text",
        url : "/iTAP/buildTeamCityJob?jobName="+job,
        async: false,
        success : function(data) {
        	bJobExecStatus = data;
        }
    });
	  let message = "TeamCity Job Execution Started... Here is the Job URL: http://in-pnq-coe37:8080/jenkins/job/"+bJobExecStatus+"/";
	  populateAnsData(message);

}




function botAddQues(){
	
	let len = $('.keywordid').length;
	let inx = len-1;
	let keyword = $('.keywordid')[inx].value;
	
	let len = $('.questionid').length;
	let inx = len-1;
	let question = $('.questionid')[inx].value;
	
	let len = $('.answerid').length;
	let inx = len-1;
	let answer = $('.answerid')[inx].value;
	
	let len = $('.linkid').length;
	let inx = len-1;
	let link = $('.linkid')[inx].value;
	
	let len = $('.docid').length;
	let inx = len-1;
	let doc = $('.docid')[inx].value;
	
	let output;

	$.ajax({
        type : "GET",
        dataType: "text",
        url : "/iTAP/addQuesToMinerva?keyword="+keyword+"&question="+question+"&answer="+answer+"&link="+link+"&doc="+doc,
        async: false,
        success : function(data) { 	
        	output = data;
        }
    });
	
	if(output=="success"){
		data="Question has been added successfully..."
			
	}else{
		data="<p>Inconsistency in the Data provided...</p>"
		data = data + "<p> Error: "+output+"</p>"
		
	}
	populateAnsData(data);
	
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
        url : "/SmartFoundry/getStatusFromAppName?appName="+appNam,
        async: false,
        success : function(data) {
        	//$("#ajaxloader").hide();
        	bappstatus = data;
        }
    });
		
		let data ="Application status for "+appNam+" is : "+ bappstatus;
		
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
          url : "/iTAP/getTrainListByProject?selectedProjectName="+selbproj,
          async: false,
          success : function(data) {
        	  btrainlist = data;
          }
      });
	  
		let data = 	'<p>Please select the Train Name :</p>';
		
		data = data + "<p>Train Name: <select class='select btrainlistid' id='btrainlistid'  style='color: black;'>";
		for(let i=0;i<btrainlist.length;i++){
			data = data + "<option value='"+btrainlist[i]+"'>"+btrainlist[i]+"</option>";
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
         url : "/iTAP/buildTrainNow?trainName="+selbtrain+"&projectName="+selbproj,
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
          url : "/iTAP/getTrainListByProject?selectedProjectName="+selbproj,
          async: false,
          success : function(data) {
        	  btrainlist = data;
          }
      });
	  
		let data = 	'<p>Please select the Train Name :</p>';
		
		data = data + "<p>Train Name: <select class='select btrainlistid1' id='btrainlistid1'  style='color: black;'>";
		for(let i=0;i<btrainlist.length;i++){
			data = data + "<option value='"+btrainlist[i]+"'>"+btrainlist[i]+"</option>";
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
         url : "/iTAP/buildSheduleTrain?sheduleTrainName="+selbtrain+"&sheduleProjectName="+selbproj+"&min="+selbotmin+"&hr="+selbothour+"&date="+formateDate,
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
          url : "/iTAP/getTrainListByProject?selectedProjectName="+selbproj,
          async: false,
          success : function(data) {
        	  btrainlist = data;
          }
      });
	  
		let data = 	'<p>Please select the Train Name :</p>';
		
		data = data + "<p>Train Name: <select class='select btrainlistid2' id='btrainlistid2'  style='color: black;'>";
		for(let i=0;i<btrainlist.length;i++){
			data = data + "<option value='"+btrainlist[i]+"'>"+btrainlist[i]+"</option>";
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
        url : "/iTAP/executionStatusOfTrain?trainName="+selbtrain+"&projectName="+selbproj ,
        async: false,
        success : function(data) {
       	 bobj = data;
        }
    });
	 
	 
		let data = "<p>Execution Status details: <ul> ";
			for(let i=0;i<bobj.length;i++){
				data = data + "<p><li><ul>";
				data = data +"<li><b>Job Name</b>: "+bobj[i].jobName+"</li>";
				data = data +"<li><b>Status</b>: "+bobj[i].status+"</li>";
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
        url : "/SmartFoundry/createClone?appName="+selbapp+"&appNewName="+selbappclone,
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
        url : "/SmartFoundry/checkAppAndEnvAvailability?appName="+selbapp+"&startDate="+formatBStrtDate+"&endDate="+formatBEndDate,
        async: false,
        success : function(data) {
       	 bobj = data;
        }
    });
	 bObjMap = bobj; 
		let data = "<p> Avalability of application in given period of time:</p>";
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
	        
	        populateInData(input);
	        //doTalk(input);
	        intializeSPBotDataMap();
	        //intializeSPDataMap();
	        matchfound = 0;
	       giveAnswer(input);
	    }

}

$('#yousay').keypress(function (e) {
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

function getFeedback(bool,ev,key,self) {
}

