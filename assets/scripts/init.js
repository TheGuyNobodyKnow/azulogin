var welcome = document.getElementById('welcome')
var welcomeText = document.getElementById('welcome-text')
var sessions = document.getElementById('sessions')
var sessionPanel = document.getElementById('session-panel')

	window.addEventListener('pywebviewready', function() {
		pywebview.api.get_sessions().then(function(result) {
			sessions.textContent = Object.keys(result)[0]
			Object.keys(result).forEach(session => {
				var option = document.createElement('button')
				option.onclick = function() {
					sessions.textContent = session
					pywebview.api.select_session(session)
				}
				option.textContent = session
				sessionPanel.appendChild(option)				
			})
		});
	});

document.addEventListener('DOMContentLoaded', function() {
	setTimeout(function() {
		welcomeText.classList.add("fadein");
	}, 500);

	setTimeout(function() {
		welcomeText.classList.remove('fadein')
		welcomeText.classList.add('fadeout')
	}, 2000);

	setTimeout(function() {
		welcome.classList.add('fadeout');
		document.body.style.cursor = 'auto';
	}, 3000);
});