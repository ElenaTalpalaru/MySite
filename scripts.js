// Section 1: Dropdown functionality
document.getElementById('testDropdown').addEventListener('change', function() {
    const result = document.getElementById('dropdownResult');
    result.style.display = 'block';
    
    switch(this.value) {
        case 'option1':
            result.textContent = 'You selected Option 1!';
            break;
        case 'option2':
            result.textContent = 'Option 2 was your choice!';
            break;
        case 'option3':
            result.textContent = 'You went with Option 3!';
            break;
        default:
            result.style.display = 'none';
    }
});

// Section 2: Alert buttons
document.getElementById('showAlertBtn').addEventListener('click', function() {
    alert('This is a test alert!');
    document.getElementById('alertResult').style.display = 'block';
    document.getElementById('alertResult').textContent = 'Alert was displayed and closed';
});

document.getElementById('showConfirmBtn').addEventListener('click', function() {
    const confirmed = confirm('Please confirm this action?');
    document.getElementById('alertResult').style.display = 'block';
    document.getElementById('alertResult').textContent = 'Confirm result: ' + (confirmed ? 'OK' : 'Cancel');
});

document.getElementById('showPromptBtn').addEventListener('click', function() {
    const userInput = prompt('Please enter some text:', 'Default text');
    document.getElementById('alertResult').style.display = 'block';
    document.getElementById('alertResult').textContent = userInput ? 'You entered: ' + userInput : 'Prompt was cancelled';
});

document.getElementById('showCustomAlertBtn').addEventListener('click', function() {
    const customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'block';
    setTimeout(() => {
        customAlert.style.display = 'none';
    }, 3000);
});

// Section 3: Checkboxes
document.getElementById('checkbox1').addEventListener('change', function() {
    document.getElementById('checkbox1Result').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('checkbox2').addEventListener('change', function() {
    document.getElementById('checkbox2Result').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('checkbox3').addEventListener('change', function() {
    const button = document.getElementById('conditionalBtn');
    button.disabled = !this.checked;
});

document.getElementById('conditionalBtn').addEventListener('click', function() {
    const result = document.getElementById('checkboxBtnResult');
    result.style.display = 'block';
    result.textContent = 'Conditional button was clicked successfully!';
});

// Section 4: Input validation
document.getElementById('validateBtn').addEventListener('click', function() {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const result = document.getElementById('validationResult');
    
    result.style.display = 'block';
    result.innerHTML = '';
    
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let isValid = true;
    const errors = [];
    
    if (!nameRegex.test(nameInput.value)) {
        errors.push('Name should contain only letters');
        isValid = false;
    }
    
    if (!emailRegex.test(emailInput.value)) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }
    
    if (passwordInput.value.length < 6) {
        errors.push('Password should be at least 6 characters');
        isValid = false;
    }
    
    if (isValid) {
        result.style.color = 'green';
        result.textContent = 'All fields are valid!';
    } else {
        result.style.color = 'red';
        result.innerHTML = errors.map(error => `<div>${error}</div>`).join('');
    }
});

// Section 5: Dynamic content
document.getElementById('loadContentBtn').addEventListener('click', function() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('dynamicContent');
    
    loading.style.display = 'block';
    content.style.display = 'none';
    
    setTimeout(() => {
        loading.style.display = 'none';
        content.style.display = 'block';
        content.innerHTML = `
            <h3>Dynamically Loaded Content</h3>
            <p>This content was loaded after a delay to simulate an AJAX request.</p>
            <p>Current time: ${new Date().toLocaleTimeString()}</p>
        `;
    }, 2000);
});

let itemCount = 0;
document.getElementById('addItemBtn').addEventListener('click', function() {
    itemCount++;
    const list = document.getElementById('dynamicList');
    const newItem = document.createElement('li');
    newItem.textContent = `Dynamically added item #${itemCount}`;
    newItem.setAttribute('data-testid', `dynamic-item-${itemCount}`);
    list.appendChild(newItem);
});

// Section 6: Sortable table
document.querySelectorAll('#dataTable th').forEach(th => {
    th.addEventListener('click', function() {
        const sortBy = this.getAttribute('data-sort');
        const tbody = document.querySelector('#dataTable tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        const sortedRows = rows.sort((a, b) => {
            const aCol = a.querySelector(`td:nth-child(${getColumnIndex(sortBy)})`).textContent;
            const bCol = b.querySelector(`td:nth-child(${getColumnIndex(sortBy)})`).textContent;
            
            if (sortBy === 'age') {
                return parseInt(aCol) - parseInt(bCol);
            } else {
                return aCol.localeCompare(bCol);
            }
        });
        
        tbody.innerHTML = '';
        sortedRows.forEach(row => tbody.appendChild(row));
    });
});

function getColumnIndex(columnName) {
    const columns = ['id', 'name', 'age', 'city'];
    return columns.indexOf(columnName) + 1;
}

// Section 7: Drag and Drop
document.querySelectorAll('.drag-item').forEach(item => {
    item.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', this.id);
    });
});

const dropTargets = [
    document.getElementById('dragContainer1'),
    document.getElementById('dragContainer2')
];

dropTargets.forEach(target => {
    target.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.backgroundColor = '#e3f2fd';
    });
    
    target.addEventListener('dragleave', function() {
        this.style.backgroundColor = '#f9f9f9';
    });
    
    target.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.backgroundColor = '#f9f9f9';
        
        const itemId = e.dataTransfer.getData('text/plain');
        const item = document.getElementById(itemId);
        
        this.appendChild(item);
        
        const result = document.getElementById('dragResult');
        result.style.display = 'block';
        result.textContent = `Item ${itemId} was moved to ${this.id}`;
    });
});

// Section 8: Progress Bar
let progressInterval;
document.getElementById('startProgressBtn').addEventListener('click', function() {
    const progressBar = document.getElementById('progressBarFill');
    const status = document.getElementById('progressStatus');
    
    let width = 0;
    progressBar.style.width = '0%';
    status.style.display = 'block';
    status.textContent = 'Progress: 0%';
    
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressInterval);
            status.textContent = 'Progress complete!';
        } else {
            width++;
            progressBar.style.width = width + '%';
            status.textContent = `Progress: ${width}%`;
        }
    }, 50);
});

document.getElementById('resetProgressBtn').addEventListener('click', function() {
    clearInterval(progressInterval);
    document.getElementById('progressBarFill').style.width = '0%';
    const status = document.getElementById('progressStatus');
    status.style.display = 'block';
    status.textContent = 'Progress reset to 0%';
});

// Section 9: Image Testing
document.getElementById('changeImageBtn').addEventListener('click', function() {
    const img1 = document.getElementById('testImage1');
    const img2 = document.getElementById('testImage2');
    
    if (img1.style.display !== 'none') {
        img1.style.display = 'none';
        img2.style.display = 'block';
    } else {
        img1.style.display = 'block';
        img2.style.display = 'none';
    }
});

// Section 10: Hover Effects
const hoverArea = document.getElementById('hoverArea');
const hoverText = document.getElementById('hoverText');

hoverArea.addEventListener('mouseenter', function() {
    hoverText.style.display = 'block';
});

hoverArea.addEventListener('mouseleave', function() {
    hoverText.style.display = 'none';
});

// Section 11: Radio Buttons
document.querySelectorAll('input[name="radioGroup"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const result = document.getElementById('radioResult');
        result.style.display = 'block';
        result.textContent = `You selected: ${this.value}`;
    });
});

// Section 12: iFrame
document.getElementById('updateIframeBtn').addEventListener('click', function() {
    const iframe = document.getElementById('testIframe');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    
    iframeDoc.open();
    iframeDoc.write('<html><head><style>body{font-family:Arial;text-align:center;padding:10px}button{padding:5px 10px}</style></head><body><div>This is iframe content</div><button id="iframeBtn">Click Me</button><div id="iframeResult"></div><script>document.getElementById("iframeBtn").addEventListener("click",function(){document.getElementById("iframeResult").textContent="Button in iframe clicked!"});<\/script></body></html>');
    iframeDoc.close();
});