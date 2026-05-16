const defaultProducts=[
 {id:'grey',name:'Grey White',price:499,old:999,img:'images/product-grey-1.png',gallery:['images/product-grey-1.png','images/product-grey-2.png','images/product-grey-3.png']},
 {id:'brown',name:'Brown White',price:499,old:999,img:'images/product-brown-1.png',gallery:['images/product-brown-1.png','images/product-brown-2.png','images/product-brown-3.png']},
 {id:'pink',name:'Pink White',price:549,old:1099,img:'images/product-pink-1.png',gallery:['images/product-pink-1.png','images/product-pink-2.png','images/product-pink-3.png']},
 {id:'black',name:'Black White',price:549,old:1099,img:'images/product-black-1.png',gallery:['images/product-black-1.png','images/product-black-2.png','images/product-black-3.png']},
 {id:'rainbow',name:'Rainbow Fun',price:649,old:1299,img:'images/product-rainbow-1.png',gallery:['images/product-rainbow-1.png','images/product-rainbow-2.png','images/product-rainbow-3.png']},
 {id:'white',name:'Snow White',price:499,old:999,img:'images/product-white-1.png',gallery:['images/product-white-1.png','images/product-white-2.png','images/product-white-3.png']}
];

const RAZORPAY_KEY_ID = 'rzp_live_SnyAGJqKUompfc';
const defaultHero = {
  image: 'images/hero-banner.png',
  kicker: 'Remote controlled wagging tail',
  title: 'Make Your Ride <span>Come Alive!</span>',
  subtitle: 'A fun moving tail for bike, scooty and car. Strong magnet, remote control, water-resistant design and rechargeable battery.',
  buttonText: 'Shop Now',
  buttonLink: 'shop.html'
};
function getHero(){return {...defaultHero,...JSON.parse(localStorage.getItem('ridetail_hero_settings')||'{}')}}
function saveHeroSettings(){
  const h={
    image:document.getElementById('heroImage')?.value.trim()||defaultHero.image,
    kicker:document.getElementById('heroKicker')?.value.trim()||defaultHero.kicker,
    title:document.getElementById('heroTitle')?.value.trim()||defaultHero.title,
    subtitle:document.getElementById('heroSubtitle')?.value.trim()||defaultHero.subtitle,
    buttonText:document.getElementById('heroButtonText')?.value.trim()||defaultHero.buttonText,
    buttonLink:document.getElementById('heroButtonLink')?.value.trim()||defaultHero.buttonLink
  };
  localStorage.setItem('ridetail_hero_settings',JSON.stringify(h));
  alert('Hero banner saved. Home page hero will update automatically.');
  renderHeroAdmin();
}
function uploadHeroImage(input){let file=input.files&&input.files[0];if(!file)return;let reader=new FileReader();reader.onload=()=>{document.getElementById('heroImage').value=reader.result;saveHeroSettings()};reader.readAsDataURL(file)}
function resetHero(){localStorage.removeItem('ridetail_hero_settings');alert('Hero banner reset.');location.reload()}
function renderHero(){
  const hero=document.querySelector('.hero'); if(!hero)return;
  const h=getHero();
  hero.style.background=`linear-gradient(180deg,rgba(5,8,13,.08),#05080d),url('${h.image}') center/cover`;
  const kicker=hero.querySelector('.kicker'); if(kicker)kicker.textContent=h.kicker;
  const title=hero.querySelector('.title'); if(title)title.innerHTML=h.title;
  const sub=hero.querySelector('.sub'); if(sub)sub.textContent=h.subtitle;
  const btn=hero.querySelector('.btn.primary'); if(btn){btn.textContent=h.buttonText;btn.href=h.buttonLink;}
}
function renderHeroAdmin(){
  const el=document.getElementById('heroManager'); if(!el)return;
  const h=getHero();
  el.innerHTML=`<div class="card image-editor hero-admin"><img src="${h.image}" alt="Hero banner"><div><h2>Hero Banner Settings</h2><p class="muted">Home page का main banner, headline और button यहाँ से update होगा.</p><label>Hero Banner Image URL</label><input class="input" id="heroImage" value="${h.image}"><label>Upload Hero Banner</label><input class="input file-input" type="file" accept="image/*" onchange="uploadHeroImage(this)"><label>Small Text / Kicker</label><input class="input" id="heroKicker" value="${h.kicker}"><label>Main Title</label><input class="input" id="heroTitle" value="${h.title.replace(/"/g,'&quot;')}"><label>Subtitle</label><textarea class="input textarea" id="heroSubtitle">${h.subtitle}</textarea><label>Button Text</label><input class="input" id="heroButtonText" value="${h.buttonText}"><label>Button Link</label><input class="input" id="heroButtonLink" value="${h.buttonLink}"><button class="btn primary" onclick="saveHeroSettings()">Save Hero Banner</button> <button class="btn secondary" onclick="resetHero()">Reset Hero</button></div></div>`
}

function getOverrides(){return JSON.parse(localStorage.getItem('ridetail_product_images')||'{}')}
function getProducts(){return defaultProducts}
const products=getProducts();
function cart(){return JSON.parse(localStorage.getItem('ridetail_cart')||'[]')}
function saveCart(c){localStorage.setItem('ridetail_cart',JSON.stringify(c));updateCartCount()}
function updateCartCount(){document.querySelectorAll('.cart-dot').forEach(e=>e.dataset.count=cart().reduce((a,b)=>a+b.qty,0))}
function displayProductName(p){
  const map={grey:'Grey & White Edition',brown:'Brown & White Edition',pink:'Pink & White Edition',black:'Black & White Edition',rainbow:'Rainbow Edition',white:'Snow White Edition'};
  return `RideTail™ ${map[p.id]||p.name}`;
}
function setCartQty(id,qty){
  let c=cart();
  qty=parseInt(qty,10)||0;
  if(qty<=0){
    if(!confirm('Remove this product from your order?')) return;
    c=c.filter(x=>x.id!==id);
  }else{
    c=c.map(x=>x.id===id?{...x,qty}:x);
  }
  saveCart(c);
  renderCart();
  renderCheckout();
}
function changeCartQty(id,delta){
  const item=cart().find(x=>x.id===id);
  if(!item)return;
  setCartQty(id,item.qty+delta);
}
function removeCartItem(id){
  if(!confirm('Are you sure you want to remove this product?')) return;
  saveCart(cart().filter(x=>x.id!==id));
  renderCart();
  renderCheckout();
}
function addToCart(id,qty=1){let c=cart();let item=c.find(x=>x.id===id);if(item)item.qty+=qty;else c.push({id,qty});saveCart(c);alert('Added to cart')}
function buyNow(id){addToCart(id,1);location.href='checkout.html'}
function productCard(p){return `<div class="card product-card"><a href="product.html?id=${p.id}"><img src="${p.img}" alt="${displayProductName(p)}"><h3>${displayProductName(p)}</h3></a><div class="rating">★★★★★ <span class="muted">(4.8)</span></div><p><b>₹${p.price}</b> <span class="old">₹${p.old}</span></p><button class="btn primary" onclick="addToCart('${p.id}')">Add to Cart</button></div>`}
function renderProducts(){let el=document.getElementById('products');if(el)el.innerHTML=products.map(productCard).join('')}
function renderProduct(){let el=document.getElementById('productDetail');if(!el)return;let id=new URLSearchParams(location.search).get('id')||'grey';let p=products.find(x=>x.id===id)||products[0];let imgs=(p.gallery&&p.gallery.length?p.gallery:[p.img]);el.innerHTML=`<div class="two-col"><div class="gallery"><img id="mainImg" class="main-product-img" src="${imgs[0]}"><div class="thumbs">${imgs.map((im,i)=>`<img class="${i?'':'active'}" src="${im}" onclick="mainImg.src='${im}';document.querySelectorAll('.thumbs img').forEach(t=>t.classList.remove('active'));this.classList.add('active')">`).join('')}</div></div><div class="card"><span class="badge">Best Seller</span><h1>${displayProductName(p)}</h1><div class="rating">★★★★★ <span class="muted">(4.8) 2,345 Reviews</span></div><p><span class="price">₹${p.price}</span><span class="old">₹${p.old}</span> <span class="badge">50% OFF</span></p><div class="list"><div>Remote Controlled</div><div>Strong Magnetic Base</div><div>3+ Wagging Modes</div><div>Water Resistant</div><div>Rechargeable Battery USB-C</div></div><br><button class="btn primary" onclick="addToCart('${p.id}')">Add to Cart</button><br><br><button class="btn secondary" onclick="buyNow('${p.id}')">Buy Now</button><p class="muted">Prepaid Payment • 7 Days Return • Fast Delivery</p></div></div>`}
function miniGallery(p){let imgs=(p.gallery&&p.gallery.length?p.gallery:[p.img]).slice(0,3);while(imgs.length<3)imgs.push(p.img);return `<div class="cart-gallery">${imgs.map((im,i)=>`<img src="${im}" alt="${p.name} image ${i+1}">`).join('')}</div>`}
function renderCart(){
  let el=document.getElementById('cartItems');if(!el)return;
  let c=cart();
  if(!c.length){el.innerHTML=`<div class="card empty-state"><h2>Your cart is empty</h2><p class="muted">Add your favourite RideTail color and continue checkout.</p><a class="btn primary" href="shop.html">Continue Shopping</a></div>`;return}
  let total=0;
  el.innerHTML=c.map(i=>{
    let p=products.find(x=>x.id===i.id);if(!p)return '';
    total+=p.price*i.qty;
    return `<div class="card cart-item enhanced-cart-item">${miniGallery(p)}<div><b>${displayProductName(p)}</b><p>₹${p.price} × ${i.qty}</p><div class="qty"><button type="button" onclick="changeCartQty('${p.id}',-1)">−</button><span>${i.qty}</span><button type="button" onclick="changeCartQty('${p.id}',1)">+</button></div><button type="button" class="remove-link" onclick="removeCartItem('${p.id}')">Remove</button></div></div>`
  }).join('')+`<div class="card"><h2>Total: ₹${total}</h2><a class="btn primary glow" href="checkout.html">Checkout</a></div>`
}
function getCartTotal(){let total=0;cart().forEach(i=>{let p=products.find(x=>x.id===i.id);if(p)total+=p.price*i.qty});return total}
function renderCheckout(){
  let el=document.getElementById('checkoutItems');if(!el)return;
  let c=cart();
  if(!c.length){el.innerHTML=`<div class="card empty-state"><h2>Your cart is empty</h2><p class="muted">No product selected for checkout.</p><a class="btn primary" href="shop.html">Continue Shopping</a></div>`;return}
  let total=0;
  el.innerHTML=c.map((i,idx)=>{
    let p=products.find(x=>x.id===i.id);if(!p)return '';
    total+=p.price*i.qty;
    let imgs=(p.gallery&&p.gallery.length?p.gallery:[p.img]).slice(0,3);
    while(imgs.length<3)imgs.push(p.img);
    return `<div class="card checkout-product-card">
      <div class="checkout-gallery">
        <img id="checkoutMain_${p.id}" class="checkout-main-img" src="${imgs[0]}" alt="${displayProductName(p)}">
        <div class="checkout-thumbs">${imgs.map((im,n)=>`<img class="${n?'':'active'}" src="${im}" onclick="document.getElementById('checkoutMain_${p.id}').src='${im}';this.parentElement.querySelectorAll('img').forEach(x=>x.classList.remove('active'));this.classList.add('active')">`).join('')}</div>
      </div>
      <div class="checkout-product-info">
        <div class="order-head"><div><span class="badge">Selected Variant</span><h3>${displayProductName(p)}</h3></div><button type="button" class="remove-x" title="Remove product" onclick="removeCartItem('${p.id}')">×</button></div>
        <p><b>Color:</b> ${p.name}</p>
        <p><b>Delivery:</b> 4–7 Days</p>
        <p><b>Price:</b> ₹${p.price}</p>
        <div class="qty"><button type="button" onclick="changeCartQty('${p.id}',-1)">−</button><span>${i.qty}</span><button type="button" onclick="changeCartQty('${p.id}',1)">+</button></div>
        <button type="button" class="remove-link" onclick="removeCartItem('${p.id}')">Remove Product</button>
      </div>
    </div>`
  }).join('')+`<div class="card payable-card"><div class="urgency">🔥 27 people are viewing this product</div><h2>Payable: ₹${total}</h2><p class="muted">Payment will open securely through Razorpay.</p><div class="trust-row"><span>🔒 Razorpay Secure</span><span>✅ SSL Checkout</span><span>🚚 Fast Shipping</span><span>🛵 Made for Bikes & Cars</span></div></div>`
}
function startRazorpayPayment(e){
  if(e)e.preventDefault();
  const c=cart();
  if(!c.length){alert('Your cart is empty.');location.href='shop.html';return}
  const total=getCartTotal();
  const payBtn=e?.target?.querySelector('button.primary');
  if(payBtn){payBtn.dataset.oldText=payBtn.textContent;payBtn.textContent='Opening Razorpay...';payBtn.disabled=true}
  const name=document.getElementById('custName')?.value.trim();
  const mobile=document.getElementById('custMobile')?.value.trim();
  const address=document.getElementById('custAddress')?.value.trim();
  const city=document.getElementById('custCity')?.value.trim();
  const email=document.getElementById('custEmail')?.value.trim()||'';
  if(!name||!mobile||!address||!city){if(payBtn){payBtn.textContent=payBtn.dataset.oldText;payBtn.disabled=false}alert('Please fill all delivery details.');return}
  if(typeof Razorpay==='undefined'){if(payBtn){payBtn.textContent=payBtn.dataset.oldText;payBtn.disabled=false}alert('Razorpay script not loaded. Please check internet connection.');return}
  const options={
    key: RAZORPAY_KEY_ID,
    amount: total*100,
    currency: 'INR',
    name: 'RideTail',
    description: 'RideTail Order Payment',
    prefill: {name:name, contact:mobile, email:email},
    notes: {address:address, city_state_pincode:city, customer_email: email, cart: JSON.stringify(c)},
    theme: {color: '#ff3f8f'},
    handler: function(response){
      const order=createRideTailOrder({
        name,mobile,address,city,total,items:c,
        payment_id:response.razorpay_payment_id,
        razorpay_order_id:response.razorpay_order_id||'',
        razorpay_signature:response.razorpay_signature||'',
        status:'Pending Verification',
        payment_status:'Payment Received - Manual Check Needed'
      });
      localStorage.setItem('ridetail_last_order',JSON.stringify(order));
      localStorage.removeItem('ridetail_cart');
      location.href='success.html?order='+encodeURIComponent(order.order_id);
    },
    modal:{ondismiss:function(){if(payBtn){payBtn.textContent=payBtn.dataset.oldText;payBtn.disabled=false}alert('Payment was not completed. You can try again.')}}
  };
  const rzp=new Razorpay(options);rzp.open();
}
function placeOrder(){startRazorpayPayment()}
function renderImageManager(){let el=document.getElementById('imageManager');if(!el)return;let o=getOverrides();el.innerHTML=defaultProducts.map(p=>{let img=o[p.id]?.img||p.img;let gal=o[p.id]?.gallery||p.gallery||[img];while(gal.length<3)gal.push(img);return `<div class="card image-editor"><img src="${gal[0]}" alt="${p.name}"><div><h3>${p.name}</h3><p class="muted">Image 1 main photo रहेगी. Image 2 और Image 3 gallery/cart/checkout style preview में दिखेंगी.</p>${[0,1,2].map(n=>`<div class="gallery-admin-row"><label>Image ${n+1} URL</label><input class="input" id="gal_${p.id}_${n}" value="${gal[n]||img}"><label>Upload Image ${n+1}</label><input class="input file-input" type="file" accept="image/*" onchange="uploadGalleryImage('${p.id}',${n},this)"></div>`).join('')}<button class="btn primary" onclick="saveProductGallery('${p.id}')">Save 3 Images</button></div></div>`}).join('')}
function saveProductGallery(id){let o=getOverrides();let gallery=[0,1,2].map(n=>document.getElementById(`gal_${id}_${n}`).value.trim()).filter(Boolean);if(!gallery.length){alert('Please add at least Image 1');return}while(gallery.length<3)gallery.push(gallery[0]);o[id]={img:gallery[0],gallery:gallery.slice(0,3)};localStorage.setItem('ridetail_product_images',JSON.stringify(o));alert('3 images saved. They will update on Shop, Product, Cart and Checkout pages.')}
function uploadGalleryImage(id,index,input){let file=input.files&&input.files[0];if(!file)return;let reader=new FileReader();reader.onload=()=>{document.getElementById(`gal_${id}_${index}`).value=reader.result;saveProductGallery(id)};reader.readAsDataURL(file)}
function resetProductImages(){localStorage.removeItem('ridetail_product_images');location.reload()}

function getRideTailOrders(){return JSON.parse(localStorage.getItem('ridetail_orders')||'[]')}
function saveRideTailOrders(orders){localStorage.setItem('ridetail_orders',JSON.stringify(orders))}
function createRideTailOrder(data){
  const orders=getRideTailOrders();
  const order={
    order_id:'RT'+Date.now().toString().slice(-8),
    created_at:new Date().toISOString(),
    status:data.status||'Pending Verification',
    payment_status:data.payment_status||'Payment Received - Manual Check Needed',
    ...data
  };
  orders.unshift(order);
  saveRideTailOrders(orders);
  return order;
}
function updateOrderStatus(orderId,status){
  const orders=getRideTailOrders().map(o=>o.order_id===orderId?{...o,status,updated_at:new Date().toISOString()}:o);
  saveRideTailOrders(orders);
  renderAdminOrders();
}
function deleteOrder(orderId){
  if(!confirm('Delete this order from this admin browser?'))return;
  saveRideTailOrders(getRideTailOrders().filter(o=>o.order_id!==orderId));
  renderAdminOrders();
}
function orderItemsHtml(o){
  return (o.items||[]).map(i=>{let p=products.find(x=>x.id===i.id)||{name:i.id,price:0,img:''};return `${displayProductName(p)} × ${i.qty}`}).join('<br>') || 'No items';
}
function renderSuccessOrder(){
  const el=document.getElementById('paymentInfo'); if(!el)return;
  const params=new URLSearchParams(location.search);
  const id=params.get('order');
  const orders=getRideTailOrders();
  const last=JSON.parse(localStorage.getItem('ridetail_last_order')||'{}');
  const o=orders.find(x=>x.order_id===id)||last;
  if(!o.order_id){el.innerHTML='<p class="muted">Order details not found on this browser.</p>';return}
  el.innerHTML=`<div class="card order-box"><h2>Manual Verification Required</h2><p class="muted">Payment received response मिल गया है. Dispatch से पहले Razorpay dashboard में Payment ID match कर लें.</p><div class="order-grid"><div><b>Order ID</b><br>${o.order_id}</div><div><b>Payment ID</b><br>${o.payment_id||'Not available'}</div><div><b>Total</b><br>₹${o.total||0}</div><div><b>Status</b><br>${o.status||'Pending Verification'}</div></div><hr><p><b>Name:</b> ${o.name||''}<br><b>Mobile:</b> ${o.mobile||''}<br><b>Address:</b> ${o.address||''}, ${o.city||''}</p><a class="btn secondary" href="track-order.html?order=${o.order_id}">Track This Order</a></div>`;
}
function renderAdminOrders(){
  const el=document.getElementById('adminOrders'); if(!el)return;
  const orders=getRideTailOrders();
  if(!orders.length){el.innerHTML='<div class="card"><h2>No orders yet</h2><p class="muted">Important: Static website में orders सिर्फ उसी browser में दिखेंगे जहाँ payment हुआ है. Real customer orders को एक admin में देखने के लिए backend/Google Sheet/Supabase चाहिए.</p></div>';return}
  el.innerHTML=orders.map(o=>`<div class="card order-card"><div class="order-head"><div><span class="badge">${o.status}</span><h3>${o.order_id}</h3><p class="muted">${new Date(o.created_at).toLocaleString()}</p></div><div class="price">₹${o.total||0}</div></div><div class="order-grid"><div><b>Payment ID</b><br><span class="copy-text">${o.payment_id||'-'}</span></div><div><b>Customer</b><br>${o.name||'-'}<br>${o.mobile||''}</div><div><b>Address</b><br>${o.address||''}<br>${o.city||''}</div><div><b>Items</b><br>${orderItemsHtml(o)}</div></div><div class="status-actions"><button class="btn secondary" onclick="updateOrderStatus('${o.order_id}','Pending Verification')">Pending</button><button class="btn primary" onclick="updateOrderStatus('${o.order_id}','Verified')">Verified</button><button class="btn secondary" onclick="updateOrderStatus('${o.order_id}','Shipped')">Shipped</button><button class="btn danger" onclick="updateOrderStatus('${o.order_id}','Cancelled')">Cancelled</button><button class="btn danger" onclick="deleteOrder('${o.order_id}')">Delete</button></div><p class="muted">Razorpay Dashboard में Payment ID search करके amount/customer match करें, फिर Verified दबाएँ.</p></div>`).join('')
}
function renderTrackOrder(){
  const el=document.getElementById('trackResult'); if(!el)return;
  const params=new URLSearchParams(location.search); const id=params.get('order')||'';
  if(id){document.getElementById('trackInput').value=id; findOrder();}
}
function findOrder(){
  const id=document.getElementById('trackInput')?.value.trim(); const el=document.getElementById('trackResult'); if(!el)return;
  const o=getRideTailOrders().find(x=>x.order_id===id);
  if(!o){el.innerHTML='<div class="card"><b>Order not found on this browser.</b><p class="muted">Support को अपना Razorpay Payment ID भेजें.</p></div>';return}
  el.innerHTML=`<div class="card"><h2>${o.order_id}</h2><p><b>Status:</b> ${o.status}</p><p><b>Payment ID:</b> ${o.payment_id||'-'}</p><p><b>Total:</b> ₹${o.total||0}</p><p class="muted">Payment verification के बाद dispatch update मिलेगा.</p></div>`
}

document.addEventListener('click',e=>{if(e.target.classList.contains('faq-q'))e.target.parentElement.classList.toggle('open')});
document.addEventListener('DOMContentLoaded',()=>{updateCartCount();renderHero();renderProducts();renderProduct();renderCart();renderCheckout();renderImageManager();renderHeroAdmin();renderSuccessOrder();renderAdminOrders();renderTrackOrder()});

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'ridetail123';
function adminLogin(){
  const user=document.getElementById('adminUser')?.value.trim();
  const pass=document.getElementById('adminPass')?.value.trim();
  const msg=document.getElementById('loginMsg');
  if(user===ADMIN_USERNAME && pass===ADMIN_PASSWORD){
    localStorage.setItem('ridetail_admin_logged_in','yes');
    location.href='admin-products.html';
  }else{
    if(msg) msg.textContent='Wrong username or password.';
  }
}
function adminLogout(){
  localStorage.removeItem('ridetail_admin_logged_in');
  location.href='admin-login.html';
}
