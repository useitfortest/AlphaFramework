function runMuteTest(){
	//set variables for this test case
    value_id = "muteValue";
    result_id = "muteResult";
    error_id = "muteError";

    var isExecuted = false;
    var muted = parseInt(document.getElementById(value_id).value.trim(),10);
    var local_error_text = "<pre>Mute value is not applied.";
    //var isMuteUpdated = false;
    var isMuted = NaN;
    if (muted == 0) {
        isMuted = false;
    } else if (muted == 1) {
        isMuted = true;
    }

    //Reload video to play if it is not played
    if (player.readyState != player.HAVE_ENOUGH_DATA || player.paused) {
        player.load();
    }

    //Function to set result for this test case
    function setResult() {
        isExecuted = true;
        if (player.muted == isMuted) {
            document.getElementById(result_id).innerHTML = test_passed;
            document.getElementById(error_id).innerHTML = "";
        } else {
            document.getElementById(result_id).innerHTML = test_failed;
            document.getElementById(error_id).innerHTML = error_text;
        }
        error_text = "";
    }

    //Fire in case of changing volume
    player.onvolumechange = function() {
        if (!isExecuted) { //We don't need to fire in case of changing volume manually
            setResult();
        }
    };

    //Get ready state to ensure the video is available
    try {
        if (player.readyState != player.HAVE_ENOUGH_DATA) {
            local_error_text = "<pre>Not enough data available to execute the test.";
            throw ""
        }
        duration = player.duration;
        if (isNaN(isMuted) ) {
            local_error_text = "<pre>Incorrect input value is entered. Use values 0 or 1.";
            throw "";
        }
        player.muted = isMuted;
        error_text = local_error_text;
        //isMuteUpdated = true;
    } catch (e) {
        error_text = error_text + "<pre>" +local_error_text;
        throw error_text;
    } finally {
        //Update result
        setResult();
    }

}