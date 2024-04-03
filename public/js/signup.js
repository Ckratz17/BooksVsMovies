const handleSignupSubmit = async (e) => {
    e.preventDefault()
    const name = document.querySelector('#signup-name').value.trim()
    const email = document.querySelector('#signup-email').value.trim()
    const password = document.querySelector('#signup-password').value.trim()

    console.log(`${name}/${email}/${password}`);
    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: { 'Content-Type': 'application/json'}
        })

        if (response.ok) {
            document.location.replace('/')
        }else {
            alert('Failed to create account')
        }
    }
}


document.querySelector('#signup-form').addEventListener('submit', handleSignupSubmit)