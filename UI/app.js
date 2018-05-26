
document.forms.loginForm.addEventListener('submit', login);
function login(e) {
    e.preventDefault();
    let email = document.forms.loginForm.elements.email.value;
    if (email === 'admin@admin.com' || email === 'clinton@test.com') {
        window.location.href="admin-index.html"
    } else{
        window.location.href="dashboard.html"
    }
}
