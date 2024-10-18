import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../../../../core/services/campaign.service';
import { Message } from '../../../../core/models/messages-response.model';

@Component({
  selector: 'app-campaign-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign-messages.component.html',
  styleUrl: './campaign-messages.component.css'
})

export class CampaignMessagesComponent implements OnInit {
  messages: Message[] = [];
  errorMessage: string = '';
  campaignId: number = 0;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.campaignId = +params.get('campaignId')!; // Obtiene el ID de la campaña
      this.loadCampaignMessages();
    });
  }

  loadCampaignMessages(): void {
    this.loading = true;
    this.campaignService.getCampaignMessages(this.campaignId).subscribe({
      next: (data) => {this.messages = data; this.loading = false;},
      error: (err) => {this.errorMessage = 'Error loading messages'; this.loading = false;}
    });
  }

  getStatusDescription(status: number): string {
    switch (status) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'Enviado';
      case 3:
        return 'Error';
      default:
        return 'Desconocido';
    }
  }
}