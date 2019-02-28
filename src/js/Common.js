window.addEventListener("error", handleError, true);
var event = document.createEvent('Event');
event.initEvent('error', true, true);

var player = document.getElementById("myVideo");
var table_id = "Tests"
var isPassed = false;
var test_passed = '<span style="color:green">Passed</span>';
var test_failed = '<span style="color:red">Failed</span>';
var value_id = "";
var result_id = "";
var error_text  = "";
var error_id = "";

    function handleError(evt) {
        if (evt.message) {
          error_text = "<a href=\""+evt.filename+"\">File: "+evt.filename+"</a><pre>Line number: "+evt.lineno+"<pre>Error: "+evt.message;
        } else {
          error_text = "Element: "+(evt.srcElement || evt.target)+"<pre>Error: "+evt.type;
        }
        try { //display errors also if id is incorrect
            document.getElementById(error_id).innerHTML=error_text;
            document.getElementById(result_id).innerHTML=test_failed;
            document.getElementById(table_id).style="width:100%";
        } catch (e) {
            if (document.getElementById(error_id)==null) {
                document.getElementById("handledErrors").innerHTML = error_text;
            }
        } finally {
            error_text="";
        }
    }