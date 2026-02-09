document.addEventListener('DOMContentLoaded', function() {
	var form = document.querySelector('form');
	if (!form) return;

	form.addEventListener('submit', function(event) {
		var invalid = false;
		
		var errorBlocks = form.querySelectorAll('.help-block');
		errorBlocks.forEach(function(block) { block.remove(); });
		var inputs = form.querySelectorAll('input, textarea');
		inputs.forEach(function(input) {
			if (!input.checkValidity()) {
				invalid = true;
				input.classList.add('has-error');
				var msg = input.validationMessage || 'Ce champ est obligatoire.';
				var error = document.createElement('span');
				error.className = 'help-block';
				error.textContent = msg;
				input.parentNode.appendChild(error);
			} else {
				input.classList.remove('has-error');
			}
		});
		if (invalid) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		event.preventDefault();
		var formData = new FormData(form);
		var processorFile = './includes/' + (form.id || 'form_1') + '.php';

		fetch(processorFile, {
			method: 'POST',
			body: formData
		})
		.then(function(response) {
			if (response.ok) {
				var msg = form.getAttribute('success-msg') || 'Votre message a été envoyé avec succès.';
				showAlert(msg, 'success');
				form.reset();
			} else {
				throw new Error('Server error');
			}
		})
		.catch(function() {
			var msg = form.getAttribute('fail-msg') || 'Désolé, notre serveur de mail ne répond pas. Veuillez réessayer ultérieurement.';
			showAlert(msg, 'danger');
		});
	});

	function showAlert(message, type) {
		var alert = document.createElement('div');
		alert.className = 'alert alert-' + type;
		alert.innerHTML = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>' + message + '</strong>';
		var oldAlert = document.getElementById('form-alert');
		if (oldAlert) oldAlert.remove();
		alert.id = 'form-alert';
		form.appendChild(alert);
	}
});