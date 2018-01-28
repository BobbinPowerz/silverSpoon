window.onload=function(){

	const config = {
		apiKey: "AIzaSyAK07yq41_luheoNe4fRV3bNRs3Nl6T8MY",
		authDomain: "fir-login-96df4.firebaseapp.com",
		databaseURL: "https://fir-login-96df4.firebaseio.com",
		projectId: "fir-login-96df4",
		storageBucket: "fir-login-96df4.appspot.com",
		messagingSenderId: "620536686546"
	};
	firebase.initializeApp(config);

	//Get elements
	const btnLogin = document.getElementById('btnLogin');
	const btnLogout = document.getElementById('btnLogout');
	const googleLogin = document.getElementById('googleLogin');

	//Click Login event listener
	btnLogin.addEventListener('click', e => {
		firebase.auth().signInAnonymously();
	});

	googleLogin.addEventListener('click', e => {
		login();
	});

	//Click Logout event listener
	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
	});

	//Auth Listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		console.log(firebaseUser);
		if(firebaseUser) {
			btnLogout.classList.remove('hide');
			btnLogin.classList.add('hide');
			googleLogin.classList.add('hide');
		} else {
			btnLogout.classList.add('hide');
			btnLogin.classList.remove('hide');
			googleLogin.classList.remove('hide');
		}
	});

	function login() {
		function newLoginHappened(user) {
			if (user) {
				app(user);
			} else {
				var provider = new firebase.auth.GoogleAuthProvider();
				firebase.auth().signInWithRedirect(provider);
			}
		}

		firebase.auth().onAuthStateChanged(newLoginHappened);
	}






}
