document.addEventListener('DOMContentLoaded', function() {
  // Initialize any JavaScript functionality here
  
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.deal-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;
      
      if (elementPosition < screenPosition) {
        element.classList.add('visible');
      }
    });
  };
  
  // Run on initial load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Filter deals functionality (if implemented)
  const filterButtons = document.querySelectorAll('.filter-button');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter the deals
        const deals = document.querySelectorAll('.deal-card');
        
        deals.forEach(deal => {
          if (filter === 'all') {
            deal.style.display = 'block';
          } else {
            const category = deal.getAttribute('data-category');
            if (category === filter) {
              deal.style.display = 'block';
            } else {
              deal.style.display = 'none';
            }
          }
        });
      });
    });
  }
  
  // Search functionality
  const searchInput = document.getElementById('search-deals');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const deals = document.querySelectorAll('.deal-card');
      
      deals.forEach(deal => {
        const title = deal.querySelector('.deal-title').textContent.toLowerCase();
        
        if (title.includes(searchTerm)) {
          deal.style.display = 'block';
        } else {
          deal.style.display = 'none';
        }
      });
    });
  }
  
  // Alien cursor effect
  const cursor = document.createElement('div');
  cursor.classList.add('alien-cursor');
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Add hover effect to links
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('mouseenter', function() {
      cursor.classList.add('hover');
    });
    
    link.addEventListener('mouseleave', function() {
      cursor.classList.remove('hover');
    });
  });
}); 