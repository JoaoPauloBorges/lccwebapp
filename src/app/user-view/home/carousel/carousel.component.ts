import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Carrousel } from 'src/app/shared/models/carrousel';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const URL_RENDER = environment.backendrUrl + 'files/image/';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {

  isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');

  @Input() proportion;
  @Input() page;
  subs: Subscription[] = [];
  imgPaths: Observable<string[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient) {
    this.subs.push(this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
      this.proportion = '60';
      } else { this.proportion = '30'; }
    }));
  }

  ngOnInit() {
    this.imgPaths = this.http.get<Carrousel>(environment.backendrUrl + 'carrousel/' + this.page)
      .pipe(map(resp => {
          return resp.imagePath.map(path => {
            return URL_RENDER + path;
          });
        }));
  }

  ngOnDestroy() {
    this.subs.forEach( sub => sub.unsubscribe());
  }
}
