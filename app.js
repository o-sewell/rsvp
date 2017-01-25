document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('#registrar');
	const input = form.querySelector('input');

	const mainDiv = document.querySelector('.main');
	const ul =  document.getElementById('invitedList');

	const div = document.createElement('div');
	const filterLabel = document.createElement('label');
	const filterCheckBox =  document.createElement('input')

	filterLabel.textContent =  "Hide those who haven't responded ";
	filterCheckBox.type = 'checkbox';

	div.appendChild(filterLabel);
	div.appendChild(filterCheckBox);
	mainDiv.insertBefore(div, ul);

	filterCheckBox.addEventListener('change', (e) => {
		const isChecked = e.target.checked; // true or false
		const list = ul.children;
		if (isChecked) { // Hide all those not confirmed 
			for(let i = 0; i <  list.length; i++) {
				let li = list[i];
				//if li has class of responded show if it doesn't hide.
				if (li.className === 'responded') {
					li.style.display = ''; // previous style
				} else {
					li.style.display = 'none'; // style none
				}
			}
		}  else {
			for(let i = 0; i <  list.length; i++) {
				let li = list[i];
				li.style.display = '';
			}
		}
	});


	function createLi(text) {
		const li =  document.createElement('li');
		const span =  document.createElement('span');
		span.textContent = text; //input value
		li.appendChild(span);




		const label =  document.createElement('label');
		label.textContent = 'Confirmed';
		const checkbox =  document.createElement('input');
		checkbox.type = 'checkbox';
		label.appendChild(checkbox);
		li.appendChild(label);


		const editButton  =  document.createElement('button');
		editButton.textContent = 'Edit';
		li.appendChild(editButton);

		const removeButton  =  document.createElement('button');
		removeButton.textContent = 'Remove';
		li.appendChild(removeButton);

		return li;
	}

	form.addEventListener('submit',  (e) => {
		e.preventDefault();
		const text = input.value;
		input.value = ''; //clear input field
		const li = createLi(text); 
		ul.appendChild(li);
	});

	ul.addEventListener('change',(e) => {
		console.log(e.target.checked);
		const checkbox = event.target;
		const checked = checkbox.checked; //true or false
		// li is the grandparent so traverse to the label first then the li.
		const listItem = checkbox.parentNode.parentNode;

		if (checked) { // if the checkbox has the value true
			listItem.className = 'responded'
		} else {
			listItem.className = '';
		}
	});

	ul.addEventListener('click', (e) => {
		// event bubbling - selecting the target with the tag name button (as other tagets could use the click event)
		if(e.target.tagName === 'BUTTON') {
			const button = e.target;
			const li =  button.parentNode;
			const ul = li.parentNode;

			if(button.textContent === 'Remove') {
				ul.removeChild(li);
			}  else if(button.textContent === 'Edit') {
				//select span
				const span = li.firstElementChild;
				//create input element
				const input = document.createElement('input');
				input.type = 'text';
				//set the value of the input to the span text
				input.value = span.textContent;
				//insert the input before the span in the dom
				li.insertBefore(input, span);
				//remove the span
				li.removeChild(span);

				//change edit button text to save 
				button.textContent= "Save";
			}  else if(button.textContent == "Save") {
				// select the input
				const input = li.firstElementChild;

				//create span
				const span = document.createElement('span');
				// set the spans text to the value of the input
				span.textContent = input.value;

				//insert the span before the input
				li.insertBefore(span,input);

				//remove the input
				li.removeChild(input);

				//change save button text to edit
				button.textContent = "Edit";
			}
		}
	});
});