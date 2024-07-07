function getTime() {
    var hours = document.getElementById('hours').value;
    var minutes = document.getElementById('minutes').value;
    var period = document.getElementById('period').value;
  
    // Format hours and minutes
    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);
  
    // Display the selected time
    alert(`Selected time: ${hours}:${minutes} ${period}`);
  }
  