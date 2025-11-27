document.addEventListener("DOMContentLoaded", function () {

    // Typing Animation
    const typedItems = ["Full Stack Developer", "Web Developer", "Software Engineer", "Web Designer"];
    let itemIndex = 0, charIndex = 0, isDeleting = false;
    const typedElement = document.getElementById('typedText');

    function type() {
        const currentItem = typedItems[itemIndex];

        if (isDeleting) {
            typedElement.textContent = currentItem.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentItem.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentItem.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            itemIndex = (itemIndex + 1) % typedItems.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);


    // Theme Toggle
    window.toggleTheme = function () {
        document.body.classList.toggle('light-mode');
        const toggle = document.querySelector('.theme-toggle');
        toggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
    };


    // Chatbot
    window.toggleChatbot = function () {
        document.getElementById('chatbotWindow').classList.toggle('active');
    };

    window.sendMessage = function () {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (message) {
            addMessage(message, 'user');
            input.value = '';

            setTimeout(() => {
                const responses = [
                    "Thanks for reaching out! I'd be happy to discuss further!",
                    "Great question! Check the contact section for more details.",
                    "Thanks for your interest! More info is available in the above sections.",
                    "Feel free to use the contact buttons to reach out!"
                ];
                addMessage(responses[Math.floor(Math.random() * responses.length)], 'bot');
            }, 1000);
        }
    };

    function addMessage(text, sender) {
        const messagesDiv = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    window.handleKeyPress = function (e) {
        if (e.key === 'Enter') sendMessage();
    };


    // Read More Button
    window.toggleMoreDetails = function () {
        const moreDetails = document.getElementById('moreDetails');
        const btn = event.target;

        if (moreDetails.classList.contains('show')) {
            moreDetails.classList.remove('show');
            btn.textContent = 'Read More';
        } else {
            moreDetails.classList.add('show');
            btn.textContent = 'Read Less';
        }
    };


    // Download PDF Animation + Actual Download
    const downloadBtn = document.getElementById('downloadBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const btnText = document.querySelector('.btn-text');

    downloadBtn.addEventListener('click', function () {
        if (downloadBtn.classList.contains('downloading')) return;

        downloadBtn.classList.add('downloading');
        btnText.textContent = 'Downloading...';
        progressContainer.classList.add('active');
        progressText.classList.add('active');

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;

            progressBar.style.width = progress + '%';
            progressText.textContent = `Downloading... ${Math.floor(progress)}%`;

            if (progress === 100) {
                clearInterval(interval);

                fetch('img/George_Vincent_ATS_Resume_Updated.pdf')
                    .then(response => response.blob())
                    .then(blob => {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'George_Vincent_Resume.pdf';
                        a.click();
                        URL.revokeObjectURL(url);

                        downloadBtn.classList.remove('downloading');
                        downloadBtn.classList.add('completed');
                        btnText.textContent = 'Completed!';
                        progressText.textContent = 'Download Complete!';
                    })
                    .catch(() => {
                        alert('Error downloading PDF!');
                        resetButton();
                    });
            }
        }, 200);
    });

    function resetButton() {
        downloadBtn.classList.remove('downloading', 'completed');
        btnText.textContent = 'Download PDF';
        progressContainer.classList.remove('active');
        progressText.classList.remove('active');
        progressBar.style.width = '0%';
    }


    // Video Modal
    window.openVideoModal = function (src) {
        const modal = document.getElementById("videoModal");
        const video = document.getElementById("modalVideo");

        video.src = src;
        modal.classList.add("active");
    };

    window.closeVideoModal = function () {
        const modal = document.getElementById("videoModal");
        const video = document.getElementById("modalVideo");

        video.pause();
        video.src = "";
        modal.classList.remove("active");
    };

});



