import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { [MajClass]Service } from '../../services/[MinClass].service';

@Component({
  selector: 'app-[MinClass]-list',
  imports: [],
  templateUrl: './[MinClass]-list.component.html',
  standalone: true
})
export class [MajClass]ListComponent implements OnInit {
  [MinClass]s: any[] = [];
  
  constructor(private [MinClass]Service: [MajClass]Service, private router: Router) { }
  ngOnInit(): void {
    this.load[MajClass]s();
  }

  load[MajClass]s(): void {
    this.[MinClass]Service.get[MajClass]s().subscribe(data => this.[MinClass]s =
      data);
  }

  delete[MajClass](id: string): void {
    this.[MinClass]Service.delete[MajClass](id).subscribe(() => this.load[MajClass]s());
  }

  update[MajClass](id: string): void {
    this.router.navigate(['/[MinClass]s-edit', id]);
  }

  goTo[MajClass]Create() {
    this.router.navigate(['/[MinClass]s-create']);
  }
}
