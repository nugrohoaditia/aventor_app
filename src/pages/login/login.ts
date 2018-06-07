import { Component } from '@angular/core';
// import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams, Loading, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;
  username : string;
  password : string;
  constructor(private http: HTTP, public navCtrl: NavController, public navParams: NavParams,  public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login(){
    this.showLoading();

   let dataSend = {
        'userName': this.username,
        'password': this.password,
        // 'labelxpossystem' : '4d45dc764db7153261f7f24b32ae9435'
    };
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
      console.log(headers);
    return this.http.post('http://52.77.4.24/dev/arventor/login/ajax_login_app/', dataSend, headers)
        .then((data) => {
            console.log(JSON.parse(data.data).status);
            this.navCtrl.setRoot(HomePage);
            this.loading.dismiss();
            this.loginSuccessToast();
            
        })
        .catch((error) => {
            console.log("Server Error");
            this.loading.dismiss();
            this.showAlert("SERVER ERRor");
        });



    // if (this.username != 'admin' || this.password != 'admin' ) {
    //     
    // }
    // else{
    //   this.navCtrl.setRoot(HomePage);
    //   this.loading.dismiss();
    //   this.loginSuccessToast();
    // }
    
  }

    passwordType: string = 'password';
    passwordIcon: string = 'eye-off';

    hideShowPassword() {
     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    showLoading(){
      this.loading = this.loadingCtrl.create({
        content: 'Logging in...'
      });
      this.loading.present();
    }

    showAlert(text) {
      let alert = this.alertCtrl.create({
        title: 'Gagal Masuk!',
        subTitle: text,
        buttons: ['Try again']
      });
      alert.present();
    }

    loginSuccessToast() {
      let toast = this.toastCtrl.create({
        message: 'Berhasil Masuk',
        duration: 2000
      });
      toast.present();
    }

}
