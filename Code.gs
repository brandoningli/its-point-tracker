/***
ITS Point Tracker
Created by Brandon Ingli, Class of 2017
Troupe 5424, Marquette High School, Chesterfield, MO

This tool is not affiliated with the Educational Theatre Society

This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

For instructions on how to get this working with your troupe, open the README.gs file.
***/

/* ------- TROUPE CONFIGURATION  -------*/

/**
For Changes to Take Effect:
1) Go to Publish > Deploy as web app...
2) Change "Project Version" to "new"
3) Make sure the app executes as "me" and that "Anyone, even anonymous" has access.
   i) If you use this on a school-associated account, you may only see "Anyone within school.org" as an option. Use this one, but keep in mind
      students will need to first sign in to their school Google Apps account before using the system.
4) Hit Publish. Your Script's URL will be shown, but it will not change.
**/

/*
Update the variable below to change the name associated with the Thespian Troupe.
This will NOT change the name in any existing spreadsheets.
*/
var troupe_name = "Generic Troupe";

/*
Update the variable below to change the password required to view requested records updates.
This will take effect immediately after re-publishing, but will NOT change the text in any existing spreadsheets.
*/
var passwd = "password";

/* ------- END TROUPE CONFIGURATION  -------*/

/* ----------------------------- Add Record ----------------------------- */

/*
Triggered when the web-app is visited (Computer Jargon: GET Request)
Will display the request view page
*/
function doGet(e){
  if (typeof e !== 'undefined'){
    //If this page is accessed in any way other than a generated link, an error will be displayed.
    if(!e.parameter.rolenum){
      return ContentService.createTextOutput("ERROR! This page was not accessed via a generated link. Please use the Add Request form to generate a link with student data.");
    }
    //Load some of the page from the HTML file
    var html = HtmlService.createHtmlOutputFromFile('admin.html');

    //Set the Title of the webpage with the troupe name
    html.setTitle(troupe_name + " Points Tracker - Request").setSandboxMode(HtmlService.SandboxMode.IFRAME);

    //Append the rest of the HTML for the page
    //Javascript to validate password
    html.append("<script>$('#pwdsub').live('click', function() { if(document.getElementById('password').value == '" + passwd + "'){document.getElementById('main').style.display = 'block';");
    html.append("document.getElementById('pwd').style.display = 'none';}");
    html.append("else{ alert('Incorrect Password'); return false;}});</script>");

    //Header
    html.append("<center><font size='3'> <table border='0' padding='6px'><tr align='center' valign='middle'><td class='outer' align='center' valign='middle'><img src='https://higherlogicdownload.s3.amazonaws.com/SCHOOLTHEATRE/e2ccb034-79eb-4df8-bafa-f3340eef52a1/UploadedImages/its_4c_pos_h_tag_WEB_300x88.png' width='150px' /></td></tr></table>");
    html.append("<div class='header'>" + troupe_name + " Points Tracker</div><br /> <font color='white'>");

    //Student Introduction and Instructions for Director
    html.append("<br><br><div class='header'>"+e.parameter.firstname+" "+e.parameter.lastname+", Class of "+e.parameter.class+"<br><br></div>");
    html.append("is requesting the following be added to his or her ITS Points Record. Enter the amount of points you wish to give for each and click \"Add Points\".<br>Click \"Hide\" to hide an item you do not want to award points for. All hidden items (including successful queries) will reappear upon refreshing this page.<br><br>");

    //Password Field
    html.append('<div id="pwd">Administration Password: <input class=\'ipt\' type="password" id="password" name="password" placeholder="Password">&nbsp;<input type="button" id="pwdsub" name="pwdsub" value="Submit"><br></div>');

    //Main Request Data (Hidden at first)
    html.append(' <div id="main" style="display:none;">');

    //Table Header
    html.append(' <table id="table" class="in"><tr class="in tablehead"><th class="in" scope="col">Production</th><th class="in" scope="col">Date</th><th class="in" scope="col">Role</th><th class="in" scope="col">Points to Award</th><th class="in" scope="col">Submit</th><th class="in" scope="col">Hide from list</th></tr>');

    //Request Contents
    for(var i = 1; i <= parseInt(e.parameter.rolenum); i++){
        html.append("<tr class='in' >");
        html.append("<form id='"+i+"'>");
        html.append("<td class='in' ><input class='ipt' type='text' name='production' value='"+e['parameter']['production'+i]+"' placeholder='Production'></td>");
        html.append("<td class='in' ><input class='ipt' type='text' name='date' value='"+e['parameter']['date'+i]+"' placeholder='Date'></td>");
        html.append("<td class='in' ><input class='ipt' type='text' name='role' value='"+e['parameter']['role'+i]+"' placeholder='Role'></td>");
        html.append("<td class='in' ><input type='hidden' name='txt' value='y'><input type='hidden' name='fmid' value='"+i+"'><input type='hidden' name='firstname' value='"+e.parameter.firstname+"'><input type='hidden' name='lastname' value='"+e.parameter.lastname+"'><input type='hidden' name='class' value='"+e.parameter.class+"'>");
        html.append("<input class='ipt' type='text' name='newpts' size='4' placeholder='Pts'></td><td class='in' >");
        html.append("<input type='button' id='submit"+i+"' value='Add Points' onclick='this.value=\"Adding...\"; addMe(this.form);'></form></td><td class='in' ><div id='remNew'>Hide</td></tr>");
    }

    //Close off HTML and display disclaimer
    html.append("</table></div></font><br><br><br><font size='1' color='white'>*This page is not affiliated with the Educational Theatre Association</font>");
    return html;
}
}

/*
Resets the Spreadsheet ID
*/
function resetId(){
   var properties = PropertiesService.getScriptProperties();
  properties.deleteProperty("ssid");
}

/*
Sets the Spreadsheet ID to the value given in the variable "value"
*/
function setId(){
 var properties = PropertiesService.getScriptProperties();
  var value = "";
  properties.setProperty("ssid", value);
}

/*
Stops the Script for "milliseconds" milliseconds
*/
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

/*
Returns a timestamp for the current time and date.
*/
function timeStamp() {
 var d = new Date();
  return (d.getMonth() + 1)+"/"+d.getDate()+"/"+d.getFullYear()+" "+((d.getHours() < 10) ? "0"+d.getHours() : d.getHours())+":"+((d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes())+":"+((d.getSeconds() < 10) ? "0"+d.getSeconds() : d.getSeconds());
}

/*
Determines if X is an integer
*/
function isInt(x) {
   var y = parseInt(x, 10);
   return !isNaN(y) && x == y && x.toString() == y.toString();
}

/*
Determines if email follows the pattern for email addresses
*/
function emailCheck(email){
var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
if (email == '' || !re.test(email))
{
  return false;
}
  else{return true;}
}

/*
Sorts the Point Record Sheets by Class, Lastname, Firstname
For use in the updatePoints() function
*/
function sortSheets(ss) {
  try{
  var sheetNameArray = [];
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    sheetNameArray.push(sheets[i].getName());
  }
  sheetNameArray.sort();
  for( var j = 0; j < sheets.length; j++ ) {
    ss.setActiveSheet(ss.getSheetByName(sheetNameArray[j]));
    ss.moveActiveSheet(j + 1);
  }
  return 0;
  }
  catch(error){
    Logger.log(error.toString());
    return error.toString();
  }
}

/*
Updates the Point Record
*/

function updatePoints(form) {
  try{

    //Check for empty fields
    if(form["firstname"] == "" || form["lastname"] == "" || form["date"] == "" || form["class"] == "" || form["production"] == "" || form["role"] == "" || form["newpts"] == ""){
      throw "You forgot something!";
    }

    //get Spreadsheet
    var properties = PropertiesService.getScriptProperties();
    var spreadsheet, sheet;

    //If a Spreadsheet ID Exists
    if(properties.getProperty("ssid") != null){
      //Get that ID
      var id = properties.getProperty("ssid");
      //If it's trashed, make a new Spreadsheet
      if(DriveApp.getFileById(id).isTrashed()){
        //Create the Spreadsheet and get it's ID
        var spreadsheet = SpreadsheetApp.create(troupe_name + " Points");
        id = spreadsheet.getId();
        //Save the ID for future use
        properties.setProperty("ssid", id);
        //Open the Spreadsheet
        spreadsheet = SpreadsheetApp.openById(id);
        //Setup the welcome page
        spreadsheet.renameActiveSheet("!Welcome");
        sheet = spreadsheet.getSheetByName("!Welcome");
        sheet.appendRow(["Welcome to the " + troupe_name + " Point Tracker!"]);
        sheet.appendRow([""]);
        sheet.appendRow(["Administration Password:", passwd]);
      }
      //If the SSID exists and the spreadsheet is NOT trashed, open it!
      else{
        spreadsheet = SpreadsheetApp.openById(id);
      }

    }
    //If the Spreadsheet ID is not set, create a new Spreadsheet!
    else{
      var spreadsheet = SpreadsheetApp.create(troupe_name + " Points");
      id = spreadsheet.getId();
      var ssheetfile = DriveApp.getFileById(id);
      properties.setProperty("ssid", id);
      spreadsheet = SpreadsheetApp.openById(id);
      spreadsheet.renameActiveSheet("!Welcome");
      sheet = spreadsheet.getSheetByName("!Welcome");
      sheet.appendRow(["Welcome to the " + troupe_name + " Point Tracker!"]);
      sheet.appendRow(null);
      sheet.appendRow(["Administration Password:", passwd]);
      sheet.appendRow(null);
    }
    //Find sheet with person's name. If none, create it!
    var allsheets = spreadsheet.getSheets();
    var sheetname = form["class"]+" "+form["lastname"].toUpperCase() + " " + form["firstname"].toUpperCase();
    var match = 0;
    for each (var i in allsheets){
      if (i.getName() == sheetname){
        match = 1;
        sheet = i;
        break;
      }
    }
    if (match == 0){
      //If no sheet exists for this person, create it and add row with info
      spreadsheet.insertSheet(sheetname);
      sheet = spreadsheet.getSheetByName(sheetname);
      sheet.appendRow([form["firstname"].toUpperCase(), form["lastname"].toUpperCase(), "Class of "+form["class"], "NOT Inducted"]);
      sheet.appendRow(["Production", "Date", "Role", "New Points", "Total Points"]);
      sheet.setFrozenRows(2);
      //Add points to log
      sheet.appendRow([form["production"], "'"+form["date"], form["role"], parseFloat(form["newpts"]), parseFloat(form["newpts"])]);

      //Sort the Sheets by Class, Lastname, Firstname
      var err = sortSheets(spreadsheet);
      //If the sorting fails, alert the user, but tell them points were added OK.
      if(err !== 0){
        throw "Sorting not completed successfully, but Points have been Added";
      }
      //Return
      return "Success! "+form["firstname"].toUpperCase() + " " + form["lastname"].toUpperCase() + " now has "+form["newpts"]+" ITS Points." + "%" + form.fmid;
    }
    else{
      //if sheet is there, update
      //first, get the current point value
      var lastrowi = sheet.getLastRow();
      var cell = sheet.getRange(lastrowi, 5);
      var currentPts = parseFloat(cell.getValue());
      //now, add points
      var updatedPts = currentPts + parseFloat(form["newpts"]);
      //Finally, add to log
      sheet.appendRow([form["production"], "'"+form["date"], form["role"], parseFloat(form["newpts"]), updatedPts]);
      //auto resize all columns to fit text
      sheet.autoResizeColumn(1);
      sheet.setColumnWidth(1, sheet.getColumnWidth(1)+7);
      sheet.autoResizeColumn(2);
      sheet.setColumnWidth(2, sheet.getColumnWidth(2)+7);
      sheet.autoResizeColumn(3);
      sheet.setColumnWidth(3, sheet.getColumnWidth(3)+7);
      sheet.autoResizeColumn(4);
      sheet.setColumnWidth(4, sheet.getColumnWidth(4)+7);
      sheet.autoResizeColumn(5);
      sheet.setColumnWidth(5, sheet.getColumnWidth(5)+7);
      return "Success! "+form["firstname"].toUpperCase() + " " + form["lastname"].toUpperCase() + " now has "+updatedPts+" ITS Points.";
    }
  } catch (error) {
    return "Error: " + error.toString() + "%" + form.fmid;
  }

}

/* ----------------------------- View Record ----------------------------- */

/*
Triggered when the web-app is visited (Computer Jargon: POST Request)
Will display the record page
*/
function doPost(e){
  if(typeof e !== 'undefined'){
    var form = new Array();
    form["firstname"] = e.parameter.first;
    form["lastname"] = e.parameter.last;
    form["class"] = e.parameter.class;
    return recordRequest2(form);}
}

/*
Returns any applicable Thespian Honor level based on points
*/
function getHonor(pts){
  if(pts >= 180)return "International Honor Thespian";
  else if(pts >= 170)return "16-star Thespian";
  else if(pts >= 160)return "15-star Thespian";
  else if(pts >= 150)return "14-star Thespian";
  else if(pts >= 140)return "13-star Thespian";
  else if(pts >= 130)return "12-star Thespian";
  else if(pts >= 120)return "National Honor Thespian (11-star)";
  else if(pts >= 110)return "10-star Thespian";
  else if(pts >= 100)return "9-star Thespian";
  else if(pts >= 90)return "8-star Thespian";
  else if(pts >= 80)return "7-star Thespian";
  else if(pts >= 70)return "6-star Thespian";
  else if(pts >= 60)return "Honor Thespian (5-star)";
  else if(pts >= 50)return "4-star Thespian";
  else if(pts >= 40)return "3-star Thespian";
  else if(pts >= 30)return "2-star Thespian";
  else if(pts >= 20)return "1-star Thespian";
  else return "No Thespian Honors";

}

/*
Gets and presents the points record
*/
function recordRequest2(form){
  try{
    //Make sure all the proper data is here
    for each(var i in form){
     if(i == "" || i == null)
       throw "You Forgot Something!";
    }

    //Get the ID for the spreadsheet
    var properties = PropertiesService.getScriptProperties();
    var ssid = properties.getProperty("ssid");
    var spreadsheet, sheet;

    //If the Spreadsheet exists, open it. Otherwise, return an error
    if(ssid != null && !DriveApp.getFileById(ssid).isTrashed()){
        spreadsheet = SpreadsheetApp.openById(ssid);
    } else{
      throw "No Records!";
    }

   //Find the sheet containing this person's record
    var allsheets = spreadsheet.getSheets();
    var sheetname = form["class"]+" "+form["lastname"].toUpperCase() + " " + form["firstname"].toUpperCase();
    var match = 0;
    for each (var i in allsheets){
      if (i.getName() == sheetname){
        match = 1;
        sheet = i;
        break;
      }
    }
    if(match == 0){
      throw "No Record of Name. Did you mistype?";
    }

    //Get Data

    //Induction Status
    var induct = sheet.getRange(1,4).getValue();

    //Points Entries
    range = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn());
    var data = range.getValues();

    //Turn that data into Strings so it can be displayed properly
    var returnArray = new Array();
    for each(var row in data){
      var rowArray = new Array();
      for each(var cell in row){rowArray.push(cell.toString());}
      returnArray.push(rowArray);
   }
    //Format and display the record

    //Load the HTML file
    var html = HtmlService.createHtmlOutputFromFile('record.html');

    //header
    html.append("<center><font size='3'> <table border='0' padding='6px'><tr align='center' valign='middle'><td class='outer' align='center' valign='middle'><img src='https://higherlogicdownload.s3.amazonaws.com/SCHOOLTHEATRE/e2ccb034-79eb-4df8-bafa-f3340eef52a1/UploadedImages/its_4c_pos_h_tag_WEB_300x88.png' width='150px' /></td></tr></table>");
    html.append("<div class='header'>" + troupe_name + " Points Tracker</div><br />");

    //Student name and general profile
    html.setTitle("ITS Point Record for "+form["firstname"].toUpperCase()+" "+form["lastname"].toUpperCase()).setSandboxMode(HtmlService.SandboxMode.IFRAME);
    html.append("<div class='header2'>"+form["firstname"].toUpperCase()+" "+form["lastname"].toUpperCase()+", Class of "+form["class"]+"<br>");
    html.append(induct+"<br>");
    var totalPts = parseFloat(sheet.getRange(sheet.getLastRow(), 5).getValue());
    html.append(getHonor(totalPts)+"<br>");
    html.append("</div>");

    //Print button
    html.append("<input type='button' value='Print' onclick='this.style.display="+'"'+"none"+'"'+"; window.print(); this.style.display="+'"'+"block"+'"'+"' /><br>");

    //Table of information
    html.append(buildTable(returnArray));

    //disclaimer
    html.append("<br><br><br><font size='1'>*This page is not affiliated with the Educational Theatre Association</font>");

    //return page
    return html;
  }
  catch(error){return ContentService.createTextOutput("Error: "+error.toString());}
}

/*
Returns the HTML table used to display records
*/
function buildTable(returner){
  //table header
  var outputstr = "<table><tr class='tablehead'>";
  for (var j = 0; j < returner[0].length; j++) {
         outputstr = outputstr.concat("<td class='tablehead'>"+returner[0][j].toString()+"</td>");
    }
  outputstr = outputstr.concat("</tr>");
  //data rows
  for (var i = 1; i < returner.length; i++) {
    outputstr = outputstr.concat("<tr class='i'>");
    for (var j = 0; j < returner[i].length; j++) {
         outputstr = outputstr.concat("<td class='i'>"+returner[i][j].toString()+"</td>");
      }
    outputstr = outputstr.concat("</tr>");
  }
  //close table
  outputstr = outputstr.concat("</table></font>");
  return outputstr
}
