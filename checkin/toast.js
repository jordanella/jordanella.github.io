// CREATE SUCCESS TOAST
function toastSuccess(content) {
	toastPopup(content, "success");
}

// CREATE SUCCESS TOAST
function toastDanger(content) {
	toastPopup(content, "danger");
}

// CREATE TOAST
function toastPopup(content, type) {
	// toast stack
	let toastStack = document.querySelector("#toastStack");
	if (!document.body.contains(toastStack)) {
		toastStack = document.createElement("div");
		toastStack.setAttribute("id", "toastStack");
		toastStack.classList.add("d-print-none");
		document.body.appendChild(toastStack);
	}

	// toast container
	let toast = document.createElement("div");
	toast.classList.add("toast");
	toast.classList.add(`toast--${type}`);

	// toast content
	let toastContent = document.createElement("div");
	toastContent.classList.add("toast__content");
	toastContent.textContent = content;
	toast.appendChild(toastContent);

	// close button
	let closeButton = document.createElement("button");
	closeButton.classList.add("toast__close");
	closeButton.textContent = "✕";
	toast.appendChild(closeButton);

	closeButton.addEventListener("click", function (event) {
		event.stopPropagation();
		toast.classList.add("toast--hide");
		setTimeout(function () {
			toast.remove();
		}, 400);
	});

	toastStack.appendChild(toast);

	// automatically remove toast
	setTimeout(function () {
		toast.classList.add("toast--hide");
		setTimeout(function () {
			toast.remove();
		}, 400);
	}, 5000);
}