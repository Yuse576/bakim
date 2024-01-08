function salla(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function dizikaristir(dizi_ismi) {
  dizi_ismi.sort(function(a, b){return 0.5 - Math.random()});
}
function basari(başlık,metin){
  Swal.fire({
        title: başlık,
        icon: 'success',
        text: metin,
      })
}
function hata(başlık,metin){
  Swal.fire({
        title: başlık,
        icon: 'error',
        text: metin,
      })
}
function bilgi(başlık,metin){
  Swal.fire({
        title: başlık,
        icon: 'info',
        text: metin,
      })
}
function uyari(başlık,metin){
  Swal.fire({
        title: başlık,
        icon: 'warning',
        text: metin,
      })
}
function soru(başlık,metin){
  Swal.fire({
        title: başlık,
        icon: 'question',
        text: metin,
      })
}

function sor(soru){
  var sorumuz=prompt(soru);
  return sorumuz;
}
function onay(onaylanacaksoru){
  var onayimiz=confirm(onaylanacaksoru);
  if(onayimiz==true){
    sonuc="+"
  }
  else{
    sonuc="-"
  }
  return sonuc;
}

function attrgetir(obj){
  return $(obj).attr("id");
}

//Bu tablodan bakım planı oluşturmak için yaızlan bir fonksiyon
function getiryenitablo(kok){
  if(0==0){
    
    var onay=confirm(kok+" nolu öğrencinin bakım planları gelecek onaylıyor musunuz?")
    if(onay==true){
      db.collection($('#hocakoduyeri').attr("title")).where("docid", "==", kok).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          
            // doc.data() is never undefined for query doc snapshots
            var tablo=`<br><br>
  <table class="table table-success table-striped" cellspacing="0" id="tabim${doc.id}" width="100%">
  <thead>
    <tr>
      <th>Veriler</th>
      <th>Tanı</th>
      <th>Planlama</th>
      <th>Uygulama</th>
      <th>Değerlendirme</th>
    </tr>
    <tr>
      <td><textarea id="veri" placeholder="veriler..." rows="15" cols="20">${doc.data().veriler}</textarea></td>
      <td><textarea id="tani" placeholder="Tanı..." rows="15" cols="20">${doc.data().tanilar}</textarea></td>
      <td><textarea id="plan" placeholder="Planlama..." rows="15" cols="20">${doc.data().planlar}</textarea></td>
      <td><textarea id="uygulama" placeholder="uygulama.." rows="15" cols="20">${doc.data().uygulamalar}</textarea></td>
      <td><textarea id="degerlendirme" placeholder="Değerlendirme.." rows="15" cols="20">${doc.data().degerlendirmeler}</textarea></td>
    </tr>
    <tr>
      <th class="table-danger" style="text-align:center;" colspan="5">${doc.data().isim} ${doc.data().soyisim} ${doc.data().okulno}</th>
    </tr>
    <tr>
      <td colspan="2">
        <div class="input-group">
          <input type="text" id="geribildiriminp${doc.id}" class="form-control" placeholder="geribildirim yazınız" aria-label="Username" aria-describedby="basic-addon1">
          <button id=geribildirimbtn${doc.id} onclick="gonder(this)" class="btn btn-success">Gönder</button>
        </div>
      </td>
      <td colspan="1">
        <div class="input-group">
          <button id=silbtn${doc.id} onclick="sil(this)" class="btn btn-outline-danger form-control">Sil</button>
          <button title="${doc.data().okulno}" id=kaydetbtn${doc.id} onclick="kaydet(this)" class="btn btn-outline-primary form-control">Kaydet</button>
          <button id=kapatbtn${doc.id} onclick="kapat(this)" class="btn btn-outline-dark form-control">Kapat</button>
        </div>
      </td>
      <td colspan="2">
        <div class="input-group">
          <button id=puanbtn${doc.id} onclick="puanver(this)" class="btn btn-success">Puan ver</button>
          <input type="tel" id="puaninp${doc.id}" class="form-control" placeholder="puan ver.." aria-describedby="basic-addon1">
        </div>
      </td>
    </tr>
</table>`;

          var tablotel=`<br><br>
  <table class="table table-success table-striped" cellspacing="0" id="tabim${doc.id}" width="100%">
  <thead>
    <tr>
      <th colspan="1">Veriler</th>
      <th colspan="1">Tanı</th>
    </tr>
    <tr>
      <td colspan="1"><textarea id="veri" placeholder="veriler..." rows="15" cols="20">${doc.data().veriler}</textarea></td>
      <td colspan="1"><textarea id="tani" placeholder="Tanı..." rows="15" cols="20">${doc.data().tanilar}</textarea></td>
    </tr>
    <tr>
      <th colspan="1">Planlama</th>
      <th colspan="1">Uygulama</th>
    </tr>
    <tr>
      <td colspan="1"><textarea id="plan" placeholder="Planlama..." rows="15" cols="20">${doc.data().planlar}</textarea></td>
      <td colspan="1"><textarea id="uygulama" placeholder="uygulama.." rows="15" cols="20">${doc.data().uygulamalar}</textarea></td>
    </tr>
    
    <tr>
      <th colspan="1">Değerlendirme</th>
      <th>Öğrenci</th>
    </tr>
    <tr>
      <td colspan="1"><textarea id="degerlendirme" placeholder="Değerlendirme.." rows="15" cols="20">${doc.data().degerlendirmeler}</textarea></td>
      <th colspan="1" style="text-align:center;">${doc.data().isim}<br>${doc.data().soyisim}<br>${doc.data().okulno}</th>
    </tr>
    <tr>
      <td colspan="2">
        <div class="input-group">
          <input type="text" id="geribildiriminp${doc.id}" class="form-control" placeholder="geribildirim yazınız" aria-label="Username" aria-describedby="basic-addon1">
          <button id=geribildirimbtn${doc.id} onclick="gonder(this)" class="btn btn-success">Gönder</button>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <div class="input-group">
          <button id=puanbtn${doc.id} onclick="puanver(this)" class="btn btn-success">Puan ver</button>
          <input type="tel" id="puaninp${doc.id}" class="form-control" placeholder="puan ver.." aria-describedby="basic-addon1">
        </div>
      </td>
    </tr>
     <tr>
      <td colspan="2">
        <div class="input-group">
          <button id=silbtn${doc.id} onclick="sil(this)" class="btn btn-outline-danger form-control">Sil</button>
          <button title="${doc.data().okulno}" id=kaydetbtn${doc.id} onclick="kaydet(this)" class="btn btn-outline-primary form-control">Kaydet</button>
          <button id=kapatbtn${doc.id} onclick="kapat(this)" class="btn btn-outline-dark form-control">Kapat</button>
        </div>
      </td>
    </tr>
</table>`
          if(screen.width<=700){
             $('#icerik').append(tablotel);
            
            
          }
          else{
            $('#icerik').append(tablo);
          }
         
          //$('textarea').attr("cols",herbolmepayi)
         
    
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

      


      
      alert("bilgiler  Alındı");
    }
    else{
      alert("Hata Alınamadı");
    }
  }
  else{
    alert("Lütfen okul no yazınız");
  }
}