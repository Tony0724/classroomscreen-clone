const secDiv = document.getElementById('sec');
const minDiv = document.getElementById('min');
const hourDiv = document.getElementById('hour');
const clockP = document.getElementById('clock_p');

setInterval(updateClock, 1000);

function updateClock(){
	let date = new Date();
	let sec = date.getSeconds() / 60;
	let min = (date.getMinutes() + sec) / 60;
	let hour = (date.getHours() + min) / 12;
	secDiv.style.transform = "rotate(" + (sec * 360) + "deg)";
	minDiv.style.transform = "rotate(" + (min * 360) + "deg)";
	hourDiv.style.transform = "rotate(" + (hour * 360) + "deg)";
}

function clockPinnerText() {
	let date = new Date();
	let hour = String(date.getHours()).padStart(2, "0");
	let minute = String(date.getMinutes()).padStart(2, "0");
	let second = String(date.getSeconds()).padStart(2, "0")
	clockP.innerHTML = `${hour}:${minute}:${second}`;
}

clockPinnerText()

setInterval(clockPinnerText, 1000)

updateClock();