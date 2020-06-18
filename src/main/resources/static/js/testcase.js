
let updateTestcaseId = "";
let method = "";

const modalId = ['identification', 'name', 'tested-target', 'severity', 'input', 'instruction', 'expected-result', 'test-result'];


async function getTestcase(){

    const getUrl = '/testcase';

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
	showTestcase(resultData);

}

async function showTestcase(resultData){
	const testcaseResult = document.getElementById('show-testcase');
    let tmp = "";
    
    resultData.forEach(testcase => {
        let colorId = "fail";
    	if(testcase.testResult.toLowerCase() == "pass"){
            console.log(testcase.testResult.toLowerCase());
    		colorId = "pass";
        }
        console.log(testcase.testResult + " - " + testcase.identification + " - " + colorId);
        tmp += `    
            <div class="card border-dark" id="${testcase.id}">
                <div class="card-body" id=${colorId}>
                    <h5 class="card-title"><b>${testcase.identification}</b></h5>
                    <table class="table" id="${testcase.id}">
                        <tr>
                            <th scope="row">Name:</th>
                            <td>${testcase.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Tested target:</th>
                            <td>${testcase.testedTarget}</td>
                        </tr>
                        <tr>
                            <th scope="row">Severity:</th>
                            <td>${testcase.severity}</td>
                        </tr>
                        <tr>
                            <th scope="row">Input:</th>
                            <td>${testcase.input}</td>
                        </tr>
                        <tr>
                            <th scope="row">Instruction:</th>
                            <td>${testcase.instruction}</td>
                        </tr>
                        <tr>
                            <th scope="row">Expected result:</th>
                            <td>${testcase.expectedResult}</td>
                        </tr>
                        <tr>
                            <th scope="row">Test result:</th>
                            <td>${testcase.testResult}</td>
                        </tr>
                        <tr>
                            <th scope="row"</th>
                            <td>
                                <button class="btn btn-primary" type="button" id="${testcase.id}-update-status" onclick="callModal(this)">修改</button>
                                <button class="btn btn-primary" type="button" id="${testcase.id}-delete" onclick="deleteTestcase(this)">刪除</button>
                            </td>
                        </tr>
                        
                    </table>
                </div>
            </div>`;
	});
    testcaseResult.innerHTML = tmp;
	
}

function callModal(element){
	initModal();
	const action = element.id;
	if(action == 'add-testcase'){
		method = 'POST';
		document.getElementById('title').innerHTML = '新增測試案例';
	} else {
		
		document.getElementById('title').innerHTML = '編輯測試案例';
        const testcaseId = action.split('-')[0];
        
        const testcaseData =  $(`#${testcaseId} td`);

		updateTestcaseId = testcaseId;
        method = 'PUT';

        for(let i = 0; i < 7; i++){
            document.getElementById(`${modalId[i+1]}`).value = testcaseData[i].innerHTML;
        }
		
		document.getElementById('identification').value =  $(`#${testcaseId} b`)[0].innerHTML;
	}
	$('#edit-note-modal').modal('show');
}

function initModal(){
    
    for(let i = 0; i < 8; i++){
        document.getElementById(`${modalId[i]}`).value = "";
    }
}


async function updateTestcase(){
    if(document.forms['testcase-form'].reportValidity()){

		let testcaseData =  $('.modal-body input');		
		const instruction = document.getElementById('instruction').value;
		
		let testcase = {'identification' : testcaseData[0].value,
                        'name' :  testcaseData[1].value,
                        'testedTarget' : testcaseData[2].value,
                        'severity' :  testcaseData[3].value,
                        'input' : testcaseData[4].value,
                        'instruction' : instruction,
                        'expectedResult' : testcaseData[5].value,
                        'testResult' : testcaseData[6].value
				    };
		
		let postUrl = '/testcase';
		if(method == 'PUT') {
			postUrl = '/testcase/' + testcaseData[0].value;
		}
			
		
		const result = await fetch(postUrl, {
			body: JSON.stringify(testcase),
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
            //新增失敗
		}

	}
}


function deleteTestcase(element){
	const testcaseId = element.id.split('-')[0];
	deleteUrl = '/testcase/' + testcaseId;

	fetch(deleteUrl, {
		method: 'DELETE',
	  });

	window.location.reload();

}

function deleteAll(){

	if (confirm('確定要清除所有測試案例？')) {
		fetch('/testcase', {
			method : 'DELETE',
		});

		window.location.reload();
	  }
}



function init(){
	getTestcase();
}

window.addEventListener('load', init);