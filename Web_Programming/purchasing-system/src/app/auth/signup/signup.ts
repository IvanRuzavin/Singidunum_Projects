import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  errorExists = false;
  errorText = "";

  productTypes: string[] = [
    'Electronics',
    'Clothing',
    'Books',
    'Fitness Equipment',
    'Home Appliances',
    'Toys & Games'
  ];

  selectedPreferences: { [key: string]: boolean } = {};

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(form: NgForm) {
    // Create an array of selected preferences from the checkbox state
    const preferences = Object.keys(this.selectedPreferences).filter(key => this.selectedPreferences[key]);

    if (!this.userService.getUser(form.value.email)) {
      this.errorExists = false;

      if (preferences.length === 0) {
        this.errorExists = true;
        this.errorText = "Please select at least one product preference.";
        return;
      }

      const newUser = this.userService.registerUser(
        form.value.fullName,
        form.value.email,
        form.value.phone,
        form.value.address,
        preferences,
        form.value.password,
        form.value.birthDate
      );

      this.router.navigate(['']);
    } else {
      this.errorExists = true;
      this.errorText = "User with this email already exists";
    }
  }
}
