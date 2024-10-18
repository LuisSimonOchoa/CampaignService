import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/campaign-response.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = 'https://ek6zl34s57.execute-api.us-east-1.amazonaws.com/dev/campaigns';  // Reemplaza con tu URL
  constructor(private http: HttpClient) {}

  // Obtener la lista de campañas (opcionalmente filtradas por fechas)
  getCampaigns(startDate?: string, endDate?: string): Observable<Response> {
    let params = new HttpParams();
    if (startDate) params = params.append('start_date', startDate);
    if (endDate) params = params.append('end_date', endDate);

    return this.http.get<Response>(this.apiUrl, { params });
  }

  // Obtener los mensajes de una campaña específica
  getCampaignMessages(campaignId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${campaignId}/messages`);
  }

  // Simular el envío de la campaña
  sendCampaign(campaignId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${campaignId}/send`, {});
  }

  // Crear una nueva campaña
  createCampaign(campaign: any): Observable<any> {
    return this.http.post(this.apiUrl, campaign);
  }
}
