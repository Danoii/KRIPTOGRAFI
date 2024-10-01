function filterText(plaintext) {
  return plaintext.replace(/[^a-zA-Z]/g, '').toUpperCase();
}

function convertKeyToAlphabet(key) {
  let convertedKey = '';
  // Jika key berupa angka, kita konversi setiap digit ke huruf
  for (let i = 0; i < key.length; i++) {
      let char = key[i];
      // Jika karakter berupa angka, konversi ke huruf A-Z
      if (!isNaN(char)) {
          let num = parseInt(char) % 26;
          convertedKey += String.fromCharCode(num + 97); // Konversi ke huruf a-z
      } else {
          // Jika bukan angka, tetap gunakan karakter tersebut
          convertedKey += char.toLowerCase();
      }
  }
  return convertedKey;
}

// Vigenère Cipher Encryption
function vigenereEncrypt(plaintext, key) {
  let ciphertext = '';
  key = convertKeyToAlphabet(key);
  plaintext = plaintext.toLowerCase().replace(/[^a-zA-Z]/g, '');
  let keyIndex = 0;

  for (let i = 0; i < plaintext.length; i++) {
      let plainChar = plaintext[i];
      let plainCharCode = plainChar.charCodeAt(0) - 97;
      let keyCharCode = key[keyIndex % key.length].charCodeAt(0) - 97;
      let cipherCharCode = (plainCharCode + keyCharCode) % 26;
      ciphertext += String.fromCharCode(cipherCharCode + 97);
      keyIndex++;
  }

  return ciphertext;
}

// Vigenère Cipher Decryption
function vigenereDecrypt(ciphertext, key) {
  let plaintext = '';
  key = convertKeyToAlphabet(key);
  ciphertext = ciphertext.toLowerCase().replace(/[^a-zA-Z]/g, '');
  let keyIndex = 0;

  for (let i = 0; i < ciphertext.length; i++) {
      let cipherChar = ciphertext[i];
      let cipherCharCode = cipherChar.charCodeAt(0) - 97;
      let keyCharCode = key[keyIndex % key.length].charCodeAt(0) - 97;
      let plainCharCode = (cipherCharCode - keyCharCode + 26) % 26;
      plaintext += String.fromCharCode(plainCharCode + 97);
      keyIndex++;
  }

  return plaintext;
}

// Auto-Key Vigenère Cipher Encryption
function autoKeyVigenereEncrypt(plaintext, key) {
  let ciphertext = '';
  key = convertKeyToAlphabet(key) + plaintext.toLowerCase();
  plaintext = plaintext.toLowerCase().replace(/[^a-zA-Z]/g, '');
  let keyIndex = 0;

  for (let i = 0; i < plaintext.length; i++) {
      let plainChar = plaintext[i];
      let plainCharCode = plainChar.charCodeAt(0) - 97;
      let keyCharCode = key[keyIndex].charCodeAt(0) - 97;
      let cipherCharCode = (plainCharCode + keyCharCode) % 26;
      ciphertext += String.fromCharCode(cipherCharCode + 97);
      keyIndex++;
  }

  return ciphertext;
}

// Auto-Key Vigenère Cipher Decryption
function autoKeyVigenereDecrypt(ciphertext, key) {
  let plaintext = '';
  key = convertKeyToAlphabet(key);
  ciphertext = ciphertext.toLowerCase().replace(/[^a-zA-Z]/g, '');
  let keyIndex = 0;

  for (let i = 0; i < ciphertext.length; i++) {
      let cipherChar = ciphertext[i];
      let cipherCharCode = cipherChar.charCodeAt(0) - 97;
      let keyCharCode = key[keyIndex % key.length].charCodeAt(0) - 97;
      let plainCharCode = (cipherCharCode - keyCharCode + 26) % 26;
      plaintext += String.fromCharCode(plainCharCode + 97);
      key += String.fromCharCode(plainCharCode + 97);  // Extend key with plaintext
      keyIndex++;
  }

  return plaintext;
}

function generatePlayfairMatrix(key) {
  // Menghapus duplikasi dan menggabungkan I dan J
  let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  key = key.toUpperCase().replace(/J/g, 'I');
  let seen = new Set();
  let matrix = [];

  // Memasukkan karakter dari key ke matrix
  for (let char of key) {
    if (!seen.has(char) && alphabet.includes(char)) {
      matrix.push(char);
      seen.add(char);
    }
  }

  // Mengisi sisa matrix dengan huruf yang belum dipakai
  for (let char of alphabet) {
    if (!seen.has(char)) {
      matrix.push(char);
      seen.add(char);
    }
  }

  // Mengubah array menjadi matrix 5x5
  let matrix2D = [];
  for (let i = 0; i < 5; i++) {
    matrix2D.push(matrix.slice(i * 5, i * 5 + 5));
  }
  return matrix2D;
}

function prepareTextForPlayfair(text) {
  text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  let result = '';
  
  for (let i = 0; i < text.length; i += 2) {
    let a = text[i];
    let b = text[i + 1] || 'X';  // Tambah X jika ganjil
    if (a === b) {
      result += a + 'X';
      i--;  // Kembali satu langkah untuk mengecek pasangan berikutnya
    } else {
      result += a + b;
    }
  }
  return result;
}

function playfairEncrypt(plaintext, key) {
  let matrix = generatePlayfairMatrix(key);
  plaintext = prepareTextForPlayfair(plaintext);
  let ciphertext = '';

  for (let i = 0; i < plaintext.length; i += 2) {
    let a = plaintext[i];
    let b = plaintext[i + 1];

    let posA = findPosition(matrix, a);
    let posB = findPosition(matrix, b);

    if (posA.row === posB.row) {
      // Geser ke kanan
      ciphertext += matrix[posA.row][(posA.col + 1) % 5];
      ciphertext += matrix[posB.row][(posB.col + 1) % 5];
    } else if (posA.col === posB.col) {
      // Geser ke bawah
      ciphertext += matrix[(posA.row + 1) % 5][posA.col];
      ciphertext += matrix[(posB.row + 1) % 5][posB.col];
    } else {
      // Bentuk persegi
      ciphertext += matrix[posA.row][posB.col];
      ciphertext += matrix[posB.row][posA.col];
    }
  }

  return ciphertext;
}

function playfairDecrypt(ciphertext, key) {
  let matrix = generatePlayfairMatrix(key);
  let plaintext = '';

  for (let i = 0; i < ciphertext.length; i += 2) {
    let a = ciphertext[i];
    let b = ciphertext[i + 1];

    let posA = findPosition(matrix, a);
    let posB = findPosition(matrix, b);

    if (posA.row === posB.row) {
      // Geser ke kiri
      plaintext += matrix[posA.row][(posA.col + 4) % 5];
      plaintext += matrix[posB.row][(posB.col + 4) % 5];
    } else if (posA.col === posB.col) {
      // Geser ke atas
      plaintext += matrix[(posA.row + 4) % 5][posA.col];
      plaintext += matrix[(posB.row + 4) % 5][posB.col];
    } else {
      // Bentuk persegi
      plaintext += matrix[posA.row][posB.col];
      plaintext += matrix[posB.row][posA.col];
    }
  }

  return plaintext;
}

function findPosition(matrix, char) {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] === char) {
        return { row, col };
      }
    }
  }
  return null;
}


// Hill Cipher Encryption
function hillEncrypt(text, key) {
  text = filterText(text); // Filter input to only letters (A-Z)
  let matrixKey = [[6, 24, 1], [13, 16, 10], [20, 17, 15]]; // Example key matrix (3x3)
  let output = '';

  // Padding text with 'X' if necessary to match matrix size
  while (text.length % 3 !== 0) {
      text += 'X';
  }

  for (let i = 0; i < text.length; i += 3) {
      let block = [text.charCodeAt(i) - 65, text.charCodeAt(i + 1) - 65, text.charCodeAt(i + 2) - 65];
      let result = [];
      
      for (let row = 0; row < 3; row++) {
          result[row] = (matrixKey[row][0] * block[0] + matrixKey[row][1] * block[1] + matrixKey[row][2] * block[2]) % 26;
      }

      output += String.fromCharCode(result[0] + 65) + String.fromCharCode(result[1] + 65) + String.fromCharCode(result[2] + 65);
  }

  return output;
}

// Hill Cipher Decryption
function hillDecrypt(ciphertext, inverseKeyMatrix) {
  ciphertext = filterText(ciphertext); // Filter input to only letters (A-Z)
  let output = '';

  for (let i = 0; i < ciphertext.length; i += 3) {
      let block = [ciphertext.charCodeAt(i) - 65, ciphertext.charCodeAt(i + 1) - 65, ciphertext.charCodeAt(i + 2) - 65];
      let result = [];

      for (let row = 0; row < 3; row++) {
          result[row] = (inverseKeyMatrix[row][0] * block[0] + inverseKeyMatrix[row][1] * block[1] + inverseKeyMatrix[row][2] * block[2]) % 26;
      }

      output += String.fromCharCode(result[0] + 65) + String.fromCharCode(result[1] + 65) + String.fromCharCode(result[2] + 65);
  }

  return output;
}

//Vigenere cipher + Cipher Transposisi
function superEncrypt(plaintext, key) {
  let vigenereEncrypted = vigenereEncrypt(plaintext, key);
  let finalCiphertext = columnarTranspositionEncrypt(vigenereEncrypted, key);
  
  return finalCiphertext; 
}

function superDecrypt(ciphertext, key) {
  let transposed = columnarTranspositionDecrypt(ciphertext, key);
  let finalPlaintext = vigenereDecrypt(transposed, key);
  
  return finalPlaintext; 
}


// Enkripsi Transposisi Kolom
function columnarTranspositionEncrypt(plaintext, key) {
  key = key.toLowerCase();
  let numColumns = key.length;
  let rows = Math.ceil(plaintext.length / numColumns);
  
  // Buat grid untuk cipher
  let grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < numColumns; j++) {
      let char = plaintext[i * numColumns + j] || 'X'; // Tambah padding jika perlu
      grid[i][j] = char;
    }
  }

  // Buat urutan kolom berdasarkan urutan alfabetis dari key
  let columnOrder = key.split('').map((char, index) => ({char, index}))
                        .sort((a, b) => a.char.localeCompare(b.char));

  // Baca kolom sesuai urutan untuk membuat ciphertext
  let ciphertext = '';
  for (let { index } of columnOrder) {
    for (let i = 0; i < rows; i++) {
      ciphertext += grid[i][index];
    }
  }

  return ciphertext;
}

function columnarTranspositionDecrypt(ciphertext, key) {
  key = key.toLowerCase();
  let numColumns = key.length;
  let rows = Math.ceil(ciphertext.length / numColumns);

  // Buat grid kosong untuk dekripsi
  let grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(numColumns).fill('');
  }

  // Buat urutan kolom berdasarkan urutan alfabetis dari key
  let columnOrder = key.split('').map((char, index) => ({char, index}))
                        .sort((a, b) => a.char.localeCompare(b.char));

  // Masukkan karakter ke dalam grid sesuai urutan kolom
  let index = 0;
  for (let { index: colIndex } of columnOrder) {
    for (let i = 0; i < rows; i++) {
      grid[i][colIndex] = ciphertext[index++] || 'X'; // Tambah padding jika perlu
    }
  }

  // Baca grid secara baris untuk menghasilkan plaintext
  let plaintext = '';
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < numColumns; j++) {
      plaintext += grid[i][j];
    }
  }

  return plaintext.replace(/X+$/, ''); // Hilangkan padding 'X' jika ada
}
