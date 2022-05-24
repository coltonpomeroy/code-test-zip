const getInfoForZipcode = () => {
    const userInput = document.getElementById("user-input").value;
    const resultSection = document.getElementById("zipcode-result");
    resultSection.innerHTML = ""
    var client = new XMLHttpRequest();
    client.open("GET", `http://api.zippopotam.us/us/${userInput}`, true);
    client.onreadystatechange = function() {
        if(client.readyState == 4) {
            const data = JSON.parse(client.response)
            if(client.status == 200) renderSearchResult(resultSection, data)
            else resultSection.innerHTML = `<br/>No result for <strong>${userInput}</strong>.`
            document.getElementById("user-input").value = ""
        };
    };
    validateSubmission(client, userInput)
}

const renderSearchResult = (resultSection, data) => {
    resultSection.innerHTML = 
    `
        <img src="./states/${data['places'][0]['state abbreviation']}.svg" height="100" width="100" />
        <p> 
            <strong>${data['post code']}</strong> is the zipcode for  
            <strong>${data['places'][0]['place name']}, ${data['places'][0]['state']}</strong>.
        </p>
        <p>
            Its coordinates are (<strong>${data['places'][0]['latitude']}</strong>,
            <strong>${data['places'][0]['longitude']}</strong>).
        </p>
    `
}

const validateSubmission = (client, userInput) => {
    if(userInput.length == 5 && !isNaN(userInput)){
        client.send();
    }
    else if(userInput.length == 5 && isNaN(userInput)){
        window.alert("Only numeric zipcodes are supported at this time.")
    }
    else{
        window.alert("Please enter a five digit zipcode.")
    }
}
