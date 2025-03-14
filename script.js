
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM Loaded - Script Running");

    // Donor type selection
    const donorTypes = document.querySelectorAll('.donor-type');
    const businessNameInput = document.getElementById('businessName');
  
    if (donorTypes.length > 0 && businessNameInput) {
        donorTypes.forEach(type => {
            type.addEventListener('click', function() {
                donorTypes.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                businessNameInput.placeholder = (this.id === 'individual') ? 'Full Name' : 'Business Name';
            });
        });
    } else {
        console.warn("⚠️ Donor type elements not found");
    }

    // Country code dropdown (optional)
    const countryCode = document.querySelector('.country-code');
    if (countryCode) {
        countryCode.addEventListener('click', function() {
            alert('Country code selection functionality would go here.');
        });
    }

    // Map modal functionality
    const mapModal = document.getElementById('mapModal');
    const pinLocationBtn = document.getElementById('pinLocationBtn');
    const closeBtn = document.querySelector('.close');
    const confirmLocationBtn = document.getElementById('confirmLocation');

    if (pinLocationBtn && mapModal && closeBtn && confirmLocationBtn) {
        let map;
        let marker;

        pinLocationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mapModal.style.display = 'block';
            initMap();
        });

        closeBtn.addEventListener('click', function() {
            mapModal.style.display = 'none';
        });

        confirmLocationBtn.addEventListener('click', function() {
            const locationValue = document.getElementById('location')?.value;
            if (locationValue) {
                document.getElementById('address').value = '123 Example Street';
                document.getElementById('pinCode').value = '400001';
                document.getElementById('city').value = 'Mumbai';
            }
            mapModal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === mapModal) {
                mapModal.style.display = 'none';
            }
        });

        function initMap() {
            if (map) {
                map.remove();
            }

            map = L.map('map').setView([20.5937, 78.9629], 5);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            map.on('click', function(e) {
                if (marker) {
                    map.removeLayer(marker);
                }
                marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
                document.getElementById('location').value = `${e.latlng.lat}, ${e.latlng.lng}`;
            });
        }
    } else {
        console.warn("⚠️ Map modal elements not found");
    }

    // Form submission
    const donorForm = document.getElementById('donorForm');
    if (donorForm) {
        donorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const mobileNumber = document.getElementById('mobileNumber')?.value;
            const emailId = document.getElementById('emailId')?.value;

            if (mobileNumber?.length < 10) {
                alert('Please enter a valid mobile number');
                return;
            }

            if (!validateEmail(emailId)) {
                alert('Please enter a valid email address');
                return;
            }

            alert('Form submitted successfully!');
        });
    } else {
        console.warn("⚠️ Form not found");
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+$/;
        return re.test(email);
    }
});