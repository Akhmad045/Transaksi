// variable global untuk menyimpan data yang akan dikirimkan kersever
let no_faktur   
let tanggal
let diskon
let userId
let itemDibeli = []
let subTotal = 0
let totalBayar = 0

// function untuk mengkosongkan data
function kosong(){
    document.getElementById('kode_produk').value = ""
    document.getElementById('model').value = ""
    document.getElementById('merk').value = ""
    document.getElementById('jumlah').value = ""
    document.getElementById('harga').value = ""
    document.getElementById('kode_produk').focus();
}

function listProduk(){
    let isiTable = ""
    subTotal = 0
    totalBayar = 0
    itemDibeli.forEach((el, index)=>{
        subTotal += el.total
        totalBayar += el.total
        isiTable+= `
        <tr>
        <th scope="row">${el.productId}</th>
        <td>${el.model}</td>
        <td>${el.merk}</td>
        <td>${el.jumlah}</td>
        <td>${el.harga}</td>
        <td>${el.total}</td>
      </tr>

        `
    })
    // isi kedalam tbody
    document.getElementById('hasil').innerHTML = isiTable
    document.getElementById('subtotal').value = subTotal
    document.getElementById('total').value = totalBayar
    kosong()
}

document.getElementById('kode_member').addEventListener('keyup', async ()=>{
    // ambil nilai dari kode member
    let kode = document.getElementById('kode_member').value.toUpperCase();
    document.getElementById('kode_member').value = kode
    // cek jika kode member tidak kosong
    if(kode.length > 0 ){
        await fetch('users/'+kode)
        .then(res=>res.json())
        .then(data=>{
            document.getElementById('nama').value = data.nama
            document.getElementById('alamat').value = data.alamat
        })
        .catch(err=>{
            document.getElementById('nama').value = ""
            document.getElementById('alamat').value = ""
            document.getElementById('kode_member').focus();
        })
    }

    
})
document.getElementById('kode_produk').addEventListener('keyup', async()=>{
    let kd = document.getElementById('kode_produk').value.toUpperCase();
    document.getElementById('kode_produk').value = kd
    // cek jika kode produk tidak kosong
    if(kd.length > 0 ){
        await fetch('products/'+kd)
        .then(res=>res.json())
        .then(data=>{
            document.getElementById('model').value = data.model
            document.getElementById('merk').value = data.merk
            document.getElementById('harga').value = data.harga
        })
        .catch(err=>{
            document.getElementById('model').value = ""
            document.getElementById('merk').value = ""
            document.getElementById('harga').value = ""
            document.getElementById('kode_produk').focus();
        })
    }
})

// tambah produk ke keranjang
document.getElementById('btns').addEventListener('click', async()=>{
    itemDibeli.push({
        productId : document.getElementById('kode_produk').value,
        model : document.getElementById('model').value,
        merk : document.getElementById('merk').value,
        jumlah : document.getElementById('jumlah').value,
        harga : document.getElementById('harga').value,
        total: parseInt(document.getElementById('jumlah').value) * parseInt(document.getElementById('harga').value),

    })
    listProduk();
})

// mengurangi total
document.getElementById('diskon').addEventListener('keyup', async()=>{
    // kurangi sub total dan diskon
    sub = parseInt(document.getElementById('subtotal').value),
     disk = parseInt(document.getElementById('diskon').value) 
    totalBayar = sub - disk
    document.getElementById('total') = totalBayar
})