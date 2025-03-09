var currentHour = new Date().getHours();
var welcomeText = document.getElementById('welcome-text')

document.addEventListener('DOMContentLoaded', function() {
	if (currentHour >= 5 && currentHour < 12) {
	    welcomeText.textContent = "Good Morning";
	} else if (currentHour >= 12 && currentHour < 18) {
	    welcomeText.textContent = "Good Afternoon";
	} else if (currentHour >= 18 && currentHour < 22) {
	    welcomeText.textContent = "Good Evening";
	} else {
	    welcomeText.textContent = "Good Day";
	}
});