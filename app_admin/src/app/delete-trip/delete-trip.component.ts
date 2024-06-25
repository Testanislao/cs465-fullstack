import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delete-trip.component.html',
  styleUrl: './delete-trip.component.css'
})

export class DeleteTripComponent implements OnInit{

  constructor(
    private router: Router,
    private tripService: TripDataService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // retrieved stashed trip ID
    let token = this.authenticationService.getToken();
    let tripCode = localStorage.getItem("tripCode");

    if (!tripCode) {
      alert("Something wrong, couldn’t find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }
    console.log('DeleteTripComponent::ngOnInit');
    console.log('tripcode:' + tripCode);

    this.tripService.deleteTrip(tripCode, token)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['list-trip']);
      },
      error: (error: any) => {
        console.log('Error deleting trip: ' + error);
      }
    });
  }
}
