let updateMissingId = "";
let method = "";

const severity = ['', 'High', 'Medium', 'Low'];
const status = ['', 'Opened', 'Closed'];

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
    	if(order.assignee == ""){
    		order.assignee = "無人接手";
    	}
    	if(order.repairDescription == ""){
    		order.repairDescription = "無";
    	}
    	
		tmp += `<tr id="${order.id}">
					<th scope="row">${order.missingId}</th>
					<td>${severity[order.severity]}</td>
					<td>${order.missingContent}</td>
					<td>${order.missingNumber}</td>
					<td>${order.assignee}</td>
					<td>${status[order.status]}</td>
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
		
		const severity = $(`#${orderId} td`)[0].innerText;
		const status = $(`#${orderId} td`)[4].innerText;
		
		document.getElementById('missing-id').value = $(`#${orderId} th`)[0].innerText;
		$(`input[name="missing-severity"][id=${severity}]`).prop('checked', true);
		document.getElementById('missing-content').value = $(`#${orderId} td`)[1].innerText;
		document.getElementById('missing-number').value = $(`#${orderId} td`)[2].innerText;
		document.getElementById('assignee').value = $(`#${orderId} td`)[3].innerText;
		$(`input[name="missing-status"][id=${status}]`).prop('checked', true);
		document.getElementById('repair-description').value = $(`#${orderId} td`)[5].innerText;
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
		
		
		const severityId = $("input[name='missing-severity']:checked").attr('id');
		const statusId = $("input[name='missing-status']:checked").attr('id');
		
		let order = { 'missingId' : missingData[0].value,
					'severity' : severity.indexOf(severityId),
					'missingContent' : missingData[4].value,
					'missingNumber' : missingData[5].value,
					'assignee' : missingData[6].value,
					'status' : status.indexOf(statusId),
					'repairDescription' : missingData[9].value,
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
		if (result.status === 201 || result.status === 200) {
			window.location.reload();
		} else {
			// document.getElementById('login-wrong').innerText = '帳號或密碼錯誤';
		}

	}
}

async function orderBy(element){
	const orderByAttr = element.id.split('-')[2];
	const getUrl = '/repair?' + orderByAttr + "=1";
	
	const result = await fetch(getUrl, {
		cache : 'no-cache',
		credentials : 'same-origin',
		headers : {
			'user-agent' : 'Mozilla/4.0 MDN Example',
		},
		method : 'GET',
		mode : 'cors',
		redirect : 'follow',
		referrer : 'no-referrer',
	});	
	
	const resultData = await result.json();
	showOrder(resultData);
}


function init(){
	getOrder();
}

window.addEventListener('load', init);