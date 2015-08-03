	document.getElementById('request-permission').addEventListener('click', function() {
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
	}, false);

	document.getElementById('show-notifications').addEventListener('click', function() {
		readList();
	}, false);

	function readList() {
		var list = [
		      	{
		    		"icon":"assets/refresh.png",
		    		"title":"One",
		    		"message":"This is the first Notification.",
            "tag":"one"
		    	},
		    	{
		    		"icon":"assets/refresh.png",
		    		"title":"Two",
		    		"message":"This is the second Notification.",
            "tag":"two"
		    	}
		    	
		];
		fetchList(list);
	}

	function fetchList(data) {
		var n;
		var i = data.length;
		while (i--) {
			n = data[i];
      if (window.Notification && Notification.permission === "granted") {
        var n = new Notification(n.title, {icon: n.icon, body: n.message, tag: n.tag});
			} else {
				// Note that we can't call requestPermission from here as we are in the callback function and not triggered just on user action
				alert('You have to click on "Set notification permissions for this page" first to be able to receive notifications.');
				return;
			}
		}
	}
