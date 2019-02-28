function runPauseTest(){
	//set variables for this test case
    value_id = "pauseValue";
    result_id = "pauseResult";
    error_id = "pauseError";
    error_text = "";

    var local_error_text = "<pre>The video is not paused.";
    var playControl;
    var isExecuted = false;
    var interval_counter = 0;
    var isPlayAwaiting = false;
    var isLoaded = false;
    var max_delay = parseInt(document.getElementById(value_id).value.trim(),10); //Max value of delay in seconds
    if (max_delay < 0) {
        max_delay = NaN;
    }

    //Reload video to play if it is not played
    if (player.readyState != player.HAVE_ENOUGH_DATA || player.paused) {
        player.load();
    }

    //Function to set result for this test case
    function setResult() {
        isExecuted = true;
        if (player.paused && !isNaN(max_delay) && interval_counter < max_delay) {
            document.getElementById(result_id).innerHTML = test_passed;
            document.getElementById(error_id).innerHTML = "";
        } else {
            if (!isNaN(max_delay) && interval_counter > max_delay) {
                error_text = "<pre>Delay exceeded.";
            }
            document.getElementById(result_id).innerHTML = test_failed;
            document.getElementById(error_id).innerHTML = error_text;
        }
    }

    //Fire in case of activating pause
    player.onpause = function() {
        if (!isExecuted) { //We don't need to fire in case of pausing manually
            clearInterval(playControl); //Stopping executing function checkPlaying
            setResult();
        }
    };

    //Pause
    function checkPlaying() {
        if (player.currentTime > 0) {
            player.pause();
        }
        interval_counter = interval_counter + 1;
    }

    //Get ready state to ensure the video is available & verify input value
    try {
        if (isNaN(max_delay)) {
            local_error_text = local_error_text + "<pre>Incorrect input data. Use integer value > 0."
            throw "";
        } else if (player.readyState != player.HAVE_ENOUGH_DATA && interval_counter > max_delay) {
            local_error_text = local_error_text + "<pre>Not enough data available to start playing."
            throw "";
        }
        error_text = local_error_text;
        //Pause (check every second until video will play, then pause)
        playControl = setInterval(checkPlaying,1000);
        isPlayAwaiting = true;
    } catch (e) {
        error_text = error_text + "<pre>" +local_error_text;
        throw error_text;
    } finally {
        //Update result
        if (!isPlayAwaiting) {
            if (!isExecuted) {
                setResult();
            }
        }
    }
}