document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle the answer visibility
            if (answer.classList.contains('active')) {
                answer.classList.remove('active');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
            else {
                answer.classList.add('active');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });

    // Tab Toggle for Donor Profile
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and hide all tab contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Add active class to clicked tab and show corresponding content
            this.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.remove('hidden');
        });
    });

    // Create Donation Button
    const createDonationBtn = document.querySelector('.create-donation-btn');
    if (createDonationBtn) {
        createDonationBtn.addEventListener('click', function() {
            window.location.href = 'create-donation.html';
        });
    }

    // Handle food type selection in donation form
    const foodTypeBtns = document.querySelectorAll('.food-type-btn');
    if (foodTypeBtns.length > 0) {
        foodTypeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                foodTypeBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Photo upload preview
    const photoUpload = document.querySelector('.photo-upload');
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.querySelector('.photo-preview');
    
    if (photoUpload && photoInput) {
        photoUpload.addEventListener('click', function() {
            photoInput.click();
        });
        
        photoInput.addEventListener('change', function() {
            if (this.files) {
                for (let i = 0; i < this.files.length; i++) {
                    const file = this.files[i];
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        
                        reader.onload = function(e) {
                            const previewItem = document.createElement('div');
                            previewItem.className = 'preview-item';
                            
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            
                            const removeBtn = document.createElement('button');
                            removeBtn.className = 'remove-photo';
                            removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                            removeBtn.addEventListener('click', function(e) {
                                e.stopPropagation();
                                previewItem.remove();
                            });
                            
                            previewItem.appendChild(img);
                            previewItem.appendChild(removeBtn);
                            photoPreview.appendChild(previewItem);
                        };
                        
                        reader.readAsDataURL(file);
                    }
                }
            }
        });
    }

    // Map Location Button
    const mapLocationBtn = document.querySelector('.map-location-btn');
    if (mapLocationBtn) {
        mapLocationBtn.addEventListener('click', function() {
            // Get current location or open map interface
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    
                    // Here you would typically open a map or set hidden inputs
                    console.log(`Location: ${latitude}, ${longitude}`);
                    mapLocationBtn.innerHTML = '<i class="fas fa-check"></i> Location Set';
                    mapLocationBtn.style.backgroundColor = '#4caf50';
                    mapLocationBtn.style.color = 'white';
                    
                    // Set hidden inputs if they exist
                    const latInput = document.getElementById('latitude');
                    const lngInput = document.getElementById('longitude');
                    if (latInput && lngInput) {
                        latInput.value = latitude;
                        lngInput.value = longitude;
                    }
                });
            }
        });
    }

    // Form Submission
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically collect form data and submit
            // For demonstration, just show a success message
            alert('Donation post created successfully!');
            window.location.href = 'profile.html';
        });
    }
    
    // Handle share and copy buttons
    const shareButtons = document.querySelectorAll('.icon-btn');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const isShare = this.querySelector('.fa-share-alt');
            const isCopy = this.querySelector('.fa-copy');
            
            if (isShare) {
                // Handle share functionality
                if (navigator.share) {
                    navigator.share({
                        title: 'Food Donation',
                        text: 'Check out my food donation!',
                        url: window.location.href
                    });
                } else {
                    alert('Share feature is not supported on this browser');
                }
            }
            
            if (isCopy) {
                // Handle copy functionality (e.g., copy donation ID)
                const historyItem = this.closest('.history-item');
                if (historyItem) {
                    const donationId = historyItem.querySelector('.history-id').textContent;
                    navigator.clipboard.writeText(donationId)
                        .then(() => {
                            alert('Donation ID copied to clipboard');
                        })
                        .catch(err => {
                            console.error('Failed to copy text: ', err);
                        });
                }
            }
        });
    });
});