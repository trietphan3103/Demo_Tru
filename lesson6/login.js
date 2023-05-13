
// let user_email_list = ['admin@gmail.com', 'user@gmail.com'];
// localStorage.setItem( "user_email_list", JSON.stringify(user_email_list) );

// let user_password_list = ['admin123', 'user123'];
// localStorage.setItem( "user_password_list", JSON.stringify(user_password_list) );

let login_form = document.getElementById('login-form');
if ( login_form !== '' ) {
    login_form.addEventListener('submit', function () {
        // lấy input
        let email = document.querySelector('.email-input').value;
        let password = document.querySelector('.password-input').value;
    
        // Lấy data từ local storage
        let user_email_list = localStorage.getItem("user_email_list");
        user_email_list = JSON.parse( user_email_list );
    
        let user_password_list = localStorage.getItem("user_password_list");
        user_password_list = JSON.parse( user_password_list );
    
        for( key in user_email_list ) {
            if ( email == user_email_list[key] && password == user_password_list[key] ) {
                alert('Đăng nhập thành công');
            }
        }
    
        alert("Đăng nhập không thành công");
    })
}