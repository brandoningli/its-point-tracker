/*****
ITS Point Tracker
Created by Brandon Ingli, Class of 2017
Troupe 5424, Marquette High School, Chesterfield, MO

This tool is not affiliated with the Educational Theatre Society

This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

TO GET THE ITS POINT TRACKER OPERATIONAL WITH YOUR TROUPE...

1) Customize Troupe Name and Password
   a) Open Code.gs
   b) Near the top of the file, find the "Troupe Configuration" section.
   c) Change the troupe name and password to your liking. ** Make sure to only change what is between the quotation marks **

2) Publish this script as a Web App
   a) Go to Publish > Deploy as web app...
   b) Change "Project Version" to "new"
   c) Make sure the app executes as "me" and that "Anyone, even anonymous" has access.
      i) If you use this on a school-associated account, you may only see "Anyone within school.org" as an option. Use this one, but keep in mind
         students will need to first sign in to their school Google Apps account before using the system. You may wish to create a new Google Account
         not associated with your school to use this script with. It's free!
   d) Hit Publish.
   e) Make note of your project's URL below for future reference.

   Current web app URL:

3) Deploy the Web forms
   a) There are two web forms, "request_form.html" for the add records requests, and "view_form.html"
   b) Copy the entire contents of the file and paste into an HTML Snippet on your website. This varies by web host / provider.
   c) On both forms, find the "Troupe Configuration" section near the top.
   d) Change the url to match your project's URL from above. ** Make sure to only change what is between the quotation marks **
   e) On the request form, change the email address to the email address of the person in charge of awarding points, i.e. the Troupe Director.
   f) Publish your website



YOU SHOULD NOW HAVE A FUNCTIONING ITS POINTS TRACKER!

A FEW NOTES ABOUT THE TRACKER:

*You can move both this script file and the spreadsheet generated to hold your records into any folder of Google Drive you would like.
*If you need to make any edits to records, directly edit the spreadsheet. Make sure there are no extra spaces in the points columns to avoid future error.
*Delete records by deleting the sheet for each student. If you accidentally delete a record, you may be able to use the revision history in Google Sheets to restore it. Keep in mind that this will reverse all changes up until that point.
*The size limit of Google Spreadsheets is 2 million cells, which you are highly unlikely to reach. Should you get errors about exceeding size limitations or quotas, you'll need to delete old records before continuting.


*****/
