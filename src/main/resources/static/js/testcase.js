
let updateTestcaseId = "";
let method = "";

const modalId = ['identification', 'name', 'tested-target', 'input', 'instruction', 'expected-result'];
const severity = ['', 'High', 'Medium', 'Low'];
const testResultStatus = ['', 'Pass', 'Fail'];

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
        let colorId = "color-fail";
    	if(testcase.testResult == "1"){
    		colorId = "color-pass";
        }
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
                            <td>${severity[testcase.severity]}</td>
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
                            <td>${testResultStatus[testcase.testResult]}</td>
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
        
        const severity = $(`#${testcaseId} td`)[2].innerText;
        const testResult = $(`#${testcaseId} td`)[6].innerText;

        document.getElementById('identification').value =  $(`#${testcaseId} b`)[0].innerHTML;
        document.getElementById('name').value = testcaseData[0].innerText;
        document.getElementById('tested-target').value = testcaseData[1].innerText;
        $(`input[name="missing-severity"][id=${severity}]`).prop('checked', true);
        document.getElementById('input').value = testcaseData[3].innerText;
        document.getElementById('instruction').value = testcaseData[4].innerText;
        document.getElementById('expected-result').value = testcaseData[5].innerText;
        $(`input[name="test-result"][id=${testResult}]`).prop('checked', true);
	}
	$('#edit-note-modal').modal('show');
}

function initModal(){
    
    for(let i = 0; i < modalId.length; i++){
        document.getElementById(`${modalId[i]}`).value = "";
    }
}


async function updateTestcase(){
    if(document.forms['testcase-form'].reportValidity()){

        let testcaseData =  $('.modal-body input');		
        const severityId = $("input[name='missing-severity']:checked").val();
        const testResultId = $("input[name='test-result']:checked").val();
        const instructionText = document.getElementById('instruction').value;
		
		let testcase = {'identification' : testcaseData[0].value,
                        'name' :  testcaseData[1].value,
                        'testedTarget' : testcaseData[2].value,
                        'severity' :  severityId,
                        'input' : testcaseData[6].value,
                        'instruction' : instructionText,
                        'expectedResult' : testcaseData[7].value,
                        'testResult' : testResultId
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