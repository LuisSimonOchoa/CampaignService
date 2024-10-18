import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../../../../core/services/campaign.service';
import { Campaign } from '../../../../core/models/campaign-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.css'
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private campaignService: CampaignService, private router: Router) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.loading = true;
    this.campaignService.getCampaigns().subscribe({
      next: (response) => {this.campaigns = response.data; this.loading = false;},
      error: (err) => {this.errorMessage = 'Error loading campaigns', this.loading = false;}
    });
  }

  getStatusDescription(status: number): string {
    switch (status) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'En proceso';
      case 3:
        return 'Finalizada';
      default:
        return 'Desconocido';
    }
  }

  viewCampaignMessages(campaignId: number): void {
    this.router.navigate(['/campaigns', campaignId, 'messages']); // Cambia la ruta según tu configuración
  }
}

