
//trang dang nhap (login)


let login_form = document.getElementById('login-form');
if (login_form) {
    login_form.addEventListener('submit', function (e) {
        e.preventDefault();
        // lấy input
        let email = document.querySelector('.email-input').value;
        let password = document.querySelector('.password-input').value;

        // Lấy data từ local storage
        let user_email_list = localStorage.getItem("user_email_list");
        user_email_list = JSON.parse(user_email_list);

        let user_password_list = localStorage.getItem("user_password_list");
        user_password_list = JSON.parse(user_password_list);
        let is_login = false
        for (key in user_email_list) {
            if (email == user_email_list[key] && password == user_password_list[key]) {
                alert('Đăng nhập thành công');
                window.location ="../trang chu/index.html"
                is_login = true
            }
        }
        if (is_login == false){
            alert("Đăng nhập không thành công");
        }
        
    })

}



//trang dang ky (register)



let register_form = document.getElementById('register-form');
if (register_form) {
    register_form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log(e)
        // lấy input
        let email = document.querySelector('.email-input').value;
        let password = document.querySelector('.password-input').value;
        let repassword = document.querySelector('.repassword-input').value;

        // Lấy data từ local storage
        let user_email_list = localStorage.getItem("user_email_list");
        user_email_list = JSON.parse(user_email_list);

        let user_password_list = localStorage.getItem("user_password_list");
        user_password_list = JSON.parse(user_password_list);

        if (email == '' || password == '' || repassword == '') {
            noti('Vui lòng điền đầy đủ thông tin', email, password, repassword, 0);
            return;
        }

        if (password != repassword) {
            noti('Mật khẩu không trùng khớp', email, password, repassword, 0);
            return;
        }

        if (user_email_list == '' && user_password_list == '') {
            user_email_list = [email];
            user_password_list = [password];
            localStorage.setItem("user_email_list", JSON.stringify(user_email_list));
            localStorage.setItem("user_password_list", JSON.stringify(user_password_list));
        } else {
            for (key in user_email_list) {
                if (email == user_email_list[key]) {
                    noti('Email đã tồn tại', email, password, repassword, 0);
                    return;
                }
            }
            user_email_list.push(email);
            user_password_list.push(password);
            localStorage.setItem("user_email_list", JSON.stringify(user_email_list));
            localStorage.setItem("user_password_list", JSON.stringify(user_password_list));
            noti('Đăng ký thành công', email, password, repassword, 1);

        }
    })

    function noti(message, email, password, repassword, status) {
        document.querySelector('.email-input').value = email;
        document.querySelector('.password-input').value = password;
        document.querySelector('.repassword-input').value = repassword;
        let noti = document.querySelector('#noti-mess')
        noti.innerHTML = message;
        if (status == 1) {
            noti.style.color = 'green';
            document.querySelector('.email-input').value = '';
            document.querySelector('.password-input').value = '';
            document.querySelector('.repassword-input').value = '';
        } else {
            noti.style.color = 'red';
        }
        noti.style.opacity = 1;

    }

}







//trang chu





// async function logJSONData() {
//     const response = await fetch("https://testapi.io/api/trietphan3103/bikes");
//     const jsonData = await response.json();
//     return jsonData;
//   }

var products = ''

fetch(`https://testapi.io/api/trietphan3103/bikes`)
    .then(response => response.json())
    .then((data) => {

        console.log(data)

        let products = data.data   
        for (let key in products) {

            let items = products[key]

            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<div class="image-container">
                        <img src="${items.image}">
                        </div>
                        <div class="container">
                        <h5 class="product-name">${items.name}</h5>
                        <p class="product-content">${items.content}</p>
                        <h6><b>Price:</b>${items.price}</h6>
                        <button onclick="addToCart(${key})">Thêm vào giỏ hàng</button>
                        </div>`
            let productslist = document.getElementById("products")
            if (productslist) {
                document.getElementById("products").appendChild(card);
            }



        }


        
    })


    












//trang gioi thieu

let infor = {
    data: [
        {
            image: "../hinhanh/cach-su-dung-xe-dap-dia-hinh-2.png",
            main_content: "Cách sang số",
            content: "Đối với bên tay bấm để điều chuyển dĩa (tay trái). Bạn bấm tay gạt lớn nhất để lên số, ngược lại bấm tay gạt nhỏ để xuống số. Khi đó, bạn cần vừa bấm tay bấm đồng thời vừa đạp xe, không được bấm tay bấm khi không đạp xe.Đối với tay bấm để chỉnh líp, bấm tay gạt lớn nhất đồng thời kết hợp vừa đạp vừa gạt để lên số và tay gạt nhỏ để xuống số. Việc điều chỉnh líp sẽ tạo lực đẩy, giúp cho xe có thể di chuyển dễ dàng khi lên hoặc xuống dốc. Lưu ý: Bạn không nên để dĩa nhỏ nhất và líp nhỏ nhất hay dĩa lớn nhất và líp lớn nhất cùng hoạt động, bởi nó sẽ vô tình gây chéo sên ảnh hưởng đến sự an toàn của bạn và những người xung quanh."
        },

        {
            image: "../hinhanh/cach-su-dung-xe-dap-dia-hinh.jpg    ",
            main_content: "Lưu ý trước khi chuẩn bị đạp xe địa hình",
            content: "Trước khi chuẩn bị đạp xe địa hình ở những địa điểm có chướng ngại vật, địa hình gồ ghề, bạn cần phải thường xuyên luyện tập để làm quen với cách vận hành, sử dụng cấp số bộ đề,... ở những địa hình khác nhau từ bằng phẳng đến gấp khúc, gồ ghề. Bởi dùng phanh xe đạp địa hình trên những cung đường ngoằn ngoèo, gồ ghề không đơn giản chỉ cần dừng bóp phanh là xe sẽ dừng một cách an toàn mà cần phải linh hoạt xử lý tình huống bất ngờ một cách khéo léo, nhằm tránh trường hợp trơn trượt, thắng gấp, té xe, gây nguy hiểm cho bản thân và những người xung quanh. "
        },

        {
            image: "../hinhanh/cach-su-dung-xe-dap-dia-hinh-1.jpg    ",
            main_content: "Lưu ý trong quá trình đạp xe địa hình",
            content: "Khi sử dụng xe đạp địa hình leo dốc bạn cần giữ đều tốc độ di chuyển của xe và đạp đều chân để không bị tụt lùi. Thêm vào đó, để giảm bớt lực cản của gió thì hãy cúi người về phía trước, đồng thời hạn chế nhổm ra khỏi yên xe làm giảm độ bám đất của bánh xe sau. Khi xuống dốc, bạn nên giữ bàn đạp song song với mặt đất để tránh sự cố không mong muốn như va đập vào tảng đá, các vật cản khác,... "
        },
    ]
}
for (let key_2 in infor.data) {

    let items_2 = infor.data[key_2]



    let card_2 = document.createElement('div');
    card_2.classList.add('card_2');
    card_2.innerHTML = `<div class="image-container-infor">
            <img src="${items_2.image}">
            </div>
            <div class="container-infor">
            <h5 class="infor-name">${items_2.main_content}</h5>
            <p class="infor-content">${items_2.content}</p>
            </div>`
    let inforlist = document.getElementById("infor")
    if (inforlist) {
        document.getElementById("infor").appendChild(card_2);
    }

}