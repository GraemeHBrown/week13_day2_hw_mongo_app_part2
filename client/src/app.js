const QuoteView = require('./views/quoteView');
const Request = require('./services/request.js');

const quoteView = new QuoteView();
const request = new Request('http://localhost:3000/api/quotes');


const createButtonClicked = function (event) {
    event.preventDefault();
    console.log('form submit clicked');

    const nameInputValue = document.querySelector('#name').value;
    const quoteInputValue = document.querySelector('#quote').value;

    const quoteToSend = {
        name: nameInputValue,
        quote: quoteInputValue
    };

    request.post(createRequestComplete, quoteToSend);
};

const createRequestComplete = function (newQuote) {
    console.log(newQuote);
    quoteView.addQuote(newQuote);
}

const appStart = function () {
    request.get(getQuotesRequestComplete);
    const createQuoteButton = document.querySelector('#submit-quote');
    createQuoteButton.addEventListener('click', createButtonClicked);
    const deleteAllButton = document.querySelector('#deleteButton');
    deleteAllButton.addEventListener('click', deleteAllButtonClicked);
};

const deleteAllButtonClicked = function () {
    console.log('Delete all button clicked');
    request.deleteAll(deleteAllRequestComplete);
};

const deleteAllRequestComplete =function ()  {
    quoteView.clear();
}

const getQuotesRequestComplete = function (allQuotes) {
    console.log(allQuotes);
};

document.addEventListener('DOMContentLoaded', appStart);
