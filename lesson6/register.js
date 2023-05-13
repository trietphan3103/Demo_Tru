let register_form = document.getElementById('register-form');

register_form.addEventListener('submit', function (e) {
    e.preventDefault();
    // lấy input
    let email = document.querySelector('.email-input').value;
    let password = document.querySelector('.password-input').value;
    let repassword = document.querySelector('.repassword-input').value;

    // Lấy data từ local storage
    let user_email_list = localStorage.getItem("user_email_list");
    user_email_list = JSON.parse( user_email_list );

    let user_password_list = localStorage.getItem("user_password_list");
    user_password_list = JSON.parse( user_password_list );

    if ( email == '' || password == '' || repassword == '') {
        noti( 'Vui lòng điền đầy đủ thông tin', email, password, repassword, 0 );
        return;
    }

    if ( password != repassword ) {
        noti( 'Mật khẩu không trùng khớp', email, password, repassword, 0 );
        return;
    }

    if ( user_email_list == null && user_password_list == null ) {
        user_email_list = [email];
        user_password_list = [password];
        localStorage.setItem( "user_email_list", JSON.stringify(user_email_list) );
        localStorage.setItem( "user_password_list", JSON.stringify(user_password_list) );
        noti( 'Đăng ký thành công', email, password, repassword, 1 );
    } else {
        for( key in user_email_list ) {
            if ( email == user_email_list[key] ) {
                noti( 'Email đã tồn tại', email, password, repassword, 0 );
                return;
            }
        }
        user_email_list.push(email);
        user_password_list.push(password);
        localStorage.setItem( "user_email_list", JSON.stringify(user_email_list) );
        localStorage.setItem( "user_password_list", JSON.stringify(user_password_list) );
        noti( 'Đăng ký thành công', email, password, repassword, 1 );
        
    }
})

function noti( message, email, password, repassword, status ) {
    document.querySelector('.email-input').value = email;
    document.querySelector('.password-input').value = password;
    document.querySelector('.repassword-input').value = repassword;
    let noti = document.querySelector('#noti-mess')
    noti.innerHTML = message;
    if ( status == 1 ) {
        noti.style.color = 'green';
        document.querySelector('.email-input').value = '';
        document.querySelector('.password-input').value = '';
        document.querySelector('.repassword-input').value = '';
    } else {
        noti.style.color = 'red';
    }
    noti.style.opacity = 1;

}