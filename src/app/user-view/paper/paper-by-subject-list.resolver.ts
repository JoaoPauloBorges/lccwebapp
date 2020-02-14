import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Paper} from 'src/app/shared/models/paper';
import { PaperService } from './paper.services';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PaperBySubjectListResolver implements Resolve<Observable<Paper[]>> {

  constructor(private service: PaperService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Paper[]> {
    const paperSubject: string = route.params.paperSubject;
    return this.service.listPaperBySubject(paperSubject)
    .pipe(
      map(resp => (
        resp.filter(obj => obj.paperDate = new Date(obj.paperDate))
      )));
  }
}
