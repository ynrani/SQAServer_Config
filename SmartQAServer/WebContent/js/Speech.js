///<reference path="js/responsivevoice.js"/>

var spDataArr = [];
var speechArr = [];
var spval = "";
var s1 = "";
var s2 = "";
var matched;

function startDictation() {

	if (window.hasOwnProperty('webkitSpeechRecognition')) {

		var recognition = new webkitSpeechRecognition();

		recognition.continuous = false;
		recognition.interimResults = false;

		recognition.lang = "en-US";
		recognition.start();

		recognition.onresult = function(e) {
			document.getElementById('transcript').value = e.results[0][0].transcript;
			recognition.stop();
			spval = document.getElementById('transcript').value;
			responsiveVoice.speak(spval);
			intializeSPDataMap();
			matched = 0;
			triggerEvent1(spval);
			
			/*setTimeout(function(){
				
			}, 3000);
			*/
			if(matched == 0){
				//intializeSPDataArr(); 
				spDataArr = Object.keys(spDataMap);
				var spTempArr = [];
				for(var i=0;i<spDataArr.length;i++){
					s1 = spval;
					s2 = spDataArr[i];
					//var tempPer = similarity(s1,s2);
					var tempPer = similar(s1,s2);
					if(tempPer>0.2){
						spTempArr.push(spDataArr[i]);
					}
				}
				speechArr = spTempArr;
				setModalData(speechArr);
				
				document.getElementById("modalbuttonid").click();
				
				setTimeout(function(){
					triggerEvent(spval);
				}, 2000);
				}
};

		recognition.onerror = function(e) {
			recognition.stop();
		}

	}
}



function intializeSPDataMap() {
	spDataMap = {};
	
	spDataMap["add user"] = "addUser";
	spDataMap["view user"] = "viewUser";
	spDataMap["agile acceptance testing"] = "agileAccTest";
	spDataMap["functional testing"] = "funTest";
	spDataMap["cross browser testing"] = "cbTest";
	spDataMap["mobile testing"] = "mTest";
	spDataMap["service testing"] = "saTest";
	spDataMap["aip testing"] = "saTest";
	spDataMap["mainframe testing"] = "mainTest";
	spDataMap["logout"] = "logoutlink";
	spDataMap["task configuration"] = "taskConfig";
	spDataMap["build train"] = "buildTrain";
	spDataMap["job progress"] = "jobPro";
	spDataMap["environment booking"] = "envBook";
	spDataMap["environment provision"] = "envPro";
	spDataMap["environment monitoring"] = "envMon";
	spDataMap["environment dashboard"] = "envDash";
	spDataMap["visual cmdb"] = "vCMDb";
	spDataMap["smart agile"] = "smartAgile";
	spDataMap["optic"] = "optik";
	spDataMap["cafe next"] = "cafeNxt";
	spDataMap["cafe selenium"] = "cafeSel";
	spDataMap["cafe uft"] = "cafeUft";
	spDataMap["cafe mobile"] = "cafeMob";
	spDataMap["imda"] = "imda";
	spDataMap["twist"] = "twist";
	spDataMap["ci configuration"] = "ciConfig";
	spDataMap["environment configuration"] = "envConfig";
	spDataMap["tool configuration"] = "toolConfig";
	spDataMap["jenkins job view"] = "jen";
	spDataMap["teamcity job view"] = "tcity";
	spDataMap["train view"] = "trainView";
	spDataMap["reports"] = "reports";
	spDataMap["contact"] = "contact";
	spDataMap["innovate"] = "innovate";
	


	
}
function isPresent(val,spDataArr){
	for(var i=0;i<spDataArr.length;i++){
		if(val == spDataArr[i]){
			matched = 1;
		}
	}
	
	
}


function triggerEvent1(input) {
	//var temparr = Object.keys(spDataMap);

	var keywords =["add user"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["add user"];
		document.getElementById(bid).click();
	}
	
	var keywords =["view user"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["view user"];
		document.getElementById(bid).click();
	}
	var keywords =["agile acceptance testing"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["agile acceptance testing"];
		document.getElementById(bid).click();
	}
	var keywords =["functional testing"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["functional testing"];
		document.getElementById(bid).click();
	}
	var keywords =["cross browser testing"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["cross browser testing"];
		document.getElementById(bid).click();
	}
	var keywords =["mobile testing"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["mobile testing"];
		document.getElementById(bid).click();
	}
	var keywords =["service testing"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["service testing"];
		document.getElementById(bid).click();
	}
	var keywords =["aip testing"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["aip testing"];
		document.getElementById(bid).click();
	}
	var keywords =["mainframe testing"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["mainframe testing"];
		document.getElementById(bid).click();
	}
	var keywords =["logout"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["logout"];
		document.getElementById(bid).click();
	}
	var keywords =["task configuration"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["task configuration"];
		document.getElementById(bid).click();
	}
	var keywords =["build train"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["build train"];
		document.getElementById(bid).click();
	}
	var keywords =["job progress"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["job progress"];
		document.getElementById(bid).click();
	}
	var keywords =["environment booking"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["environment booking"];
		document.getElementById(bid).click();
	}
	var keywords =["environment provision"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["environment provision"];
		document.getElementById(bid).click();
	}
	var keywords =["environment monitoring"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["environment monitoring"];
		document.getElementById(bid).click();
	}
	var keywords =["environment dashboard"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["environment dashboard"];
		document.getElementById(bid).click();
	}
	var keywords =["visual cmdb"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["visual cmdb"];
		document.getElementById(bid).click();
	}
	var keywords =["smart agile"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["smart agile"];
		document.getElementById(bid).click();
	}
	var keywords =["optic"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["optic"];
		document.getElementById(bid).click();
	}
	var keywords =["cafe next"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["cafe next"];
		document.getElementById(bid).click();
	}
	var keywords =["cafe selenium"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["cafe selenium"];
		document.getElementById(bid).click();
	}
	var keywords =["cafe uft"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["cafe uft"];
		document.getElementById(bid).click();
	}
	var keywords =["cafe mobile"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["cafe mobile"];
		document.getElementById(bid).click();
	}
	var keywords =["imda"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["imda"];
		document.getElementById(bid).click();
	}
	var keywords =["twist"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["twist"];
		document.getElementById(bid).click();
	}
	var keywords =["ci configuration"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["ci configuration"];
		document.getElementById(bid).click();
	}
	var keywords =["environment configuration"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["environment configuration"];
		document.getElementById(bid).click();
	}
	var keywords =["tool configuration"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["tool configuration"];
		document.getElementById(bid).click();
	}
	var keywords =["jenkins job view"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["jenkins job view"];
		document.getElementById(bid).click();
	}
	var keywords =["teamcity job view"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["teamcity job view"];
		document.getElementById(bid).click();
	}
	var keywords =["train view"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["train view"];
		document.getElementById(bid).click();
	}
	var keywords =["reports"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["reports"];
		document.getElementById(bid).click();
	}
	var keywords =["contact"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["contact"];
		document.getElementById(bid).click();
	}
	var keywords =["innovate"];
	if((input.toLowerCase().search(new RegExp(keywords.join("|"),"i")))>=0){
		matchfound = 1;
		var bid= spDataMap["innovate"];
		document.getElementById(bid).click();
	}
		
	
		
	}




//String matching Percentage

/*function similarity(s1, s2) {
    var longer = s1, shorter = s2;
    if (s1.length < s2.length) { // longer should always have greater length
      longer = s2; shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) { return 1.0;  both strings are zero length  }
     // If you have StringUtils, you can use it to calculate the edit distance:
    return (longerLength - StringUtils.getLevenshteinDistance(longer, shorter)) /
                               (double) longerLength; 
    return (longerLength - editDistance(longer, shorter)) / longerLength;

  }

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    var costs = [];

    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }



function setModalData(speechArr){
	
	$("#modaldiv").remove();
	var Arr1 = speechArr;
	var len = Arr1.length;
	var string = '<div id="modaldiv">';
	string = string	+ '<h4>Did you mean:</h4>';
	for (var i = 0; i<len; i++) {
		
		//string = string	+ '<p>';
		string = string	+ '<a id="' + Arr1[i] + '" href="#" style="color: Blue;" onclick="assignSpVal(this)">'+ Arr1[i] +'</a>&nbsp;&nbsp;';
		//string = string	+ '</p>';

	}
	string = string	+ '<h4>Top '+ len +' results shown</h4>';
	string = string + '</div>';
	$("#modalmaindiv").append(string);
	$("#modalmaindiv").show();
	
	
}


function assignSpVal(val){
	
	var selVal = val.id;
	spval = selVal;
	document.getElementById("modalclosebuttonid").click();
}


function similar(a,b) {
    var lengthA = a.length;
    var lengthB = b.length;
    var equivalency = 0;
    var minLength = (a.length > b.length) ? b.length : a.length;    
    var maxLength = (a.length < b.length) ? b.length : a.length;    
    for(var i = 0; i < minLength; i++) {
        if(a[i] == b[i]) {
            equivalency++;
        }
    }


    var weight = equivalency / maxLength;
   // return (weight * 100) + "%";
    
    return weight;
}

*/

