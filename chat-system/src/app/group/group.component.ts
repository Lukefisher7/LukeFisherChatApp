import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {};
    chatLink(){
      this.router.navigate(['/chatbox']);
    }


  ngOnInit(): void {
  }

}