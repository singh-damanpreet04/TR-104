// GitHub Daily Diary JavaScript

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading state after a short delay
    setTimeout(() => {
        document.getElementById('loadingState').classList.remove('active');
    }, 1000);

    // Initialize event listeners
    initializeWeekCards();
    initializeDetailButtons();
    initializePDFModal();
    initializeNavigation();
    initializeMobileMenu();
    updateProgress();
}

// Week card click functionality
function initializeWeekCards() {
    const weekCards = document.querySelectorAll('.week-card');
    
    weekCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't toggle if clicking on a button
            if (e.target.closest('.detail-btn')) return;
            
            const weekNumber = this.dataset.week;
            const detailSection = document.getElementById(`week${weekNumber}-detail`);
            
            // Close other weeks
            document.querySelectorAll('.week-detail').forEach(detail => {
                if (detail !== detailSection) {
                    detail.classList.remove('active');
                }
            });
            
            // Toggle current week
            detailSection.classList.toggle('active');
            
            // Add expanded class to card
            document.querySelectorAll('.week-card').forEach(c => {
                c.classList.remove('expanded');
            });
            if (detailSection.classList.contains('active')) {
                this.classList.add('expanded');
            }
        });
    });
}

// Detail button functionality
function initializeDetailButtons() {
    const detailButtons = document.querySelectorAll('.detail-btn');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Check if it's a PDF button
            if (this.classList.contains('pdf-btn')) {
                const pdfFile = this.dataset.pdf;
                if (pdfFile) {
                    openPDFModal(pdfFile);
                }
            } else {
                // Handle other actions
                const action = this.dataset.action;
                const week = this.dataset.week;
                handleDetailAction(action, week, this);
            }
        });
    });
}

// Handle different detail actions
function handleDetailAction(action, week, buttonElement) {
    switch(action) {
        case 'pdf':
            openPDFModal(buttonElement.dataset.pdf);
            break;
        case 'assignments':
            navigateToWeekPage(week, 'assignments');
            break;
        case 'notes':
            navigateToWeekPage(week, 'notes');
            break;
        case 'github':
            openGitHubProgress(week);
            break;
        case 'screenshots':
            navigateToWeekPage(week, 'screenshots');
            break;
        case 'projects':
            navigateToWeekPage(week, 'projects');
            break;
        case 'summary':
            showLearningSummary(week);
            break;
        default:
            console.log(`Action ${action} for week ${week}`);
    }
}

// PDF Modal functionality
let currentPDF = null;
let isModalOpen = false;

function initializePDFModal() {
    // Modal close on background click
    document.getElementById('pdfModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closePDFModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalOpen) {
            closePDFModal();
        }
    });
}

function openPDFModal(pdfFile) {
    currentPDF = pdfFile;
    
    // Set modal content
    document.getElementById('pdfFrame').src = pdfFile + '.pdf';
    document.getElementById('modalTitle').textContent = pdfFile.charAt(0).toUpperCase() + pdfFile.slice(1) + ' Report';
    
    // Show modal
    document.getElementById('pdfModal').classList.add('active');
    isModalOpen = true;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    showNotification(`Opening ${pdfFile} report...`);
}

function closePDFModal() {
    document.getElementById('pdfModal').classList.remove('active');
    isModalOpen = false;
    currentPDF = null;
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Clear iframe source
    setTimeout(() => {
        document.getElementById('pdfFrame').src = '';
    }, 300);
}

function downloadCurrentPDF() {
    if (!currentPDF) return;
    
    const link = document.createElement('a');
    link.href = currentPDF + '.pdf';
    link.download = currentPDF + '.pdf';
    link.click();
    
    showNotification('Download started...');
}

function fullscreenCurrentPDF() {
    const iframe = document.getElementById('pdfFrame');
    
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            const section = this.dataset.section;
            handleNavigation(section);
        });
    });
}

function handleNavigation(section) {
    // Simulate navigation to different sections
    console.log(`Navigating to ${section}`);
    showNotification(`Navigating to ${section.charAt(0).toUpperCase() + section.slice(1)}...`);
    
    // Here you would typically load different content based on the section
    if (section === 'dashboard') {
        // Already on dashboard
        return;
    }
    
    // Show loading state
    document.getElementById('loadingState').classList.add('active');
    
    // Simulate loading delay
    setTimeout(() => {
        document.getElementById('loadingState').classList.remove('active');
    }, 500);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    
    mobileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// Progress update
function updateProgress() {
    const completedWeeks = document.querySelectorAll('.week-badge').length;
    const totalWeeks = 4;
    const percentage = Math.round((completedWeeks / totalWeeks) * 100);
    
    document.getElementById('progressBar').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `${percentage}% Complete`;
}

// Navigation to week pages
function navigateToWeekPage(week, page) {
    showNotification(`Navigating to Week ${week} ${page.charAt(0).toUpperCase() + page.slice(1)}...`);
    
    // Simulate page navigation
    console.log(`Navigating to /week-${week}/${page}`);
    
    // Here you would typically navigate to a different page or load different content
    setTimeout(() => {
        showNotification(`Week ${week} ${page.charAt(0).toUpperCase() + page.slice(1)} loaded`);
    }, 1000);
}

// GitHub progress
function openGitHubProgress(week) {
    showNotification(`Opening Week ${week} GitHub Progress...`);
    
    // Simulate opening GitHub
    setTimeout(() => {
        window.open('https://github.com', '_blank');
    }, 500);
}

// Learning summary
function showLearningSummary(week) {
    const summaryData = {
        1: "Week 1: Introduction to ML concepts, data preprocessing, and basic algorithms. Completed 7 assignments and 3 mini-projects.",
        2: "Week 2: Deep dive into supervised learning including regression and classification. Mastered 8 assignments and 4 projects.",
        3: "Week 3: Explored unsupervised learning and neural networks. Currently working on 6 assignments and 5 projects.",
        4: "Week 4: Advanced deep learning and final projects. Upcoming content includes 5 assignments and 2 capstone projects."
    };
    
    showNotification(summaryData[week] || `Week ${week} learning summary`);
}

// Notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Global functions for HTML onclick handlers
window.closePDFModal = closePDFModal;
window.downloadCurrentPDF = downloadCurrentPDF;
window.fullscreenCurrentPDF = fullscreenCurrentPDF;
