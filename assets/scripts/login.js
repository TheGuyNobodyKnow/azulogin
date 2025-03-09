/*
	Login Display Screen for AzuOS
	Written by: MTSyntho @ AzuSystem 2024
    Modified Code to work as a General Linux Display Manager
*/

function login() {
	var login = document.getElementById('login');
	var loginstatusmenu = document.getElementById('login-status');
	var loginstatus = document.getElementById('login-status-name');
	var loginstatusicon = document.getElementById('login-status-icon');
	var loginstatusloading = document.getElementById('login-status-loading');
	var username = document.getElementById('name').value;
	var password = document.getElementById('pwd').value;
	var session = document.getElementById('sessions').textContent;

	loginstatusicon.style.display = 'none';
	loginstatusloading.style.display = 'block';
	loginstatus.textContent = `Authenticating...`;

	loginstatusmenu.classList.remove('login-animation-end');
	loginstatusmenu.classList.add('login-animation-start');

	pywebview.api.auth_user(username, password).then(function(result) {
	    document.getElementById('name').focus();
		if (result === true) {
			loginstatus.textContent = `Hello, ${username}!`;

			loginstatusloading.style.display = 'none'
			loginstatusicon.style.display = 'block'

			loginstatusicon.src = '../img/wavingHand.svg'
			setTimeout(function() {
				login.classList.add("fadeout");
				setTimeout(function() {
					login.remove();
					pywebview.api.start_session(username)
				}, 1000);
			}, 1000);
		} else {
			loginstatus.textContent = `Incorrect Username or Password!`;

			loginstatusloading.style.display = 'none'
			loginstatusicon.style.display = 'block'

			loginstatusicon.src = '../img/error.svg'
			setTimeout(function() {
				loginstatusmenu.classList.add('login-animation-end');
				loginstatusmenu.classList.remove('login-animation-start');
			}, 1000)			
		}
	})
}

sessionsMenuBool = false;

function sessionsMenu() {
		if (sessionsMenuBool === true) {
			var dropdown = document.getElementById('session-panel')
			dropdown.classList.remove('session-panel-in')
			dropdown.classList.add('session-panel-out')

			sessionsMenuBool = false;
		} else {
			var dropdown = document.getElementById('session-panel')
			dropdown.classList.remove('session-panel-out')
			dropdown.classList.add('session-panel-in')

			sessionsMenuBool = true;
		};
}
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('name').addEventListener('keydown', (event) => {
	    if (event.key === 'Enter') {
	    	document.getElementById('pwd').focus();
	    }
	});

	document.getElementById('pwd').addEventListener('keydown', (event) => {
	    if (event.key === 'Enter') {
	    	login();
	    }
	});	
});	