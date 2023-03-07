const body = document.body;
const clock_div = body.querySelector(".clock_div");
const clock_p = body.querySelector(".clock_p");
const clock_btn = body.querySelector(".clock_btn");

clock_div.hidden = true;

function getTime() {
	let date = new Date()
	const hour = String(date.getHours()).padStart(2, "0");
	const minute = String(date.getMinutes()).padStart(2, "0");
	const second = String(date.getSeconds()).padStart(2, "0");
	clock_p.innerHTML = `${hour}:${minute}:${second}`;
}

setInterval(getTime, 1000)

clock_btn.addEventListener("click", () => {
	if(clock_div.hidden == true) {
		clock_div.hidden = false;
	} else {
		clock_div.hidden = true;
	}
})