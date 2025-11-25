 // Typing Animation
        const typedItems = [
            "Full Stack Developer",
            "Web Developer", 
            "Software Engineer",
            "Web Designer"
        ];
        
        let itemIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typedElement = document.getElementById('typedText');
        
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
        
        // Start typing animation after page loads
        setTimeout(type, 1000);

        function toggleTheme() {
            document.body.classList.toggle('light-mode');
            const toggle = document.querySelector('.theme-toggle');
            toggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
        }

        function toggleChatbot() {
            const chatbot = document.getElementById('chatbotWindow');
            chatbot.classList.toggle('active');
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (message) {
                addMessage(message, 'user');
                input.value = '';
                
                setTimeout(() => {
                    const responses = [
                        "Thanks for reaching out! I'd be happy to discuss this further. Feel free to use the contact section above!",
                        "That's a great question! For detailed information, check out the relevant section or contact me directly.",
                        "I appreciate your interest! You can find more details in the portfolio sections above.",
                        "Interesting! I'd love to connect and discuss this more. Use the contact buttons to reach out!"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessage(randomResponse, 'bot');
                }, 1000);
            }
        }

        function addMessage(text, sender) {
            const messagesDiv = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            messageDiv.textContent = text;
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        function handleKeyPress(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        }


function toggleMoreDetails() {
    const moreDetails = document.getElementById('moreDetails');
    const btn = event.target;
    
    if (moreDetails.classList.contains('show')) {
        moreDetails.classList.remove('show');
        btn.textContent = 'Read More';
    } else {
        moreDetails.classList.add('show');
        btn.textContent = 'Read Less';
    }
}
  const downloadBtn = document.getElementById('downloadBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const btnText = document.querySelector('.btn-text');

    downloadBtn.addEventListener('click', function() {
        if (downloadBtn.classList.contains('downloading')) return;

        // Start download animation
        downloadBtn.classList.add('downloading');
        btnText.textContent = 'Downloading...';
        progressContainer.classList.add('active');
        progressText.classList.add('active');

        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;

            progressBar.style.width = progress + '%';
            progressText.textContent = `Downloading... ${Math.floor(progress)}%`;

            if (progress === 100) {
                clearInterval(interval);

                // Start actual download
                fetch('img/George_Vincent_ATS_Resume_Updated.pdf')
                    .then(response => {
                        if (!response.ok) throw new Error('PDF not found');
                        return response.blob();
                    })
                    .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'George_Vincent_Resume.pdf';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);

                        // Completed animation
                        downloadBtn.classList.remove('downloading');
                        downloadBtn.classList.add('completed');
                        btnText.textContent = 'Completed!';
                        progressText.textContent = 'Download Complete!';
                    })
                    .catch(error => {
                        console.error('Error downloading PDF:', error);
                        alert('Error downloading the PDF file. Please try again.');
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

      
    
   function openVideoModal(src) {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");

    video.src = src;  // Load video
    modal.classList.add("active");
}

function closeVideoModal() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");

    video.pause();
    video.src = "";  
    modal.classList.remove("active");
}