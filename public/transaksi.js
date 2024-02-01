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