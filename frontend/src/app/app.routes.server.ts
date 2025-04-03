import { RenderMode, ServerRoute } from '@angular/ssr';
import {inject} from '@angular/core';
import {RoleService} from './services/role.service';
import {UniteService} from './services/unite.service';
import {EmployeService} from './services/employe.service';
import {MaterielService} from './services/materiel.service';
import {ServiceService} from './services/service.service';
import {PosteService} from './services/poste.service';
import {FormulematerielService} from './services/formulemateriel.service';
import {FormuleroleService} from './services/formulerole.service';
import {ClientService} from './services/client.service';
import {DemandeService} from './services/demande.service';
import {DevisService} from './services/devis.service';
import {TacheService} from './services/tache.service';
import {FactureService} from './services/facture.service';
import {DetaildevisService} from './services/detaildevis.service';
import {StockService} from './services/stock.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'roles-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(RoleService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    },
  },
  {
    path: 'unites-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(UniteService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    },
  },
  {
    path: 'employes-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(EmployeService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    },
  },
  {
    path: 'materiels-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(MaterielService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    },
  },
  {
    path: 'services-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(ServiceService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    },
  },
  {
    path: 'postes-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(PosteService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    },
  },
  {
    path: 'formulemateriels-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(FormulematerielService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    },
  },
  {
    path: 'formuleroles-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(FormuleroleService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    },
  },
  {
    path: 'clients-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(ClientService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    },
  },
  {
    path: 'demandes-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(DemandeService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    },
  },
  {
    path: 'devis-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(DevisService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    },
  },
  {
    path: 'factures-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(FactureService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    }
  },
  {
    path: 'detaildevis-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(DetaildevisService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    }
  },
  {
    path: 'taches-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(TacheService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    }
  },
  {
    path: 'devis-create/:iddemande/:idclient',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(DevisService);
      const demandes = await dataService.getIds();
      const clients = await dataService.getIds();

      if (!Array.isArray(demandes) || demandes.length === 0 || !Array.isArray(clients) || clients.length === 0) {
        return [{ iddemande: '', idclient: '' }];
      }

      return demandes.flatMap(demande =>
        clients.map(client => ({ iddemande: demande?.toString() || '', idclient: client?.toString() || '' }))
      );
    }
  },
  {
    path: 'stocks-edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(StockService);
      const ids = await dataService.getIds();
      if (!Array.isArray(ids) || ids.length === 0) {
        return [{ id: '' }];
      }
      return ids.map(id => ({ id: id?.toString() || '' }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
