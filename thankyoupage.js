
    document.addEventListener('DOMContentLoaded', () => {
      // Calculate delivery date (7 days from now)
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 7);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      
      // Update delivery date element
      document.getElementById('deliveryDate').textContent = deliveryDate.toLocaleDateString('en-US', options);
    });
  