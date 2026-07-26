// DATA DUMMY SAMA PERSIS KAYAK DART
const DESTINATIONS = [
  {id:1,name:"Pantai Kuta",location:"Bali",image:"assets/images/bali.jpg",description:"Pantai terkenal dengan keindahan matahari terbenam dan ombaknya yang cocok untuk berselancar. Tempat sempurna untuk bersantai dan menikmati suasana tropis.",price:500000,category:"Pantai",rating:4.8,reviewsCount:124,schedules:["08:00 WITA","13:00 WITA","16:30 WITA"]},
  {id:2,name:"Gunung Bromo",location:"Jawa Timur",image:"assets/images/bromo.jpg",description:"Rasakan petualangan menembus lautan pasir Bromo dan saksikan sunrise spektakuler dari puncak Penanjakan. Pengalaman yang tak terlupakan.",price:750000,category:"Gunung",rating:4.9,reviewsCount:98,schedules:["02:00 WIB","03:30 WIB","05:00 WIB"]},
  {id:3,name:"Labuan Bajo",location:"Nusa Tenggara Timur",image:"assets/images/labuan_bajo.jpg",description:"Gerbang surga menuju petualangan pulau Komodo. Nikmati keindahan alam bawah laut dan darat yang menakjubkan.",price:1500000,category:"Petualangan",rating:4.9,reviewsCount:156,schedules:["07:00 WITA","09:00 WITA","11:00 WITA"]},
  {id:4,name:"Raja Ampat",location:"Papua Barat",image:"assets/images/raja_ampat.png",description:"Surga bawah laut dunia dengan terumbu karang terbaik. Destinasi wajib bagi para penyelam dan pecinta alam.",price:2500000,category:"Petualangan",rating:5.0,reviewsCount:89,schedules:["06:00 WIT","08:00 WIT","10:00 WIT"]},
  {id:5,name:"Danau Toba",location:"Sumatera Utara",image:"assets/images/danau_toba.png",description:"Danau vulkanik terbesar di dunia dengan pulau Samosir di tengahnya. Pemandangan indah dan budaya Batak yang kaya.",price:600000,category:"Gunung",rating:4.7,reviewsCount:112,schedules:["07:00 WIB","09:00 WIB","14:00 WIB"]},
  {id:6,name:"Candi Borobudur",location:"Jawa Tengah",image:"assets/images/borobudur.png",description:"Candi Buddha terbesar di dunia dan situs warisan UNESCO. Saksikan sunrise dari candi yang megah ini.",price:450000,category:"Petualangan",rating:4.8,reviewsCount:203,schedules:["04:30 WIB","06:00 WIB","08:00 WIB"]},
  {id:7,name:"Nusa Penida",location:"Bali",image:"assets/images/nusa_penida.png",description:"Pulau eksotis di tenggara Bali dengan tebing Kelingking dan pantai Crystal Bay yang menakjubkan.",price:850000,category:"Pantai",rating:4.9,reviewsCount:178,schedules:["07:00 WITA","09:30 WITA","13:00 WITA"]},
  {id:8,name:"Tana Toraja",location:"Sulawesi Selatan",image:"assets/images/tana_toraja.png",description:"Destinasi budaya unik dengan rumah adat Tongkonan dan ritual pemakaman yang khas. Pengalaman budaya yang mendalam.",price:900000,category:"Petualangan",rating:4.6,reviewsCount:67,schedules:["07:00 WITA","10:00 WITA","13:00 WITA"]}
];

let USERS = JSON.parse(localStorage.getItem('users')) || [
  {name:"Budi Santoso",email:"budi@gmail.com",phone:"081234567890",password:"password123",avatarUrl:"https://i.pravatar.cc/150?img=65"}
];
let REVIEWS = JSON.parse(localStorage.getItem('reviews')) || [
  {id:"r1",destinationName:"Pantai Kuta",userName:"Budi Santoso",rating:5.0,comment:"Kunjungan yang sangat luar biasa! Sunset di Pantai Kuta selalu berkesan.",date:"23/7/2026"},
  {id:"r2",destinationName:"Gunung Bromo",userName:"Siti Rahma",rating:5.0,comment:"Dingin sekali tapi pemandangannya luar biasa!",date:"21/7/2026"}
];
let BOOKINGS = JSON.parse(localStorage.getItem('bookings')) || [];
let CURRENT_USER = JSON.parse(localStorage.getItem('currentUser')) || null;

// STORE
const TourStore = {
  get destinationsList(){return DESTINATIONS},
  get reviewsList(){return REVIEWS},
  get bookingsList(){return BOOKINGS},
  get currentUser(){return CURRENT_USER},

  login(email,password){
    const u = USERS.find(x=>x.email.toLowerCase()==email.trim().toLowerCase() && x.password==password);
    if(u){CURRENT_USER=u;localStorage.setItem('currentUser',JSON.stringify(u));return true}
    return false
  },
  register(u){
    const i = USERS.findIndex(x=>x.email.toLowerCase()==u.email.toLowerCase());
    if(i!=-1) USERS[i]=u; else USERS.push(u);
    CURRENT_USER=u;
    localStorage.setItem('users',JSON.stringify(USERS));
    localStorage.setItem('currentUser',JSON.stringify(u))
  },
  addBooking(b){
    BOOKINGS.push(b);
    localStorage.setItem('bookings',JSON.stringify(BOOKINGS))
  },
  confirmPayment(id){
    const b = BOOKINGS.find(x=>x.id==id);
    if(b){b.status='Lunas';localStorage.setItem('bookings',JSON.stringify(BOOKINGS))}
  },
  addReview(r){
    REVIEWS.unshift(r);
    localStorage.setItem('reviews',JSON.stringify(REVIEWS));
    const d = DESTINATIONS.find(x=>x.name==r.destinationName);
    if(d){
      const c = d.reviewsCount+1;
      d.rating = parseFloat(((d.rating*d.reviewsCount)+r.rating)/c).toFixed(1);
      d.reviewsCount = c;
    }
  }
};

// UTILS
function formatRupiah(number){
  return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',minimumFractionDigits:0}).format(number);
}
function generateId(prefix){
  return prefix+'-'+Date.now().toString().slice(-6);
}
function generateTicketNumber(){
  return 'TKT-'+Math.floor(100000+Math.random()*900000);
}
function generateSeatNumber(prefix){
  const rows=['A','B','C','D','E','F'];
  const row=rows[Math.floor(Math.random()*rows.length)];
  const num=Math.floor(1+Math.random()*30);
  return prefix+row+num;
}

// UI HELPERS
function DestinationCard(d){
  return `<div class="dest-card" onclick="location='detail.html?id=${d.id}'">
    <div style="position:relative">
      <img src="${d.image}">
      <span style="position:absolute;top:15px;left:15px;background:rgba(15,118,110,.9);color:white;padding:6px 14px;border-radius:20px;font-size:11px;font-weight:bold">${d.category}</span>
      <span style="position:absolute;bottom:12px;right:15px;background:rgba(255,255,255,.9);padding:5px 10px;border-radius:12px;font-size:12px;font-weight:bold">Rating: ${d.rating}</span>
    </div>
    <div style="padding:16px">
      <div style="display:flex;justify-content:space-between">
        <b style="font-size:18px">${d.name}</b>
        <b style="color:#0F766E;font-size:16px">${formatRupiah(d.price)}</b>
      </div>
      <small>Lokasi: ${d.location}</small>
    </div>
  </div>`
}

// LOGIN & REGISTER HANDLER
function switchTab(i){
  document.querySelectorAll('.tab').forEach((t,j)=>t.classList.toggle('active',i==j));
  document.querySelectorAll('.form').forEach((f,j)=>f.classList.toggle('active',i==j));
}
function handleLogin(e){
  e.preventDefault();
  if(TourStore.login(loginEmail.value,loginPassword.value)){
    alert('Login Berhasil');
    location='home.html';
  }else{
    alert('Email atau password salah');
  }
}
function handleRegister(e){
  e.preventDefault();
  TourStore.register({
    name:regName.value,
    email:regEmail.value,
    phone:regPhone.value,
    password:regPassword.value,
    avatarUrl:`https://i.pravatar.cc/150?u=${regEmail.value}`
  });
  alert('Registrasi Berhasil');
  location='home.html';
}
function demoLogin(){
  TourStore.login('budi@gmail.com','password123');
  location='home.html';
}

// BOARDING PASS
function showBP(id){
  const b = TourStore.bookingsList.find(x=>x.id==id);
  if(!b) return;
  bpBody.innerHTML = `
    <div style="background:#f8fafc;padding:16px;border-radius:15px">
      <h4>${b.destName}</h4>
      <p><b>Nama:</b> ${b.name}</p>
      <p><b>Tanggal:</b> ${b.date}</p>
      <p><b>Jam:</b> ${b.schedule}</p>
      <p><b>Kursi:</b> ${b.seat}</p>
      <p><b>Tiket:</b> ${b.ticket}</p>
      <div class="qr">KODE: ${b.ticket}</div>
    </div>
  `;
  bpModal.style.display='flex';
}

// Cetak Tiket
function printTicket(bookingId){
  const booking = TourStore.bookingsList.find(b=>b.id==bookingId);
  const dest = TourStore.destinationsList.find(d=>d.id==booking.destinationId);
  const w = window.open('', '', 'height=800,width=600');
  w.document.write(`
    <html><head><title>Tiket ${dest.name}</title>
    <style>body{font-family:Arial;padding:40px} .box{border:2px dashed #0F766E;padding:20px;border-radius:15px} h1{color:#0F766E}</style>
    </head><body>
    <div class="box">
      <h1>ASSISTANT TOUR</h1><hr>
      <h2>${dest.name}</h2>
      <p><b>ID Booking:</b> #${booking.id}</p>
      <p><b>Nama:</b> ${TourStore.currentUser.name}</p>
      <p><b>Tanggal:</b> ${new Date(booking.date).toLocaleDateString('id-ID')}</p>
      <p><b>Transport:</b> ${booking.transport}</p>
      <p><b>Jumlah Orang:</b> ${booking.persons}</p>
      <p><b>Total Bayar:</b> Rp ${booking.total.toLocaleString('id-ID')}</p>
      <hr><p style="text-align:center">Tunjukkan QR ini ke petugas</p>
      <p style="text-align:center;font-size:12px">Terima kasih telah booking bersama kami</p>
    </div>
    <script>window.print()</script>
    </body></html>
  `);
  w.document.close();
}
