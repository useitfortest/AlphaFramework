function runSeekingTest(){
	//set variables for this test case
    value_id = "seekingValue";
    result_id = "seekingResult";
    error_id = "seekingError";

    var isExecuted = false;
    var desiredTime = parseInt(document.getElementById(value_id).value.trim(),10);
    var duration = 0; //duration in seconds
    var local_error_text = "<pre>Desired position is not opened.";
    var isSeeked = false;

    //Reload video to play if it is not played
    if (player.readyState != player.HAVE_ENOUGH_DATA || player.paused) {
        player.load();
    }

    //Function to set result for this test case
    function setResult() {
        isExecuted = true;

        if (player.currentTime == desiredTime) {
            document.getElementById(result_id).innerHTML = test_passed;
            document.getElementById(error_id).innerHTML = "";
        } else {
            document.getElementById(result_id).innerHTML = test_failed;
            document.getElementById(error_id).innerHTML = error_text;
        }
        error_text = "";
    }

    //Fire in case of changing volume
    player.onseeked = function() {
        if (!isExecuted) { //We don't need to fire in case of seeking manually
            setResult();
        }
    };

    //Get ready state to ensure the video is available
    try {
        if (player.readyState != player.HAVE_ENOUGH_DATA) {
            local_error_text = "<pre>Not enough data available to start playing.";
            throw ""
        }
        duration = player.duration;
        if (isNaN(desiredTime) || desiredTime < 0 || desiredTime > duration) {
            local_error_text = "<pre>Incorrect input value is entered. Use integer values from the interval [0,"+duration+"]";
            throw "";
        }
        player.currentTime = desiredTime;
        error_text = local_error_text;
        isSeeked = true;
    } catch (e) {
        error_text = error_text + "<pre>" +local_error_text;
        throw error_text;
    } finally {
        //Update result
        if (!isSeeked) { //We don't need to fire in case of seeking manually
            setResult();
        }
    }

}