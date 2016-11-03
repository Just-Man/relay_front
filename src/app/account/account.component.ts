import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../service/user.service";
import { TransferService } from "../service/transfer.service";

@Component({
  moduleId   : module.id,
  selector   : 'app-account',
  templateUrl: 'account.component.html',
})
export class AccountComponent implements OnInit
{
  private score;
  private token;
  public fields;
  private create = [
    { label: "E-mail", name: "email", type: "email" },
    { label: "Password", name: "pass", type: "password" },
    { label: "Repeat Password", name: "rePass", type: "password" }
  ];
  private update = [
    { label: "Old Password", name: "oldPass", type: "password" },
    { label: "Password", name: "pass", type: "password" },
    { label: "Repeat Password", name: "rePass", type: "password" }
  ];
  private forgot = [
    { label: "E-mail", name: "email", type: "email" },
    { label: "Username", name: "uesrname", type: "text" },
    { label: "Password", name: "pass", type: "password" },
    { label: "Repeat Password", name: "rePass", type: "password" }
  ];

  protected errors;
  private message;
  private bgcolor;
  private path;

  constructor(private router:Router,
              private userService:UserService)
  {
  }

  ngOnInit()
  {
    this.router
      .routerState
      .queryParams
      .subscribe(params =>
      {
        this.token = decodeURIComponent(Object.keys(params)[0]);
      });

    if (this.router.url ==="/change-password") {
      this.fields = this.update;
      this.path = "/change-password"
    }

    if (this.router.url ==="/activate") {
      this.fields = this.create;
      this.path = "/set-password"
    }

    if (this.router.url ==="/forgotten-password") {
      this.fields = this.forgot;
      this.path = "/forgotten-password"
    }
  }

  save(data)
  {
    let successValidation = this.validateUserData();
    if (this.score >= 55 && successValidation) {
      data = this.fields.slice();
      data.push(this.score);
      this.userService.saveUser(data, this.path)
        .subscribe(res =>
        {
          console.log(res)
        });    }
  }

  static getPassword (data)
  {
    let i,
        len = data.length;

    for (i = 0; i < len; i += 1)
    {
      if (data[i].name === "pass") {
        return data[i].value;
      }
    }
  }

  static getRePassword (data)
  {
    let i,
        len = data.length;

    for (i = 0; i < len; i += 1)
    {
      if (data[i].name === "rePass") {
        return data[i].value;
      }
    }
  }

  validateUserData () {
    let password,
        rePassword,
        userData,
        data = [],
        passwordMatch = false;

    this.bgcolor = "#900";
    password = AccountComponent.getPassword(this.fields);
    rePassword = AccountComponent.getRePassword(this.fields);

    if (rePassword) {
      if (password === rePassword) {
        passwordMatch = true;
      }
    }

    if (password){
      this.comparePasswordToUsername(password);
      userData = this.checkPassStrength(password);
    }

    this.score = userData ? userData.score : 0;

    this.message = userData ? userData.message : "";
    return passwordMatch;
  }

  static checkPasswordStrength(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = {},
        len = pass.length,
        i;
    for (i = 0; i < len; i += 1) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      if (len < 5) {
        score += 5.0 / letters[pass[i]];
      }
      if (len >= 5) {
        score += 6.0 / letters[pass[i]];
      }

    }

    var validations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    },

    validationsCount = 0;
    for (var check in validations) {
        validationsCount += (validations[check] == true) ? 1 : 0;
    }
    score += (validationsCount) * 10;
    return +score;
  }

  checkPassStrength(pass) {
    var score = AccountComponent.checkPasswordStrength(pass),
      returnData = {
        score :  score,
        message: "very weak."
      };

    if (score >= 30){
      this.score = score;
      returnData.score = score;
      returnData.message = "weak";
    this.bgcolor = "#c00";
    }

    if (score >= 55){
      returnData.score = score;
      returnData.message = "good";
    this.bgcolor = "#77b300";
    }

    if (score >= 80){
      returnData.score = score;
      returnData.message = "strong";
    this.bgcolor = "#0ff";
    }

    if (score >= 100){
      returnData.score = 100;
      returnData.message = "very strong";
    this.bgcolor = "#00f";
    }

    return returnData;
  }

  comparePasswordToUsername (pass)
  {
    var user = TransferService.getFromStorage('user');
    if (user.username === pass) {
      this.errors = "Password can'\t be same as username";
    }
  }

}
