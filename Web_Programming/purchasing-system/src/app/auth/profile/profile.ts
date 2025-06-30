import { Component, Inject, OnInit } from '@angular/core';
import { User, UserService } from '../user-service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  isEditing: boolean = false;
  profileForInput!: User;

  productTypes: string[] = [
    'Electronics',
    'Clothing',
    'Books',
    'Fitness Equipment',
    'Home Appliances',
    'Toys & Games'
  ];

  selectedPreferences: { [key: string]: boolean } = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService) {}

  ngOnInit(): void {
    if (this.data && this.data.user) {

      this.profileForInput = {
        id: this.data.user.id,
        fullName: this.data.user.fullName,
        email: this.data.user.email,
        phone: this.data.user.phone,
        address: this.data.user.address,
        preferences: this.data.user.preferences || [],
        date: this.data.user.date,
        password: this.data.user.password
      };

      this.productTypes.forEach(type => {
        this.selectedPreferences[type] = this.profileForInput.preferences?.includes(type) || false;
      });

    } else {
      console.error("invalid user data: ", this.data);
    }
  }

  enableEdit() {
    this.isEditing = !this.isEditing;
    console.log('click');
  }

  finishEditing() {
    this.data.user.email = this.profileForInput.email;
    this.data.user.fullName = this.profileForInput.fullName;
    this.data.user.phone = this.profileForInput.phone;
    this.data.user.password = this.profileForInput.password;
    this.data.user.date = this.profileForInput.date;
    this.data.user.address = this.profileForInput.address;
    this.data.user.preferences = Object.keys(this.selectedPreferences).filter(key => this.selectedPreferences[key]);
    console.log(this.data.user);
    console.log(UserService.dummyUserList);
    this.isEditing = false;
  }

}
