document.addEventListener('DOMContentLoaded', () => {
    // Service selection
    const serviceButtons = document.querySelectorAll('.select-service');
    const serviceInput = document.getElementById('service');

    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const service = button.getAttribute('data-service');
            serviceInput.value = service;
            serviceInput.classList.remove('is-invalid');
        });
    });

    // Form validation and submission
    const form = document.getElementById('serviceForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const formData = {
            from_name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: serviceInput.value,
            date: document.getElementById('date').value,
            details: document.getElementById('details').value
        };

        // Send email via EmailJS
        emailjs.send('service_tzzmwxg', 'template_tn3efha', formData)
            .then((response) => {
                formMessage.innerHTML = '<div class="alert alert-success">Solicitud enviada con éxito. ¡Te contactaremos pronto!</div>';
                form.reset();
                form.classList.remove('was-validated');
            }, (error) => {
                formMessage.innerHTML = '<div class="alert alert-danger">Error al enviar la solicitud. Por favor, intenta de nuevo.</div>';
                console.error('EmailJS error:', error);
            });
    });
});