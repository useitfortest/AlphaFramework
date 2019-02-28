function runVolumeTest(){

    //set variables for this test case
	value_id = "volumeValue";
	result_id = "volumeResult";
	error_id = "volumeError";

	var isExecuted = false;
	var isVolumeUpdated = false;
	var volume = parseFloat(document.getElementById(value_id).value.trim());
	var local_error_text = "<pre>Volume is not changed. Use values from the interval [0,1]."
	if (volume > 1 || volume < 0) {
	    volume = NaN;
	}

    //Reload video to play if it is not played
    if (player.readyState != player.HAVE_ENOUGH_DATA || player.paused) {
        player.load();
    }

    //Function to set result for this test case
    function setResult() {
        isExecuted = true;
        if (player.volume == volume) {
            player.muted=false; //Unmute if it was muted as if the user changed volume
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
        if (isNaN(volume) ) {
            local_error_text = "<pre>Incorrect input value is entered. Use values 0 or 1.";
            throw "";
        }
         player.volume = volume;
        error_text = local_error_text;
        isVolumeUpdated = true;
    } catch (e) {
        error_text = error_text + "<pre>" +local_error_text;
        throw error_text;
    } finally {
        //Update result
        if (!isVolumeUpdated) { //We don't need to fire in case of seeking manually
            setResult();
        }
    }

}