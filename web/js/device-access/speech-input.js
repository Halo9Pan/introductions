function speechInput() {
  var field = document.getElementById("speech-input-field");
  var recognition = new webkitSpeechRecognition();
  recognition.onresult = function(event) { 
    var results = event.results;
    if(results.length > 0) {
        for(var i = 0; i<results.length; i++) {
          var t = results[i][0].transcript;
          field.value = t;
          console.log(t);
        }
    }
  }
  recognition.start();
  field.blur();
}

