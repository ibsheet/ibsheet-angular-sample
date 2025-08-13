import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IBSheetAngular, IB_Preset, type IBSheetOptions, type IBSheetInstance } from '@ibsheet/angular';

@Component({
  selector: 'app-civil-defense-shelter',
  imports: [CommonModule, IBSheetAngular],
  templateUrl: './civil-defense-shelter.html',
  styleUrl: './civil-defense-shelter.scss'
})
export class CivilDefenseShelter {
  private http = inject(HttpClient);

  sheet?: IBSheetInstance;
  
  getInstance(obj: IBSheetInstance): void {
    this.sheet = obj;
  }

  dataLoad(): void {
    if (this.sheet) {
      this.http.get<any[]>('assets/json/civil_defense_shelter.json')
      .subscribe(data => {
        this.sheet!.loadSearchData(data);
      });
    }
  }

  sheetOption: IBSheetOptions = {
    Cfg: {
      SearchMode: 2
    },
    LeftCols: [
      {Type: "Int", Width: 100, Align: "Center", Name: "SEQ"}
    ],
    Cols: [
      { Header: '관리번호', Name: 'managerment_number', Type: 'Text', Width: 150 },
      { Header: '지정일자', Name: 'designated_date', Type: 'Date', Width: 150, DataFormat: "yyyy-MM-dd" },
      { Header: '해제일자', Name: 'release_date', Type: 'Date', Width: 150, DataFormat: "yyyy-MM-dd" },
      { Header: '운영상태', Name: 'status', Type: 'Text', Width: 100, Align: "Center" },
      { Header: '시설명', Name: 'facility_name', Type: 'Text', Width:250 },
      { Header: '시설구분', Name: 'facility_type', Type: 'Text', Width:150, Align: "Center" },
      { Header: '도로명전체주소', Name: 'addr_doro', Type: 'Text', MinWidth:300, RelWidth:1 },
      { Header: '소재지전체주소', Name: 'addr_jibun', Type: 'Text', MinWidth:300, RelWidth:1 },
      { Header: '도로명우편번호', Name: 'post_no_doro', Type: 'Text', Width:100, Align: "Center" },
      { Header: '시설위치(지상/지하)', Name: 'facility_location', Type: 'Text', Width:150, Align: "Center" },
      { Header: '시설면적(㎡)', Name: 'facility_area', Type: 'Text', Width:150, Align: "Center" },
      { Header: '최대수용인원', Name: 'maximum_capacity', Type: 'Text', Width:150, Align: "Center" },
      { Header: '위도 (GPS)', Name: 'latitude_epsg4326', Type: 'Text', Width:150 },
      { Header: '경도 (GPS)', Name: 'longitude_epsg4326', Type: 'Text', Width:150 },
    ]
  }
}
