// navbar responsive 
function navbarResponsive() {
    const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const sideNav = document.getElementById('sideNav');

  // Nếu bạn thêm overlay thì cần dòng này:
  const overlay = document.getElementById('overlay');

  menuBtn.addEventListener('click', () => {
    sideNav.classList.add('active');
    overlay.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    sideNav.classList.remove('active');
    overlay.classList.remove('active');
  });

  // (Tuỳ chọn) nhấn ra ngoài để đóng
  overlay.addEventListener('click', () => {
    sideNav.classList.remove('active');
    overlay.classList.remove('active');
  });
}

document.addEventListener('DOMContentLoaded', navbarResponsive)

// hàm carousel
$(document).ready(function () {
  // Hàm cập nhật class my-active
  function updateActiveItem(carouselSelector, itemSelector) {
    // Xóa class my-active khỏi tất cả items trong carousel hiện tại
    $(carouselSelector).find(itemSelector).removeClass('my-active');
    
    // Tìm item đầu tiên trong viewport của carousel hiện tại
    const firstActiveItem = $(carouselSelector).find('.owl-item.active').first().find(itemSelector);
    
    if (firstActiveItem.length) {
      firstActiveItem.addClass('my-active');
      console.log('Added .my-active to:', firstActiveItem, 'Text:', firstActiveItem.find('.large-word').text(), 'Is cloned:', firstActiveItem.closest('.owl-item').hasClass('cloned'));
    } else {
      console.log('No valid active item found for selector:', itemSelector, 'in carousel:', carouselSelector);
    }
  }

  // Khởi tạo Owl Carousel
  $('.pro-list-me-content').owlCarousel({
    items: 6,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {items: 1},
      450: {items: 2},
      650: {items: 3},
      1270: {items: 4},
      1800: { items: 5 },
      2400: { items: 6}
    }
  });
  
  // Gắn sự kiện translated.owl.carousel cho carousel 1
  $('.pro-list-me-content').on('translated.owl.carousel', function (event) {
    updateActiveItem('.pro-list-me-content', '.pro-item-me');
  });


  $('.pro-list-drug-content').owlCarousel({
    items: 6,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {items: 1},
      450: {items: 2},
      650: {items: 3},
      1270: {items: 4},
      1800: { items: 5 },
      2400: { items: 6}
      }
  });

  // Gắn sự kiện translated.owl.carousel cho carousel 2
  $('.pro-list-drug-content').on('translated.owl.carousel', function (event) {
    updateActiveItem('.pro-list-drug-content', '.pro-item-drug');
  });

  $('.pro-list-me-sp-content').owlCarousel({
    items: 6,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {items: 1},
      450: {items: 2},
      650: {items: 3},
      1270: {items: 4},
      1800: { items: 5 },
      2400: { items: 6}
      }
  });

  // Cập nhật class my-active khi carousel chuyển động (next/prev)
  $('.pro-list-me-sp-content').on('translated.owl.carousel', function (event) {
    updateActiveItem('.pro-list-me-sp-content', '.pro-item-me-sp');
  });

  $('.promotion-content-right').owlCarousel({
    items: 6,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {items: 1},
      450: {items: 2},
      650: {items: 3},
      1270: {items: 4},
      1800: { items: 5 },
      2400: { items: 6}
      }
  });

  // Cập nhật class my-active khi carousel chuyển động (next/prev)
  $('.promotion-content-right').on('translated.owl.carousel', function (event) {
    updateActiveItem('.promotion-content-right', '.promotion-item');
  });

  $('.other-pro-list').owlCarousel({
    items: 6,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      380: { items: 2 },
      650: {items: 3 },
      991: { items: 4 },
      1280: { items: 5 },
      1800: { items: 6 }
    }
  });
$('.other-pro-list').on('translated.owl.carousel', function (event) {
    updateActiveItem('.other-pro-list', '.pro-item-other');
  });


  // Gọi hàm ngay sau khi khởi tạo để thêm my-active ban đầu
  setTimeout(function () {
    updateActiveItem('.pro-list-me-content', '.pro-item-me');
    updateActiveItem('.pro-list-drug-content', '.pro-item-drug');
    updateActiveItem('.pro-list-me-sp-content', '.pro-item-me-sp');
    updateActiveItem('.pro-list-me-sp-content', '.promotion-item');
    updateActiveItem('.other-pro-list', '.pro-item-other');
  }, 100); // Thêm độ trễ nhỏ cho lần khởi tạo ban đầu

});

// bộ đếm thời gian
function countTime() {
  function getInitialTime() {
    const days = parseInt(document.querySelector('.days-number').textContent) || 0;
    const hours = parseInt(document.querySelector('.hours-number').textContent) || 0;
    const mins = parseInt(document.querySelector('.mins-number').textContent) || 0;
    const secs = parseInt(document.querySelector('.secs-number').textContent) || 0;

    return days * 24 * 60 * 60 + hours * 60 * 60 + mins * 60 + secs;
  }

  function updateCountdown(totalSeconds) {
    if (totalSeconds <= 0) {
      clearInterval(timer);
      //dừng bộ đếm thời gian
      
      document.querySelector('.days-number').textContent = '0';
      document.querySelector('.hours-number').textContent = '0';
      document.querySelector('.mins-number').textContent = '0';
      document.querySelector('.secs-number').textContent = '0';
      return;
    }
    
    //tính toán
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor(totalSeconds % (24 * 60 * 60) / (60 * 60));
    const mins = Math.floor(totalSeconds % (60 * 60) / 60);
    const secs = totalSeconds % 60;

    // cập nhật giao diện
    // document.querySelector('.days-number').textContent = String(days).padStart(2, '0');
    // document.querySelector('.hours-number').textContent = String(hours).padStart(2, '0');
    // document.querySelector('.mins-number').textContent = String(mins).padStart(2, '0');
    // document.querySelector('.secs-number').textContent = String(secs).padStart(2, '0');
    document.querySelector('.days-number').textContent = days;
    document.querySelector('.hours-number').textContent = hours;
    document.querySelector('.mins-number').textContent = mins;
    document.querySelector('.secs-number').textContent = secs;
  }
  let totalSeconds = getInitialTime();

  // Cập nhật ngay lần đầu
  updateCountdown(totalSeconds);

  // Cập nhật mỗi giây
  const timer = setInterval(function () {
    totalSeconds--;
    updateCountdown(totalSeconds);
  }, 1000);
}

document.addEventListener('DOMContentLoaded', countTime);

$('.review-content').owlCarousel({
  items:2,
  loop:true,
  margin:10,
  nav: true,
  dots: false,
  responsive:{
      0:{
          items:1
      }
  }
})

function onlyAllowPhoneNumberInput(inputElement) {
  if (!inputElement) return;

  inputElement.setAttribute("maxlength", "11");

  inputElement.setAttribute("inputmode", "numeric");
  inputElement.setAttribute("pattern", "[0-9]{10,11}");
  inputElement.setAttribute("type", "tel");

  inputElement.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  onlyAllowPhoneNumberInput(document.getElementById("phone"));
});

// Định nghĩa các giá trị mặc định cho sản phẩm
const defaultValues = {
  'Sản phẩm A': {
      price: 46000,
      content: '500mg',
      unit: 'Viên',
      packaging: 'Hộp 10 vỉ x 10 viên',
      manufacturer: 'Công ty cổ phần dược ABC - XYZ',
      origin: 'Việt Nam'
  },
  'Sản phẩm B': {
      price: 75000,
      content: '250mg',
      unit: 'Gói',
      packaging: 'Hộp 20 gói',
      manufacturer: 'Công ty cổ phần dược ABC - XYZ',
      origin: 'Việt Nam'
  }
};

// Hàm cập nhật giá trong phần add-to-cart
function updatePrice() {
  const productSelect = document.getElementById('product-name');
  const quantityInput = document.getElementById('quantity');
  const priceValue = document.querySelector('.value-price');
  const decreaseBtn = document.querySelector('.quantity-btn.decrease');
  const increaseBtn = document.querySelector('.quantity-btn.increase');

  // Lấy giá cơ bản từ defaultValues
  function getBasePrice() {
      const productName = productSelect.value;
      const price = defaultValues[productName]?.price || 0;
      console.log('Base price:', price, 'Product:', productName);
      return price;
  }

  // Hàm cập nhật giá
  function updateRowPrice() {
      let quantity = parseInt(quantityInput.value) || 1;
      if (quantity < 1 || isNaN(quantity)) {
          quantity = 1;
          quantityInput.value = 1;
      }
      if (quantity > 9999) {
          quantity = 9999;
          quantityInput.value = 9999;
      }
      const basePrice = getBasePrice();
      console.log('Quantity:', quantity, 'Base price:', basePrice);
      const newPrice = basePrice * quantity;
      priceValue.textContent = newPrice > 0 ? newPrice.toLocaleString('vi-VN') + ' VNĐ' : '0 VNĐ';
      console.log('New price:', newPrice);
  }

  // Gắn sự kiện cho nút giảm
  decreaseBtn.addEventListener('click', () => {
      let quantity = parseInt(quantityInput.value) || 1;
      quantity--;
      if (quantity < 1) quantity = 1;
      quantityInput.value = quantity;
      updateRowPrice();
  });

  // Gắn sự kiện cho nút tăng
  increaseBtn.addEventListener('click', () => {
      let quantity = parseInt(quantityInput.value) || 1;
      quantity++;
      if (quantity > 9999) quantity = 9999;
      quantityInput.value = quantity;
      updateRowPrice();
  });

  // Gắn sự kiện khi thay đổi sản phẩm
  productSelect.addEventListener('change', () => {
      console.log('Product changed:', productSelect.value);
      updateRowPrice();
  });

  // Gắn sự kiện khi thay đổi số lượng trực tiếp
  quantityInput.addEventListener('input', () => {
      updateRowPrice();
  });

  // Cập nhật giá ban đầu
  updateRowPrice();
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart() {
  const category = document.getElementById('category').value;
  const productName = document.getElementById('product-name').value;
  const activeIngredient = document.getElementById('active-ingredient').value;
  const quantity = parseInt(document.getElementById('quantity').value) || 1;
  const priceText = document.getElementById('price').textContent.replace(' VNĐ', '').replace(/\./g, '');
  const price = parseInt(priceText) || 0;
  const errorMessage = document.getElementById('error-message');

  console.log('Add to cart - Product:', productName, 'Price text:', priceText, 'Price:', price);

  // Validate input
  if (!productName) {
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Vui lòng chọn tên sản phẩm!';
      return;
  }
  if (price <= 0) {
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Giá sản phẩm không hợp lệ! Vui lòng chọn sản phẩm và thử lại.';
      return;
  }

  const productData = {
      name: productName,
      activeIngredient: activeIngredient,
      content: defaultValues[productName]?.content || 'N/A',
      unit: defaultValues[productName]?.unit || 'N/A',
      packaging: defaultValues[productName]?.packaging || 'N/A',
      quantity: quantity,
      manufacturer: defaultValues[productName]?.manufacturer || 'N/A',
      origin: defaultValues[productName]?.origin || 'N/A',
      price: price
  };

  // Simulate AJAX call
  simulateAjaxAdd(productData).then(response => {
      if (response.success) {
          addToTable(productData);
          updateTotalPrice();
          errorMessage.style.display = 'none';
      } else {
          errorMessage.style.display = 'block';
          errorMessage.textContent = 'Lỗi khi thêm sản phẩm!';
      }
  });
}

// Hàm giả lập AJAX
function simulateAjaxAdd(data) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve({ success: true });
      }, 500);
  });
}

// Hàm thêm sản phẩm vào bảng
function addToTable(product) {
  const tableBody = document.getElementById('order-table-body');
  const row = document.createElement('tr');
  const formattedPrice = product.price > 0 ? product.price.toLocaleString('vi-VN') : '0';
  row.innerHTML = `
      <td class="nor-word">${product.name}</td>
      <td class="nor-word non-active">${product.activeIngredient}</td>
      <td class="nor-word non-active">${product.content}</td>
      <td class="nor-word non-active">${product.unit}</td>
      <td class="nor-word">${product.packaging}</td>
      <td class="nor-word">${product.quantity}</td>
      <td class="nor-word non-active-mobile">${product.manufacturer}</td>
      <td class="nor-word non-active">${product.origin}</td>
      <td class="nor-word">${formattedPrice}</td>
      <td><button class="delete-btn" onclick="deleteItem(this)"><i class="fa-solid fa-trash-can"></i></button></td>
  `;
  tableBody.appendChild(row);
}

// Hàm xóa sản phẩm khỏi bảng
function deleteItem(button) {
  button.closest('tr').remove();
  updateTotalPrice();
}

// Hàm cập nhật tổng giá
function updateTotalPrice() {
  const tableBody = document.getElementById('order-table-body');
  const rows = tableBody.getElementsByTagName('tr');
  let total = 0;
  for (let row of rows) {
      const priceCell = row.cells[8].textContent.trim(); // Loại bỏ khoảng trắng
      const cleanedPrice = priceCell.replace(/[^0-9]/g, ''); // Loại bỏ tất cả ký tự không phải số
      const price = parseInt(cleanedPrice, 10) || 0; // Parse với base 10 để đảm bảo chính xác
      console.log('Price cell:', priceCell, 'Cleaned price:', cleanedPrice, 'Parsed price:', price); // Debug
      total += price;
  }
  document.getElementById('total-price').textContent = total > 0 ? total.toLocaleString('vi-VN') : '0';
}

// Khởi tạo khi tải trang
document.addEventListener('DOMContentLoaded', () => {
  const productSelect = document.getElementById('product-name');
  // Không đặt giá trị mặc định là 'Sản phẩm A', giữ nguyên giá trị mặc định là ""
  console.log('Default product:', productSelect.value); // Debug
  // Cập nhật giá
  updatePrice();
});


function showImg(src, alt, element) {
  const largeImage = document.getElementById('large-img');
  largeImage.src = src;
  largeImage.alt = alt;

  // Xóa class active khỏi tất cả các thumbnail
  document.querySelectorAll('.mini-img').forEach(img => img.classList.remove('active'));
  // Thêm class active cho thumbnail được nhấp
  element.classList.add('active');
}


document.addEventListener('DOMContentLoaded', function() {
  const decreaseBtn = document.querySelector('.btn-decrease');
  const increaseBtn = document.querySelector('.btn-increase');
  const quantityInput = document.getElementById('quantity-pro');

  // Xử lý sự kiện khi nhấn nút giảm
  decreaseBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) { // Đảm bảo giá trị không nhỏ hơn 1
          quantityInput.value = currentValue - 1;
      }
  });

  // Xử lý sự kiện khi nhấn nút tăng
  increaseBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
  });

  // Xử lý khi người dùng nhập trực tiếp vào input
  quantityInput.addEventListener('input', function() {
      let value = parseInt(quantityInput.value);
      if (isNaN(value) || value < 1) { // Đảm bảo giá trị hợp lệ
          quantityInput.value = 1;
      }
  });
});