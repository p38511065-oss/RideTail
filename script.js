const defaultProducts=[
 {id:'grey',name:'Classic Grey',price:499,old:999,img:'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',gallery:['https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80']},
 {id:'brown',name:'Brown Fox',price:499,old:999,img:'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',gallery:['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80']},
 {id:'white',name:'Snow White',price:499,old:999,img:'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',gallery:['https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80']},
 {id:'pink',name:'Cute Pink',price:549,old:1099,img:'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80',gallery:['https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80']},
 {id:'black',name:'Midnight Black',price:499,old:999,img:'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80',gallery:['https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80']},
 {id:'rainbow',name:'Rainbow Fun',price:649,old:1299,img:'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',gallery:['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80']}
];
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
function renderCart(){let el=document.getElementById('cartItems');if(!el)return;let c=cart();if(!c.length){el.innerHTML='<div class="card">Your cart is empty. <a href="shop.html">Shop now</a></div>';return}let total=0;el.innerHTML=c.map(i=>{let p=products.find(x=>x.id===i.id);total+=p.price*i.qty;return `<div class="card" style="display:grid;grid-template-columns:90px 1fr;gap:12px;margin-bottom:12px"><img src="${p.img}" style="height:90px;border-radius:12px;object-fit:cover"><div><b>${p.name}</b><p>₹${p.price} × ${i.qty}</p></div></div>`}).join('')+`<div class="card"><h2>Total: ₹${total}</h2><a class="btn primary" href="checkout.html">Checkout</a></div>`}
function placeOrder(){localStorage.removeItem('ridetail_cart');location.href='success.html'}
function renderImageManager(){let el=document.getElementById('imageManager');if(!el)return;let o=getOverrides();el.innerHTML=defaultProducts.map(p=>{let img=o[p.id]?.img||p.img;let gal=(o[p.id]?.gallery||p.gallery||[img]).join('\n');return `<div class="card image-editor"><img src="${img}" alt="${p.name}"><div><h3>${p.name}</h3><label>Main Image URL</label><input class="input" id="img_${p.id}" value="${img}"><label>Gallery Image URLs - one per line</label><textarea class="input textarea" id="gal_${p.id}">${gal}</textarea><label>Or upload image from computer</label><input class="input file-input" type="file" accept="image/*" onchange="uploadProductImage('${p.id}',this)"><button class="btn primary" onclick="saveProductImage('${p.id}')">Save Image</button></div></div>`}).join('')}
function saveProductImage(id){let o=getOverrides();let img=document.getElementById('img_'+id).value.trim();let gallery=document.getElementById('gal_'+id).value.split('\n').map(x=>x.trim()).filter(Boolean);o[id]={img,gallery:gallery.length?gallery:[img]};localStorage.setItem('ridetail_product_images',JSON.stringify(o));alert('Image saved. Open Shop/Product page to see update.')}
function uploadProductImage(id,input){let file=input.files&&input.files[0];if(!file)return;let reader=new FileReader();reader.onload=()=>{document.getElementById('img_'+id).value=reader.result;document.getElementById('gal_'+id).value=reader.result;saveProductImage(id)};reader.readAsDataURL(file)}
function resetProductImages(){localStorage.removeItem('ridetail_product_images');location.reload()}
document.addEventListener('click',e=>{if(e.target.classList.contains('faq-q'))e.target.parentElement.classList.toggle('open')});
document.addEventListener('DOMContentLoaded',()=>{updateCartCount();renderProducts();renderProduct();renderCart();renderImageManager()});

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
