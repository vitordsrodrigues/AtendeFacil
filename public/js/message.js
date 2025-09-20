// Auto-dismiss das mensagens

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        let flashMessage = document.querySelector('.message');
        if (flashMessage) {
            flashMessage.style.transition = "opacity 0.5s ease-out";
            flashMessage.style.opacity = "0";
            setTimeout(() => flashMessage.remove(), 500);
        }
    }, 3000); // A mensagem desaparecerá após 6 segundos
});