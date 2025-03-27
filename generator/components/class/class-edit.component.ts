import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { [MajClass]Service } from '../../services/[MinClass].service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-[MinClass]-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './[MinClass]-edit.component.html',
    standalone: true
})
export class [MajClass]EditComponent implements OnInit {
    new[MajClass]: any;
    list: any;

    constructor(
        private [MinClass]Service: [MajClass]Service,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.[MinClass]Service.get[MajClass]ById(id).subscribe(data => this.new[MajClass] = data);
            this.[MinClass]Service.get[MajClass]().subscribe(data => this.list = data);            
        }
    }

    update[MajClass](): void {
        if([condition]) {
            this.[MinClass]Service.update[MajClass](this.new[MajClass]._id, this.new[MajClass]).subscribe(() => {
                this.router.navigate(['/[MinClass]']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/[MinClass]s']);
    }
}
