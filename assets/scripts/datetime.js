/*
    Date & Time Library for AzuOS
    Written by: MTSyntho @ AzuSystem 2024
    Stripped down for this application
*/

function fetchDateTime() {
    // Get the current date
    var currentDate = new Date();

    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Get month, date, and year
    var month = monthNames[currentDate.getMonth()];
    var date = currentDate.getDate();
    var year = currentDate.getFullYear();

    // Format the date
    var formattedDate = month + " " + date + ", " + year;
    
    // Extract individual components of the date and time
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    
    // Format the time nicely
    var time = hours + ":" + (minutes < 10 ? '0' : '') + minutes;

    return {
        date: formattedDate,
        time: time
    };
};

setInterval(function() {
	var date = document.getElementById('date');
	var time = document.getElementById('time');
	var statustime = document.getElementById('status-time');

	date.textContent = fetchDateTime().date;
	time.textContent = fetchDateTime().time;
	statustime.textContent = fetchDateTime().time;
}, 1000);