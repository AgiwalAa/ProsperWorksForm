//Listen for form submit 

document.getElementById('myForm').addEventListener('submit', function(event){
    //Get form values 
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let number = document.getElementById('number').value;

    if (!validateForm(name,email,number)) {
        return false;
    }

    event.preventDefault();

    var gmailCheck = /^[\w.+\-]+@gmail\.com$/;
    var gmailRegex = new RegExp(gmailCheck);

    if (!email.match(gmailRegex)) {

        // Email does not match gmail, so call API 
        fetch("https://api.prosperworks.com/developer_api/v1/leads", {
            method: "post",
            headers: {
                'X-PW-AccessToken': '9eba56e5e6c85e65a3ec034d935e3a74',
                'X-PW-Application': 'developer_api',
                'X-PW-UserEmail': 'kashwal1992@gmail.com',
                'Content-Type': 'application/json'
            },
          
            //make sure to serialize your JSON body
            body: JSON.stringify({
                name: name,
                email: {
                    email: email,
                    "category": "work"
                },
                phone_numbers: [
                    {
                        number: number,
                        "category": "mobile"
                    }
                ]
            })
        }).then((res) => res.json())
        .then((data) =>  console.log(data))
        .catch((err)=>console.log(err))
      
    }

    else {
      
        // Email matches GMAIL, so open mail client 
        window.location.assign('mailto:' + email); 
    }
    
    event.preventDefault();
});


function validateForm(name,email,number) {
    if (!name || !email || !number) {
        alert('Please fill in the form');
        return false;
    }
    return true;
}

