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

    function SignUpViewModel() {
      var self = this;

      self.fullName = ko.observable('');
      self.userName = ko.observable('');
      self.email = ko.observable("");
      self.track = ko.observable("");
      self.phone = ko.observable("");
      self.location = ko.observable('');
      self.password = ko.observable('');

      self.data = ko.observableArray()
      self.pass = ko.observable(false)

      function User(name, username, email, track, phone, loc, password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.track = track;
        this.phone = phone;
        this.loc = loc;
        this.password = password;

        this.id = 'hng100';
      }

      self.isValid = function() {
        if (self.fullName() !== '' && self.userName() !== '' && self.email() !== '' && self.password() !== '') {
          self.pass(true);
          console.log(self.pass());

          return true;
        } else {
          console.log(self.pass());
          self.pass(false);
          return false;
        }
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
      self.status = ko.observable(validate(self.fullName(), self.userName(), self.email(), self.track(), self.phone(), self.location(), self.password()));

      self.submitForm = function(formElement) {
        if (validate(self.fullName(), self.userName(), self.email(), self.track(), self.phone(), self.location(), self.password()) == true) {
          self.data().push(new User(self.fullName(), self.userName(), self.email(), self.track(), self.phone(), self.location(), self.password()));
          console.log(self.data());
          self.pass(true);
        }else {
          alert('fill all fields');
        }
        console.log(self.pass());
      }


      //from cookbook
      self.isSmall = ResponsiveKnockoutUtils.createMediaQueryObservable(
        ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY));

      self.columns = ko.computed(function () {
        return self.isSmall() ? 1 : 3;
      }.bind(self));

      self.clickedButton = ko.observable("(None clicked yet)");
      self.buttonClick = function(event){
        self.clickedButton(event.currentTarget.id);
        return true;
      }.bind(self);
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
    return new SignUpViewModel();
  }
);
