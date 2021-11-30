const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [];

// Show Loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loader
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote(){
    loading();
    // Pick a Random quote form APIQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if quote has an Author, if not put 'Unknown'
    if (!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    //Check length of quote add CSS to long quotes

    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}
// Get Quotes From API



async function getQuotes() {
    loading();
    const apiUrl= 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        // Catch Error Here
    }
    complete();
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes();