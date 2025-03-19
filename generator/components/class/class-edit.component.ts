import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { [MajClass]Service } from '../../services/[MinClass].service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-[MinClass]-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './[MinClass]-edit.component.html'
})
export class [MajClass]EditComponent {
    new [MajClass]: any = { title: '', content: '' }; // Initialisation

    constructor(
        private [MinClass]Service: [MajClass]Service,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id'); // Récupère l'ID depuis l'URL
        if(id) {
            this.[MinClass]Service.get[MajClass]ById(id).subscribe((data) => {
                this.new[MajClass] = data;
            });
        }
    }

    update[MajClass](): void {
        if(this.new[MajClass].title && this.new[MajClass].content) {
        this.[MinClass]Service.update[MajClass](this.new[MajClass]._id, this.new[MajClass]).subscribe(() => {
            this.router.navigate(['/[MinClass]']); // Redirige vers la liste après modification
        });
    }
}

goBackToList() {
    this.router.navigate(['/[MinClass]s']);
}
}
