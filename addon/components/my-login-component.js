import Component from '@ember/component';
import { inject } from '@ember/service';
import layout from '../templates/components/my-login-component';

export default Component.extend({
  layout,
  router : inject(),
  actions : {
    validateUser() {
      const user_name = this.get('username');
      const pass_word = this.get('password');
  
      if((!(/[a-z]/i.test(user_name))) || (!user_name)){
          alert("Username should contain atleat one alphabet");
      }
      else if(!pass_word){
        alert("Please Enter a Password");
      }
      else if(!localStorage.getItem(user_name)){
          const user_details = {
              userName : user_name,
              passWord : pass_word
          }
          localStorage.setItem(user_name,JSON.stringify(user_details));
          localStorage.setItem('current_user',user_name);
          localStorage.setItem('isLoggedIn',JSON.stringify(true));
        
          this.get('router').transitionTo('home');
      }
      else {
          const user_password = JSON.parse(localStorage.getItem(user_name)).passWord;
          if(pass_word==user_password) {
              localStorage.setItem('current_user',user_name);
              localStorage.setItem('isLoggedIn',true);
              
              this.get('router').transitionTo('home');
          }
          else{
              alert("Invalid Username or Password");
          }
      }
    },

    goToPreviousPage() {
      history.back();
    }
  }
});
