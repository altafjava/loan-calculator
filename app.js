const form = document.getElementById('loan-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculate, 2000);
});

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
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your input');
  }
}
function showError(error) {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  card.insertBefore(errorDiv, heading);
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 2000);
}
