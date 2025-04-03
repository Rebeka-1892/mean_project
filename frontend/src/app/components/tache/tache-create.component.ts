import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TacheService } from '../../services/tache.service';
import { FactureService } from '../../services/facture.service';
import { EmployeService } from '../../services/employe.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin, of, switchMap } from 'rxjs';
import { RoleService } from '../../services/role.service';
import { FormuleroleService } from '../../services/formulerole.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tache-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './tache-create.component.html',
  standalone: true
})
export class TacheCreateComponent implements OnInit {
  factures: any;
  roles: { role: any; employes: any[]; error?: string }[] = [];
  newTache = { idfacture: '', idrole: '', idemploye: [] as { idrole: string, idemploye: string }[] };

  constructor(
    private tacheService: TacheService,
    private factureService: FactureService,
    private employeService: EmployeService,
    private roleService: RoleService,
    private formuleroleService: FormuleroleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.factureService.getFactureSansTaches().pipe(
      switchMap((data: any[]) => {
        this.factures = data;
        if (this.factures.length > 0) {
          this.newTache.idfacture = this.factures[0]._id;
          return this.roleService.getRoleByIdFacture(this.newTache.idfacture);
        } else {
          return of([] as any[]);
        }
      }),
      switchMap((roles: any[]) => {
        if (roles.length > 0) {
          const employeRequests = roles.map((role: any) =>
            this.employeService.getEmployeByIdFactureAndByIdRole(this.newTache.idfacture, role._id).pipe(map(employes => ({ role, employes, error: '' })))
          );
          return forkJoin(employeRequests);
        } else {
          return of([] as { role: any; employes: any[]; error: string }[]);
        }
      })
    ).subscribe((roles: { role: any; employes: any[]; error: string }[]) => {
      this.roles = roles;
    }, (error) => {
      console.error('Erreur lors de la récupération des données :', error);
    });
  }

  toggleTache(idrole: string, idemploye: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.newTache.idemploye.push({ idrole, idemploye });
    } else {
      this.newTache.idemploye = this.newTache.idemploye.filter(e => !(e.idrole === idrole && e.idemploye === idemploye));
    }
  }

  addTache(): void {
    let hasError = false;

    this.roles.forEach((role) => {
      const selectedEmployes = this.newTache.idemploye.filter(e => e.idrole === role.role._id);
      this.formuleroleService.getFormuleroleByIdFactureAndByIdRole(this.newTache.idfacture, role.role._id).pipe(
        switchMap((formulerole) => {
          const heure = formulerole[0].heure;
          const nombre = formulerole[0].nombre;
          if (nombre !== selectedEmployes.length) {
            role.error = `Le nombre d'employés ayant le rôle ${role.role.nom} doit être égal à ${nombre}.`;
            hasError = true;
            return of(null);
          }
          return of({ heure, role });
        })
      ).subscribe({
        next: (result) => {
          if (result && !hasError) {
            const { heure, role } = result;
            const requests = selectedEmployes.map(employe => {
              return this.tacheService.addTache({ idfacture: this.newTache.idfacture, idrole: role.role._id, idemploye: employe.idemploye, statut: 0, heure: heure }).toPromise();
            });
            Promise.all(requests).then(() => {
              this.router.navigate(['/taches']);
            }).catch((error) => {
              console.error('Erreur lors de l’ajout des postes :', error);
            });
          }
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des données :', error);
        }
      });
    });

    if (hasError) {
      console.error('Des erreurs ont été trouvées dans les rôles.');
    }
  }

  goBackToList() {
    this.router.navigate(['/taches']);
  }

  onFactureChange() {
    this.roleService.getRoleByIdFacture(this.newTache.idfacture).pipe(
      switchMap((roles: any[]) => {
        if (roles.length > 0) {
          const employeRequests = roles.map((role: any) =>
            this.employeService.getEmployeByIdFactureAndByIdRole(this.newTache.idfacture, role._id).pipe(map(employes => ({ role, employes, error: '' })))
          );
          return forkJoin(employeRequests);
        } else {
          return of([] as { role: any; employes: any[]; error: string }[]);
        }
      })
    ).subscribe((roles: { role: any; employes: any[]; error: string }[]) => {
      this.roles = roles;
    }, (error) => {
      console.error('Erreur lors de la récupération des données :', error);
    });
  }
}
