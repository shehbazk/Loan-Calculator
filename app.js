// Listen for submit

document.getElementById('loan-form').addEventListener('submit',function(e){
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults,2000);
    e.preventDefault();
});

// Calculate function

function calculateResults(){
    // UL vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalinterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 /12;
    const calculatedPayments = parseFloat(years.value)*12;

    // monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalinterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
        
        document.getElementById('loading').style.display = 'none'
        document.getElementById('results').style.display = 'block'
    }else{
            showError('Please Check Your Number');
            document.getElementById('loading').style.display = 'none'
    }
}

// showError Function

function showError(error){
    const errorDiv = document.createElement('div');

    errorDiv.className ='alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));

    // insertion

    // heading
    const heading = document.querySelector('.heading');

    //card
    const card = document.querySelector('.card');

    // Insertion
    card.insertBefore(errorDiv,heading);
    // timeout after 3 sec

    setTimeout(clearError,3000);
}

// clearError Function

function clearError(){
    document.querySelector('.alert').remove();
}