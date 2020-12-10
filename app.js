const form = document.getElementById('loan-form');
form.addEventListener('submit', calculate);

function calculate(e) {
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const tenure = document.getElementById('tenure');
  const emi = document.getElementById('emi');
  const principalAmount = document.getElementById('principalAmount');
  const interestAmount = document.getElementById('interestAmount');
  const totalAmount = document.getElementById('totalAmount');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(tenure.value) * 12;
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const emiAmount = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(emiAmount)) {
    emi.value = emiAmount.toFixed(2);
    principalAmount.value = principal;
    interestAmount.value = (emiAmount * calculatedPayments - principal).toFixed(2);
    totalAmount.value = (emiAmount * calculatedPayments).toFixed(2);
  } else {
    showError('Please check your input');
  }
  e.preventDefault();
}
function showError(error) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  card.insertBefore(errorDiv, heading);
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}
