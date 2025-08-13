import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBSheetAngular, type IBSheetOptions, type IBSheetInstance, type IBSheetEvents } from '@ibsheet/angular';

type OnReceiveDataParam = Parameters<NonNullable<IBSheetEvents['onReceiveData']>>[0];

@Component({
  selector: 'app-netflix-favorite',
  imports: [IBSheetAngular],
  templateUrl: './netflix-favorite.html',
  styleUrl: './netflix-favorite.scss'
})
export class NetflixFavorite {
  private http = inject(HttpClient);

  sheet?: IBSheetInstance;

  getInstance(obj: IBSheetInstance): void {
    this.sheet = obj;
  }

  dataLoad(): void {
    if (this.sheet) {
      this.http.get<any[]>('assets/json/netflix_favorite.json')
      .subscribe(data => {
        this.sheet!.loadSearchData(data);
      });
    }
  }

  sheetOption: IBSheetOptions = {
    Cfg: {
      SearchMode: 2,
      NoVScroll: true,
      CanEdit: 0,
      HeaderMerge: 5,

    },
    Cols: [
      { Header: "국가", Name: "n_country", Type: "Html", Width: 250, TextSize: '18px', TextFont: "Inter var,ui-sans-serif,system-ui,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'", Color: "#1f2937", TextColor: "white", CanFocus: 0 },
      { Header: "최고인기 영화", Name: "n_topMovie", Type: "Html", MinWidth: 350, RelWidth: 1, TextSize: '18px', TextFont: "Inter var,ui-sans-serif,system-ui,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'", Color: "#1f2937", TextColor: "white", CanFocus: 0 },
      { Header: "최고인기 TV방송", Name: "n_topTvShow", Type: "Html", MinWidth: 350, RelWidth: 1, TextSize: '18px', TextFont: "Inter var,ui-sans-serif,system-ui,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'", Color: "#1f2937", TextColor: "white", CanFocus: 0 },
      // { Header: "국가", Name: "countryFlagImage", Type: "Img", Width: 50 },
      // { Header: "국가", Name: "country", Type: "Text", Width: 200, TextSize: '18px', TextFont: "Inter var,ui-sans-serif,system-ui,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'" },
      // { Header: "최고인기 영화", Name: "topMovieImage", Type: "Img", Width: 50},
      // { Header: "최고인기 영화", Name: "topMovie", Type: "Text", MinWidth: 250, RelWidth: 1, TextSize: '18px', TextFont: "Inter var,ui-sans-serif,system-ui,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'" },
      // { Header: "최고인기 TV방송", Name: "topTvShowImage", Type: "Img", Width: 50},
      // { Header: "최고인기 TV방송", Name: "topTvShow", Type: "Text", MinWidth: 250, RelWidth: 1, TextSize: '18px', TextFont: "Inter var,ui-sans-serif,system-ui,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'" },
    ],
    Events: {
      onReceiveData: (evt:OnReceiveDataParam) => {
        let data = evt.data;
        if(typeof data == 'string') {
          data = JSON.parse(data);
        }

        for(let i = 0; i < data.length; i++) {
          let row: any = data[i];
          let countrySpt = row['countryFlagImage'].split('|');
          row['n_country'] = '<img border="0" draggable="false" width="20px" src="'+ countrySpt[1] + '"> ' + row['country'];
          let movieSpt = row['topMovieImage'].split('|')
          row['n_topMovie'] = '<img border="0" draggable="false" width="40px" src="'+ movieSpt[1] + '"> ' + row['topMovie'];;
          let tvSpt = row['topTvShowImage'].split('|');
          row['n_topTvShow'] = '<img border="0" draggable="false" width="40px" src="'+ tvSpt[1] + '"> ' + row['topTvShow'];;
        }

        return data;
      },
      onRenderFirstFinish: () => {
        this.dataLoad();
      }
    }
  }
}
