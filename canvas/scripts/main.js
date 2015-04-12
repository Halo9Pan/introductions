var C = (function (w, d) {
	var r = {},
		privateVariable = 1;

	var allTextArea = function() {
        return d.querySelectorAll('.code>textarea')
	}

	var allFrame = function() {
        return d.querySelectorAll('.code>iframe')
	}

	var allRootContainer = function() {
        return d.querySelectorAll('.root')
	}

	var allCodeContainer = function() {
        return d.querySelectorAll('.code')
	}

	var allDemoContainer = function() {
        return d.querySelectorAll('.demo')
	}
    
    var nodeListArray = function(nl) {
        var arr = Array.prototype.slice.call(nl);
        return arr;
    }
    
    var loadPages = function() {
        var rootContainerList = allRootContainer();
        var rootContainers = nodeListArray(rootContainerList);
        rootContainers.forEach(loadPage);
    }

    var loadPage = function(container, index, array) {
        var id = container.id;
        var href = "pages/default.html"
        if(id) {
            href = "pages/" + id + ".html";
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", href, false);
        xmlhttp.send();
        var content = xmlhttp.responseText;
        var codeTextArea = container.querySelector('textarea');
        codeTextArea.textContent = content;
    }
    
    var initPreview = function() {
        var nl = allTextArea();
        var ata = nodeListArray(nl);
        ata.forEach(preview);
    }
    
    var preview = function(ta, index, array) {
        var codeContainer = ta.parentNode;
        var rootContainer = codeContainer.parentNode;
        var demoContainer = rootContainer.querySelector('.demo');
        var f = demoContainer.querySelector('iframe');
        var delay;
        var editor = CodeMirror.fromTextArea(ta, {
            lineWrapping: true,
            lineNumbers: true,
            fixedGutter: false,
            mode: 'text/html'
        });
        editor.on("change", function() {
            clearTimeout(delay);
            delay = setTimeout(function(){
                updatePreview(f, editor);
            }, 300);
        });
        setTimeout(function(){
                updatePreview(f, editor);
            }, 300);
    }

    var updatePreview = function(f, e) {
        if(f && e){
            var preview =  f.contentDocument ||  f.contentWindow.document;
            preview.open();
            preview.write(e.getValue());
            preview.close();
        }
    }
    
	r.moduleProperty = 1;
	r.init = {preview: initPreview, content: loadPages};

	return r;
}(window, document));

C.init.content();
C.init.preview();