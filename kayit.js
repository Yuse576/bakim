$('#karaktersecimi').show();

function kaydologrenci(){
  $('#uyari').html("kaydınız oluşturuluyor lütfen bekleyin...")
  var email=$('#mail').val();
  var password=$('#sifre1').val();
  var sifre2=$('#sifre2').val();
  var okulno=$('#okulno').val();
  var hocakodu=$('#hocakodu').val();
  var isim=$('#isim').val();
  var soyisim=$('#soyisim').val();
  if(password==sifre2){
    const file = document.querySelector("#photo").files[0];
    const ref = firebase.storage().ref().child(okulno);
    ref.put(file).then((snapshot) => {
      $('#uyari').html("fotoğrafınız güzelmiş lütfen bekleyin...")
    });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        db.collection("tumkullaniciler").doc(email).set({
          isim:isim,
          soyisim:soyisim,
          okulno:okulno,
          hocakodu:hocakodu,
        })
          .then(() => {
            
            alert("Kaydınız başarıyla alındı");
            window.location="/";
        })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Kayıt yapılırken bir hata oldu lütfen tekrar deneyin")
      });
  }
  else{
    alert("Üzgünüz şifreler aynı değil");
  }
}

function kaydolhoca(){
  var rastgele=salla(11111111111111111111,99999999999999999999);
  $('#uyarihoca').html("kaydınız oluşturuluyor lütfen bekleyin...")
  var email=$('#mailhoca').val();
  var password=$('#sifre1hoca').val();
  var sifre2=$('#sifre2hoca').val();
  var okulismi=$('#okulhoca').val();
  var isim=$('#isimhoca').val();
  var soyisim=$('#soyisimhoca').val();
  if(password==sifre2){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        db.collection("hocalar").doc(email).set({
          isim:isim,
          soyisim:soyisim,
          okulismi:okulismi,
          hocakodu:rastgele,
        })
          .then(() => {
            alert("Kaydınız başarıyla alındı");
            window.location="/admin.html";
        })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Kayıt yapılırken bir hata oldu lütfen tekrar deneyin")
      });
  }
  else{
    alert("Üzgünüz şifreler aynı değil");
  }
}

function ogretmen(){
  $('#karaktersecimi').hide();
  $('#kayitdivhoca').show(500);
}
function ogrenci(){
  $('#karaktersecimi').hide();
  $('#kayitdiv').show(500);
}