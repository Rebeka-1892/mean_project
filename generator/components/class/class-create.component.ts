import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { [MajClass]Service } from '../../services/[MinClass].service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-[MinClass]-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './[MinClass]-create.component.html',
    standalone: true
})
export class [MajClass]CreateComponent {
    [MinClass]s: any[] = [];
    [MinClass]: any;
    constructor(private [MinClass]Service: [MajClass]Service, private router: Router) { }

    new[MajClass] = {[data] };

    add[MajClass](): void {
        if([condition]) {
            this.[MinClass]Service.add[MajClass](this.new[MajClass]).subscribe(() => {
                this.router.navigate(['/[MinClass]s']);
            });
        }
    }    
}