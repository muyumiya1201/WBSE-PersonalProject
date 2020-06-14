
function sendOrder(){
	
	let title = document.getElementById('title').value;
	let content = document.getElementById('content').value;
	let name = document.getElementById('name').value;
	let phone = document.getElementById('phone').value;
	let address = document.getElementById('address').value;
	
	let order = { 'title' : title,
				  'content' : content,
				  'name' : name,
				  'phone' : phone,
				  'address' : address,
				  'status' : '未處理'
				};
	
	
	const postUrl = '/repair';	
	
	fetch(postUrl, {
		body: JSON.stringify(order),
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
		  'user-agent': 'Mozilla/4.0 MDN Example',
		  'content-type': 'application/json',
		},
		method: 'POST',
		mode: 'cors',
		redirect: 'follow',
		referrer: 'no-referrer',
	  });	
}

function getOrder(){
	
	const getUrl = '/repair';
	
	const result = fetch(getUrl, {
		body : JSON.stringify(order),
		cache : 'no-cache',
		credentials : 'same-origin',
		headers : {
			'user-agent' : 'Mozilla/4.0 MDN Example',
			'content-type' : 'application/json',
		},
		method : 'GET',
		mode : 'cors',
		redirect : 'follow',
		referrer : 'no-referrer',
	});	
	
	const resultData = result.json();
	showOrder(resultData);
}






function init(){
	document.getElementById('submit').addEventListener('click', sendOrder);
}

window.addEventListener('load', init);