// Event listener for the Encrypt button
document.getElementById('encryptBtn').addEventListener('click', () => {
    let plaintext = document.getElementById('inputText').value;
    let key = document.getElementById('keyInput').value;
    let cipherType = document.getElementById('cipherSelect').value;

    if (!plaintext || !key) {
        alert("Please enter both text and key.");
        return;
    }

    let ciphertext;
    switch (cipherType) {
        case 'vigenere':
            ciphertext = vigenereEncrypt(plaintext, key);
            break;
        case 'auto_key_vigenere':
            ciphertext = autoKeyVigenereEncrypt(plaintext, key);
            break;
        case 'playfair':
            ciphertext = playfairEncrypt(plaintext, key);
            break;
        case 'hill':
            ciphertext = hillEncrypt(plaintext, key);
            break;
        case 'super':
            ciphertext = superEncrypt(plaintext, key);
            break;
        default:
            alert('Please select a valid cipher');
            return;
    }

    let base64Ciphertext = btoa(ciphertext);  // Convert to Base64
    document.getElementById('outputText').value = base64Ciphertext;
});

// Event listener for the Decrypt button
document.getElementById('decryptBtn').addEventListener('click', () => {
    let ciphertextBase64 = document.getElementById('outputText').value;  // Ciphertext in Base64
    let key = document.getElementById('keyInput').value;
    let cipherType = document.getElementById('cipherSelect').value;

    if (!ciphertextBase64 || !key) {
        alert("Please enter both ciphertext and key.");
        return;
    }

    let ciphertext = atob(ciphertextBase64);  // Decode Base64 to get the original ciphertext

    let plaintext;
    switch (cipherType) {
        case 'vigenere':
            plaintext = vigenereDecrypt(ciphertext, key);
            break;
        case 'auto_key_vigenere':
            plaintext = autoKeyVigenereDecrypt(ciphertext, key);
            break;
        case 'playfair':
            plaintext = playfairDecrypt(ciphertext, key);
            break;
        case 'hill':
            plaintext = hillDecrypt(ciphertext, key);
            break;
        case 'super':
            plaintext = superDecrypt(ciphertext, key);
            break;
        default:
            alert('Please select a valid cipher');
            return;
    }

    document.getElementById('outputText').value = plaintext;
});

document.getElementById('saveFileBtn').addEventListener('click', () => {
    let outputBase64 = document.getElementById('outputText').value;
    let blob = new Blob([outputBase64], { type: 'application/octet-stream' });
    let downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'Output.txt';  // You can modify this as needed
    downloadLink.click();
});

document.getElementById('inputFile').addEventListener('change', function(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
        let content = event.target.result;
        document.getElementById('inputText').value = content;
    };

    reader.readAsText(file);
});