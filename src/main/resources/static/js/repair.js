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
    	if (order.status == 2){
			tmp+=`<tr class="table-success" id="${order.id}">`;
		} else {
			tmp+=`<tr class="table-danger" id="${order.id}">`;
		}
		tmp += `
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
		document.getElementById('missing-number').innerText = $(`#${orderId} td`)[2].innerText;
		document.getElementById('assignee').value = $(`#${orderId} td`)[3].innerText;
		$(`input[name="missing-status"][id=${status}]`).prop('checked', true);
		document.getElementById('repair-description').value = $(`#${orderId} td`)[5].innerText;
	}
	$('#edit-note-modal').modal('show');
}

function initModal(){
	document.getElementById('missing-id').value = "";
	document.getElementById('missing-content').value = "";
	$(`input[name="missing-severity"][id="High"]`).prop('checked', true);
	document.getElementById('missing-number').innerText = "";
	document.getElementById('assignee').value = "";
	$(`input[name="missing-status"][id="Opened"]`).prop('checked', true);
	document.getElementById('repair-description').value = "";
}

async function updateOrder(){

	if(document.forms['order-form'].reportValidity()){
		let missingData =  $('.modal-body input');
		
		const severityId = $("input[name='missing-severity']:checked").val();
		const statusId = $("input[name='missing-status']:checked").val();
		const missingNumber = document.getElementById('missing-number').innerText;
		
		let order = { 'missingId' : missingData[0].value,
					'severity' : severityId,
					'missingContent' : missingData[4].value,
					'missingNumber' : missingNumber,
					'assignee' : missingData[5].value,
					'status' : statusId,
					'repairDescription' : missingData[8].value,
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


async function getTestcaseId(){
	
	const getUrl = '/testcase';
	
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
	showTestcaseId(resultData);
}

async function showTestcaseId(resultData){
	const testcaseIdResult = document.getElementById('testcase-id');
    let tmp = "";
    resultData.forEach(testcaseId => {
		tmp += `<button class="dropdown-item" type="button" id="${testcaseId.identification}" onclick="setTestcaseId(this)">${testcaseId.identification}</button>`;
	});
    testcaseIdResult.innerHTML = tmp;
	
}

function setTestcaseId(element){
	const testcaseId = element.id;
	document.getElementById('missing-number').innerText = testcaseId;
}


function init(){
	getOrder();
	getTestcaseId();
}

window.addEventListener('load', init);