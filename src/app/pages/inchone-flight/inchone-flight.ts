import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IBSheetAngular, IB_Preset, type IBSheetOptions, type IBSheetInstance } from '@ibsheet/angular';

type FlightRow = {
  arrFlight: string;
  depFlight: string;
  flights: string;
  region: string;
  country: string;
};

@Component({
  selector: 'app-inchone-flight',
  imports: [CommonModule, IBSheetAngular, FormsModule],
  templateUrl: './inchone-flight.html',
  styleUrl: './inchone-flight.scss'
})
export class InchoneFlight {
  private http = inject(HttpClient);

  sheet?: IBSheetInstance;

  getInstance(obj: IBSheetInstance): void {
    this.sheet = obj;

    // 이벤트 중복 방지용 Unbind 먼저
    this.sheet.unbind('onReceiveData');
    
    if (this.selectedCode == 'country') {
      this.sheet.bind('onReceiveData', this.country_event);
    } else if (this.selectedCode == 'passenger') {
      this.sheet.bind('onReceiveData', this.passenger_events);
    } else if (this.selectedCode == 'cargo') {
      this.sheet.bind('onReceiveData', this.cargo_events);
    }
  }
  
  flights = [
    {code: 'country', val: '국가별 항공통계-운항편'},
    {code: 'passenger', val: '국가별 항공통계-여객'},
    {code: 'cargo', val: '국가별 항공통계-화물'}
  ]

  showSheet = true;

  onSelectChange() {
    const newCols = this.getColsByCode(this.selectedCode);

    if (this.sheet) {
      this.sheet.dispose();
      this.sheet = undefined;
    }
    this.showSheet = false;

    this.sheetOption = {
      Cfg: {
        SearchMode: 2
      },
      Cols: newCols
    };
    setTimeout(() => this.showSheet = true, 0);
  }

  getColsByCode(code: string) {
    switch (code) {
      case 'country': return this.country_cols;
      case 'passenger': return this.passenger_cols;
      case 'cargo': return this.cargo_cols;
      default: return this.country_cols;
    }
  }

  selectedCode = this.flights[0].code;

  country_cols = [
    {Header: '지역 구분명', Name: 'region', Type: "Text", Align: "Center"},
    {Header: '국가명', Name: 'country', Type: "Text", RelWidth: 1, MinWidth: 150},
    {Header: '출발편수(편)', Name: 'depFlight', Type: 'Int', Width: 150},
    {Header: '도착편수(편)', Name: 'arrFlight', Type: 'Int', Width: 150},
    {Header: '합계편수(편)', Name: 'flights', Type: 'Int', Width: 150},
  ];
  country_event = (evt: any) => {
    let data;
    if(evt.data) {
      if (typeof evt.data == 'string') {
        data = JSON.parse(evt.data);
      } else {
        data = evt.data;
      }
      for (var i = 0; i < data.length; i++) {
        let row = data[i];
        row.depFlight = row.depFlight.replaceAll(',', '');
        row.arrFlight = row.arrFlight.replaceAll(',', '');
        row.flights = row.flights.replaceAll(',', '');
      }
    }
    return data;
  };

  passenger_cols = [
    {Header: '지역 구분명', Name: 'region', Type: "Text", Align: "Center"},
    {Header: '국가명', Name: 'country', Type: "Text", RelWidth: 1, MinWidth: 150},
    {Header: '출발승객수(명)', Name: 'depPassenger', Type: 'Int', Width: 150},
    {Header: '도착승객수착(명)', Name: 'arrPassenger', Type: 'Int', Width: 150},
    {Header: '합계승객수(명)', Name: 'passenger', Type: 'Int', Width: 150},
  ];
  passenger_events = (evt: any) => {
    let data;
    if(evt.data) {
      if (typeof evt.data == 'string') {
        data = JSON.parse(evt.data);
      } else {
        data = evt.data;
      }
      for (var i = 0; i < data.length; i++) {
        let row = data[i];
        row.depPassenger = row.depPassenger.replaceAll(',', '');
        row.arrPassenger = row.arrPassenger.replaceAll(',', '');
        row.passenger = row.passenger.replaceAll(',', '');
      }
    }
    return data;
  };
  cargo_cols = [
    {Header: '지역 구분명', Name: 'region', Type: "Text", Align: "Center"},
    {Header: '국가명', Name: 'country', Type: "Text", RelWidth: 1, MinWidth: 150},
    {Header: '출발화물(톤)', Name: 'depBaggage', Type: 'Int', Width: 150},
    {Header: '도착화물(톤)', Name: 'arrBaggage', Type: 'Int', Width: 150},
    {Header: '합계화물(톤)', Name: 'baggage', Type: 'Int', Width: 150},
  ];
  cargo_events = (evt: any) => {
    let data;
    if(evt.data) {
      if (typeof evt.data == 'string') {
        data = JSON.parse(evt.data);
      } else {
        data = evt.data;
      }
      for (var i = 0; i < data.length; i++) {
        let row = data[i];
        row.depBaggage = row.depBaggage.replaceAll(',', '');
        row.arrBaggage = row.arrBaggage.replaceAll(',', '');
        row.baggage = row.baggage.replaceAll(',', '');
      }
    }
    return data;
  };
  
  sheetOption: IBSheetOptions = {
    Cfg: {
      SearchMode: 2
    },
    Cols: this.country_cols
  }
  
  dataLoad(): void {
  
    if (this.sheet) {
      if (this.selectedCode == 'country') {
        this.http.get<any[]>('assets/json/flight_country.json')
        .subscribe(data => {
          this.sheet!.loadSearchData(data);
        });
      } else if (this.selectedCode == 'passenger') {
        this.http.get<any[]>('assets/json/flight_passenger.json')
        .subscribe(data => {
          this.sheet!.loadSearchData(data);
        });
      } else if (this.selectedCode == 'cargo') {
        this.http.get<any[]>('assets/json/flight_cargo.json')
        .subscribe(data => {
          this.sheet!.loadSearchData(data);
        });
      }
    }
  }
}
