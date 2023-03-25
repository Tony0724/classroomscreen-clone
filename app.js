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

clock_div.style.display = 'none';
text_div.style.display = 'none';

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