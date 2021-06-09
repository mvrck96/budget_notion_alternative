function getDdate() {
	const today = new Date();
	var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear().toString().substr(-2);
	var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	return date + '_' + time;
}

function createFileName(name, isMd) {
	var today = new Date();
	var ext = 'txt'
	if (isMd === true) {
		ext = 'md'
	}
	dateTime = getDdate().replaceAll('/', '-').replaceAll(':', '-')
	return name.replaceAll(' ', '_') + dateTime + '.' + ext
}

function createFileBody(arr, isMd) {
	quoteLine = '> Tags: '
	let [title, tag, text] = arr;
	if (isMd === true) { 
		title = '# '.concat(title + ' ', getDdate().replace('_', ' @ '), '\n')
		tag = quoteLine.concat(tag, '\n'.repeat(2))
	} else {
	    title = 'Title: ' + title + '\n' + 'Date: ' + getDdate().replace('_', ' @ ') + '\n'
	    tag = 'Tags: ' + tag + '\n' 
	}
	return ''.concat(title, tag, text)
}

function saveTextAsFile() {
	var name = document.getElementById('txtName').value;
	var country = document.getElementById('selectTag').value;
	var msg = document.getElementById('msg').value;
	var isMd = document.getElementById('check').checked;
	var textToWrite = createFileBody([name, country, msg], isMd);

	var textFileAsBlob = new Blob([textToWrite], {
		type: 'text/plain'
	});
	var fileNameToSaveAs = createFileName(name, isMd);

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null) {
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	} else {
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
}

function getObject(){
	var obj = {name: '', tag: '', text:''}
	var name = document.getElementById('txtName').value;
	var country = document.getElementById('selectTag').value;
	var msg = document.getElementById('msg').value;
	var isMd = document.getElementById('check').checked;

	obj.name = name;
	obj.tag = country;
	obj.text = msg;

	console.log(obj)
	var today = new Date();
	localStorage.setItem('obj' + today, JSON.stringify(obj));
	return obj
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
	console.log(values)
    return values;
}

function deleteAllObjects(){
	localStorage.clear()
}

var button = document.getElementById('bt');
button.addEventListener('click', saveTextAsFile);

var button = document.getElementById('btObj');
button.addEventListener('click', getObject);

var button = document.getElementById('btListObj');
button.addEventListener('click', allStorage);

var button = document.getElementById('btDeleteAll');
button.addEventListener('click', deleteAllObjects);