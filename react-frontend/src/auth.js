// Initialize the FirebaseUI Widget using Firebase.
// Recupero dei componenti di autenticazione
const ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#auth', {
    signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // Other config options..
    signInSuccessUrl: '',
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