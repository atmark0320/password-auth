// Firebase初期化（Firebaseコンソールから取得）
const firebaseConfig = {
  apiKey: "AIzaSyBQNxE7HXqo3UwITODUIV6Nk3nHTRDWNFE",
  authDomain: "password-auth-40539.firebaseapp.com",
  projectId: "password-auth-40539",
  storageBucket: "password-auth-40539.firebasestorage.app",
  messagingSenderId: "389413675971",
  appId: "1:389413675971:web:7bce0ed3c35eaac1de5376",
  measurementId: "G-2KVXVNYHGX"
};

// Firebase初期化
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function checkPassword() {
    const password = document.getElementById('password').value;
    const error = document.getElementById('error');
    const successUrl = 'https://example.com';
    const failUrl = 'https://www.google.com';

    // 試行回数管理（localStorageで簡易実装）
    let attempts = parseInt(localStorage.getItem('attempts')) || 0;

    // Firebase認証（メール形式でパスワード検証）
    const email = 'user@password-auth.com'; // 固定メール（パスワード検証用）

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            localStorage.setItem('attempts', 0); // 成功でリセット
            window.location.href = successUrl; // 成功
        })
        .catch(() => {
            attempts++;
            localStorage.setItem('attempts', attempts);
            if (attempts >= 3) {
                localStorage.setItem('attempts', 0); // リセット
                window.location.href = failUrl; // 3回失敗
            } else {
                error.textContent = `パスワードが違います。残り${3 - attempts}回試せます。`;
                document.getElementById('password').value = ''; // クリア
            }
        });
}