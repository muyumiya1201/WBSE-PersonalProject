updateMissingId = "";
method = "";

async function getOrder(){
	
	const getUrl = '/repair';
	
	const result = await fetch(getUrl, {
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
	
	const resultData = await result.json();
	showOrder(resultData);
}

async function showOrder(resultData){
	
	const orderResult = document.getElementById('order-data');
    let tmp = "";
    resultData.forEach(order => {
		tmp += `<tr id="${order.id}">
					<th scope="row">${order.missingId}</th>
					<td>${order.severity}</td>
					<td>${order.missingContent}</td>
					<td>${order.missingNumber}</td>
					<td>${order.assignee}</td>
					<td>${order.status}</td>
					<td>${order.repairDescription}</td>
					<td>
						<button class="btn btn-primary" type="button" id="${order.id}-update-status" onclick="callModal(this)">修改</button>
						<button class="btn btn-primary" type="button" id="${order.id}-delete" onclick="deleteOrder(this)">刪除</button>
					</td>
				</tr>`;
	});
    orderResult.innerHTML = tmp;

}

function deleteOrder(element){
	const orderId = element.id.split('-')[0];
	deleteUrl = '/repair/' + orderId;

	fetch(deleteUrl, {
		method: 'DELETE',
	  });

	window.location.reload();

}

function deleteAll(){

	if (confirm('確定要清除所有缺失？')) {
		fetch('/repair', {
			method : 'DELETE',
		});

		window.location.reload();
	  }
}

function callModal(element){
	initModal();
	const action = element.id;
	if(action == 'add-order'){
		method = 'POST';
		document.getElementById('title').innerHTML = '新增缺失';
	} else {
		
		document.getElementById('title').innerHTML = '編輯缺失';
		const orderId = action.split('-')[0];

		updateMissingId = orderId;
		method = 'PUT';

		document.getElementById('missing-id').value = $(`#${orderId} th`)[0].innerText;
		for(let i = 0; i < 5; i++){
			$('.modal-body input')[i+1].value = $(`#${orderId} td`)[i].innerText;
		}		
	}
	$('#edit-note-modal').modal('show');
}

function initModal(){

	const length = $('.modal-body input').length;

	for(let i = 0; i < length; i++){
		$('.modal-body input')[i].value = "";
	}
}

async function updateOrder(){

	if(document.forms['order-form'].reportValidity()){
		let missingData =  $('.modal-body input');
		console.log(missingData);

		

		let order = { 'missingId' : missingData[0].value,
					'severity' : missingData[1].value,
					'missingContent' : missingData[2].value,
					'missingNumber' : missingData[3].value,
					'assignee' : missingData[4].value,
					'status' : missingData[5].value,
					'repairDescription' : missingData[6].value,
				};

		let postUrl = '/repair';
		if(method == 'PUT') {
			postUrl = '/repair/' + missingData[0].value;
		}
			
		
		const result = await fetch(postUrl, {
			body: JSON.stringify(order),
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
			'user-agent': 'Mozilla/4.0 MDN Example',
			'content-type': 'application/json',
			},
			method: method,
			mode: 'cors',
			redirect: 'follow',
			referrer: 'no-referrer',
		});
		if (result.status === 201) {
			window.location.reload();
		} else {
			//document.getElementById('login-wrong').innerText = '帳號或密碼錯誤';
		}

	}
}



function init(){
	getOrder();
}

window.addEventListener('load', init);