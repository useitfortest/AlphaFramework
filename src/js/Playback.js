function runPlaybackTest(){
    //set variables for this test case
    result_id = "playbackResult";
    error_id = "playbackError";

    var local_error_text = "<pre>The video is not playing.";

    //Function to set result for this test case
    function setResult() {
        if ((player.currentTime == 0 || player.paused) && player.autoplay) {//The video is not playing or it is not loading
            document.getElementById(result_id).innerHTML = test_failed;
            document.getElementById(error_id).innerHTML = error_text;
        } else if (player.currentTime > 0 && !player.paused && player.autoplay) {//The video is playing
            document.getElementById(result_id).innerHTML = test_passed;
            document.getElementById(error_id).innerHTML = "";
        }
        error_text = "";
    }

    //Get ready state to ensure the video is available
    try {
        if (player.readyState != player.HAVE_ENOUGH_DATA) {
            throw ""
        }
        error_text = local_error_text;
    } catch (e) {
        error_text = error_text + "<pre>" +local_error_text + ".<pre>Not enough data available to start playing.";
        throw error_text;
    } finally {
        //Update result
        setResult();
    }

}