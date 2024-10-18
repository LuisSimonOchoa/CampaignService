import { Routes } from '@angular/router';
import { CampaignListComponent } from './features/campaigns/components/campaign-list/campaign-list.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CampaignMessagesComponent } from './features/campaigns/components/campaign-messages/campaign-messages.component';

export const routes: Routes = [
    {
        path: '',
        component: NavbarComponent,  // Usa el NavbarComponent como el contenedor principal
        children: [
            { path: '', redirectTo: '/campaigns', pathMatch: 'full' },
            { path: 'campaigns', component: CampaignListComponent },
            { path: 'campaigns/:campaignId/messages', component: CampaignMessagesComponent }

        ]
      }
];
