import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IBSheetAngular, type IBSheetOptions, type IBSheetInstance } from '@ibsheet/angular';

@Component({
  selector: 'app-bus-traffic',
  imports: [CommonModule, IBSheetAngular],
  templateUrl: './bus-traffic.html',
  styleUrl: './bus-traffic.scss'
})
export class BusTraffic {
  private http = inject(HttpClient);

  sheet?: IBSheetInstance;

  getInstance(obj: IBSheetInstance): void {
    this.sheet = obj;
  }

  dataLoad(): void {
    if (this.sheet) {
      this.http.get<any[]>('assets/json/bus_traffic.json')
      .subscribe(data => {
        this.sheet!.loadSearchData(data);
      });
    }
  }

  sheetOption: IBSheetOptions = {
    Cfg: {
      SearchMode: 0,
    },
    LeftCols: [
      {Type: "Int", Width: 80, Align: "Center", Name: "SEQ"}
    ],
    Cols: [
      { Header: "정류장ID", Name: "nodeId", Type: "Text", MinWidth: 120},
      { Header: "정류장명", Name: "nodeNm", Type: "Text", Align: "Center", NumberSort: true, MinWidth: 150, RelWidth: 1 },
      { Header: "노선명", Name: "routeNm", Type: "Text", Align: "Center" },
      { Header: "노선유형", Name: "routeTy", Type: "Enum", EnumKeys: "|1|2|3|4|5|6|7|8|10", Enum: "|공항|마을|간선|지선|순환|광역|인천|경기|관광"},
      { Header: "승차인원", Name: "tkcarNmpr", Type: "Int" },
      { Header: "하차인원", Name: "gffNmpr", Type: "Int" },
      { Header: "재차인원", Name: "nownmprNmpr", Type: "Int" },
      { Header: "구간명", Name: "sctnNm", Type: "Text", Align: "Center" },
      { Header: "구간거리", Name: "sctnDstnc", Type: "Float", Align: "Center", MinWidth: 200, RelWidth: 1 },
      { Header: "기준일자", Name: "stdrDe", Type: "Date", DataFormat: "yyyyMMdd", Format: "yyyy-MM-dd" },
    ],
    Events: {
      onSearchFinish: (evt: any) => {
        evt.sheet.showFilterRow();
      }
    }
  }
}
