$('#sifirladiv').show();
var ekran=screen.width;
var herbolmepayi=((ekran/5)-200)/3;
//$('textarea').attr("cols",herbolmepayi);
var pctablo=`<br><br>
  <table  class="table table-success table-striped" cellspacing="0" id="tabim" width="100%" >
  <thead>
    <tr>
      <th>Veriler</th>
      <th>Tanı</th>
      <th>Planlama</th>
      <th>Uygulama</th>
      <th>Değerlendirme</th>
    </tr>
    <tr>
      <td><textarea id="veri" placeholder="veriler..." rows="15" cols="20"></textarea></td>
      <td><textarea id="tani" placeholder="Tanı..." rows="15" cols="20"></textarea></td>
      <td><textarea id="plan" placeholder="Planlama..." rows="15" cols="20"></textarea></td>
      <td><textarea id="uygulama" placeholder="uygulama.." rows="15" cols="20"></textarea></td>
      <td><textarea id="degerlendirme" placeholder="Değerlendirme.." rows="15" cols="20"></textarea></td>
    </tr>
    <tr>
      <th class="table-danger" style="text-align:center;" colspan="5">Bilgiler</th>
    </tr>
    <tr>
      <td colspan="2">
        <div class="input-group">
          <input disabled type="text" id="isim" class="form-control" placeholder="İsim" aria-label="isim" aria-describedby="basic-addon1">
      
        </div>
      </td>
      <td colspan="1">
        <button onclick="basari('İsim ve soyisminiz otomatik doldurulur')" class="btn btn-outline-success form-control">Öğrenci</button>
        
      </td>
      <td colspan="2">
        <div class="input-group">
          <input disabled type="text" id="soyisim" class="form-control" placeholder="Soyisim" aria-describedby="basic-addon1">
        </div>
      </td>
    </tr>
</table>`;
var teltablo=`<br><br>
  <table  class="table table-success table-striped" cellspacing="0" id="tabim" width="100%" style="background-color:#407C46FF">
  <thead>
    <tr>
      <th>Veriler</th>
      <th>Tanı</th>
    </tr>
    <tr>
      <td><textarea id="veri" placeholder="veriler..." rows="15" cols="20"></textarea></td>
      <td><textarea id="tani" placeholder="Tanı..." rows="15" cols="20"></textarea></td>
    </tr>
    <tr>
      <th>Planlama</th>
      <th>Uygulama</th>
    </tr>
    <tr>
      <td><textarea id="plan" placeholder="Planlama..." rows="15" cols="20"></textarea></td>
      <td><textarea id="uygulama" placeholder="uygulama.." rows="15" cols="20"></textarea></td>
    </tr>
    <tr>
      <th>Değerlendirme</th>
      <th>Öğrenci</th>
    </tr>
    <tr>
      <td><textarea id="degerlendirme" placeholder="Değerlendirme.." rows="15" cols="20"></textarea></td>
      <th style="text-align:center;">Bilgiler</th>
    </tr>
    <tr>
      <td><input disabled type="text" id="isim" class="form-control" placeholder="İsim" aria-label="isim" aria-describedby="basic-addon1"></td>
      <td><input disabled type="text" id="soyisim" class="form-control" placeholder="Soyisim" aria-describedby="basic-addon1"></td>
    </tr>
    <tr>
      <td colspan="2"><button class="btn btn-outline-success form-control" onclick="gonder()">Gönder</button></td>
    </tr>
    
</table>`;
if(screen.width<=700){
  $('#intabyeri').html(teltablo);
}
else{
  $('#intabyeri').html(pctablo);
}
$('#login_div').show();

function gonder(){
  if($('#username').val() != ""){
    
    var onay=confirm("Bakım planınız hocanıza gönderilecek onaylıyor musunuz?")
    if(onay==true){
      var rastgele=salla(100000,999999)
      var isim=$('#isim').val();
      var soyisim=$('#soyisim').val();
      var user=$('#username').val();
      var veri=$('#veri').val();
      var tani=$('#tani').val();
      var plan=$('#plan').val();
      var uygulama=$('#uygulama').val();
      var degerlendirme=$('#degerlendirme').val();
      db.collection($("#hocakoduyeri").attr("title")).doc(user+rastgele).set({
        okulno:user,
        veriler:veri,
        tanilar:tani,
        planlar:plan,
        uygulamalar:uygulama,
        degerlendirmeler:degerlendirme,
        hocayorumu:"Henüz yorum yok..",
        puan:"",
        docid:user+rastgele,
        isim:isim,
        soyisim:soyisim,
      })
        .then(() => {
          basari("Bilgiler hocanıza gönderildi");
        })
.catch((error) => {
    console.error("Error writing document: ", error);
});
    }
    else{
      hata("Hata","gönderilmedi");
    }
  }
  else{
    hata("Lütfen okul no yazınız");
  }
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $('#login_div').hide(500);
    $('#geneldivimiz').show(500);
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      db.collection("tumkullaniciler").doc(email_id)
        .onSnapshot((doc) => {
          $('#hocakoduyeri').attr("title",doc.data().hocakodu);
          document.getElementById("username").value=doc.data().okulno;
          document.getElementById("isim").value=doc.data().isim;
          document.getElementById("soyisim").value=doc.data().soyisim
          
        
      });
      
      document.getElementById("user_para").innerHTML = "Kullanıcı : " + email_id;
      //$('textarea').attr("cols",herbolmepayi)

    }

  } else {
    // No user is signed in.
    $('#geneldivimiz').hide();

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
function gecmisgetir(){
  document.getElementById("ozgeguzel").disabled = true;
  $('#tabim').hide(500);
  if($('#username').val() != ""){
    
    var onay=confirm($('#username').val()+" nolu öğrencinin bakım planları gelecek onaylıyor musunuz?")
    if(onay==true){
      db.collection($('#hocakoduyeri').attr("title")).where("okulno", "==", $('#username').val()).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          
            // doc.data() is never undefined for query doc snapshots
            var tablo=`<br><br>
  <table  class="table table-success table-striped" cellspacing="0" id="tabim${doc.id}" width="100%" style="background-color:#407C46FF">
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
        <p>${doc.data().hocayorumu}</p>
      </td>
      <td colspan="1">
        <div class="input-group">
          <button id=silbtn${doc.id} onclick="sil(this)" class="btn btn-outline-danger form-control">Sil</button>
          <button disabled title="${doc.data().okulno}" id=kaydetbtn${doc.id} onclick="kaydet(this)" class="btn btn-outline-primary form-control">Kaydet</button>
          <button id=kapatbtn${doc.id} onclick="kapat(this)" class="btn btn-outline-dark form-control">Kapat</button>
        </div>
      </td>
      <td colspan="2">
        
      </td>
    </tr>
</table>`;
          var teltablo=`<br><br>
  <table class="table table-success table-striped" cellspacing="0" id="tabim${doc.id}" width="100%">
  <thead>
    <tr>
      <th>Veriler</th>
      <th>Tanı</th>
    </tr>
    <tr>
      <td><textarea id="veri" placeholder="veriler..." rows="15" cols="20">${doc.data().veriler}</textarea></td>
      <td><textarea id="tani" placeholder="Tanı..." rows="15" cols="20">${doc.data().tanilar}</textarea></td>
    </tr>
    <tr>
      <th>Planlama</th>
      <th>Uygulama</th>
    </tr>
    <tr>
      <td><textarea id="plan" placeholder="Planlama..." rows="15" cols="20">${doc.data().planlar}</textarea></td>
      <td><textarea id="uygulama" placeholder="uygulama.." rows="15" cols="20">${doc.data().uygulamalar}</textarea></td>
    </tr>
    <tr>
      <th>Değerlendirme</th>
      <th>Hoca yorumu</th>
    </tr>
    <tr>
       <td><textarea id="degerlendirme" placeholder="Değerlendirme.." rows="15" cols="20">${doc.data().degerlendirmeler}</textarea></td>
       <td><p>${doc.data().hocayorumu}</p></td>
    </tr>
    
    <tr>
      <td colspan="2">
        <div class="input-group">
          <button id=silbtn${doc.id} onclick="sil(this)" class="btn btn-outline-danger form-control">Sil</button>
          <button disabled title="${doc.data().okulno}" id=kaydetbtn${doc.id} onclick="kaydet(this)" class="btn btn-outline-primary form-control">Kaydet</button>
          <button id=kapatbtn${doc.id} onclick="kapat(this)" class="btn btn-outline-dark form-control">Kapat</button>
        </div>
      </td>
    </tr>
</table>`;
          if(screen.width<=700){
            $('#icerik').append(teltablo);
            
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

      


      
      basari("bilgiler  Alındı");
    }
    else{
      hata("Hata","Alınamadı");
    }
  }
  else{
    hata("Lütfen okul no yazınız");
  }
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
          basari("Başarıyla güncellendi");
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

function sifirla(){
  firebase.auth().sendPasswordResetEmail($('#sifresifirlamail').val());
  $('#uyarisifirla').html("Mailinize bağlantı gönderildi kontrol ediniz");
  
}