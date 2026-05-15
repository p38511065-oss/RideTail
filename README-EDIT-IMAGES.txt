RideTail Admin Image Update

Open admin-login.html
Username: admin
Password: ridetail123

Admin Products page now has 3 image slots for every product:
1. Image 1 = Main product image
2. Image 2 = Gallery/close-up image
3. Image 3 = vehicle attached/lifestyle image

After saving, these images update automatically on:
- Shop product cards
- Product detail gallery
- Cart mini gallery
- Checkout order summary

Note: This is a static website, so uploaded images are saved in browser localStorage for testing. For permanent live admin image upload, connect backend storage such as Supabase/Firebase/Cloudinary.


HERO BANNER UPDATE:
1. Open admin-login.html
2. Login: admin / ridetail123
3. Hero Banner Settings me image, title, subtitle, button text/link update karke Save karo.

RAZORPAY SETUP:
- Checkout page me Razorpay Key ID added hai: rzp_live_SnyAGJqKUompfc
- Client-side checkout payment open ho jayega.
- Important: real production me payment verification ke liye backend/server webhook zaroor lagana hota hai.
- Razorpay Secret Key kabhi bhi frontend code me mat dalna.
