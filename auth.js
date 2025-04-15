import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Firebase 設定（Firebase コンソールから取得）
 const firebaseConfig = {
    apiKey: "AIzaSyBQNxE7HXqo3UwITODUIV6Nk3nHTRDWNFE",
    authDomain: "password-auth-40539.firebaseapp.com",
    projectId: "password-auth-40539",
    storageBucket: "password-auth-40539.firebasestorage.app",
    messagingSenderId: "389413675971",
    appId: "1:389413675971:web:7bce0ed3c35eaac1de5376",
    measurementId: "G-2KVXVNYHGX"
  };

// Firebase 初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// checkPassword をグローバルに公開
window.checkPassword = function() {
    const password = document.getElementById('password').value;
    const error = document.getElementById('error');
    const successUrl = 'https://atmark0320.github.io/E.V.C.type-p/';
    const failUrl = 'https://www.google.com';

    // 試行回数管理（localStorageで簡易実装）
    let attempts = parseInt(localStorage.getItem('attempts')) || 0;

    // Firebase 認証
    const email = 'user@password-auth.com';

    signInWithEmailAndPassword(auth, email, password)
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
};
