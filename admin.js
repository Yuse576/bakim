var ekran=screen.width;
var herbolmepayi=((ekran/5)-200)/3;
//$('textarea').attr("cols",herbolmepayi)
$('#login_div').show();

function getir(){
  if($('#username').val() != ""){
    
    var onay=confirm($('#username').val()+" nolu öğrencinin bakım planları gelecek onaylıyor musunuz?")
    if(onay==true){
      db.collection($('#hocakoduyeri').attr("title")).where("okulno", "==", $('#username').val()).get()
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

      


      basari("bilgiler alındı");
    }
    else{
      hata("Alınamadı");
    }
  }
  else{
    hata("Lütfen okul no yazınız");
  }
}

function tablodangetir(obj){
  
  var idimiz=$(obj).attr("id");
  var kok=idimiz.slice(16);
  getiryenitablo(kok);
  $('.navbar').attr("style","width:100%");
  
}


//Bireysel getirme için
function gonder(obj){
  var idimiz=$(obj).attr("id");
  var kok=idimiz.slice(15);
  var mesaj=$('#geribildiriminp'+kok).val();
  db.collection($('#hocakoduyeri').attr("title")).doc(kok).set({
    hocayorumu:mesaj,
  },{ merge: true })
    .then(() => {
      basari("Yorum yapıldı");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
  });
  
}


function tumgetir(){
  db.collection($('#hocakoduyeri').attr("title")).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var trlerim=`
        <tr class="trler" id="trlerim`+doc.id+`">
      
      <td><strong>`+doc.data().tanilar+`</strong></td>
      <td class="noExl"><button class="btn btn-outline-success" id="tablodangetirbtn${doc.id}" onclick="tablodangetir(this)">Oku</button></td>
      <td id="puan${doc.id}">`+doc.data().puan+`</td>
      <td>${doc.data().isim} ${doc.data().soyisim}<br>${doc.data().okulno}</td>
      <td><div id="ogrenciresim${doc.id}"></div></td>
   </tr>`;
      
      $('#vucudtablo').append(trlerim);
      const storageRef = firebase.storage().ref();
          storageRef.child(doc.data().okulno).getDownloadURL()
            .then((url) => {
              var resim=`<img src="${url}" style="border-radius:100px" width="50px" height="50px">`
              $('#ogrenciresim'+doc.id).append(resim);
            })
    .catch((error) => {
      // Handle any errors
    });
    });
  });
  $('#tablem').show(500);




  
}

function kapat(obj){
  var idimiz=$(obj).attr("id");
  var kok=idimiz.slice(8);
  $('#tabim'+kok).hide(500);
  
}
function kaydet(obj){
  var idimiz=$(obj).attr("id");
  var kok=idimiz.slice(9);
  var user=$(obj).attr("title");
  
  var onay=confirm("Yaptığınız değişiklikler kaydedilecek onaylıyor musunuz")
    if(onay==true){
      var veri=$('#veri').val();
      var tani=$('#tani').val();
      var plan=$('#plan').val();
      var uygulama=$('#uygulama').val();
      var degerlendirme=$('#degerlendirme').val();
      db.collection($('#hocakoduyeri').attr("title")).doc(kok).set({
        okulno:user,
        veriler:veri,
        tanilar:tani,
        planlar:plan,
        uygulamalar:uygulama,
        degerlendirmeler:degerlendirme,
      },{ merge: true })
        .then(() => {
          basarili("Başarıyla güncellendi");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });


      
      
    }
    else{
      hata("HATA","güncellenmedi");
    }
  
  
}
function sil(obj){
  var onay=confirm("Bakım planı silinecek onaylıyor musunuz?");
  if(onay==true){
    var idimiz=$(obj).attr("id");
    var kok=idimiz.slice(6);
    db.collection($('#hocakoduyeri').attr("title")).doc(kok).delete().then(() => {
        basari('Silindi');
        $('#tabim'+kok).hide(500);
        $('#trid'+kok).hide(500);
      }).catch(err => {
        console.log('Error removing document', err);
      });
    
    
  }
  else{
    hata("HATA","kullanıcı silinmedi!")
  }
  
  
}
function puanver(obj){
  var idimiz=$(obj).attr("id");
  var kok=idimiz.slice(7);
  var puan=$('#puaninp'+kok).val();
  var onay=confirm("Öğrencinize bu bakım planı için "+puan+" verilecek onaylıyor musunuz?");
  if(onay==true){
    db.collection($('#hocakoduyeri').attr("title")).doc(kok).set({
        puan:puan,
      },{ merge: true })
        .then(() => {
          basari("Puan başarıyla verildi");
          $('#puan'+kok).html(puan);
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
  }
  else{
    hata("HATA","puan verilemedi");
  }
  
  
}


$(".search").keyup(function() {
    $('#tablem').show();
    var searchTerm = $(".search").val();
    var bulunan = 0
    $('.results tbody tr').each(function(e) {
        var table = $(this)
        if (table.text().toLowerCase().includes(searchTerm.toLowerCase())) {
            bulunan += 1
            table.show()
            $('.blog-slider').hide();
            if(searchTerm == ""){
             
              $('.blog-slider').show();
            }
            $(".counter").text(bulunan + " kayıt bulundu")
            $(".no-result").css('display', 'none')
        } else {
            table.hide()
            $(".counter").text(bulunan + " kayıt bulundu")
            if (bulunan == 0) {
                $(".no-result").css('display', '')
            }
        }
    })
});



function puansizgetir(){
  db.collection($('#hocakoduyeri').attr("title")).where("puan", "==", "").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          
            var trlerim=`
        <tr class="trler" id="trid`+doc.id+`">
      
      <td><strong>`+doc.data().tanilar+`</strong></td>
      <td class="noExl"><button class="btn btn-outline-success" id="tablodangetirbtn${doc.id}" onclick="tablodangetir(this)">Oku</button></td>
      <td id="aciklama${doc.id}">`+doc.data().puan+`</td>
      <td>${doc.data().isim} ${doc.data().soyisim}<br>${doc.data().okulno}</td>
      <td><div id="ogrenciresim${doc.id}"></div></td>
    </tr>`;
      
          $('#vucudtablo').append(trlerim);
          const storageRef = firebase.storage().ref();
          storageRef.child(doc.data().okulno).getDownloadURL()
            .then((url) => {
              var resim=`<img src="${url}" style="border-radius:100px" width="50px" height="50px">`
              $('#ogrenciresim'+doc.id).append(resim);
            })
    .catch((error) => {
      // Handle any errors
    });
          $('#tablem').show(500);
    
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

}

function filterilegetir(){
  db.collection($('#hocakoduyeri').attr("title")).where("puan", ">=", $('#altpuan').val()).where("puan", "<=",$('#ustpuan').val())
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var trlerim=`
        <tr class="trler" id="trid`+doc.id+`">
      
      <td><strong>`+doc.data().tanilar+`</strong></td>
      <td class="noExl"><button class="btn btn-outline-success" id="tablodangetirbtn${doc.id}" onclick="tablodangetir(this)">Oku</button></td>
      <td id="aciklama${doc.id}">`+doc.data().puan+`</td>
      <td>${doc.data().isim} ${doc.data().soyisim} <br>${doc.data().okulno}</td>
      <td><div id="ogrenciresim${doc.id}"></div></td>
    </tr>`;
      
          $('#vucudtablo').append(trlerim);
          const storageRef = firebase.storage().ref();
          storageRef.child(doc.data().okulno).getDownloadURL()
            .then((url) => {
              var resim=`<img src="${url}" style="border-radius:100px" width="50px" height="50px">`
              $('#ogrenciresim'+doc.id).append(resim);
            })
    .catch((error) => {
      // Handle any errors
    });
          $('#tablem').show(500);
    
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $('#geneldivadmin').show(500);
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      db.collection("hocalar").doc(email_id)
        .onSnapshot((doc) => {
          $('#hocakoduyeri').attr("title",doc.data().hocakodu);
          document.getElementById("user_para").innerHTML = "Kullanıcı : " + email_id+"<br>Öğrencilerinize atacağınız referans kodu: "+doc.data().hocakodu +"   <span onclick=paylas(); kod="+doc.data().hocakodu +" id=paylas>Paylaşmak için tıklayınız</span>";

          
        
      });
      
      
    }

  } else {
    // No user is signed in.
    $('#geneldivadmin').hide();

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    hata("Üzgünüz","Sizi tanıyamadık 😥");
    //window.alert("Error : " + errorMessage);

    // ...
  });

}


function logout(){
  firebase.auth().signOut();
  window.location="/";
}



function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    // for Internet Explorer 8 and below. For Blogger, you should use &amp;&amp; instead of &&.
    } else if (document.selection && document.selection.type != "Control") { 
        text = document.selection.createRange().text;
    }
    return text;
}
function exel(){
  $("#tabim").table2excel({
    exclude:".noExl",
    name:"liste",
    filename:"uyeler",
    fileext:".xls",
    });


  
}
function paylas(){
  var spanElementi = document.getElementById('paylas');

  // Kopyalanacak olan kod
  var kopyalanacakKod = spanElementi.getAttribute('kod');
  if (navigator.share) {
    navigator.share({
      text: kopyalanacakKod
    })
    .then(() => console.log('Metin başarıyla paylaşıldı.'))
    .catch((error) => console.error('Paylaşma işlemi başarısız:', error));
  } else {
    // Web Share API desteklenmiyorsa alternatif bir işlem yapabilirsiniz.
    alert('Üzgünüz, tarayıcınız Web Share API\'yi desteklemiyor.');
  }
}