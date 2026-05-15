RideTail Manual Razorpay Verification Flow

1) Customer goes to Checkout and pays through Razorpay popup.
2) After payment success response, success page shows:
   - RideTail Order ID
   - Razorpay Payment ID
   - Total amount
   - Customer address
3) Admin opens admin-login.html
   Username: admin
   Password: ridetail123
4) Open admin-orders.html
5) Search the Payment ID in Razorpay Dashboard.
6) If amount + customer details match, click Verified.
7) After packing/dispatch, click Shipped.

Important limitation:
This is a static/localStorage version. Orders are saved in the browser where payment happened. For real customers on different phones, a central admin order list needs backend, Google Sheet, Supabase, or webhook.

Razorpay Secret Key must never be placed in frontend code.
