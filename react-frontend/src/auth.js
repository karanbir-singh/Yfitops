export function auth() {
    // Initialize the FirebaseUI Widget using Firebase.
    // Recupero dei componenti di autenticazione
    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#auth', {
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        // Other config options..
        signInSuccessUrl: 'http://localhost:1234/public/index.html',
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            },
            uiShown: function () {
                // The widget is rendered.
                // Hide the loader.
                // document.getElementById('loader').style.display = 'none';
            }
        },
    });
}