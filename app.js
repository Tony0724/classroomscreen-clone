const body = document.body;
const clock_div = body.querySelector(".clock_div");
const clock_p = body.querySelector(".clock_p");
const clock_btn = body.querySelector(".clock_btn");
const text_btn = body.querySelector(".text_btn");
const text_div = body.querySelector(".text_div");
const text_move_btn = text_div.querySelector(".move")
const textarea = text_div.querySelector("textarea")
const hide_btn = text_div.querySelector(".hide")
const container = text_div.querySelector(".container");
const show_btn = text_div.querySelector(".show");
const time_div = body.querySelector(".time_div");
const time_btn = body.querySelector(".time_btn");
const start_btn = time_div.querySelector("#start_btn");
const dialog = body.querySelector("dialog");

clock_div.style.display = 'none';
text_div.style.display = 'none';
time_div.style.display = 'none';

clock_btn.addEventListener("click", () => {
	if(clock_div.style.display === 'none') {
		clock_div.style.display = 'inline-block'
	} else {
		clock_div.style.display = 'none';
	}
})

text_btn.addEventListener("click", () => {
	if(text_div.style.display === 'none') {
		text_div.style.display = 'inline-block'
	} else {
		text_div.style.display = 'none';
	}
})

time_btn.addEventListener("click",() => {
	if(time_div.style.display === 'none') {
		time_div.style.display = 'inline-block'
	} else {
		time_div.style.display = 'none';
	}
})

const timer_p = time_div.querySelector('p');

dialog.addEventListener("close", () => {
	time_div.classList.remove('start_btn_shake');
	time_div.style.display = 'none';
})

function countdown( elementName, minutes, seconds ) {
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n ) {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer() {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            timer_p.innerHTML = "Time is up!";
			time_div.classList.add('start_btn_shake');
			dialog.showModal();
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            timer_p.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }
    element = document.getElementById( elementName );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}

function getTime() {
	let date = new Date()
	const hour = String(date.getHours()).padStart(2, "0");
	const minute = String(date.getMinutes()).padStart(2, "0");
	const second = String(date.getSeconds()).padStart(2, "0");
	if(second > 49) {
		clock_p.innerHTML = `${hour}:${minute}:<span style="color:red;">${second}</span>`;
	} else {
		clock_p.innerHTML = `${hour}:${minute}:<span style="color:green;">${second}</span>`;
	}
}

setInterval(getTime, 1000)


const secDiv = document.getElementById('sec');
const minDiv = document.getElementById('min');
const hourDiv = document.getElementById('hour');

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

updateClock();

let initialX = 0;
let initialY = 0;

let moveElement = false;
let events = {
	mouse: {
		down: "mousedown",
		move: "mousemove",
		up: "mouseup",
	},
	touch: {
		down: "touchstart",
		move: "touchmove",
		up: "touchend",
	},
};
let deviceType = "";
  //Detech touch device
const isTouchDevice = () => {
	try {
	  //We try to create TouchEvent (it would fail for desktops and throw error)
		document.createEvent("TouchEvent");
		deviceType = "touch";
		return true;
	} catch (e) {
		deviceType = "mouse";
		return false;
	}
};
isTouchDevice();
  //Start (mouse down / touch start)
	clock_div.addEventListener(events[deviceType].down, (e) => {
	e.preventDefault();
	//initial x and y points
	initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
	initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
	//Start movement
	moveElement = true;
});
  //Move
clock_div.addEventListener(events[deviceType].move, (e) => {
	//if movement == true then set top and left to new X andY while removing any offset
	if (moveElement) {
		e.preventDefault();
		let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
		let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
		clock_div.style.top =
		clock_div.offsetTop - (initialY - newY) + "px";
		clock_div.style.left =
		clock_div.offsetLeft - (initialX - newX) + "px";
		initialX = newX;
		initialY = newY;
	}
	const Bounding = clock_div.getBoundingClientRect();
	if (Bounding.top < -1) {
		alert("The clock element is not on the viewport!");
		clock_div.style.top = 10 + 'px';
	}
	if (Bounding.left < -1) {
		alert("The clock element is not on the viewport!");
		clock_div.style.left = 10 + 'px';
	}
	if (Bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
		alert("The clock element is not on the viewport!");
		clock_div.style.top = window.innerHeight - 356 + 'px';
	}
	if (Bounding.right > (window.innerWidth || document.documentElement.clientWidth)) {
		alert("The clock element is not on the viewport!");
		clock_div.style.left = window.innerWidth - 381 + 'px';
	}
});
  //mouse up / touch end
clock_div.addEventListener(
	events[deviceType].up,
	(stopMovement = (e) => {
		moveElement = false;
	})
);
clock_div.addEventListener("mouseleave", stopMovement);
clock_div.addEventListener(events[deviceType].up, (e) => {
	moveElement = false;
});

let Textintial = 0;
let TextinitialY = 0;

let moveElementText = false;
let TextEvents = {
	mouse: {
		down: "mousedown",
		move: "mousemove",
		up: "mouseup",
	},
	touch: {
		down: "touchstart",
		move: "touchmove",
		up: "touchend",
	},
};
let TextdeviceType = "";
  //Detech touch device
const TextisTouchDevice = () => {
	try {
	  //We try to create TouchEvent (it would fail for desktops and throw error)
		document.createEvent("TouchEvent");
		TextdeviceType = "touch";
		return true;
	} catch (e) {
		deviceType = "mouse";
		return false;
	}
};
TextisTouchDevice();
  //Start (mouse down / touch start)
	text_move_btn.addEventListener(TextEvents[deviceType].down, (e) => {
	e.preventDefault();
	//initial x and y points
	Textintial = !TextisTouchDevice() ? e.clientX : e.touches[0].clientX;
	TextinitialY = !TextisTouchDevice() ? e.clientY : e.touches[0].clientY;
	//Start movement
	moveElementText = true;
});
  //Move
text_move_btn.addEventListener(TextEvents[deviceType].move, (e) => {
	//if movement == true then set top and left to new X andY while removing any offset
	if (moveElementText) {
		e.preventDefault();
		let newX = !TextisTouchDevice() ? e.clientX : e.touches[0].clientX;
		let newY = !TextisTouchDevice() ? e.clientY : e.touches[0].clientY;
		text_div.style.top =
		text_div.offsetTop - (TextinitialY - newY) + "px";
		text_div.style.left =
		text_div.offsetLeft - (Textintial - newX) + "px";
		Textintial = newX;
		TextinitialY = newY;
	}
	const Bounding = text_move_btn.getBoundingClientRect();
	if (Bounding.top < -1) {
		alert("The clock element is not on the viewport!");
		text_div.style.top = 10 + 'px';
	}
	if (Bounding.left < -1) {
		alert("The clock element is not on the viewport!");
		text_div.style.left = 10 + 'px';
	}
	if (Bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
		alert("The clock element is not on the viewport!");
		text_div.style.top = window.innerHeight - 356 + 'px';
	}
	if (Bounding.right > (window.innerWidth || document.documentElement.clientWidth)) {
		alert("The clock element is not on the viewport!");
		text_div.style.left = window.innerWidth - 381 + 'px';
	}
});
  //mouse up / touch end
text_move_btn.addEventListener(
	TextEvents[deviceType].up,
	(stopMovement = (e) => {
		moveElementText = false;
	})
);
text_move_btn.addEventListener("mouseleave", stopMovement);
text_move_btn.addEventListener(TextEvents[deviceType].up, (e) => {
	moveElementText = false;
});

function formatDoc(cmd, value=null) {
	if(value) {
		document.execCommand(cmd, false, value);
	} else {
		document.execCommand(cmd);
	}
}

function addLink() {
	const url = prompt('Insert url');
	formatDoc('createLink', url);
}

const filename = document.getElementById('filename');

function fileHandle(value) {
	if(value === 'new') {
		content.innerHTML = '';
		filename.value = 'untitled';
	} else if(value === 'txt') {
		const blob = new Blob([content.innerText])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${filename.value}.txt`;
		link.click();
	} else if(value === 'pdf') {
		html2pdf(content).save(filename.value);
	}
}

show_btn.hidden = true;

hide_btn.addEventListener("click", () => {
	container.hidden = true;
	show_btn.hidden = false
})

show_btn.addEventListener("click", () => {
	container.hidden = false;
	show_btn.hidden = true
})

let timerinitialX = 0;
let timerinitialY = 0;

let moveElementTimer = false;
let TimerEvents = {
	mouse: {
		down: "mousedown",
		move: "mousemove",
		up: "mouseup",
	},
	touch: {
		down: "touchstart",
		move: "touchmove",
		up: "touchend",
	},
};
let TimerdeviceType = "";
  //Detech touch device
const timerisTouchDevice = () => {
	try {
	  //We try to create TouchEvent (it would fail for desktops and throw error)
		document.createEvent("TouchEvent");
		TimerdeviceType = "touch";
		return true;
	} catch (e) {
		deviceType = "mouse";
		return false;
	}
};
timerisTouchDevice();
  //Start (mouse down / touch start)
	time_div.addEventListener(TextEvents[deviceType].down, (e) => {
	e.preventDefault();
	//initial x and y points
	timerinitialX = !timerisTouchDevice() ? e.clientX : e.touches[0].clientX;
	timerinitialY = !timerisTouchDevice() ? e.clientY : e.touches[0].clientY;
	//Start movement
	moveElementTimer = true;
});
  //Move
time_div.addEventListener(TextEvents[deviceType].move, (e) => {
	//if movement == true then set top and left to new X andY while removing any offset
	if (moveElementTimer) {
		e.preventDefault();
		let newX = !timerisTouchDevice() ? e.clientX : e.touches[0].clientX;
		let newY = !timerisTouchDevice() ? e.clientY : e.touches[0].clientY;
		time_div.style.top =
		time_div.offsetTop - (timerinitialY - newY) + "px";
		time_div.style.left =
		time_div.offsetLeft - (timerinitialX - newX) + "px";
		timerinitialX = newX;
		timerinitialY = newY;
	}
	const Bounding = time_div.getBoundingClientRect();
	if (Bounding.top < -1) {
		alert("The clock element is not on the viewport!");
		time_div.style.top = 10 + 'px';
	}
	if (Bounding.left < -1) {
		alert("The clock element is not on the viewport!");
		time_div.style.left = 10 + 'px';
	}
	if (Bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
		alert("The clock element is not on the viewport!");
		time_div.style.top = window.innerHeight - 356 + 'px';
	}
	if (Bounding.right > (window.innerWidth || document.documentElement.clientWidth)) {
		alert("The clock element is not on the viewport!");
		time_div.style.left = window.innerWidth - 381 + 'px';
	}
});
  //mouse up / touch end
time_div.addEventListener(
	TextEvents[deviceType].up,
	(stopMovement = (e) => {
		moveElementTimer = false;
	})
);
time_div.addEventListener("mouseleave", stopMovement);
time_div.addEventListener(TimerEvents[deviceType].up, (e) => {
	moveElementTimer = false;
});

function handleTimerStart() {
	let minute_value = null;
	let second_value = null;
	function handleMinuteTime() {
		const prom = prompt("How long do you want to set the minute?", 10)
		minute_value = prom;
	}
	function handleSecondTime() {
		const prom = prompt("How long do you want to set the second", 30)
		second_value = prom;
	}
	handleMinuteTime();
	handleSecondTime();
	if(isNaN(minute_value) || isNaN(second_value)) {
		alert("Please write a number value!")
	} else if(minute_value === "" && second_value === "") {
		alert("Please write not a empty value!")
	} else if(minute_value === "") {
		countdown("time_div", 0, parseInt(second_value))
	} else if(second_value === "") {
		countdown("time_div", parseInt(minute_value), 0)
	} else {
		countdown("time_div", parseInt(minute_value), parseInt(second_value))
	}
}

start_btn.addEventListener("click", handleTimerStart)