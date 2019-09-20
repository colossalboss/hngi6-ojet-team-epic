/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['knockout', 'ojs/ojbootstrap', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils',
'ojs/ojmessaging', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojformlayout'],
 function(ko, Bootstrap, ResponsiveUtils, ResponsiveKnockoutUtils, Message) {

    function LoginViewModel() {
      var self = this;

      self.userName = ko.observable("");
      self.fullName = ko.observable("");
      self.password = ko.observable("");
      self.login = ko.observable(false);

      self.data = ko.observableArray()
      self.dataFromAPI = ko.observableArray()

      self.pass = ko.observable(false)

      self.isSmall = ResponsiveKnockoutUtils.createMediaQueryObservable(
        ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY));

      self.columns = ko.computed(function () {
        return self.isSmall() ? 1 : 3;
      }.bind(self));

      //functionality
      self.isValid = function() {
        if (self.userName() !== '' && self.password() !== '') {
          self.pass(true);
          console.log(self.pass());

          return true;
        } else {
          console.log(self.pass());
          self.pass(false);
          return false;
        }
      }

      // sign up btn
      self.clickedButton = ko.observable("(None clicked yet)");
      self.buttonClick = function(event){
          self.clickedButton(event.currentTarget.id);
          return true;
      }.bind(self);


      function User(name, password) {
        this.name = name;
        this.password = password;
      }

      function validate(name, username, email, track, phone, loc, password) {
        if (name != '' && username != '' && email != '' && track != '' && phone != '' && loc != '' && password != '') {
          self.pass(true);
          return true;
        } else {
          self.pass(false);
          return false;
        }
      }


      self.submitForm = function(formElement) {
        if (validate(self.userName(), self.password())) {
          self.data().push(new User(self.userName(), self.password()));
          console.log(self.data());
          self.pass(true);

          console.log(self.data()[0]["name"]);
          let targetName = self.data()[0]["name"];
          let targetPassword = self.data()[0]["password"];

          self.dataFromAPI().forEach(item => {
            if (item.username == targetName && item.password == targetPassword) {
              self.fullName(item.name);
              self.userName(item.username);
              console.log('Our User');
              self.login(true)
              return true;
            }
          })
        }else {
          alert('fill all fields');
        }
        self.data([]);
        console.log(self.pass());
        console.log(self.data());
      }

      //fetch
      // fetch('js/viewModels/data/data.json')
      // .then((res) => {
      //   return res.json();
      // })
      // .then((response) => {
      //   console.log(JSON.stringify(response))
      // })
      // .catch(err => console.log(err));

      $.getJSON('js/viewModels/data/data.json', function(data) {
        console.log('hey');

        self.dataFromAPI(data);
        console.log(self.dataFromAPI());

      })

      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new LoginViewModel();
  }
);
