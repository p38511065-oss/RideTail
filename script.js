const defaultProducts=[
 {id:'grey',name:'Classic Grey',price:499,old:999,img:'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',gallery:['https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80']},
 {id:'brown',name:'Brown Fox',price:499,old:999,img:'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',gallery:['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80']},
 {id:'white',name:'Snow White',price:499,old:999,img:'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',gallery:['https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80']},
 {id:'pink',name:'Cute Pink',price:549,old:1099,img:'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80',gallery:['https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80']},
 {id:'black',name:'Midnight Black',price:499,old:999,img:'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80',gallery:['https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80']},
 {id:'rainbow',name:'Rainbow Fun',price:649,old:1299,img:'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',gallery:['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80']}
];

const RAZORPAY_KEY_ID = 'rzp_live_SnyAGJqKUompfc';
const defaultHero = {
  image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
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
function getProducts(){const o=getOverrides();return defaultProducts.map(p=>({...p,img:o[p.id]?.img||p.img,gallery:o[p.id]?.gallery?.length?o[p.id].gallery:p.gallery}))}
const products=getProducts();
function cart(){return JSON.parse(localStorage.getItem('ridetail_cart')||'[]')}
function saveCart(c){localStorage.setItem('ridetail_cart',JSON.stringify(c));updateCartCount()}
function updateCartCount(){document.querySelectorAll('.cart-dot').forEach(e=>e.dataset.count=cart().reduce((a,b)=>a+b.qty,0))}
function addToCart(id,qty=1){let c=cart();let item=c.find(x=>x.id===id);if(item)item.qty+=qty;else c.push({id,qty});saveCart(c);alert('Added to cart')}
function buyNow(id){addToCart(id,1);location.href='checkout.html'}
function productCard(p){return `<div class="card product-card"><a href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.name}"><h3>${p.name}</h3></a><div class="rating">★★★★★ <span class="muted">(4.8)</span></div><p><b>₹${p.price}</b> <span class="old">₹${p.old}</span></p><button class="btn primary" onclick="addToCart('${p.id}')">Add to Cart</button></div>`}
function renderProducts(){let el=document.getElementById('products');if(el)el.innerHTML=products.map(productCard).join('')}
function renderProduct(){let el=document.getElementById('productDetail');if(!el)return;let id=new URLSearchParams(location.search).get('id')||'grey';let p=products.find(x=>x.id===id)||products[0];let imgs=(p.gallery&&p.gallery.length?p.gallery:[p.img]);el.innerHTML=`<div class="two-col"><div class="gallery"><img id="mainImg" class="main-product-img" src="${imgs[0]}"><div class="thumbs">${imgs.map((im,i)=>`<img class="${i?'':'active'}" src="${im}" onclick="mainImg.src='${im}';document.querySelectorAll('.thumbs img').forEach(t=>t.classList.remove('active'));this.classList.add('active')">`).join('')}</div></div><div class="card"><span class="badge">Best Seller</span><h1>${p.name}</h1><div class="rating">★★★★★ <span class="muted">(4.8) 2,345 Reviews</span></div><p><span class="price">₹${p.price}</span><span class="old">₹${p.old}</span> <span class="badge">50% OFF</span></p><div class="list"><div>Remote Controlled</div><div>Strong Magnetic Base</div><div>3+ Wagging Modes</div><div>Water Resistant</div><div>Rechargeable Battery USB-C</div></div><br><button class="btn primary" onclick="addToCart('${p.id}')">Add to Cart</button><br><br><button class="btn secondary" onclick="buyNow('${p.id}')">Buy Now</button><p class="muted">Prepaid Payment • 7 Days Return • Fast Delivery</p></div></div>`}
function miniGallery(p){let imgs=(p.gallery&&p.gallery.length?p.gallery:[p.img]).slice(0,3);while(imgs.length<3)imgs.push(p.img);return `<div class="cart-gallery">${imgs.map((im,i)=>`<img src="${im}" alt="${p.name} image ${i+1}">`).join('')}</div>`}
function renderCart(){let el=document.getElementById('cartItems');if(!el)return;let c=cart();if(!c.length){el.innerHTML='<div class="card">Your cart is empty. <a href="shop.html">Shop now</a></div>';return}let total=0;el.innerHTML=c.map(i=>{let p=products.find(x=>x.id===i.id);total+=p.price*i.qty;return `<div class="card cart-item">${miniGallery(p)}<div><b>${p.name}</b><p>₹${p.price} × ${i.qty}</p><p class="muted">All 3 gallery images are controlled from admin.</p></div></div>`}).join('')+`<div class="card"><h2>Total: ₹${total}</h2><a class="btn primary" href="checkout.html">Checkout</a></div>`}
function getCartTotal(){let total=0;cart().forEach(i=>{let p=products.find(x=>x.id===i.id);if(p)total+=p.price*i.qty});return total}
function renderCheckout(){let el=document.getElementById('checkoutItems');if(!el)return;let c=cart();if(!c.length){el.innerHTML='<div class="card">No product selected. <a href="shop.html">Shop now</a></div>';return}let total=0;el.innerHTML=c.map(i=>{let p=products.find(x=>x.id===i.id);total+=p.price*i.qty;return `<div class="card cart-item">${miniGallery(p)}<div><b>${p.name}</b><p>₹${p.price} × ${i.qty}</p></div></div>`}).join('')+`<div class="card"><h2>Payable: ₹${total}</h2><p class="muted">Payment will open securely through Razorpay.</p></div>`}
function startRazorpayPayment(e){
  if(e)e.preventDefault();
  const c=cart();
  if(!c.length){alert('Your cart is empty.');location.href='shop.html';return}
  const total=getCartTotal();
  const name=document.getElementById('custName')?.value.trim();
  const mobile=document.getElementById('custMobile')?.value.trim();
  const address=document.getElementById('custAddress')?.value.trim();
  const city=document.getElementById('custCity')?.value.trim();
  if(!name||!mobile||!address||!city){alert('Please fill all delivery details.');return}
  if(typeof Razorpay==='undefined'){alert('Razorpay script not loaded. Please check internet connection.');return}
  const options={
    key: RAZORPAY_KEY_ID,
    amount: total*100,
    currency: 'INR',
    name: 'RideTail',
    description: 'RideTail Order Payment',
    prefill: {name:name, contact:mobile},
    notes: {address:address, city_state_pincode:city, cart: JSON.stringify(c)},
    theme: {color: '#ff3f8f'},
    handler: function(response){
      localStorage.setItem('ridetail_last_order',JSON.stringify({name,mobile,address,city,total,payment_id:response.razorpay_payment_id,items:c,created_at:new Date().toISOString()}));
      localStorage.removeItem('ridetail_cart');
      location.href='success.html';
    },
    modal:{ondismiss:function(){alert('Payment was not completed. You can try again.')}}
  };
  const rzp=new Razorpay(options);rzp.open();
}
function placeOrder(){startRazorpayPayment()}
function renderImageManager(){let el=document.getElementById('imageManager');if(!el)return;let o=getOverrides();el.innerHTML=defaultProducts.map(p=>{let img=o[p.id]?.img||p.img;let gal=o[p.id]?.gallery||p.gallery||[img];while(gal.length<3)gal.push(img);return `<div class="card image-editor"><img src="${gal[0]}" alt="${p.name}"><div><h3>${p.name}</h3><p class="muted">Image 1 main photo रहेगी. Image 2 और Image 3 gallery/cart/checkout style preview में दिखेंगी.</p>${[0,1,2].map(n=>`<div class="gallery-admin-row"><label>Image ${n+1} URL</label><input class="input" id="gal_${p.id}_${n}" value="${gal[n]||img}"><label>Upload Image ${n+1}</label><input class="input file-input" type="file" accept="image/*" onchange="uploadGalleryImage('${p.id}',${n},this)"></div>`).join('')}<button class="btn primary" onclick="saveProductGallery('${p.id}')">Save 3 Images</button></div></div>`}).join('')}
function saveProductGallery(id){let o=getOverrides();let gallery=[0,1,2].map(n=>document.getElementById(`gal_${id}_${n}`).value.trim()).filter(Boolean);if(!gallery.length){alert('Please add at least Image 1');return}while(gallery.length<3)gallery.push(gallery[0]);o[id]={img:gallery[0],gallery:gallery.slice(0,3)};localStorage.setItem('ridetail_product_images',JSON.stringify(o));alert('3 images saved. They will update on Shop, Product, Cart and Checkout pages.')}
function uploadGalleryImage(id,index,input){let file=input.files&&input.files[0];if(!file)return;let reader=new FileReader();reader.onload=()=>{document.getElementById(`gal_${id}_${index}`).value=reader.result;saveProductGallery(id)};reader.readAsDataURL(file)}
function resetProductImages(){localStorage.removeItem('ridetail_product_images');location.reload()}
document.addEventListener('click',e=>{if(e.target.classList.contains('faq-q'))e.target.parentElement.classList.toggle('open')});
document.addEventListener('DOMContentLoaded',()=>{updateCartCount();renderHero();renderProducts();renderProduct();renderCart();renderCheckout();renderImageManager();renderHeroAdmin()});

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
